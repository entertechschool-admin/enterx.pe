"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

type HeroLogoVideoProps = {
  /** PNG estático del isótopo — capa base siempre presente (LCP) y fallback. */
  stillSrc: string;
  /** VP9-alpha (.webm) — lo eligen Chrome/Edge/Firefox. */
  webmSrc: string;
  /** HEVC-alpha (.mov, tag hvc1) — lo elige el stack Apple. Puede faltar. */
  hevcSrc?: string;
  alt: string;
  /** Dimensiones del clip (432×462): fijan el aspect-ratio del contenedor. */
  width: number;
  height: number;
  sizes?: string;
  className?: string;
};

/**
 * Máquina de estados del isótopo. El PNG es la CAPA BASE: se sirve en SSR con
 * `priority` (sigue siendo candidato LCP inmediato, igual que antes del video)
 * y solo se atenúa cuando el video ya está pintando frames de verdad.
 * - "idle":    SSR y pre-decisión — PNG visible.
 * - "arming":  video montado oculto, precargando; PNG sigue visible. Si
 *              "playing" no llega en WATCHDOG_MS tras el play(), se degrada y
 *              no pasa nada (el PNG nunca dejó de verse: degradar es gratis).
 * - "playing": crossfade PNG→video; el metal líquido se forma.
 * - "paused":  el usuario pausó la animación (WCAG 2.2.2 — el clip dura 18s).
 * - "resting": entre reproducciones — crossfade de vuelta al PNG, que respira
 *              REST_MS antes del replay. El video sigue montado y cargado.
 * - "settled": terminó la ÚLTIMA reproducción y el video QUEDA congelado en su
 *              último frame (el logo formado). No se desmonta ni se sustituye
 *              por la imagen: esa continuidad es el corazón del diseño.
 * - "still":   fallback terminal (reduced motion, saveData, red lenta,
 *              autoplay denegado, error, watchdog): crossfade de vuelta al PNG.
 */
type Phase =
  | "idle"
  | "arming"
  | "playing"
  | "paused"
  | "resting"
  | "settled"
  | "still";

/**
 * Gracia entre play() y el evento "playing". Generosa a propósito: el PNG
 * está visible mientras tanto, así que esperar no cuesta nada; abortar antes
 * de tiempo sí (bytes de video tirados en conexiones medias).
 */
const WATCHDOG_MS = 6000;

/**
 * El isótopo estático manda al menos este tiempo antes de la primera formación.
 * El video precarga desde el mount, pero el play() inicial se retiene: sin esto,
 * en redes rápidas el PNG se ve <1s y el crossfade atropella al LCP. La cuenta
 * corre desde el MOUNT (no desde "arming"), así que un tab abierto en segundo
 * plano ya cumplió la espera cuando el usuario mira por primera vez.
 */
const MIN_STILL_MS = 2000;

/** Reproducciones totales de la formación antes de congelar el logo. */
const MAX_PLAYS = 1;

/** Reposo sobre el PNG entre una reproducción y la siguiente. */
const REST_MS = 2000;

/** Estados en los que el <video> está montado. */
const VIDEO_PHASES: Phase[] = [
  "arming",
  "playing",
  "paused",
  "resting",
  "settled",
];
/** Estados en los que el video está visible (y el PNG atenuado). */
const VIDEO_VISIBLE: Phase[] = ["playing", "paused", "settled"];
/** Estados que una condición adversa (reduced motion, error) puede abortar. */
const CANCELABLE: Phase[] = ["arming", "playing", "paused", "resting"];

/**
 * Isótopo del hero: reproduce la narrativa de formación del logo (video con
 * canal alfa real sobre el fondo #0D0D0D) MAX_PLAYS veces, descansando sobre el
 * PNG entre ciclos, y queda en reposo en el último frame. Cualquier condición
 * adversa degrada al PNG estático, que nunca dejó de estar debajo.
 */
