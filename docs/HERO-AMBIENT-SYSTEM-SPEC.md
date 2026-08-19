# SPEC — Hero Ambient System

**Estado:** aprobado para implementación como primera etapa de M3.  
**Spec padre:** `SPEC.md`.  
**Fuentes visuales:** hero actual, `brand/reference/manual-de-marca.html` y el asset transparente
provisto por Bruno.

## Resultado

Reemplazar el MP4 y su poster por una escena nativa del navegador:

1. fondo negro y bandas de luz rojas animadas con CSS;
2. persona con visor como imagen transparente, estática, delante de las luces;
3. velos de contraste actuales y contenido del hero por encima;
4. control accesible de pausa y ciclo de vida según viewport, pestaña y preferencias de movimiento.

La meta es conservar la **atmósfera perceptual** del video, no copiar sus fotogramas. El cambio no
puede alterar copy, CTA, tamaño de la tarjeta, franja de clientes ni layout general del hero.

## Lugar en la integración

Este trabajo es la optimización que acompaña M3, no una séptima mezcla:

1. tras M2 en producción y el INTERLOOP aprobado, implementar este sistema en un commit aislado;
2. publicar preview solo con el nuevo ambiente y hacer HARD STOP para aprobación visual de Bruno;
3. si se aprueba, continuar con el corte funcional M3 sobre ese commit;
4. el PR de M3 contendrá ambos commits;
5. si se rechaza, revertir únicamente el commit ambiental y conservar el hero de M2.

Commit sugerido: `perf: replace hero video with CSS ambient system`.

## Contrato del asset

- Ruta esperada: `public/hero-person.png`.
- Fondo realmente transparente; conservar bordes de cabello, visor y hombros sin halo.
- Encuadre compatible con el hero actual: sujeto en la mitad derecha y espacio libre a la izquierda.
- Resolución suficiente para 1440 px, sin upscaling visible. Usar dimensiones intrínsecas reales.
- Renderizar con `next/image`, `alt=""` y semántica decorativa. Servir tamaños responsive y formato
  optimizado mediante Next; no introducir una segunda copia manual por breakpoint.
- Si el asset falta o sus bordes/encuadre no sirven, detenerse y pedir corrección. No reconstruirlo,
  deformarlo ni sustituirlo por una imagen inventada.

## Dirección visual

La escena debe sentirse tecnológica, sobria y específica de EnterX: negro `#0D0D0D`, rojo
`#D9281A`, guinda profundo y reflejos neutros muy contenidos. No añadir azul, púrpura, partículas,
ruido, mallas ni «humo IA».

Construir entre dos y cuatro capas amplias:

- una banda diagonal roja principal, suave y lenta;
- una segunda banda más estrecha que dé profundidad sin competir con la primera;
- un bloom rojo/guinda de baja opacidad;
- opcionalmente, un reflejo neutro muy tenue inspirado en el visor.

Los ciclos deben durar aproximadamente 18–32 s, usar velocidades distintas y `alternate` cuando
ayude a ocultar el reinicio. El movimiento debe percibirse ambiental, no como carrusel o loading.
La persona permanece estática.

### Capas

```text
fondo negro
  └─ luces y bandas CSS animadas
      └─ persona transparente estática
          └─ velo responsive de contraste existente
              └─ copy y CTA
```

Desktop conserva texto a la izquierda y sujeto a la derecha. Mobile puede reencuadrar la persona,
pero el H1, subtítulo y CTA deben mantener contraste AA y lectura inmediata.

## Arquitectura

Mantener `Hero.tsx` como Server Component. La implementación recomendada es:

- `HeroAmbient.tsx`: escena estática renderizada en servidor — gradientes, persona y children;
- `HeroAmbientController.tsx`: isla cliente pequeña — observadores, pausa y estado efectivo;
- `HeroAmbient.module.css`: keyframes y estilos locales del ambiente.

