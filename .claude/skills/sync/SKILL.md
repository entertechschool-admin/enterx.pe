---
name: sync
description: Único camino de sincronización y envío de trabajo para Ariana. Se activa con pedidos como "sincroniza", "ponme al día", "envíaselo a Bruno", "guarda mis cambios". Trae lo nuevo de producción, resuelve conflictos de forma inteligente y envía el trabajo pendiente como una propuesta para que Bruno la revise.
---

# /sync

El único camino de sincronización y envío para Ariana. Nunca uses `git push`, `git merge`,
`gh pr create` fuera de esta skill cuando trabajes en su nombre. Todo se reporta en español
sin jerga (ver vocabulario permitido en `ARIANA.md` §1): nunca digas commit, rama, push,
merge, rebase, deploy, PR o conflicto — usa "guardar", "vista previa", "enviar a Bruno",
"publicado".

**Reglas duras, sin excepción:**
- Jamás `push` a `main`.
- Jamás `--force` / force-push.
- Jamás borrar la rama `ariana`.
- Jamás dejar el árbol de trabajo con marcadores de conflicto (`<<<<<<<`) abiertos al
  terminar la skill — si algo no se puede resolver del todo, se resuelve parcialmente,
  se preserva lo resoluble, y lo que falta queda registrado en el resumen para Bruno.
- Merge, nunca rebase — no se reescribe historia.

## 1. Diagnóstico

1. `git fetch origin` (trae referencias, no cambia archivos).
2. Estado de producción: `git log HEAD..origin/main --oneline` (¿hay algo nuevo en `main`
   que Ariana no tiene?).
3. Estado local: `git status --short` (¿hay cambios sin guardar?) y, si existe una rama
   `ariana` con commits propios, `git log origin/main..ariana --oneline` (¿hay trabajo ya
   guardado pero no enviado?).
4. Propuesta anterior: si existe un PR previo desde `ariana` hacia `main`,
   `gh pr view ariana --json state,mergedAt,url,number` (o `gh pr status`) para saber si
   sigue abierto o si Bruno ya lo aprobó/mergeó.
5. Con esto arma el diagnóstico y decide la rama de acción:
   - **PR anterior mergeado + sin cambios locales pendientes:** el trabajo de Ariana ya está
     publicado. Alinea la rama local: `git checkout ariana && git reset --hard origin/main`
     (seguro aquí porque no hay trabajo local sin enviar que perder — verificado en el paso
     3). Repórtale: "Bruno ya publicó tu propuesta anterior; estás al día."
   - **PR anterior abierto, sin cambios locales nuevos:** no hay nada que enviar todavía;
     informa el estado ("tu propuesta sigue en revisión con Bruno") y termina — no crees un
     envío vacío.
   - **Hay cambios locales (guardados o sin guardar) para enviar:** continúa a los pasos 2 y 3.
   - **Sin rama `ariana`:** créala desde `origin/main` (`git checkout -b ariana
     origin/main`) — es la primera sincronización de Ariana en esta máquina.

## 2. Traer lo nuevo

1. Si `git log HEAD..origin/main --oneline` no está vacío, trae los cambios de producción
   con **merge** (nunca rebase): `git merge origin/main`.
2. **Si el merge es limpio (git lo resuelve solo):** continúa.
3. **Si hay conflicto de CONTENIDO** (p. ej. ambos lados tocaron el mismo texto en
   `lib/content.ts` o en cualquier copy): identifica el archivo y muestra a Ariana las dos
   versiones traducidas a lenguaje humano — nunca el diff crudo. Ejemplo: "Bruno cambió el
   título principal a 'X' mientras tú lo tenías como 'Y' — ¿cuál dejamos?". Aplica la
   respuesta de Ariana, marca el archivo como resuelto (`git add`) y continúa.
4. **Si hay conflicto de CÓDIGO/lógica** (fuera de copy/contenido — estructura de un
   componente, una función, config): conserva la versión de `origin/main` como base.
   Si la intención de Ariana (el cambio que ella pidió) se puede reaplicar de forma trivial
   sobre esa base, hazlo y sigue. Si no es trivial, descarta ese fragmento del cambio de
   Ariana, avísale con algo como "esa parte necesita que Bruno la revise directamente, la
   voy a dejar como está y se lo cuento en tu envío", y anota el detalle técnico real para
   el resumen del PR (este detalle sí puede llevar jerga, porque va dirigido a Bruno).
5. Tras resolver todos los conflictos: `npm run build` **debe pasar** antes de seguir. Si
   falla, diagnostica y corrige antes de continuar — no envíes un build roto.

## 3. Enviar (solo si hay cambios para enviar)

1. Arma un resumen en español, sin jerga, de todo lo que va a viajar: qué se guardó, qué se
   trajo de producción (si hubo), qué conflictos se resolvieron y cómo. Si se tocó alguna
   zona delicada (`ARIANA.md` §4), destácalo explícitamente en este resumen.
2. Muestra el resumen a Ariana y espera su confirmación antes de continuar.
3. `git add` de los archivos correspondientes (nunca `git add -A` ciego — revisa
   `git status` para no arrastrar nada inesperado).
4. Commit con la convención del proyecto: `content: <resumen breve> (propuesta Ariana)` si
   el cambio es de copy/contenido, o el `type` que corresponda (`feat:`, `fix:`, `style:`)
   si tocó comportamiento o visual — siempre en minúscula, imperativo, ≤72 caracteres, sin
   punto final.
5. `git push origin ariana` (push normal, nunca `--force`).
6. Si no existe un PR abierto desde `ariana`: `gh pr create --base main --head ariana
   --title "<resumen breve>" --body "<cuerpo en español>"`. El cuerpo debe incluir: qué
   cambió en lenguaje humano, las zonas delicadas tocadas (si las hubo), y un espacio para
   la URL de vista previa. Si ya existe un PR abierto, en vez de crear uno nuevo el push del
   paso 5 ya lo actualiza — usa `gh pr view ariana` para confirmar y obtener su URL/número.
7. Espera el comentario del bot de Vercel con la URL de vista previa:
   `gh pr view ariana --json comments`, con reintentos espaciados hasta ~3 minutos, buscando
   un enlace `*.vercel.app`. Si aparece, inclúyelo en el cierre. Si no aparece en ese plazo,
   entrega igual el enlace del PR y sigue — no bloquees el cierre por esto.

## 4. Cierre

- Si se envió algo: "Listo — Bruno recibió tu propuesta[, con vista previa en <url> si la
  hubo]. La próxima vez que sincronicemos te digo si ya está publicada."
- Si no había nada que enviar y tampoco nada nuevo que traer: "Estás al día, no hay nada
  pendiente."
- Si había una propuesta anterior ya publicada y se realineó la rama: "Bruno ya publicó tu
  propuesta anterior; estás al día."
