/**
 * Escenas ilustrativas ANIMADAS de los productos con partner — reemplazan las
 * capturas de sus webs (material ajeno). Son originales de EnterX: transmiten
 * qué hace cada producto sin copiar su interfaz.
 *
 * Server Components: la vida es CSS puro (animate-blink, animate-pulse,
 * animate-float-soft), sin JS ni imágenes. `motion-reduce:animate-none` deja la
 * escena quieta en un estado legible.
 *
 * Color por partner (Ariana, 17-07-2026): cada escena habla el lenguaje visual
 * de su producto. Luna → rojo de EnterX (es lo propio). PathPilot → escala de
 * grises (su estética; neutro, encaja con el negro). Sprinta → VERDE.
 *
 * ⚠️ BRUNO: el verde de Sprinta CONTRADICE el guardrail de marca (paleta ÚNICA
 * rojo/negro, "nada de colores fuera de la paleta") — y es el mismo verde
 * #01EF88 que quitamos del logo de Sprinta por esa razón. Decisión de Ariana
 * con el conflicto sobre la mesa: la escena representa a Sprinta, no a EnterX.
 * Para revertir: cambiar los `#…` verdes de SprintaScene por `accent`.
 */
export function ProductScene({
  kind,
}: {
  kind: "sprinta" | "pathpilot" | "luna";
}) {
  return (
    <figure>
      <div className="motion-safe:animate-float-soft">
        {kind === "sprinta" ? (
          <SprintaScene />
        ) : kind === "pathpilot" ? (
          <PathPilotScene />
        ) : (
          <LunaScene />
        )}
      </div>
      <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-label text-label">
        Ilustración de EnterX · vista referencial
      </figcaption>
    </figure>
  );
}

/**
 * Luna — agente de formación propio de EnterX. Escena más rica que las de
 * partner (es el producto estrella): chat que enseña con el contexto de la
 * empresa + progreso de los colaboradores + NPS del programa. Demuestra su
 * capacidad real: FORMA al equipo de la empresa y lo hace bien. Borde y
 * ambiente rojos: señalan que es lo propio.
 *
 * Cifras ilustrativas (la figcaption lo dice: "vista referencial").
 */