El controlador debe exponer una interfaz pequeña, idealmente `children`, y ocultar su máquina de
estado. No mover `lib/content.ts` al cliente ni serializar el objeto `hero`.

No crear todavía un framework global de motion. Cuando M3 introduzca un segundo consumidor real,
evaluar extraer únicamente el comportamiento compartido.

## Ciclo de vida y accesibilidad

El movimiento efectivo se ejecuta solo cuando se cumplen todas estas condiciones:

```text
!userPaused && inViewport && documentVisible && !prefersReducedMotion
```

- SSR y primer render: escena estática; no debe haber hydration mismatch.
- `IntersectionObserver`: pausar al salir del viewport y reanudar al entrar.
- `visibilitychange`: pausar con pestaña oculta.
- La pausa manual persiste al salir/volver y al ocultar/mostrar la pestaña.
- Escuchar cambios de `prefers-reduced-motion`; en `reduce` no corre ninguna capa.
- Limpiar observer y listeners al desmontar.
- Mantener botón de al menos 44×44 px, foco visible y labels «Pausar ambiente del hero» / «Reanudar
  ambiente del hero». Ocultarlo cuando reduced-motion impide animar.

Usar un atributo de estado (`data-motion="running|paused"`) y controlar
`animation-play-state` desde CSS. No usar `setInterval`, `requestAnimationFrame` ni actualizaciones
React por frame.

## Presupuesto de rendimiento

- Cero `<video>` y cero solicitudes a `background-home.mp4`.
- Eliminar `background-home.mp4`, `hero-poster.png` y `HeroVideo.tsx` cuando el reemplazo esté
  integrado; Git es la reversión.
- Transferencia del asset de persona: objetivo ≤120 KB en viewport 390 px y ≤250 KB en 1440 px.
- Animar solo `transform` y `opacity` en wrappers HTML. No animar `background-position`, tamaño del
  gradiente, filtros grandes ni propiedades de layout/paint continuo.
- Sin canvas, WebGL, librerías de animación ni dependencias nuevas.
- Evitar `will-change` permanente salvo que una medición demuestre beneficio.

## Criterios de aceptación

### Visuales

- La persona conserva proporción, nitidez y posición protagonista del hero actual.
- Las luces se mueven sin salto perceptible durante al menos 35 s.
- El lado izquierdo sigue suficientemente oscuro para el copy.
- No hay banding severo, clipping, halos del recorte ni flashes al hidratar.
- Bruno aprueba desktop 1440×900 y mobile 390×844 comparándolos con M2.

### Funcionales y técnicos

- Pausa/reanudación manual funciona con mouse y teclado.
- Salir/entrar del viewport y ocultar/mostrar pestaña cambia correctamente el estado.
- Reduced-motion cargado desde inicio y cambiado en vivo deja escena estática.
- Network confirma ausencia del MP4 y los presupuestos del asset.
- Consola limpia, `git diff --check` y build exitoso.
- Sin regresión visible de layout, foco, WhatsApp o marquee de clientes.
- `CLAUDE.md` describe el nuevo ambiente CSS y ya no presenta el video eliminado como ruta vigente.

## QA mínimo del Builder

1. Build y revisión de consola.
2. Desktop y mobile, incluida una vuelta completa de la animación.
3. Teclado/foco del control de pausa.
4. Scroll hasta sacar completamente el hero y volver.
5. Cambio de pestaña mientras corre y mientras está pausado manualmente.
6. Reduced-motion antes de cargar y cambiado durante la sesión.
7. Panel Network: peso responsive y ninguna petición de video/poster anterior.
8. Ficha final: UI/UX, arquitectura, métricas antes/después, riesgos y reversión.

## Fuera de alcance

- Banda estadística y rediseño del timeline de M3.
- Copy, CTAs, clientes, metadata o SEO.
- Parallax por puntero/scroll, audio, canvas, WebGL o interacción con la persona.
- Abstracción global para todas las animaciones del sitio.
