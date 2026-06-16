/**
 * Placeholder de Fase 1 — valida fuentes (Geist / Geist Mono) y tokens de marca.
 * En la Fase 2 se reemplaza por Navbar + 4 secciones + Footer.
 */
export default function Home() {
  return (
    <main className="min-h-screen bg-ink text-surface">
      <div className="mx-auto max-w-container px-6 py-section">
        <p className="font-mono text-sectionnum uppercase">
          <span className="text-accent">01</span>{" "}
          <span className="text-label">Scaffold · Fase 1</span>
        </p>

        <h1 className="mt-8 max-w-3xl text-h1">
          El 100% de las empresas usa ChatGPT.{" "}
          <span className="text-accent">Menos del 5%</span> usa agentes de IA.
        </h1>

        <p className="mt-8 max-w-xl text-lead text-label">
          Tokens, tipografía Geist y Geist Mono cableados. Listo para construir
          las secciones.
        </p>

        <p className="mt-12 font-mono text-label uppercase tracking-label text-label">
          enterx.pe · enterx.io
        </p>
      </div>
    </main>
  );
}
