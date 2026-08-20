# SPEC.md — enterx.pe v1 (landing one-page)

> **Qué construir.** Una landing **one-page** para `enterx.pe` que exponga la marca **EnterX**
> con autoridad ante una audiencia de **~50 founders** (contexto inmediato: masterclass virtual).
> Objetivo: **presencia y credibilidad** + un **CTA suave** (WhatsApp). No es captura agresiva
> de leads ni e-commerce.
>
> El **contenido y la marca** salen de `CONTEXT.md` (fuente de verdad). La **referencia visual
> canónica** es `brand/reference/manual-de-marca.html`. Las **reglas de trabajo** están en `CLAUDE.md`.
> La implementación del ambiente visual del hero se define en
> `docs/HERO-AMBIENT-SYSTEM-SPEC.md`; esa spec complementaria no modifica el copy ni los CTA.

---

## Objetivo y éxito

- **Meta:** que un founder que entra desde la masterclass entienda en <30s **el salto que falta**
  (casi todos usan IA, casi nadie tiene agentes), **qué ofrece EnterX** y **cómo conversar** con
  nosotros.
- **CTAs suaves:** el hero ofrece "Agendar una asesoría gratuita" y "Quiero información", ambos
  como enlaces a WhatsApp con mensajes pre-cargados validados en `CONTEXT.md`.
- **Definición de hecho (v1):** one-page responsive, deploy en `enterx.pe`, sin datos inventados,
  fiel al manual de marca, carga rápida, sin errores de consola.

## Stack (decidido)

- **Next.js** (App Router) + **TypeScript** + **Tailwind CSS**.
- Fuentes **Geist** + **Geist Mono** vía `next/font` (no CDN externo).
- Imágenes con `next/image`, sirviendo los assets de `brand/assets/` (copiar a `public/`).
- Iconos de la sección de valor: **SVG propios** mono-línea (no librería pesada).
- Deploy: **Vercel** → dominio **`enterx.pe`** (ver `CLAUDE.md` para flujo de deploy/DNS).
- Sin backend en v1 (CTA = link a WhatsApp, no formulario).

## Estructura — 5 secciones + navbar + footer

> Orden de la página. Numeración mono `01 — …` estilo manual. Registro premium/sobrio.

### NAVBAR (sticky, fondo oscuro)
- **Logo:** `logo_claro.png` (texto blanco sobre nav oscuro).
- **Anclas:** *La brecha · Servicios · Contacto* (apuntan a las secciones 2, 3, 4).
- **CTA derecha:** botón "Conversemos" (WhatsApp).
- Scroll suave a las anclas.

### SECCIÓN 1 — HERO (fondo `#0D0D0D`)
- **Disponibilidad:** "Disponibles para nuevos proyectos".
- **H1:** **"Soluciones digitales con IA que potencian a tu equipo"**; "potencian" en rojo
  `#D9281A`.
- **Subhead:** "Formación e implementación de IA para tu operación, tu equipo y tus procesos
  —con tu gente y sin reemplazar a nadie— en Perú.".
- **Elementos:** Hero Ambient System con persona transparente estática y luces CSS animadas · CTA
  primario "Agendar una asesoría gratuita" y CTA secundario "Quiero información", ambos por
  WhatsApp · control de pausa accesible.

### SECCIÓN 2 — LA BRECHA / MADUREZ EN IA (timeline, fondo a elección sobrio)
- **Formato:** **timeline horizontal** de **4 niveles** (→ se apila **vertical en mobile/responsive**).
- **Interacción:** cada nodo, al **hover (desktop) / touch (mobile)**, despliega su **característica**
  + un **icono/flow simbólico** demostrativo. Estado por defecto: nodos visibles, N3 destacado.
- **N3 marcado como objetivo en rojo `#D9281A`.**
- **Los 4 niveles** (texto exacto en `CONTEXT.md`):
  1. **N1 — Preguntas a la IA**
  2. **N2 — Context & Prompt Engineering**
  3. **N3 — Agentes de IA (delegar tareas)** ★ objetivo
  4. **N4 — IA como propuesta de valor**
