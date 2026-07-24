"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { buildWhatsappUrl, EMAIL } from "@/lib/site";

type Screen = "intro" | "quiz" | "results";

const QUESTIONS = [
  {
    q: "¿Cómo usa tu equipo la IA hoy?",
    opts: ["Cada quien prueba por su cuenta", "La usamos para tareas puntuales", "Tenemos flujos y plantillas definidas"],
  },
  {
    q: "¿La IA conoce la información de tu empresa?",
    opts: ["No, solo lo que escribimos al momento", "Copiamos y pegamos información a mano", "Está conectada a nuestros documentos"],
  },
  {
    q: "¿Cuánto supervisan lo que hace?",
    opts: ["Revisamos cada respuesta línea por línea", "La usamos como borrador editable", "Completa tareas solas, sin supervisión constante"],
  },
  {
    q: "¿Sus herramientas de IA se conectan entre sí?",
    opts: ["Usamos solo una, de forma aislada", "Varias, pero cada una por separado", "Algunas ya se conectan entre sí"],
  },
  {
    q: "¿Miden el impacto de usar IA?",
    opts: ["No lo medimos", 'Sentimos que "ahorra tiempo", sin números', "Medimos tiempo o calidad ganada"],
  },
  {
    q: "¿Qué tan extendido está el uso en tu equipo?",
    opts: ["1 o 2 personas curiosas, por su cuenta", "Algunas áreas, sin lineamientos comunes", "Buena parte del equipo, con criterio"],
  },
];

const LEVELS = [
  {
    n: 1, name: "Prompts básicos", tech: "LLMs", resultado: "Ahorro de tiempo", min: 6, max: 9,
    desc: 'Tu equipo ya dio el primer paso con IA — como <strong>6 de cada 10</strong> profesionales hoy. El siguiente salto: método y contexto propio.',
  },
  {
    n: 2, name: "Prompt & Context Engineering", tech: "RAG", resultado: "Precisión y calidad", min: 10, max: 14,
    desc: 'Ya trabajan con método y contexto propio — están en camino al salto real. El siguiente nivel: que la IA no solo responda, <strong>que actúe</strong>.',
  },
  {
    n: 3, name: "Agentes de IA", tech: "MCP", resultado: "Autonomía competitiva", min: 15, max: 18,
    desc: 'Cruzaron la barrera que solo el <strong>5% de los profesionales</strong> alcanza: la IA ya ejecuta, no solo asiste.',
  },
];

const CIRC = 2 * Math.PI * 52;

function computeLevel(answers: (number | null)[]) {
  const score = answers.reduce<number>((a, b) => a + (b ?? 0), 0);
  const level = LEVELS.find((l) => score >= l.min && score <= l.max) ?? LEVELS[LEVELS.length - 1];
  return level;
}

type DiagnosticoProps = {
  /**
   * Botón secundario del resultado, junto al de WhatsApp.
   * "home"  — link a la portada (uso en la página sola /diagnostico).
   * "email" — mailto (uso incrustado en el home: ya está en la portada,
   *           un link a "/" sería circular).
   */
  secondaryCta?: "home" | "email";
};

