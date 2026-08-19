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
  arquitectura/calidad, explicita riesgos y emite el brief de optimización entre despliegues.
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

### INTERLOOP — revisión post-deploy del Líder

Usar entre cortes productivos de una integración grande o feature incremental. No añadirlo a un
bugfix FAST salvo que el despliegue revele un riesgo real. El Builder permanece en pausa.

1. Confirmar que el PR está en `main`, que producción desplegó y que el smoke test pasó.
2. Auditar el delta ya publicado y el siguiente corte previsto: arquitectura, UI/UX, rendimiento,
   accesibilidad, SEO y coherencia de feature. Revisar evidencia real; no generar tareas por llenar
   categorías.
3. Proponer como máximo tres candidatos, cada uno con evidencia, beneficio esperado, coste/riesgo
   y forma de verificarlo. Clasificarlos como: bloqueante, candidato para la siguiente mezcla o
   backlog.
4. Elegir como máximo una optimización para acompañar la siguiente mezcla: la de mayor impacto y
   menor acoplamiento. No ampliar alcance de negocio, añadir dependencias ni introducir un patrón
   global sin aprobación de Bruno.
5. Entregar un **brief de siguiente mezcla** con: cambio funcional esperado, optimización elegida,
   criterio de aceptación, límites explícitos y riesgos. Bruno lo aprueba o ajusta antes de que el
   Builder sincronice la rama temporal y continúe.

Si no existe una mejora con beneficio verificable, decirlo y no inventar trabajo. La calidad
estructural propia del siguiente corte puede satisfacer su optimización de escalabilidad.

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

Usar siempre FULL LOOP. La rama fuente del colaborador no se modifica. Crear una única rama
temporal desde `main` (por ejemplo, `codex/integrate-<tema>`) y reutilizarla durante toda la
integración, portando cambios como cortes auditables.

- No mezclar un rediseño completo de una vez.
- Para la integración actual de la rama de Ariana, hacer exactamente **seis mezclas funcionales y
  desplegables**. El mapa se decide por dependencias y experiencia visible, no por nombres de
  archivos.
- Cada mezcla debe tener: intención visible, lista de archivos, una optimización de escalabilidad
  concreta, build, QA de la ruta afectada y preview de Vercel.
- El Builder debe cerrar cada mezcla con una ficha breve que indique: qué cambia en UI/UX; qué
  cambió en código/arquitectura; optimización y métrica; qué quedó fuera; evidencia de QA; riesgos,
  decisiones pendientes y reversión.
- Si una dependencia impide separarla sin romper el sitio, mover la unidad completa a la mezcla
  siguiente; nunca dejar una feature incompleta.
- Cada mezcla sigue este flujo: implementar en la rama temporal → push autorizado → preview de
  Vercel → QA y ficha del Builder → aprobación visual de Bruno → PR pequeño hacia `main` → pausa.
- Bruno aprueba y mezcla el PR manualmente en GitHub como `entertechschool-admin`; ese merge es el
  que habilita el despliegue productivo en Vercel. El agente nunca hace merge ni despliegue
  productivo por su cuenta.
- Después del merge, comprobar producción y ejecutar el INTERLOOP. Solo tras aprobar Bruno el brief,
  sincronizar la rama temporal con `origin/main` y comenzar la siguiente mezcla. No avanzar si el
  PR, deploy, smoke test o brief anterior siguen pendientes o fallaron.
- Preferir **Create a merge commit** para conservar cada mezcla como unidad auditable y reversible.
- Preview no significa producción: la aprobación del preview y la autorización para mezclar a
  `main` son checkpoints separados.
