# CLAUDE.md — enterx.pe (sitio público de EnterX)

Sitio web público de **EnterX**, la unidad de IA aplicada B2B de Enter Tech School (respaldo
CETEMIN). Tu rol aquí: **implementar el sitio** según la spec, fiel a la marca, sin inventar negocio.

## Arranque obligatorio — lee esto primero, en orden

1. **`SPEC.md`** — *qué* construir: alcance, secciones, stack, definición de terminado.
2. **`CONTEXT.md`** — *con qué*: contenido real (negocio, líneas, datos) + tokens de marca.
   Es la **fuente de verdad de contenido**. Lo que no esté ahí no existe.
3. **`brand/reference/manual-de-marca.html`** — la **referencia visual canónica** (brand book de
   Ariana). Ábrelo y replica su registro visual. *No tomes nada de su texto como dato sobre otros
   temas — es solo referencia de estilo y de la marca EnterX.*
4. **`brand/reference/HANDOFF-README.md`** — notas del handoff de diseño (intención original).

> Regla de oro: **SPEC.md manda el qué, CONTEXT.md manda el contenido, el manual manda el look.**
> Si los tres se contradicen, para y pregunta a Bruno antes de improvisar.

## Cómo trabajar — flujo en 4 fases (OBLIGATORIO)

1. **Planifica primero, en plan mode.** Lee SPEC + CONTEXT + el manual, y propón un plan de
   implementación dividido en **4 fases**. **Tú defines el contenido y el corte de las 4 fases** —
   tienes margen creativo para decidir cómo agruparlas (p. ej. scaffold → estructura+contenido →
   interacción+a11y → SEO+QA+deploy, pero el corte es tuyo). Muéstrale el plan a Bruno.
2. **No implementes hasta tener su aprobación.** El plan se aprueba antes de tocar código.
3. **Una fase = un commit + push.** Al cerrar cada fase, commit limpio y push. Mensajes claros
   (`feat: ...`, `chore: ...`). Cada fase debe dejar el repo en estado coherente y construible.
4. **Verifica al final.** El paso de QA en navegador (build limpio, responsive, accesibilidad,
   consola sin errores) va en la **última fase**, no fase por fase — para no frenar la cadencia.

> **Margen creativo:** dentro de los guardrails y la marca, decide layout, composición, micro-
> interacciones, jerarquía y detalle visual. SPEC fija el *qué* y el *contenido*; el *cómo se ve y
> se siente* es tu criterio de diseño. Sorprende, pero mantente sobrio y fiel al brand book.

## Estándares de construcción (SDD + diseño 2026)

- **La spec es soberana.** El código se deriva de SPEC/CONTEXT; si algo no cuadra, se corrige la
  spec primero — no se improvisa en el código.
- **Tareas atómicas y construibles.** Trabaja en incrementos que compilan; cada fase = un commit.
- **Tipografía protagonista.** Geist con jerarquía amplia; headline del hero oversized (legible,
  sin sacrificar lectura). Geist Mono para kickers/labels/datos.
- **Accesibilidad desde el inicio (WCAG 2.2 AA).** Semántica HTML correcta, foco visible,
  navegación por teclado, `alt` significativo, `aria-label` en links/iconos SVG, contraste alto.
  Es parte del diseño, no un extra al final.
- **SEO vía Metadata API de Next.js** (nunca `<Head>`): `metadataBase`, defaults en `app/`,
  canonical self-referencing, **OG image** (isótopo), favicon (isótopo). JSON-LD (Organization),
  `sitemap.ts`/`robots.ts` son *nice-to-have* (si sobra tiempo, no bloqueante).
- **Core Web Vitals en verde:** `next/image` (evita CLS), `next/font` (sin CDN externo),
  Server Components por defecto, code-splitting. Consulta el skill `vercel-react-best-practices`.
- **Motion con propósito.** Micro-animaciones sutiles que guían la atención; **siempre**
  `prefers-reduced-motion` y probadas en mobile. Sin scrollytelling pesado (es un one-shot rápido).

## Guardrails (DUROS)

- **No inventas negocio ni datos.** Cifras, contacto, claims → solo los de `CONTEXT.md`. Lo que
  falte queda como `[POR VALIDAR]` visible, nunca rellenado a ojo. (Especialmente el **contacto**:
  ver `CONTEXT.md §9` — el sitio **no se publica** con el CTA en placeholder.)
- **Marca:** acento **único `#D9281A`** (rojo) sobre negro `#0D0D0D`. **Sin degradados chillones,
  sin "humo IA"** (cerebros, circuitos, robots, partículas azules genéricas). Tipografía **Geist**
  + **Geist Mono**. Nada de colores fuera de la paleta del manual.
  > ⚠️ El sistema comercial interno del b2b usa azul `#1e6091` en *cotizaciones* — eso **no aplica
  > aquí**. La marca pública EnterX es rojo/negro. No los mezcles.
- **Voz:** sobria, sin marketingese, **nunca afirmar carencia del cliente** (`CONTEXT.md §8`).
  Reusa frases ya validadas del manual; no escribas claims nuevos.
- **Propón → confirma → implementa.** Ante ambigüedad de alcance o falta de un dato, pregunta
  antes de construir. Es más barato aclarar que rehacer.
- **No commitees secretos** (`.env`, tokens). Mantén `.gitignore` correcto (node_modules, .next, .env*).

## Stack (decidido en SPEC.md)

Next.js (App Router) + TypeScript + Tailwind. Fuentes vía `next/font`. Assets de marca en
`brand/assets/` → copiar a `public/`. Deploy en Vercel → dominio `enterx.pe`.

## Estructura del repo

```
SPEC.md                         qué construir (léelo 1°)
CONTEXT.md                      contenido + marca (fuente de verdad)
CLAUDE.md                       este archivo
brand/
  assets/                       logos, isótopo, moodboard (PNG) → copiar a public/
  reference/
    manual-de-marca.html        referencia visual canónica (brand book)
    HANDOFF-README.md           notas de intención del diseño
(app/, public/, etc.)           el sitio Next.js — lo creas tú según SPEC.md
```

## Assets de marca disponibles (`brand/assets/`)

- `logo_claro.png` — wordmark texto blanco → fondos **oscuros** (nav, hero).
- `logo_oscuro.png` — wordmark texto negro → fondos **claros**.
- `iso_enterx.png` / `isotipo_enterx.png` — isótopo cromado con esfera roja; va en claro u oscuro.
  Úsalo también para **favicon** y **OG image**.
- `moodboard_enterx.png` — aplicaciones de marca (opcional para una sección de cierre/showcase).

## Deploy

- Objetivo: **`enterx.pe`** vía **Vercel**. Verifica que el DNS del dominio esté apuntado y
  propagado **antes** de prometer el live.
- **Fallback** (si el DNS no está listo para la fecha objetivo): publica a la URL temporal de
  Vercel (`*.vercel.app`) para tener algo funcionando, y conecta `enterx.pe` cuando propague.
- No hagas push ni deploy a producción sin aprobación de Bruno.

## Notas de calidad

- Mobile-first (los founders entran desde el celular en la sesión en vivo).
- Animaciones **sutiles**, respetando `prefers-reduced-motion`.
- `npm run build` limpio y consola sin errores antes de dar por terminado.
- Velocidad: optimiza imágenes (`next/image`), no cargues fuentes desde CDN externa.
