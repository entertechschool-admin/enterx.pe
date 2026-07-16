---
name: explicame
description: Traduce el sitio y sus cambios de código a lenguaje humano. Se activa con pedidos como "explícame el sitio", "explícame esta sección", "qué hay de nuevo", "por qué se ve así", "cómo funciona esta parte". Tiene tres modos — tour, novedades, diagnóstico — según lo que se pida.
---

# /explicame

Traduce el estado y los cambios del sitio `enterx.pe` a lenguaje humano, sin jerga técnica.
Si quien invoca esta skill es **Ariana** (existe `CLAUDE.local.md` en la raíz que importa
`.claude/ARIANA.md`), sigue el protocolo de comunicación de ese contrato al pie de la letra:
sin commit/rama/push/merge/deploy, apoyándote en el diccionario de `ARIANA.md` §3. Si quien
invoca es **Bruno** (no existe ese `CLAUDE.local.md`), el registro técnico es bienvenido —
puedes nombrar archivos, componentes y comandos de Git sin traducir.

Antes de responder en cualquiera de los tres modos, verifica el estado real leyendo el
código — nunca respondas de memoria de una sesión anterior.

## Modo 1 — Tour ("explícame el sitio" / "explícame esta sección")

1. Si el pedido es sobre **todo el sitio**: recorre las secciones en orden de aparición
   (`app/page.tsx` te da el orden real) — hero, la brecha (timeline), servicios, cierre —
   y para cada una describe en una o dos frases qué comunica y cómo se ve, apoyándote en
   `lib/content.ts` para el contenido real vigente.
2. Si el pedido es sobre **una sección puntual** ("explícame el video del logo", "explícame
   los cuadros de servicios"), usa el diccionario de `ARIANA.md` §3 para ubicar el
   componente y describe solo esa parte.
3. Si aparece un término que Ariana usa para nombrar algo y **no está en el diccionario**,
   añade la fila correspondiente a `ARIANA.md` §3 en el momento — no pidas permiso, es la
   regla de auto-actualización del propio contrato.
4. Para Ariana: describe en términos de qué ve y qué transmite, nunca en términos de JSX,
   props o clases CSS. Para Bruno: puedes incluir la ruta del archivo relevante.

## Modo 2 — Novedades ("¿qué hay de nuevo?")

1. `git fetch origin` para tener las referencias remotas al día.
2. Determina el rango a resumir:
   - Si existe la rama `ariana` y estás parado en ella (o el contexto es de Ariana): usa
     `git merge-base ariana origin/main` y resume los commits de `origin/main` desde ese
     punto (`git log <merge-base>..origin/main --oneline` + `git diff <merge-base>..origin/main`
     para el detalle).
   - Si no existe esa rama o quien pregunta es Bruno: usa un rango razonable por fecha
     (`git log --since="2 weeks ago"`, ajustable si Bruno pide otro periodo) sobre la rama
     actual.
3. Traduce cada cambio relevante a una frase humana de qué cambió en el sitio, no en el
   código: "Bruno agregó un video animado al logo del hero" en vez de "se añadió
   HeroLogoVideo.tsx". Agrupa cambios triviales o de mantenimiento (configuración, deps) en
   una sola línea genérica si no aportan nada visible.
4. **Para Ariana:** no menciones hashes de commit, nombres de archivo, ni las palabras
   commit/rama/merge — solo el qué cambió y, si es evidente del mensaje, quién lo hizo. Para
   Bruno, estos detalles son opcionales y puedes incluirlos si los pide.

## Modo 3 — Diagnóstico ("¿por qué se ve así?" / "cómo funciona esta parte")

1. Ubica el componente o comportamiento en cuestión (usa el diccionario de `ARIANA.md` §3
   si el pedido usa un término ya mapeado; si no, busca en `components/` y `lib/content.ts`).
2. Lee el código relevante y, si hace falta, levanta la vista previa local siguiendo el
   protocolo de `CLAUDE.md` (`pkill -f "next dev"`, `PORT=3005 npm run dev`, verificar
   `curl` → `200` antes de abrir el navegador) para observar el comportamiento real.
3. Explica la causa en lenguaje llano: qué regla o condición produce lo que se está viendo.
4. Si el diagnóstico revela que hay un cambio razonable a ofrecer, ofrécelo explícitamente
   ("¿quieres que lo ajuste?") — pero no lo apliques sin confirmación; esta skill explica,
   no modifica por su cuenta. Si Ariana confirma que quiere el cambio, continúa con el
   protocolo normal de interpretación de `ARIANA.md` §2 fuera de esta skill.

## Zonas delicadas

Si el tour, las novedades o el diagnóstico tocan alguna de las zonas delicadas listadas en
`ARIANA.md` §4 (video del hero, códecs, SEO/metadata, fondos negros), dilo explícitamente al
explicar — aunque esta skill no modifique nada, es información que Ariana debe tener antes
de pedir un cambio ahí.