- **Refuerzo:** la afirmación del hero como lectura de mercado ("casi todas usan IA; <5% llega a
  agentes") — sin cita externa, es criterio EnterX.
- Animar la entrada (sutil); respetar `prefers-reduced-motion`.

### SECCIÓN 3 — PROPUESTA DE VALOR (3 líneas, fondo claro)
- **3 tarjetas**, cada una con **icono SVG simbólico** mono-línea + título + qué es + cliente ideal.
  - **Formación** — icono símbolo (cerebro/aprendizaje).
  - **Implementación** — icono símbolo (engranaje/bloque).
  - **Co-implementación ★** — icono símbolo (handshake/transferencia). **Tarjeta destacada** (oscura
    o con acento rojo) — es el diferenciador.
- Copy exacto en `CONTEXT.md §líneas`.
- Frase superior opcional: "Capacidad instalada. No dependencia. Lo que construimos, tu equipo lo opera."

### SECCIÓN 4 — PRODUCTOS PARA TU EMPRESA (catálogo editorial, fondo oscuro)
- Va entre Servicios y el CTA final.
- **Agente Luna AI** es el panel protagonista, a todo lo ancho, con la etiqueta "Producto propio de EnterX".
- **Agentes Operativos** y **Agentes de Ventas** se presentan en dos columnas en desktop y apilados en mobile; sus logos PathPilot y Sprinta hacen visible la relación aprobada.
- Los tres productos son visibles sin interacción. Cada uno usa una escena HTML/CSS simbólica y sutil; no carrusel, dashboards, métricas simuladas ni JavaScript propio.
- La escena reduce movimiento a una composición estática legible con `prefers-reduced-motion`.

### SECCIÓN 5 — CTA (oscuro full-bleed `#0D0D0D`)
- **Elementos:** isótopo · tagline de marca **"No dejamos a las empresas dependientes de nosotros.
  Las dejamos capaces."** · botón WhatsApp "Conversemos".
- Los enlaces de WhatsApp y sus datos viven en `CONTEXT.md §0` y `§10`.

### FOOTER
- `EnterX · enterx.pe · 2026` + línea de respaldo compacta: **CETEMIN · Enter Tech School**.
- Sin navegación pesada; minimal.

## Reglas visuales (duras — de `CONTEXT.md` apéndice)

- Acento **único** `#D9281A`; resto blanco/negro/gris. **Sin degradados chillones, sin "humo IA".**
- Tipografía **Geist** + **Geist Mono** (kickers, labels, números/datos en mono).
- Registro premium y sobrio (Stripe/Linear/Vercel), mucho aire, jerarquía amplia.
- Replicar el look del manual; no inventar componentes/colores fuera de él.
- Iconos de valor: SVG mono-línea sobrios, coherentes entre sí, color base + acento rojo puntual.

## Voz del copy

Seguir `CONTEXT.md §voz`: sobrio, sin marketingese, **nunca afirmar carencia del cliente**, afirmar
lo que EnterX construye/acompaña. Reusar frases ya validadas; no escribir claims nuevos.

## Alcance — OUT (v1)

Blog, páginas internas, formulario con backend, multi-idioma, CMS, analítica avanzada, auth.
(Anotar como ideas v2; no construir.)

## Definición de terminado (checklist)

- [ ] Navbar + 5 secciones + footer, fieles a `CONTEXT.md`.
- [ ] Timeline 4 niveles con hover/touch (característica + icono) y N3 en rojo; vertical en mobile.
- [ ] 3 tarjetas de valor con SVG simbólicos; Co-implementación destacada.
- [ ] Catálogo de tres productos visible sin interacción; Luna protagonista y relaciones PathPilot/Sprinta visibles.
- [ ] Geist/Geist Mono vía `next/font`; accent `#D9281A`; cero color fuera de la paleta.
- [ ] Responsive verificado (mobile + desktop); animaciones respetan `prefers-reduced-motion`.
- [ ] `npm run build` sin errores; consola limpia.
- [ ] **Ningún dato inventado.** CTA WhatsApp con número real o claramente `[POR VALIDAR]`.
- [ ] SEO básico + OG image (isótopo). Favicon = isótopo.
- [ ] Deploy a `enterx.pe` (o URL temporal si DNS no listo — ver `CLAUDE.md`).