export default function Diagnostico({ secondaryCta = "home" }: DiagnosticoProps) {
  const [screen, setScreen] = useState<Screen>("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(QUESTIONS.length).fill(null));
  const [displayedNum, setDisplayedNum] = useState(0);

  const rootRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const ringFgRef = useRef<SVGCircleElement>(null);

  const level = computeLevel(answers);

  // Partículas flotantes — se generan una vez, en el cliente.
  useEffect(() => {
    const host = particlesRef.current;
    if (!host) return;
    const count = window.innerWidth < 560 ? 12 : 20;
    const nodes: HTMLDivElement[] = [];
    for (let i = 0; i < count; i++) {
      const p = document.createElement("div");
      p.className = "particle";
      const size = 2 + Math.random() * 3.5;
      p.style.left = Math.random() * 100 + "%";
      p.style.width = size + "px";
      p.style.height = size + "px";
      p.style.setProperty("--dur", 13 + Math.random() * 14 + "s");
      p.style.setProperty("--delay", -Math.random() * 26 + "s");
      p.style.setProperty("--drift", Math.random() * 90 - 45 + "px");
      host.appendChild(p);
      nodes.push(p);
    }
    return () => nodes.forEach((n) => n.remove());
  }, []);

  // Fondo + tarjeta + spotlight reaccionando al cursor (desktop, sin reduced-motion).
  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const canHover = window.matchMedia?.("(hover: hover)").matches;
    if (reduce || !canHover) return;

    const root = rootRef.current;
    const bg = bgRef.current;
    const dust = particlesRef.current;
    const card = cardRef.current;
    const spot = spotRef.current;
    if (!root || !bg || !dust || !card || !spot) return;

    let targetX = 0, targetY = 0, curX = 0, curY = 0;
    // Posición del "foco" relativa a .diag-root (no a la ventana): así funciona
    // igual sola o incrustada más abajo en una página larga (home).
    let mouseX = 0, mouseY = 0, spotX = 0, spotY = 0;
    let raf = 0;

    function onMouseMove(e: MouseEvent) {
      targetX = e.clientX / window.innerWidth - 0.5;
      targetY = e.clientY / window.innerHeight - 0.5;

      const rootRect = root!.getBoundingClientRect();
      mouseX = e.clientX - rootRect.left;
      mouseY = e.clientY - rootRect.top;
      spot!.classList.add("on");

      const r = card!.getBoundingClientRect();
      const mx = ((e.clientX - r.left) / r.width) * 100;
      const my = ((e.clientY - r.top) / r.height) * 100;
      const inside = mx >= -5 && mx <= 105 && my >= -5 && my <= 105;
      card!.classList.toggle("spot", inside);
      if (inside) {
        card!.style.setProperty("--mx", mx + "%");
        card!.style.setProperty("--my", my + "%");
      }
    }
    function onMouseLeave() {
      spot!.classList.remove("on");
    }

    function loop() {
      curX += (targetX - curX) * 0.06;
      curY += (targetY - curY) * 0.06;
      bg!.style.transform = `translate3d(${curX * 90}px,${curY * 90}px,0)`;
      dust!.style.transform = `translate3d(${curX * 150}px,${curY * 150}px,0)`;
      card!.style.transform = `rotateX(${curY * -11}deg) rotateY(${curX * 11}deg)`;

      spotX += (mouseX - spotX) * 0.14;
      spotY += (mouseY - spotY) * 0.14;
      spot!.style.transform = `translate3d(${spotX}px,${spotY}px,0)`;

      raf = requestAnimationFrame(loop);
    }

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Al entrar a resultados: cuenta el número y llena el aro.
  useEffect(() => {
    if (screen !== "results") return;
    let cur = 0;
    setDisplayedNum(0);
    const target = level.n;
    const iv = target <= 1 ? null : setInterval(() => {
      cur++;
      setDisplayedNum(cur);
      if (cur >= target) clearInterval(iv!);
    }, 180);
    if (target <= 1) setDisplayedNum(target);

    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => {
        if (ringFgRef.current) {
          ringFgRef.current.style.strokeDashoffset = String(CIRC * (1 - level.n / 3));
        }
      });
      return () => cancelAnimationFrame(raf2);
    });

    return () => {
      if (iv) clearInterval(iv);
      cancelAnimationFrame(raf1);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen]);

  function startQuiz() {
    setScreen("quiz");
  }

  function selectOption(val: number) {
    const next = [...answers];
    next[current] = val;
    setAnswers(next);
    setTimeout(() => {
      if (current < QUESTIONS.length - 1) {
        setCurrent((c) => c + 1);
      } else {
        setTimeout(() => setScreen("results"), 150);
      }
    }, 280);
  }

  function goBack() {
    if (current > 0) setCurrent((c) => c - 1);
  }

  function restart() {
    setCurrent(0);
    setAnswers(new Array(QUESTIONS.length).fill(null));
    if (ringFgRef.current) ringFgRef.current.style.strokeDashoffset = String(CIRC);
    setScreen("intro");
  }

  const waUrl = buildWhatsappUrl(
    `Hola, acabo de hacer el Diagnóstico de Madurez en IA de EnterX y obtuve Nivel ${level.n} — ${level.name}. Me gustaría conversar sobre los siguientes pasos.`
  );

  const item = QUESTIONS[current];

  return (
    <div className="diag-root" ref={rootRef}>
      <div className="bg-fixed" ref={bgRef}>
        <div className="aurora" />
        <div className="glow1" />
        <div className="glow2" />
        <div className="glow3" />
        <div className="glow4" />
        <div className="grid" />
        <div className="grain" />
      </div>
      <div className="particles" ref={particlesRef} />
      <div className="cursor-spot" ref={spotRef} />
      {/* Funde los bordes sup./inf. a negro para que los brillos emerjan del
          negro y se disuelvan en negro — sin corte seco al entrar/salir. */}
      <div className="edge-fade" aria-hidden />

      <div className="card" ref={cardRef}>
        <div className="pad">

          {/* INTRO */}
          <section id="intro" className={"screen" + (screen === "intro" ? " active" : "")}>
            <div className="stagger">
              <div className="chips">
                <span className="chip">
                  <svg className="ic" viewBox="0 0 24 24" fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>
                  2 min
                </span>
                <span className="chip">
                  <svg className="ic" viewBox="0 0 24 24" fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="1" /></svg>
                  Nivel 1–3
                </span>
                <span className="chip">
                  <svg className="ic" viewBox="0 0 24 24" fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="10" width="16" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>
                  Sin registro
                </span>
              </div>
              <h1>¿En qué nivel de <span className="grad">madurez de IA</span> está tu equipo?</h1>
              <p className="lede">6 preguntas rápidas. Resultado inmediato.</p>
              <button className="btn-primary" onClick={startQuiz}>
                Empezar diagnóstico
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </button>
            </div>
          </section>

          {/* QUIZ */}
          <section id="quiz" className={"screen" + (screen === "quiz" ? " active" : "")}>
            <div className="dash-row">
              {QUESTIONS.map((_, i) => (
                <div key={i} className={"dash" + (answers[i] !== null ? " done" : i === current ? " current" : "")} />
              ))}
            </div>
            <div className="q-meta">Pregunta {current + 1} de {QUESTIONS.length}</div>
            <h2>{item.q}</h2>
            <div className="options">
              {item.opts.map((label, i) => {
                const val = i + 1;
                const selected = answers[current] === val;
                return (
                  <button key={i} type="button" className={"opt" + (selected ? " selected" : "")} onClick={() => selectOption(val)}>
                    <span className="bars">
                      {[1, 2, 3].map((b) => (
                        <i key={b} className={val >= b ? "fill" : ""} />
                      ))}
                    </span>
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>
            <div className="quiz-nav">
              <button className={"btn-back" + (current > 0 ? " show" : "")} onClick={goBack}>
                <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6" /></svg>
                Anterior
              </button>
            </div>
          </section>

          {/* RESULTS */}
          <section id="results" className={"screen" + (screen === "results" ? " active" : "")}>
            <div className="rhead">
              <div className="ring-wrap">
                <div className="ring-glow" />
                <svg viewBox="0 0 120 120">
                  <defs>
                    <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ff7a86" />
                      <stop offset="100%" stopColor="#d9281a" />
                    </linearGradient>
                  </defs>
                  <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth={9} />
                  <circle
                    ref={ringFgRef}
                    className="ring-fg"
                    cx="60" cy="60" r="52" fill="none" stroke="url(#ringGrad)" strokeWidth={9}
                    strokeLinecap="round" strokeDasharray={CIRC} strokeDashoffset={CIRC}
                    transform="rotate(-90 60 60)"
                  />
                </svg>
                <div className="ring-center"><span className="num">{displayedNum}</span><span className="of">DE 3</span></div>
              </div>
              <div className="rhead-r">
                <div className="k">Nivel de madurez</div>
                <h1>{level.name}</h1>
              </div>
            </div>

            <div className="stepper">
              {LEVELS.map((l, i) => (
                <span key={l.n} style={{ display: "contents" }}>
                  {i > 0 && <div className={"step-line" + (l.n <= level.n ? " done" : "")} />}
                  <div className={"step-node" + (l.n < level.n ? " done" : l.n === level.n ? " current" : "")}>
                    {l.n < level.n ? "✓" : l.n}
                  </div>
                </span>
              ))}
            </div>
            <div className="step-labels"><span>N1</span><span>N2</span><span>N3</span></div>

            <p className="rdesc" dangerouslySetInnerHTML={{ __html: level.desc }} />

            <div className="tags">
              <div className="tag">Tecnología: <b>{level.tech}</b></div>
              <div className="tag">Resultado: <b>{level.resultado}</b></div>
            </div>

            <div className="cta-wrap">
              <div className="cta-box">
                <h3>Conversemos sobre tu siguiente salto →</h3>
                <div className="cta-btns">
                  <a className="cta-btn wa" href={waUrl} target="_blank" rel="noopener">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-1-.3-.1-.5-.1-.6.1-.2.3-.7 1-.9 1.2-.1.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.3-.5.1-.2 0-.4 0-.5C10.2 9 9.7 7.6 9.5 7c-.2-.5-.4-.5-.6-.5h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3 4.8 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3z" /><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2z" fill="none" stroke="currentColor" strokeWidth={1.6} /></svg>
                    WhatsApp
                  </a>
                  {secondaryCta === "email" ? (
                    <a className="cta-btn web" href={`mailto:${EMAIL}`}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>
                      Por correo
                    </a>
                  ) : (
                    <Link className="cta-btn web" href="/">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6" /><path d="M14 4h6v6M20 4L10 14" /></svg>
                      enterx.pe
                    </Link>
                  )}
                </div>
              </div>
            </div>

            <button className="retake" onClick={restart}>
              <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 1 3 6.7M3 12v5h5" /></svg>
              Volver a hacer el diagnóstico
            </button>
          </section>

        </div>
      </div>
    </div>
  );
}
