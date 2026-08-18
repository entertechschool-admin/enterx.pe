# EnterX — constitución de trabajo

## Norte

Mantener y evolucionar el sitio mediante cambios pequeños, verificables y fáciles de revertir.
Prioridad: **claridad > velocidad > sofisticación**. No añadir abstracciones, dependencias o
arquitectura que no resuelvan una necesidad actual y concreta.

## Fuentes de verdad

Leer y respetar, en este orden:

1. `SPEC.md`: alcance y definición de terminado.
2. `CONTEXT.md`: copy, datos, claims y contactos.
3. `brand/reference/manual-de-marca.html`: identidad visual.
4. `CLAUDE.md`: guardrails, stack, zonas delicadas y operación local.

Si dos fuentes se contradicen, no improvisar: explicar el conflicto y pedir decisión a Bruno.

## Roles de agentes

- **Líder:** reduce ambigüedad, investiga el estado real, define cortes funcionales, revisa
  arquitectura/calidad y explicita riesgos.
- **Builder:** implementa un corte acotado, comprueba su funcionamiento y devuelve evidencia.
- Ambos responden al usuario con un máximo de **3,000 caracteres**, empezando por el resultado.
  No narrar cada comando: informar decisiones, cambios, evidencia y riesgos pendientes.

## Guardrails permanentes

- No inventar negocio, copy, cifras, contactos ni claims. Usar solo `CONTEXT.md` o dejar
  `[POR VALIDAR]` cuando corresponda.
- No hacer push, merge ni despliegue productivo sin aprobación explícita de Bruno.
- No dejar código, previews o rutas a medio integrar. Cada corte debe compilar y ser reversible.
- No hacer refactors "por limpieza". Una mejora estructural debe tener un beneficio observable.
- Mantener Server Components por defecto; usar código cliente solo cuando sea necesario para
  interacción o APIs del navegador.
- No introducir dependencias, assets pesados, animaciones complejas ni nuevos patrones globales
  sin justificar coste, alternativa simple y beneficio.
- Respetar accesibilidad, `prefers-reduced-motion`, SEO y las zonas delicadas documentadas en
  `CLAUDE.md` (especialmente video del hero, fondos y metadata).

## Ritmo de trabajo

### FAST LOOP — predeterminado

Usar cuando el objetivo está claro, el cambio es localizado y el riesgo es bajo.

1. Confirmar alcance en una frase y señalar qué queda fuera.
2. Implementar el corte mínimo.
3. Verificar en proporción al cambio: build y la ruta/interacción afectada; revisar mobile cuando
   haya UI.
4. Informar cambio, evidencia y riesgo pendiente, si existe.

Solo hay checkpoint antes de una acción irreversible o una ampliación material de alcance.

### FULL LOOP — complejidad o ambigüedad

Usar cuando hay más de una interpretación razonable, cambian arquitectura/rutas/datos,
rendimiento o UX relevante, se tocan varios módulos, o no se puede estimar el impacto con
seguridad.

1. Diagnosticar el estado actual, dependencias y límites.
2. Proponer cortes funcionales, riesgos y criterio de aceptación.
3. Esperar confirmación de Bruno antes de cambiar alcance o arquitectura.
4. Implementar un corte por vez.
5. Hacer QA técnico, visual y responsive acorde al riesgo.
6. Cerrar con evidencia, decisión tomada y siguiente paso concreto.

Checkpoints: tras el diagnóstico, antes del primer cambio material y tras cada corte funcional.

## Qué cuenta como optimización de escalabilidad

Cada optimización debe conseguir al menos uno de estos resultados:

- reducir duplicación;
- aislar una feature, componente o configuración detrás de una frontera clara;
- reducir JavaScript, listeners o renderizado en cliente;
- diferir código o assets no críticos;
- convertir contenido repetido en datos tipados reutilizables;
- disminuir los archivos o superficies afectadas por un cambio futuro.

No cuentan por sí solas: renombrar, mover archivos, fragmentar componentes sin necesidad, o
crear abstracciones genéricas para un único uso.

## Protocolo de implementación

- Un objetivo funcional por commit; preferir cambios pequeños y reversibles.
- Extender el módulo existente antes de crear una capa nueva. Extraer solo si mejora una frontera
  real o si habrá reutilización inmediata.
- El copy vive en `lib/content.ts`; dominios, contacto y metadata viven en `lib/site.ts`.
- Antes de cerrar, ejecutar `npm run build` y comprobar manualmente el comportamiento afectado.
  Para UI, comprobar desktop y mobile, teclado/foco cuando aplique y consola sin errores.
- Si un cambio descubre una inconsistencia de spec, contenido o marca, detener esa parte y
  documentar la decisión requerida; no compensarla en JSX.

## Playbooks

### Mantenimiento

Usar FAST LOOP salvo que el diagnóstico revele impacto transversal. Corregir la causa mínima y
probar la regresión más cercana; no convertir un bugfix en un rediseño o refactor amplio.

### Incrementos y features

Elegir FAST LOOP si el corte está claro; usar FULL LOOP en caso contrario. Definir explícitamente
qué no se construirá. Construir primero una versión útil y coherente antes de añadir variantes o
automatizaciones.

### Integración de PR grandes

Usar siempre FULL LOOP. La rama fuente del colaborador no se modifica. Crear una rama temporal
desde `dev` (por ejemplo, `codex/integrate-<tema>`) y portar cambios como cortes auditables.

- No mezclar un rediseño completo de una vez.
- Hacer **seis mezclas funcionales** como máximo; el mapa exacto se decide tras auditar
  dependencias, no por nombres de archivos.
- Cada mezcla debe tener: intención visible, lista de archivos, una optimización de escalabilidad
  concreta, build, QA de la ruta afectada y preview de Vercel.
- Registrar por mezcla: qué se portó, qué quedó fuera, evidencia, riesgo y cómo revertirla.
- Si una dependencia impide separarla sin romper el sitio, mover la unidad completa a la mezcla
  siguiente; nunca dejar una feature incompleta.
- Preview no significa producción. Solo tras aprobar las seis mezclas se propone el PR final hacia
  `main`; Bruno autoriza merge y producción por separado.