function LunaScene() {
  const equipo = [
    { name: "Carla", area: "Ventas", pct: 92 },
    { name: "Luis", area: "Operaciones", pct: 74 },
    { name: "Rocío", area: "Finanzas", pct: 58 },
  ];

  return (
    <div className="relative overflow-hidden rounded-card border border-accent/25 bg-ink p-4 shadow-[0_24px_60px_-24px_rgba(217,40,26,0.35)] sm:p-5">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-ambient-red-center opacity-50"
      />

      <div className="relative">
        <div className="flex items-center gap-3 border-b border-white/10 pb-3">
          <span className="flex size-8 items-center justify-center rounded-full bg-accent text-[13px] font-medium text-white">
            L
          </span>
          <div className="flex-1">
            <p className="text-[13px] text-surface">Luna</p>
            <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-label text-label">
              <span className="size-1.5 rounded-full bg-accent motion-safe:animate-pulse" />
              agente de formación
            </p>
          </div>
        </div>

        {/* Chat: enseña con el contexto de la empresa */}
        <div className="flex flex-col gap-2.5 pt-4">
          <p className="max-w-[82%] self-start rounded-2xl rounded-tl-sm bg-white/[0.06] px-3.5 py-2 text-[13px] text-surface/85">
            ¿Por dónde arranco con mi equipo?
          </p>
          <p className="max-w-[88%] self-end rounded-2xl rounded-tr-sm border border-accent/25 bg-accent/10 px-3.5 py-2 text-[13px] text-surface">
            Con lo tuyo: ya cargué el contexto y 4 casos de tu empresa.
            Empecemos por ahí.
          </p>
          <span className="flex items-center gap-1 self-end px-2 py-1" aria-hidden>
            {[0, 0.2, 0.4].map((d) => (
              <span
                key={d}
                className="size-1.5 rounded-full bg-surface/50 motion-safe:animate-blink"
                style={{ animationDelay: `${d}s` }}
              />
            ))}
          </span>
        </div>

        {/* Progreso de los colaboradores */}
        <div className="mt-4 border-t border-white/10 pt-4">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-label text-label">
            Tu equipo en formación
          </p>
          <ul className="flex flex-col gap-2.5">
            {equipo.map((p) => (
              <li key={p.name} className="flex items-center gap-3">
                <span className="w-28 shrink-0 text-[12px] text-surface/80">
                  {p.name}
                  <span className="text-surface/40"> · {p.area}</span>
                </span>
                <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                  <span
                    className="block h-full rounded-full bg-accent"
                    style={{ width: `${p.pct}%` }}
                  />
                </span>
                <span className="w-9 shrink-0 text-right font-mono text-[11px] text-surface/70">
                  {p.pct}%
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* NPS del programa */}
        <div className="mt-4 flex items-center justify-between rounded-card border border-accent/25 bg-accent/[0.07] px-4 py-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-label text-label">
              NPS del programa
            </p>
            <p className="mt-0.5 text-[12px] text-surface/70">
              Satisfacción del equipo
            </p>
          </div>
          <p className="flex items-baseline gap-1 text-surface">
            <span className="text-[28px] font-medium leading-none text-accent">
              72
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Sprinta — agente de ventas: atiende, califica y agenda solo.
 * Verde de Sprinta (#22C55E) en vez del rojo de EnterX — ver aviso arriba.
 */
function SprintaScene() {
  return (
    <div className="rounded-card border border-white/10 bg-ink p-4 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.8)] sm:p-5">
      <div className="flex items-center gap-3 border-b border-white/10 pb-3">
        <span className="flex size-8 items-center justify-center rounded-full bg-[#22C55E]/15 text-[13px] text-[#4ADE80]">
          IA
        </span>
        <div className="flex-1">
          <p className="text-[13px] text-surface">Agente de ventas</p>
          <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-label text-label">
            <span className="size-1.5 rounded-full bg-[#22C55E] motion-safe:animate-pulse" />
            en línea
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2.5 pt-4">
        {/* Lead entrante */}
        <p className="max-w-[80%] self-start rounded-2xl rounded-tl-sm bg-white/[0.06] px-3.5 py-2 text-[13px] text-surface/85">
          ¿Sigue disponible el departamento?
        </p>
        {/* Respuesta del agente */}
        <p className="max-w-[85%] self-end rounded-2xl rounded-tr-sm border border-[#22C55E]/30 bg-[#22C55E]/10 px-3.5 py-2 text-[13px] text-surface">
          ¡Sí! 75 m², 3.er piso. ¿Te agendo una visita?
        </p>
        {/* Lead responde */}
        <p className="max-w-[80%] self-start rounded-2xl rounded-tl-sm bg-white/[0.06] px-3.5 py-2 text-[13px] text-surface/85">
          Sí, el jueves
        </p>
        {/* Escribiendo… */}
        <span className="flex items-center gap-1 self-end px-2 py-1" aria-hidden>
          {[0, 0.2, 0.4].map((d) => (
            <span
              key={d}
              className="size-1.5 rounded-full bg-surface/50 motion-safe:animate-blink"
              style={{ animationDelay: `${d}s` }}
            />
          ))}
        </span>
      </div>

      {/* Resultado */}
      <div className="mt-3 flex items-center gap-2 rounded-pill border border-[#22C55E]/35 bg-[#22C55E]/10 px-3 py-2">
        <CheckIcon className="text-[#4ADE80]" />
        <span className="font-mono text-[10px] uppercase tracking-label text-surface">
          Lead calificado · visita agendada
        </span>
      </div>

      {/* Métricas del mes */}
      <div className="mt-4 border-t border-white/10 pt-4">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-label text-label">
          Este mes
        </p>
        <div className="grid grid-cols-3 gap-2">
          {[
            ["Atendidos", "128"],
            ["Calificados", "74"],
            ["Visitas", "31"],
          ].map(([label, value]) => (
            <StatTile key={label} label={label} value={value} valueClass="text-[#4ADE80]" />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * PathPilot — agentes operativos: auditan la operación y escalan lo que falla.
 * Escala de grises (su estética): el "Escalado" resalta como chip blanco
 * invertido en vez de rojo. Todo neutro, sin acento de color.
 */
function PathPilotScene() {
  const rows = [
    { id: "#C-4821", area: "Cobranza", status: "Escalado", tone: "alert" },
    { id: "#C-4798", area: "Onboarding", status: "Resuelto", tone: "ok" },
    { id: "#C-4762", area: "Cumplimiento", status: "Analizando", tone: "live" },
  ];

  return (
    <div className="rounded-card border border-white/10 bg-ink p-4 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.8)] sm:p-5">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <p className="text-[13px] text-surface">Auditoría automática</p>
        <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-label text-label">
          <span className="size-1.5 rounded-full bg-white/70 motion-safe:animate-pulse" />
          en vivo
        </p>
      </div>

      <ul className="flex flex-col divide-y divide-white/[0.06] pt-1">
        {rows.map((r) => (
          <li key={r.id} className="flex items-center gap-3 py-3">
            <span className="font-mono text-[11px] text-surface/60">{r.id}</span>
            <span className="text-[13px] text-surface/85">{r.area}</span>
            <span
              className={`ml-auto rounded-pill px-2.5 py-1 font-mono text-[9px] uppercase tracking-label ${
                r.tone === "alert"
                  ? "bg-surface text-ink" // invertido: resalta en monocromo
                  : r.tone === "live"
                    ? "bg-white/[0.06] text-surface/70 motion-safe:animate-blink"
                    : "border border-white/15 text-surface/60"
              }`}
            >
              {r.status}
            </span>
          </li>
        ))}
      </ul>

      {/* Métrica de calidad */}
      <div className="mt-3 border-t border-white/10 pt-4">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-label">
          <span className="text-label">Calidad promedio</span>
          <span className="text-surface">72%</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
          <div className="h-full w-[72%] rounded-full bg-white/70 motion-safe:animate-pulse" />
        </div>
      </div>

      {/* Resumen de la operación */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          ["Escaladas", "12"],
          ["Resueltas", "84"],
          ["SLA", "97%"],
        ].map(([label, value]) => (
          <StatTile key={label} label={label} value={value} valueClass="text-surface" />
        ))}
      </div>
    </div>
  );
}

/** Tile de métrica: valor grande + etiqueta. El color del valor lo pone la
 *  escena (verde Sprinta / blanco PathPilot). */
function StatTile({
  label,
  value,
  valueClass,
}: {
  label: string;
  value: string;
  valueClass: string;
}) {
  return (
    <div className="rounded-card border border-white/10 bg-white/[0.03] px-3 py-2.5 text-center">
      <p className={`text-[16px] font-medium ${valueClass}`}>{value}</p>
      <p className="mt-0.5 font-mono text-[9px] uppercase tracking-label text-label">
        {label}
      </p>
    </div>
  );
}

function CheckIcon({ className = "text-accent" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className}`}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