export function HeroLogoVideo({
  stillSrc,
  webmSrc,
  hevcSrc,
  alt,
  width,
  height,
  sizes,
  className = "",
}: HeroLogoVideoProps) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [chosenSrc, setChosenSrc] = useState<string | null>(null);
  /** El usuario congeló el ciclo durante "resting" (el PNG se queda). */
  const [cyclePaused, setCyclePaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  /** Distingue la pausa del usuario (botón) de la del navegador (tab oculto). */
  const pausedByUser = useRef(false);
  /** Reproducciones ya completadas (tope: MAX_PLAYS). */
  const playsDone = useRef(0);
  /** Instante del mount: origen de la cuenta de MIN_STILL_MS. */
  const mountedAt = useRef(0);
  /** Fase actual accesible desde los handlers del <video> sin re-suscribir. */
  const phaseRef = useRef<Phase>(phase);
  phaseRef.current = phase;

  // Decisión única post-mount (no en render: rompería la hidratación).
  useEffect(() => {
    mountedAt.current = Date.now();

    // matchMedia directo (no el hook useReducedMotion: su valor inicial
    // pesimista `true` en el primer flush degradaría a TODOS a "still").
    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Network Information API: no está tipada en lib.dom; cast local mínimo.
    // saveData o una red lenta declarada → ni cargar 2.3MB de video.
    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    const slowNetwork =
      connection?.saveData === true ||
      /(^|-)2g$|^3g$/.test(connection?.effectiveType ?? "");

    if (reducedQuery.matches || slowNetwork) {
      setPhase("still");
      return;
    }

    // Selección de fuente en JS, espejo del algoritmo nativo de <source>
    // (veredicto de investigación — los MIME/codec strings son load-bearing):
    // 1) HEVC-alpha vía MIME "video/quicktime": solo el stack de medios de
    //    Apple lo acepta (Safari macOS/iOS, WebKit de Chrome iOS) y compone
    //    el alfa HEVC desde Safari 13. Chromium y Gecko rechazan el MIME
    //    quicktime por completo — incluso Chrome/Edge 107+ o Firefox 134+
    //    con decoder HEVC por hardware, que reproducirían el .mov pero SIN
    //    transparencia (logo sobre caja negra). NO cambiar a "video/mp4":
    //    con codec completo (hvc1.1.6.L120.B0) Chromium lo aceptaría.
    // 2) VP9-alpha (.webm): Chrome/Edge/Firefox lo componen con alfa. Safari
    //    16+/iOS 17.4+ TAMBIÉN reproducen webm pero sin alfa (caja negra):
    //    por eso el probe de Apple va primero y jamás llega aquí.
    const probe = document.createElement("video");
    const appleHevcStack =
      probe.canPlayType('video/quicktime; codecs="hvc1"') !== "" ||
      probe.canPlayType('video/mp4; codecs="hvc1"') !== "";

    let src: string | null = null;
    if (appleHevcStack) {
      // Sin .mov producido, PNG directo: en el stack Apple el webm
      // renderizaría el logo sobre caja negra — mejor el PNG limpio.
      src = hevcSrc ?? null;
    } else if (probe.canPlayType('video/webm; codecs="vp9"') !== "") {
      src = webmSrc;
    }

    if (!src) {
      setPhase("still");
      return;
    }

    // Si el tab nace oculto (abierto en segundo plano), la formación espera
    // la primera mirada: play() en tabs ocultos es errático (Chrome lo pausa
    // o lo deja pendiente) y dispararía el watchdog sin que nadie viera nada.
    // El PNG ya está en pantalla mientras tanto — esperar es gratis.
    const chosen = src;
    const arm = () => {
      setChosenSrc(chosen);
      setPhase("arming");
    };
    const onFirstSight = () => {
      if (document.visibilityState !== "visible") return;
      document.removeEventListener("visibilitychange", onFirstSight);
      arm();
    };
    if (document.visibilityState === "hidden") {
      document.addEventListener("visibilitychange", onFirstSight);
    } else {
      arm();
    }

    // Guard reactivo: si el usuario activa reduced-motion en pleno vuelo,
    // pausar y degradar con crossfade — cancelando el ciclo entero. "settled"
    // se respeta: el frame congelado ya no se mueve, quitarlo sería castigar
    // sin motivo.
    const onReducedChange = (e: MediaQueryListEvent) => {
      if (!e.matches) return;
      videoRef.current?.pause();
      setPhase((p) => (CANCELABLE.includes(p) ? "still" : p));
    };
    reducedQuery.addEventListener("change", onReducedChange);
    return () => {
      reducedQuery.removeEventListener("change", onReducedChange);
      document.removeEventListener("visibilitychange", onFirstSight);
    };
  }, [hevcSrc, webmSrc]);

  /** Relanza la formación desde el frame 0 (replay del ciclo). */
  const replay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    // El evento "playing" devuelve la fase a "playing" y hace el crossfade.
    video.play().catch(() => setPhase("still"));
  }, []);

  // Arranque: play() inicial + watchdog. Corre al montar el <video> ("arming").
  useEffect(() => {
    if (phase !== "arming") return;
    const video = videoRef.current;
    if (!video) return;

    // React no siempre refleja `muted` como atributo en el HTML servido
    // (react#10389); asegurar la propiedad ANTES de play() para que las
    // políticas de autoplay lo traten como video silenciado.
    video.muted = true;
    video.defaultMuted = true;

    let watchdog = 0;

    // El PNG cobra sus MIN_STILL_MS antes del primer play(). El video ya está
    // precargando (preload="auto"), pero no se reproduce oculto: la formación
    // siempre arranca en el frame 0, justo cuando el crossfade puede revelarla.
    const pending = Math.max(0, MIN_STILL_MS - (Date.now() - mountedAt.current));
    const kickoff = window.setTimeout(() => {
      // El watchdog cuenta desde el intento de play(), no desde el mount: es
      // la gracia que le damos al video para pintar, no a la espera del PNG.
      watchdog = window.setTimeout(() => {
        setPhase((p) => (p === "arming" ? "still" : p));
      }, WATCHDOG_MS);

      // play() explícito con catch: iOS Low Power Mode y "Never Auto-Play"
      // de macOS rechazan con NotAllowedError → el PNG simplemente se queda.
      video.play().catch(() => {
        setPhase((p) => (p === "arming" ? "still" : p));
      });
    }, pending);

    // Cleanup completo: HMR/StrictMode montan doble.
    return () => {
      window.clearTimeout(kickoff);
      window.clearTimeout(watchdog);
    };
  }, [phase]);

  // Reposo entre reproducciones: el PNG respira REST_MS y vuelve el video.
  // Sin watchdog — el clip ya está cargado; si play() fallara, el catch degrada.
  useEffect(() => {
    if (phase !== "resting" || cyclePaused) return;

    // Relanzar con el tab oculto es tirar el replay a la basura (Chrome pausa
    // el video y throttlea el timer): se espera a la primera mirada, igual que
    // en el arranque. El PNG está en pantalla mientras tanto.
    const onVisibleReplay = () => {
      if (document.visibilityState !== "visible") return;
      document.removeEventListener("visibilitychange", onVisibleReplay);
      replay();
    };

    const timer = window.setTimeout(() => {
      if (document.visibilityState === "hidden") {
        document.addEventListener("visibilitychange", onVisibleReplay);
      } else {
        replay();
      }
    }, REST_MS);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisibleReplay);
    };
  }, [phase, cyclePaused, replay]);

  // Chrome pausa los videos muteados al ocultarse el tab (ahorro de energía):
  // al volver a ser visible, reanudar — salvo que la pausa haya sido del
  // usuario, cuya decisión se respeta. En "resting" el video está `ended`
  // (o buscando el frame 0), así que este efecto no lo toca: de ese relanzado
  // se encarga el efecto de reposo.
  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState !== "visible") return;
      const video = videoRef.current;
      if (video && video.paused && !video.ended && !pausedByUser.current) {
        video
          .play()
          .catch(() => setPhase((p) => (CANCELABLE.includes(p) ? "still" : p)));
      }
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, []);

  /** Toggle de pausa (WCAG 2.2.2 — Pause, Stop, Hide: el ciclo dura >5s). */
  const togglePause = () => {
    const video = videoRef.current;
    if (!video) return;
    if (phase === "playing") {
      pausedByUser.current = true;
      video.pause();
      setPhase("paused");
    } else if (phase === "paused") {
      pausedByUser.current = false;
      // El propio evento "playing" devuelve la fase a "playing".
      video.play().catch(() => setPhase("still"));
    } else if (phase === "resting") {
      if (cyclePaused) {
        // Reanudar no hace esperar otro REST_MS: el usuario ya pidió ver más.
        setCyclePaused(false);
        replay();
      } else {
        // Congela el ciclo sobre el PNG: el efecto de reposo cancela su timer.
        setCyclePaused(true);
      }
    }
  };

  const videoMounted = chosenSrc !== null && VIDEO_PHASES.includes(phase);
  const videoVisible = VIDEO_VISIBLE.includes(phase);
  /** El ciclo está en marcha: hay algo que pausar y la sombra no se rasteriza. */
  const cycling =
    phase === "playing" || phase === "paused" || phase === "resting";
  /** El botón ofrece "reanudar" (ciclo detenido por el usuario). */
  const showResume = phase === "paused" || (phase === "resting" && cyclePaused);

  // Sombra roja del wrapper, gobernada por fase (evita re-rasterizar un blur de
  // 80px en cada frame del video):
  // - "settled": se ENCIENDE una sola vez (animate-settle-shadow, forwards) con
  //   el frame ya congelado — es el nuevo "bloom", sin rojo tras el cuerpo.
  // - ciclo en marcha (playing/paused/resting): SIN filter alguno.
  // - idle/arming/still: sombra estática, como el reposo de siempre.
  const wrapperShadow =
    phase === "settled"
      ? "animate-settle-shadow"
      : cycling
        ? ""
        : "drop-shadow-[0_30px_80px_rgba(217,40,26,0.18)]";

  return (
    // data-phase: observabilidad de la máquina de estados (QA/e2e).
    <div data-phase={phase} className={`relative ${className}`}>
      {/*
        Capa visual (PNG + video) como role="img": sus hijos son
        presentacionales para AT, por eso el botón de pausa vive FUERA,
        como hermano — un control dentro de role="img" sería invisible
        para lectores de pantalla.
        El drop-shadow (deriva del alfa del contenido) se gestiona por fase en
        `wrapperShadow`: nada de filter mientras el ciclo corre (re-rasterizar
        un blur de 80px 30 veces por segundo es puro costo GPU) y se enciende
        una sola vez al asentarse el logo.
      */}
      <div
        role="img"
        aria-label={alt}
        className={`relative ${wrapperShadow}`}
      >
        {/*
          Capa base y fallback universal, y ÚNICO hijo en flujo: su tamaño
          intrínseco (width/height + w-full h-auto) define el box de todo el
          componente — el video (hermano absoluto) se calza a él.
          (Con todos los hijos en absoluto, el ancho colapsa a 0 dentro del
          flex shrink-to-fit del hero.) SSR + priority → el isótopo pinta de
          inmediato (candidato LCP, como el <Image priority> original) y los
          caminos sin video (no-JS, reduced motion, red lenta, autoplay
          denegado, error) ya lo tienen en pantalla sin pedir nada más.
          En el camino video solo se atenúa (opacity), nunca sale del flujo:
          es también el frame de reposo entre reproducciones ("resting").
        */}
        <Image
          src={stillSrc}
          alt=""
          width={width}
          height={height}
          priority
          sizes={sizes}
          className={`h-auto w-full transition-opacity duration-500 ease-out ${
            videoVisible ? "opacity-0" : "opacity-100"
          }`}
        />

        {/*
          Sin loop y sin poster: el ciclo lo gobierna la máquina de estados
          (onEnded → "resting" → replay, hasta MAX_PLAYS), no el atributo
          nativo — loop no permite el reposo sobre el PNG ni el tope. Al
          terminar la última pasada ("settled") el video queda congelado en
          su último frame: el logo formado en reposo.
          Sin atributo autoPlay: play() lo dispara el efecto de arranque y
          el crossfade PNG→video ocurre recién con "playing" (frames
          reales en pantalla), nunca por optimismo. Los handlers van como
          props (no addEventListener en el efecto de "arming"): también
          deben cubrir la reanudación tras pausa y los replays, cuando ese
          efecto ya hizo cleanup.
        */}
        {videoMounted && (
          <video
            ref={videoRef}
            src={chosenSrc}
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
            aria-hidden="true"
            onPlaying={() =>
              setPhase((p) =>
                p === "arming" || p === "paused" || p === "resting"
                  ? "playing"
                  : p,
              )
            }
            onPause={() => {
              // Sincroniza pausas ajenas (navegador con tab oculto). El
              // "pause" previo a "ended" no cuenta: ended ya es true ahí.
              const video = videoRef.current;
              if (video && !video.ended) {
                setPhase((p) => (p === "playing" ? "paused" : p));
              }
            }}
            onEnded={() => {
              // También desde "paused": si el navegador pausó en el borde
              // final, el orden pause→ended puede llegar con fase ya sincro.
              const p = phaseRef.current;
              if (p !== "playing" && p !== "paused") return;
              playsDone.current += 1;
              if (playsDone.current < MAX_PLAYS) {
                // Quedan pasadas: de vuelta al PNG a tomar aire. El crossfade
                // de 500ms disimula el salto de brillo/escala del corte.
                setPhase("resting");
              } else {
                // La sombra roja se enciende sola vía CSS (animate-settle-shadow).
                setPhase("settled");
              }
            }}
            onError={() =>
              setPhase((p) => (CANCELABLE.includes(p) ? "still" : p))
            }
            className={`pointer-events-none absolute inset-0 h-full w-full object-contain transition-opacity duration-500 ease-out ${
              videoVisible ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
      </div>

      {/*
        Control de pausa (WCAG 2.2.2): visible mientras el ciclo está en marcha
        —incluidos los reposos sobre el PNG, donde el replay sigue pendiente—
        y desaparece cuando el logo se asienta. Objetivo táctil de 32px
        (≥24px de 2.5.8 AA).
      */}
      {cycling && (
        <button
          type="button"
          onClick={togglePause}
          aria-label={
            showResume
              ? "Reanudar la animación del logotipo"
              : "Pausar la animación del logotipo"
          }
          className={`absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-pill border border-white/15 bg-ink/60 text-white/70 backdrop-blur-sm transition-opacity duration-300 hover:text-white focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:bottom-3 md:right-3 ${
            showResume ? "opacity-100" : "opacity-60 hover:opacity-100"
          }`}
        >
          {showResume ? (
            <svg aria-hidden="true" width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
              <path d="M1.5 0.5 L9.5 5 L1.5 9.5 Z" />
            </svg>
          ) : (
            <svg aria-hidden="true" width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
              <rect x="1" y="0.5" width="2.6" height="9" rx="0.6" />
              <rect x="6.4" y="0.5" width="2.6" height="9" rx="0.6" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
}
