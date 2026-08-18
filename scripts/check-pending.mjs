import { readFileSync } from "node:fs";

const source = "lib/content.ts";
const contents = readFileSync(new URL(`../${source}`, import.meta.url), "utf8");
const pending = [...contents.matchAll(/export const (\w+)\s*=\s*\{[^}]*?pendingValidation:\s*true/gs)].map((match) => match[1]);

if (pending.length === 0) {
  console.log("✓ content: nada pendiente de validación.");
  process.exit(0);
}

const list = pending.map((name) => `    · ${name}`).join("\n");
if (process.env.VERCEL_ENV === "production") {
  console.error(`\n✗ DESPLIEGUE BLOQUEADO — contenido pendiente de validación:\n${list}\n`);
  process.exit(1);
}

console.warn(`\n⚠ content: ${pending.length} bloque(s) pendientes de validación:\n${list}\n`);
