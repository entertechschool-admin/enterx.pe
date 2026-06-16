"use client";

import { useEffect, useRef } from "react";
import Reveal from "reveal.js";

/**
 * Deck reveal.js de la masterclass "IA Agéntica 2026: de lo simple a lo complejo".
 * Contenido literal de PLAN_MASTERCLASS.md (las frases entre comillas son voz de
 * Bruno, intocables). Branding EnterX aplicado vía ./deck.css.
 *
 * Revelado progresivo (fragments) reservado a 4 momentos clave:
 *   1) definiciones de los 9 conceptos (1→9)
 *   2) los 3 pasos del diagrama de la demo
 *   3) la columna SDD frente a Vibe Coding
 *   4) los 4 pasos del loop de calidad
 * Todo lo demás entra de golpe (sobrio por defecto).
 */
export default function Deck() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const deck = new Reveal(ref.current, {
      hash: true,
      transition: "fade",
      transitionSpeed: "default",
      controls: true,
      progress: true,
      // center:false → el contenido no flota centrado verticalmente; cada slide
      // usa su propio layout de altura completa (ver .slides section en deck.css),
      // así llena la pantalla en vez de quedar en una franja media.
      center: false,
      // Tamaño de diseño pensado para Zoom a pantalla compartida (16:9, alta
      // resolución de diseño → la tipografía en em rinde más grande en pantalla).
      width: 1600,
      height: 900,
      margin: 0.04,
      minScale: 0.2,
      maxScale: 2.0,
    });

    deck.initialize().then(() => {
      // En el primer frame el contenedor ya tiene su altura del CSS; recalcular
      // layout evita que reveal quede clavado en minScale (slides diminutos).
      // Disparar 'resize' fuerza el camino interno estable de reveal
      // (onWindowResize → layout + re-sync de estados present/past/future), que
      // corrige el apilamiento inicial — sin esto, con height fijo en las
      // section, varias slides adyacentes quedan visibles apiladas hasta el
      // primer resize manual. (deck.sync()/deck.slide() lanzan justo tras
      // initialize en reveal 6 porque iteran estructuras aún no pobladas.)
      requestAnimationFrame(() => {
        deck.layout();
        window.dispatchEvent(new Event("resize"));
      });
    });

    // Recalcula la escala al cambiar el tamaño de ventana (clave en Zoom).
    const onResize = () => deck.layout();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      deck.destroy();
    };
  }, []);

  return (
    <div className="reveal masterclass-deck" ref={ref}>
      <div className="slides">
        {/* ───────── 1 · TÍTULO ───────── */}
        <section className="mc-spread" data-background-color="#0D0D0D">
          <p className="mc-kicker">
            <span className="mc-accent">MASTERCLASS</span>
            <span className="mc-dash" aria-hidden>
              —
            </span>
            <span className="mc-mute">EN VIVO · 1 HORA</span>
          </p>
          <h1 className="mc-h1">
            IA Agéntica <span className="mc-accent">2026</span>
          </h1>
          <p className="mc-lead">De lo simple a lo complejo.</p>
          <p className="mc-brand-line">
            Enter Tech School · <span className="mc-accent">EnterX</span> ·
            respaldo CETEMIN
          </p>
        </section>

        {/* ───────── 2 · AGENDA ───────── */}
        <section className="mc-spread" data-background-color="#0D0D0D">
          <p className="mc-kicker">
            <span className="mc-accent">00</span>
            <span className="mc-dash" aria-hidden>
              —
            </span>
            <span className="mc-mute">AGENDA</span>
          </p>
          <h2 className="mc-h2">La hora, en tres bloques</h2>
          <ol className="mc-agenda">
            <li>
              <span className="mc-agenda-num">01</span>
              <span className="mc-agenda-body">
                <strong>El idioma</strong> — 9 conceptos clave de la IA agéntica.
              </span>
            </li>
            <li>
              <span className="mc-agenda-num">02</span>
              <span className="mc-agenda-body">
                <strong>La demo</strong> — un agente que pasa de cero a ejecutar,
                en vivo.
              </span>
            </li>
            <li>
              <span className="mc-agenda-num">03</span>
              <span className="mc-agenda-body">
                <strong>La mentalidad</strong> — cómo pensar para sacarle lo mejor.
              </span>
            </li>
          </ol>
        </section>

        {/* ───────── 3 · BLOQUE 1: 9 CONCEPTOS (grid 3×3, revelado #1) ───────── */}
        <section className="mc-fill" data-background-color="#0D0D0D">
          <p className="mc-kicker">
            <span className="mc-accent">BLOQUE 1</span>
            <span className="mc-dash" aria-hidden>
              —
            </span>
            <span className="mc-mute">VOCABULARIO</span>
          </p>
          <h2 className="mc-h2">9 palabras que cambian el juego</h2>
          <p className="mc-sub">
            El idioma de la IA agéntica, de lo simple a lo complejo.
          </p>

          <div className="mc-grid" role="list">
            {/* 1 · LLM */}
            <article className="mc-card" role="listitem">
              <header className="mc-card-head">
                <span className="mc-card-num">1</span>
                <h3 className="mc-card-term">LLM</h3>
                <span className="mc-card-en">Large Language Model</span>
              </header>
              <p className="mc-card-def fragment" data-fragment-index={0}>
                El “cerebro” que predice texto: razona, redacta, resume, traduce.
                <em>
                  Por sí solo, solo genera palabras — no toca el mundo todavía.
                </em>
              </p>
            </article>

            {/* 2 · Token */}
            <article className="mc-card" role="listitem">
              <header className="mc-card-head">
                <span className="mc-card-num">2</span>
                <h3 className="mc-card-term">Token</h3>
              </header>
              <p className="mc-card-def fragment" data-fragment-index={1}>
                La unidad mínima que el modelo lee y escribe (≈ ¾ de una palabra).
                <em>
                  Es lo que se mide y se cobra. Son las sílabas con las que el
                  modelo piensa.
                </em>
              </p>
            </article>

            {/* 3 · Prompt */}
            <article className="mc-card" role="listitem">
              <header className="mc-card-head">
                <span className="mc-card-num">3</span>
                <h3 className="mc-card-term">Prompt</h3>
              </header>
              <p className="mc-card-def fragment" data-fragment-index={2}>
                La instrucción que le das al modelo. Tu forma de pedir define lo
                que obtienes.
                <em>
                  No es “hablarle bonito”: es especificar bien. Aquí empieza todo.
                </em>
              </p>
            </article>

            {/* 4 · Tool */}
            <article className="mc-card" role="listitem">
              <header className="mc-card-head">
                <span className="mc-card-num">4</span>
                <h3 className="mc-card-term">Tool</h3>
                <span className="mc-card-en">Herramienta</span>
              </header>
              <p className="mc-card-def fragment" data-fragment-index={3}>
                Una capacidad concreta que el modelo puede invocar: enviar un
                correo, leer una hoja, crear un evento.
                <em>Le pone manos al cerebro.</em>
              </p>
            </article>

            {/* 5 · Agente */}
            <article className="mc-card" role="listitem">
              <header className="mc-card-head">
                <span className="mc-card-num">5</span>
                <h3 className="mc-card-term">Agente</h3>
              </header>
              <p className="mc-card-def fragment" data-fragment-index={4}>
                Un LLM que decide, usa una tool, mira el resultado y vuelve a
                decidir — en bucle — hasta cumplir un objetivo.
                <em>
                  No solo responde: actúa. Es la diferencia entre un consejo y un
                  asistente que ejecuta.
                </em>
              </p>
            </article>

            {/* 6 · MCP */}
            <article className="mc-card" role="listitem">
              <header className="mc-card-head">
                <span className="mc-card-num">6</span>
                <h3 className="mc-card-term">MCP</h3>
                <span className="mc-card-en">Model Context Protocol</span>
              </header>
              <p className="mc-card-def fragment" data-fragment-index={5}>
                El estándar para conectar el agente a tus apps (Gmail, CRM, Slack)
                sin programar integraciones a medida.
                <em>Es el “USB-C” de la IA: un solo enchufe para todo.</em>
              </p>
            </article>

            {/* 7 · Skill */}
            <article className="mc-card" role="listitem">
              <header className="mc-card-head">
                <span className="mc-card-num">7</span>
                <h3 className="mc-card-term">Skill</h3>
                <span className="mc-card-en">Habilidad</span>
              </header>
              <p className="mc-card-def fragment" data-fragment-index={6}>
                Un procedimiento empaquetado y reutilizable (instrucciones + pasos)
                que el agente carga cuando lo necesita.
                <em>
                  Como un “manual de la empresa” que el agente sabe ejecutar al pie
                  de la letra.
                </em>
              </p>
            </article>

            {/* 8 · CLI */}
            <article className="mc-card" role="listitem">
              <header className="mc-card-head">
                <span className="mc-card-num">8</span>
                <h3 className="mc-card-term">CLI</h3>
                <span className="mc-card-en">Command-Line Interface</span>
              </header>
              <p className="mc-card-def fragment" data-fragment-index={7}>
                La terminal: operar las apps por texto, sin clics ni mouse.
                <em>
                  Rápido, automatizable y encadenable — el agente trabaja a la
                  velocidad de la máquina.
                </em>
              </p>
            </article>

            {/* 9 · Harness (destacado, cierre del bloque) */}
            <article className="mc-card mc-card--feature" role="listitem">
              <header className="mc-card-head">
                <span className="mc-card-num">9</span>
                <h3 className="mc-card-term">Harness</h3>
                <span className="mc-card-en">Andamiaje</span>
              </header>
              <p className="mc-card-def fragment" data-fragment-index={8}>
                El entorno que envuelve al modelo y le da memoria, permisos,
                herramientas y límites.
                <em>
                  Es lo que convierte un chat en un copiloto que trabaja de verdad.{" "}
                  <strong>Claude Code es un harness.</strong>
                </em>
              </p>
            </article>
          </div>
        </section>

        {/* ───────── 4 · BLOQUE 2: PORTADA + DIAGRAMA 3 PASOS (revelado #2) ───────── */}
        <section className="mc-spread" data-background-color="#0D0D0D">
          <p className="mc-kicker">
            <span className="mc-accent">BLOQUE 2</span>
            <span className="mc-dash" aria-hidden>
              —
            </span>
            <span className="mc-mute">DEMO EN VIVO</span>
          </p>
          <h2 className="mc-h2">De una carpeta vacía a un sistema que ejecuta</h2>
          <p className="mc-sub">Tres prompts. En vivo. Sin red.</p>

          <div className="mc-steps">
            <div className="mc-step fragment" data-fragment-index={0}>
              <span className="mc-step-num">①</span>
              <h4 className="mc-step-title">¿Qué tienes?</h4>
              <p className="mc-step-desc">
                Comprobar herramientas
                <br />
                (gws-cli, skills, MCPs)
              </p>
            </div>
            <span className="mc-step-arrow fragment" data-fragment-index={1} aria-hidden>
              →
            </span>
            <div className="mc-step fragment" data-fragment-index={1}>
              <span className="mc-step-num">②</span>
              <h4 className="mc-step-title">¿Hasta dónde llegas?</h4>
              <p className="mc-step-desc">
                Primer avance acotado
                <br />
                (alcance, qué puede hacer)
              </p>
            </div>
            <span className="mc-step-arrow fragment" data-fragment-index={2} aria-hidden>
              →
            </span>
            <div className="mc-step mc-step--feature fragment" data-fragment-index={2}>
              <span className="mc-step-num">③</span>
              <h4 className="mc-step-title">La tarea completa</h4>
              <p className="mc-step-desc">Ejecución end-to-end</p>
            </div>
          </div>
        </section>

        {/* ───────── 5 · PLACEHOLDER DEMO EN VIVO ───────── */}
        <section data-background-color="#0D0D0D" className="mc-demo-slide">
          <p className="mc-kicker mc-kicker--center">
            <span className="mc-mute">COMPARTO LA TERMINAL</span>
          </p>
          <h2 className="mc-demo-title">
            DEMO <span className="mc-accent">EN VIVO</span>
          </h2>
          <p className="mc-sub mc-sub--center">
            Salgo de los slides. Construimos el sistema en la terminal.
          </p>
        </section>

        {/* ───────── 6 · PREGUNTAS FRECUENTES ───────── */}
        <section className="mc-fill" data-background-color="#0D0D0D">
          <p className="mc-kicker">
            <span className="mc-mute">PREGUNTAS</span>
          </p>
          <h2 className="mc-h2">Lo que casi siempre preguntan</h2>
          <dl className="mc-faq">
            <div className="mc-faq-item">
              <dt>¿No alucina / se inventa cosas?</dt>
              <dd>
                Puede equivocarse. Por eso el sistema nunca inventa negocio: lo que
                no está validado queda en blanco y se marca “por validar”. Y siempre
                hay aprobación humana antes de escribir.
              </dd>
            </div>
            <div className="mc-faq-item">
              <dt>¿Es seguro con mis datos?</dt>
              <dd>
                El agente propone, tú apruebas, él ejecuta. No escribe en tu CRM ni
                manda correos sin tu OK. Los secretos nunca salen del entorno.
              </dd>
            </div>
            <div className="mc-faq-item">
              <dt>¿Necesito saber programar?</dt>
              <dd>
                No para usarlo. Le hablas en español. Programar ayuda a construir las
                skills una vez; usarlas, no.
              </dd>
            </div>
            <div className="mc-faq-item">
              <dt>¿Esto reemplaza a mi equipo?</dt>
              <dd>
                No. Quita el trabajo mecánico (cotizar, agendar, reportar) para que
                tu equipo piense. Es copiloto, no piloto.
              </dd>
            </div>
          </dl>
        </section>

        {/* ───────── 7 · BLOQUE 3: VIBE vs SDD (revelado #3) ───────── */}
        <section className="mc-spread" data-background-color="#0D0D0D">
          <p className="mc-kicker">
            <span className="mc-accent">BLOQUE 3</span>
            <span className="mc-dash" aria-hidden>
              —
            </span>
            <span className="mc-mute">MENTALIDAD</span>
          </p>
          <h2 className="mc-h2">Vibe Coding vs SDD</h2>

          <div className="mc-contrast">
            <div className="mc-col">
              <h3 className="mc-col-title">Vibe Coding</h3>
              <ul className="mc-col-list">
                <li>Improvisar: pedir algo vago, ver qué sale, re-pedir.</li>
                <li>Iterar a ciegas. Muchos intentos.</li>
                <li>Como darle instrucciones sueltas a un nuevo empleado.</li>
                <li>Rápido para jugar. Frustrante para producir.</li>
              </ul>
            </div>
            <span className="mc-contrast-arrow fragment" data-fragment-index={0} aria-hidden>
              →
            </span>
            <div className="mc-col mc-col--feature fragment" data-fragment-index={0}>
              <h3 className="mc-col-title">
                SDD <span className="mc-col-en">Spec-Driven Development</span>
              </h3>
              <ul className="mc-col-list">
                <li>Especificar bien primero, luego el agente ejecuta.</li>
                <li>
                  Casi de un solo tiro (<strong>one-shot</strong>).
                </li>
                <li>Como entregarle un brief claro y dejarlo trabajar.</li>
                <li>Más lento al inicio, mucho mejor resultado.</li>
              </ul>
            </div>
          </div>

          <p className="mc-anchor fragment" data-fragment-index={1}>
            “La IA no premia al que más teclea. Premia al que piensa más claro.”
          </p>
        </section>

        {/* ───────── 8a · META-PROMPTING ───────── */}
        <section className="mc-spread" data-background-color="#0D0D0D">
          <p className="mc-kicker">
            <span className="mc-mute">MENTALIDAD · META-PROMPTING</span>
          </p>
          <h2 className="mc-h2">Mejora tu propio prompt</h2>
          <p className="mc-sub">
            Antes de pedirle que ejecute, pídele que mejore tu pedido.
          </p>
          <blockquote className="mc-quote">
            “Antes de hacerlo, dime: ¿qué te falta saber para hacer esto
            excelente?”
          </blockquote>
          <p className="mc-note">
            El agente expone los huecos de tu instrucción antes de gastar esfuerzo
            en la dirección equivocada. El agente como copiloto de tu propio
            pensamiento.
          </p>
        </section>

        {/* ───────── 8b · META-PLANNING + LOOP (revelado #4) ───────── */}
        <section className="mc-spread" data-background-color="#0D0D0D">
          <p className="mc-kicker">
            <span className="mc-mute">MENTALIDAD · META-PLANNING</span>
          </p>
          <h2 className="mc-h2">Planea el plan antes de tocar nada</h2>
          <p className="mc-sub">
            Primero un plan; lo revisas y apruebas; recién entonces se ejecuta. Nada
            a ciegas. <em>Este mismo brief se hizo así.</em>
          </p>

          <div className="mc-loop">
            <div className="mc-loop-step fragment" data-fragment-index={0}>
              Hipótesis
            </div>
            <span className="mc-loop-arrow fragment" data-fragment-index={1} aria-hidden>
              →
            </span>
            <div className="mc-loop-step fragment" data-fragment-index={1}>
              Alternativas
            </div>
            <span className="mc-loop-arrow fragment" data-fragment-index={2} aria-hidden>
              →
            </span>
            <div className="mc-loop-step fragment" data-fragment-index={2}>
              Confirmación
            </div>
            <span className="mc-loop-arrow fragment" data-fragment-index={3} aria-hidden>
              →
            </span>
            <div className="mc-loop-step mc-loop-step--feature fragment" data-fragment-index={3}>
              Ejecutar
            </div>
          </div>

          <p className="mc-anchor">
            “Vibe coding para explorar. SDD para producir. El que mejor especifica,
            gana — y especificar es pensar claro, no programar.”
          </p>
        </section>

        {/* ───────── 9 · CIERRE + CTA ───────── */}
        <section className="mc-spread" data-background-color="#0D0D0D">
          <p className="mc-kicker">
            <span className="mc-mute">CIERRE</span>
          </p>
          <h2 className="mc-h2">Lo que te llevas</h2>
          <ol className="mc-recap">
            <li>Aprendiste el idioma (9 conceptos).</li>
            <li>Viste un agente trabajar de verdad.</li>
            <li>
              Te llevas la mentalidad (<strong>especificar &gt; teclear</strong>).
            </li>
          </ol>
          <p className="mc-cta-line">
            Tu tarea: identifica <span className="mc-accent">una</span> rutina
            repetitiva de tu negocio esta semana. Esa es tu primera skill.
          </p>
          <p className="mc-final">
            “La IA no te va a reemplazar. Te va a reemplazar quien sepa usarla.
            Empieza simple.”
          </p>
          <p className="mc-brand-line">
            Enter Tech School · <span className="mc-accent">EnterX</span> ·
            enterx.pe · respaldo CETEMIN
          </p>
        </section>
      </div>
    </div>
  );
}
