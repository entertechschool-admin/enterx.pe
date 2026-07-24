/**
 * Candado de contenido sin validar (contrato .claude/ARIANA.md §2e).
 *
 * Sustituye a los marcadores "[para validar con Bruno]" que se pintaban en la
 * página: ensuciaban la vista previa y, sobre todo, dependían de que alguien se
 * acordara de mirarlos. Esto no se puede ignorar — bloquea el despliegue.
 *
 * Regla: si algún bloque de lib/content.ts sigue con `pendingValidation: true`,
 * el build de PRODUCCIÓN falla. En local y en despliegues de vista previa solo
 * avisa, para no estorbar el trabajo del día a día.
 *
 * Para levantar el candado: Bruno aprueba → `pendingValidation: false` en el
 * bloque correspondiente de lib/content.ts (cada uno documenta qué falta).
 */
import { readFileSync } from "node:fs";

const SOURCE = "lib/content.ts";
const src = readFileSync(new URL(`../${SOURCE}`, import.meta.url), "utf8");

// Nombre del export que precede a cada `pendingValidation: true`.
const pending = [];
const re = /export const (\w+)\s*=\s*\{[^}]*?pendingValidation:\s*true/gs;
for (const m of src.matchAll(re)) pending.push(m[1]);

if (pending.length === 0) {
  console.log("✓ content: nada pendiente de validación.");
  process.exit(0);
}

const list = pending.map((n) => `    · ${n}`).join("\n");
const isProduction = process.env.VERCEL_ENV === "production";

if (isProduction) {
  console.error(
    `\n✗ DESPLIEGUE BLOQUEADO — hay contenido sin validar por Bruno:\n${list}\n\n` +
      `  Estos bloques de ${SOURCE} llevan datos que no están en CONTEXT.md\n` +
      `  (logos de terceros, claims, productos). Cada uno documenta arriba qué\n` +
      `  falta aprobar.\n\n` +
      `  Al aprobar: pendingValidation: false en el bloque, y pasar el contenido\n` +
      `  a CONTEXT.md.\n`,
  );
  process.exit(1);
}

console.warn(
  `\n⚠ content: ${pending.length} bloque(s) pendientes de validación por Bruno:\n${list}\n` +
    `  No bloquean aquí, pero SÍ bloquearán el despliegue a producción.\n`,
);
