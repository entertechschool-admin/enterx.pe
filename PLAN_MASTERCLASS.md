# Brief maestro — Masterclass "IA Agéntica 2026: de lo simple a lo complejo"

> **Qué es este documento:** el input de **contenido + experiencia** para una masterclass que se
> montará en **reveal.js**. Define QUÉ se dice en cada slide, CÓMO se revela progresivamente, el
> guion hablado y el timing. Un agente que lea este archivo puede armar la estructura de slides y la
> guía del presentador sin preguntar nada.
>
> **Qué NO define este documento:** el **branding visual** (colores, tipografía, logos, layout).
> Eso lo aplica el **agente de brand EnterX** en una pasada posterior. Aquí solo se habla de
> estructura, contenido y experiencia de revelado — nada de CSS ni paletas.
>
> **Qué NO es:** no son los slides finales. No es material de lectura para la audiencia.

---

## 0. Contexto que define TODO

| Parámetro | Valor |
|-----------|-------|
| **Evento** | Masterclass en vivo, **1 hora**, vía **Zoom** (pantalla compartida). |
| **Presenta** | Bruno Díaz — Enter Tech School / brazo B2B **EnterX**. |
| **Audiencia** | ~**50 emprendedores** de un **fondo de impacto**. Mayoría **NO técnicos**. |
| **Estado mental de la audiencia** | Curiosos pero **escépticos del hype**. Su pregunta de fondo: *"¿esto sirve para MI negocio, hoy, sin ser ingeniero?"* |
| **Promesa del título** | *De lo simple a lo complejo* — empezar por las palabras, terminar por la mentalidad. |
| **Tono** | Directo, sin relleno corporativo. Datos antes que adjetivos. Honesto sobre límites (la IA no es magia). |
| **Resultado deseado** | Que salgan con (1) vocabulario para no perderse, (2) una imagen viva de un agente trabajando, (3) una forma de pensar para obtener resultados superiores. |

**Regla de voz (DURA):** la voz cruda de Bruno es intocable. En el guion, las frases entre comillas
son suyas y van textuales — solo se corrige ortografía, nunca se "suaviza". (Ref: `SOUL.md`.)

**Estructura de tiempo (60 min):**

| Bloque | Minutos | Contenido |
|--------|---------|-----------|
| Intro | 0–5 | Título + agenda *(Bruno se presenta oralmente, sin slide de bio)* |
| **Bloque 1** | 5–18 (**~13 min**) | 9 conceptos clave (grid 3×3) |
| **Bloque 2** | 18–38 (**20 min**) | Demo en vivo (3 prompts, ~10) + preguntas (~10) |
| **Bloque 3** | 38–57 (**~19 min**) | Vibe Coding vs SDD + meta-prompting/planning |
| Cierre | 57–60 (3 min) | Remate + CTA |

---

## 1. Plataforma y experiencia de revelado (reveal.js)

**Plataforma:** los slides se construyen en **[reveal.js](https://revealjs.com)** (HTML/JS). Cada
slide es un `<section>`; el revelado progresivo se hace con **fragments** (`class="fragment"`).
El **branding visual lo aplica después el agente de brand EnterX** — aquí solo se especifica la
*experiencia*: qué aparece de golpe y qué se revela paso a paso.

**Principio rector:** **sobrio por defecto, revelado solo en los momentos clave.** La mayoría de
los slides aparecen completos de una vez (sin animar). El revelado progresivo se reserva para
**3–4 momentos** donde construir la idea pieza por pieza genera tensión o claridad. Demasiado
fragment cansa y ralentiza; poco desperdicia los picos. Equilibrio > efectismo.

**Dónde SÍ se usa revelado progresivo (los momentos clave):**

1. **Los 9 conceptos (Bloque 1) — el momento estrella del revelado.**
   - **Primero**: aparecen las **9 cards con solo el número + término** (la audiencia ve "el mapa":
     9 palabras por aprender). Esto entra de golpe, como rejilla 3×3 — y es lo que se ve durante la
     dinámica de manos.
   - **Luego, con cada clic**: se revela la **definición + analogía** de un concepto a la vez, en
     orden (1→9). Bruno habla mientras revela. La card activa puede destacarse levemente (lo define
     el brand).
   - **Efecto**: la audiencia anticipa cuántos faltan y cada concepto recibe su momento. Implementar
     con un `fragment` por definición; el grid de cards en sí entra sin fragment.

2. **El diagrama de la demo (Bloque 2) — los 3 prompts.**
   - Los **3 pasos se revelan uno por uno** (¿qué tienes? → ¿hasta dónde llegas? → tarea completa),
     cada uno con su flecha, conforme Bruno explica el plan de la demo. Construye la expectativa
     antes de ir a la terminal. Un `fragment` por paso+flecha.

3. **El contraste Vibe vs SDD (Bloque 3).**
   - Aparece **primero la columna "Vibe Coding"** completa; con un clic entra **"SDD"** al lado.
     El contraste se *siente* porque el segundo término llega después del primero, no junto. Dos
     fragments (una columna cada uno), o la columna SDD como único fragment.

4. **El loop de calidad (Bloque 3, meta-planning).**
   - Los 4 pasos (**hipótesis → alternativas → confirmación → ejecutar**) se revelan uno a uno con
     su flecha. Refuerza que es una secuencia, no una lista. Un `fragment` por paso.

**Dónde NO usar revelado (entra todo de golpe):** portadas, agenda, slide de preguntas frecuentes,
recap y cierre. También las transiciones entre bloques. La regla: si el slide es para *leer* o
*ubicarse*, entra completo; si es para *construir una idea en vivo*, se fragmenta.

**Notas de reveal.js para quien implemente:**
- Transición entre slides: discreta (`fade` o `slide` suave). El protagonismo es del contenido y de
  Bruno, no de la animación.
- **Speaker notes** de reveal (`<aside class="notes">`): volcar ahí el guion del presentador de la
  sección 6, para que Bruno los vea en el modo presentador mientras comparte solo los slides.
- **Slide de demo (Bloque 2):** es un placeholder — Bruno **sale de los slides y comparte la
  terminal**. El slide solo anuncia "DEMO EN VIVO"; no intentar recrear la terminal en reveal.
- Pensado para verse en **Zoom a pantalla compartida**: una idea por slide, texto grande, mucho aire.

---

## 2. BLOQUE 1 — Activación: 9 conceptos clave de IA agéntica 2026 (~13 min)

**Objetivo:** que nadie se pierda el resto de la hora por vocabulario. **Orden deliberado: de lo
simple a lo complejo** — cada concepto se apoya en el anterior (LLM → Token → Prompt → Tool → Agente
→ MCP → Skill → CLI → Harness).

**Estructura + experiencia:** 1 slide portada de bloque + los 9 conceptos en **grid 3×3** (tres
columnas, tres filas). Cada card lleva: número, término, definición (1–2 líneas) y una línea de
analogía. **Máximo 2 líneas de definición por concepto.**

**Dinámica de apertura (con la audiencia):** apenas aparece el grid 3×3 (solo número + término),
Bruno lanza: *"Levanten la mano: ¿quién conoce al menos 4 de estos 9?"* — cuenta las manos en voz
alta (calibra a la sala). Luego **pide participación**: *"¿alguien se anima a definir alguno?"* —
deja que la audiencia intente 1–2 antes de revelarlos. Esto convierte el bloque de vocabulario en
una conversación, no una clase.

**Revelado (momento clave nº1, ver sección 1):** el grid de 9 cards aparece primero mostrando solo
**número + término** (el "mapa" de las 9 palabras — esto es lo que se ve durante la dinámica de
manos). Luego, **con cada clic se revela la definición + analogía de un concepto** en orden 1→9,
mientras Bruno habla (e incorpora lo que dijo la audiencia). Implementar la definición de cada card
como un `fragment`; el grid en sí entra de golpe.

### Portada del bloque
- **Eyebrow:** BLOQUE 1 · VOCABULARIO
- **Título:** 9 palabras que cambian el juego
- **Subtítulo:** El idioma de la IA agéntica, de lo simple a lo complejo.

### Los 9 conceptos (contenido literal para las cards — orden del grid 3×3)

**1. LLM** *(Large Language Model)*
> El "cerebro" que predice texto: razona, redacta, resume, traduce.
> *Por sí solo, solo genera palabras — no toca el mundo todavía.*

**2. Token**
> La unidad mínima que el modelo lee y escribe (≈ ¾ de una palabra).
> *Es lo que se mide y se cobra. Son las sílabas con las que el modelo piensa.*

**3. Prompt**
> La instrucción que le das al modelo. Tu forma de pedir define lo que obtienes.
> *No es "hablarle bonito": es especificar bien. Aquí empieza todo (y vuelve en el Bloque 3).*

**4. Tool** *(Herramienta)*
> Una capacidad concreta que el modelo puede invocar: enviar un correo, leer una hoja, crear un evento.
> *Le pone manos al cerebro.*

**5. Agente**
> Un LLM que decide, usa una tool, mira el resultado y vuelve a decidir — en bucle — hasta cumplir un objetivo.
> *No solo responde: actúa. Es la diferencia entre un consejo y un asistente que ejecuta.*

**6. MCP** *(Model Context Protocol)*
> El estándar para conectar el agente a tus apps (Gmail, CRM, Slack) sin programar integraciones a medida.
> *Es el "USB-C" de la IA: un solo enchufe para todo.*

**7. Skill** *(Habilidad)*
> Un procedimiento empaquetado y reutilizable (instrucciones + pasos) que el agente carga cuando lo necesita.
> *Como un "manual de la empresa" que el agente sabe ejecutar al pie de la letra.*

**8. CLI** *(Command-Line Interface)*
> La terminal: operar las apps por texto, sin clics ni mouse.
> *Rápido, automatizable y encadenable — el agente trabaja a la velocidad de la máquina.*

**9. Harness** *(Andamiaje)*
> El entorno que envuelve al modelo y le da memoria, permisos, herramientas y límites.
> *Es lo que convierte un chat en un copiloto que trabaja de verdad. **Claude Code es un harness.***

> **Nota de jerarquía:** el #9 (Harness) "abraza" a los anteriores — es la capa que junta todo.
> Conviene que se sienta como el cierre del bloque (p. ej. la card del centro-inferior destacada o
> el último revelado). Cómo se destaca lo decide el brand. Es el puente al Bloque 2 (la demo corre
> dentro de un harness — Claude Code).

> **Por qué Prompt es el 9º:** es el concepto que la audiencia ya *usa* a diario sin nombrarlo, y
> es el puente directo al Bloque 3 (meta-prompting). Si prefieres otro 9º (Context Window, RAG,
> Permissions), se cambia solo esta card.

---

## 3. BLOQUE 2 — Demo en vivo: construir un sistema desde cero (≈10 min demo + ≈10 min preguntas)

**Narrativa de una frase:** *"No les voy a mostrar un sistema terminado. Lo vamos a construir aquí,
en vivo, en tres pasos."*

**Idea pedagógica:** en lugar de demostrar un sistema ya hecho, Bruno **levanta uno desde una
carpeta vacía** y avanza en **3 prompts escalonados**. Así la audiencia ve los conceptos del Bloque
1 *en acción* (harness, CLAUDE.md, tools, CLI, skill, agente) y, sobre todo, ve cómo un agente pasa
de "no tiene nada" a "ejecuta una tarea completa de inicio a fin". La demo es **EN VIVO** (pantalla
compartida), no en slides — los slides solo enmarcan.

### Slide portada del bloque + qué van a ver
- **Eyebrow:** BLOQUE 2 · DEMO EN VIVO
- **Título:** De una carpeta vacía a un sistema que ejecuta
- **Subtítulo:** Tres prompts. En vivo. Sin red.
- **Diagrama — 3 pasos en fila con flechas (los 3 prompts):**

```
  ① ¿Qué tienes?        →   ② ¿Hasta dónde llegas?   →   ③ La tarea completa
  comprobar herramientas     primer avance acotado          ejecución end-to-end
  (gws-cli, skills, MCPs)     (alcance, qué puede hacer)     (la tarea de varios pasos)
```

> **Revelado (momento clave nº2):** los 3 pasos entran **uno por uno con un clic** (cada paso +
> su flecha como un `fragment`) mientras Bruno explica el plan de la demo — construye expectativa
> antes de ir a la terminal. Le dice a la audiencia QUÉ mirar; sin esto, ven texto corriendo y se
> pierden.

### Aside: Claude Code en la app vs en la terminal (≈1 min, mientras arranca)
Mientras prepara la carpeta, Bruno aprovecha para situar la herramienta:
- **Claude Code dentro de la app de Claude** — la versión visual / de escritorio.
- **Claude Code en la terminal** — lo que se usará en esta demo: el agente operando la máquina por
  línea de comandos. *"Es el mismo cerebro; cambia el cuerpo. Hoy lo veremos en la terminal porque
  ahí se ve trabajar de verdad."*

### Set-up (ANTES de empezar — listo, no se improvisa)
- Terminal con **Claude Code** abierta, **fuente grande** (legible en Zoom).
- **gws-cli ya instalado** (v0.22.3) y autenticado — para mostrarlo como herramienta disponible.
- Ruta `~/dev/` lista para crear ahí la carpeta de la demo.

### El guion de la demo (3 prompts escalonados)

**Paso 0 — Crear el espacio y el contexto (en vivo, ≈1 min):**
- Crear la carpeta: `~/dev/masterclass-demo` y abrir Claude Code dentro.
- Pedirle a Claude que **escriba su propio `CLAUDE.md`**: *"Eres el agente de esta demo. Crea tu
  archivo CLAUDE.md describiendo qué eres y cómo debes trabajar en esta carpeta."*
  → Conecta en vivo con el concepto **Harness** y con el **CLAUDE.md** como "memoria/instrucciones"
  del agente. *"Acaba de escribir su propio manual de trabajo."*

| Prompt | Qué pide Bruno (lenguaje natural) | Qué demuestra | Qué dice Bruno |
|--------|-----------------------------------|---------------|----------------|
| **1 — ¿Qué tienes?** | *"¿Qué herramientas tienes disponibles? ¿Qué skills, qué CLIs, qué MCPs puedes usar?"* | El agente **inventaria sus capacidades** (gws-cli, skills, MCPs). | "Antes de pedirle nada, le pregunto qué sabe hacer. Miren: tiene Gmail, Calendar, sus skills… Esto son las **tools**, los **MCP** y el **CLI** del bloque anterior, reales." |
| **2 — ¿Hasta dónde llegas?** | *"Dame un primer avance: ¿hasta dónde podrías llevar [la tarea] tú solo? Hazlo parcial y muéstrame."* | El agente hace un **primer avance acotado** y expone su alcance. | "No le pido todo de golpe. Le pido un avance. Así veo cómo razona y hasta dónde llega antes de soltarle la tarea completa." |
| **3 — La tarea completa** | *"Ahora sí: ejecuta la tarea completa de inicio a fin."* (la tarea de varios pasos — **ver placeholder abajo**) | El agente encadena **varios pasos hasta terminar** = un **agente** completo trabajando. | "Y ahora la tarea entera. Miren cómo encadena pasos, usa herramientas y cierra el trabajo solo. Esto es un **agente**." |

> **⚠️ TAREA CONCRETA DE LA DEMO — [DEFINIR antes del ensayo].** El guion (carpeta nueva + CLAUDE.md
> + 3 prompts) está fijo; falta elegir QUÉ tarea de varios pasos ejecuta el prompt 3. Debe: (a)
> tocar varios de los 9 conceptos, (b) usar gws-cli (Gmail/Calendar) para que se vea "tocar el mundo
> real", (c) caber en ~5 min. Candidatas: *"lee mis correos de hoy, resume los 3 importantes y
> agéndame los follow-ups en el calendar"* · *"revisa mi agenda de la semana y prepárame un brief de
> cada reunión"* · *"toma este [dato] y genérame un documento + un evento + un correo borrador"*.

**Remate:** mostrar el resultado final de la tarea. Frase de cierre de la demo:
> *"Empezamos con una carpeta vacía. En tres prompts, un sistema que ejecuta. Y ustedes vieron cada
> pieza: el harness, sus herramientas, las skills, el agente."*

### MODO SEGURO (crítico — ante 50 personas algo puede fallar)

> Notas para la **guía del presentador**, no para los slides.

- **Carpeta y datos de demostración.** La demo vive en `~/dev/masterclass-demo`, aislada. Si la
  tarea toca Gmail/Calendar, usar una **cuenta de demostración**, no la personal/comercial — para no
  exponer correos reales en pantalla.
- **Sin escrituras a clientes reales.** Que la tarea no mande correos ni cree eventos con personas
  reales. Borradores y eventos de prueba.
- **Fallback grabado.** Tener un **GIF / clip pregrabado** de los 3 prompts funcionando. Si Zoom se
  cae o una API falla, se reproduce y la masterclass no se rompe. (Grabable con `gif_creator` en el
  ensayo.)
- **Ensayo obligatorio.** Correr los 3 prompts una vez con la carpeta y la cuenta de demo, fijar la
  tarea concreta y tener los outputs esperados a la vista. La improvisación en vivo es el guion, no
  el resultado.
- **Plan B verbal.** Si todo falla, Bruno narra los 3 pasos con el diagrama del slide. La idea se
  entiende igual.

### Banco de preguntas anticipadas (los 10 min de Q&A)

Slide de cierre del bloque con 3–4 preguntas visibles; el resto las maneja Bruno de memoria.

| Pregunta | Respuesta corta (alineada a los guardrails) |
|----------|---------------------------------------------|
| **¿No alucina / se inventa cosas?** | Puede equivocarse. Por eso el sistema **nunca inventa negocio**: lo que no está validado queda en blanco y se marca "por validar". Y siempre hay **aprobación humana** antes de escribir. |
| **¿Es seguro con mis datos?** | El agente **propone, tú apruebas, él ejecuta**. No escribe en tu CRM ni manda correos sin tu OK. Los secretos nunca salen del entorno. |
| **¿Necesito saber programar?** | No para usarlo. Le hablas en español. Programar ayuda a construir las skills una vez; usarlas, no. |
| **¿Cuánto cuesta?** | Se paga por **tokens** (lo que el modelo lee y escribe). Una tarea como la demo cuesta centavos. La cuenta de Claude Max es plana. |
| **¿Y si se equivoca en vivo / en producción?** | El loop es **propones → apruebas → ejecutas → notificas**. El humano es el freno. Y todo queda registrado. |
| **¿Esto reemplaza a mi equipo?** | No. Quita el trabajo mecánico (cotizar, agendar, reportar) para que tu equipo piense. Es copiloto, no piloto. |
| **¿Funciona con MIS herramientas?** | Si hay un **MCP** (Gmail, Slack, CRM, Sheets…), sí. Es el "USB-C": se enchufa sin integración a medida. |
| **¿Por dónde empiezo mañana?** | Por una tarea repetitiva y aburrida que hagas cada semana. Esa es tu primera skill. |

---

## 4. BLOQUE 3 — Vibe Coding vs SDD: cómo pensar para resultados casi one-shot (~19 min)

**Objetivo:** llevar a la audiencia de "qué es" (Bloque 1) y "qué hace" (Bloque 2) a **"cómo
pienso para sacarle lo mejor"**. Enfoque **conceptual, sin código** — sirve a un emprendedor que
nunca tocará una terminal.

### Slide del gran contraste — Vibe Coding vs SDD

Estructura: dos columnas, izquierda VIBE, derecha SDD, con una flecha de mejora entre ambas.
**Revelado (momento clave nº3):** entra **primero la columna "Vibe Coding"** completa; con un clic
entra **"SDD"** al lado (la columna SDD como `fragment`). El contraste se *siente* porque el segundo
término llega después del primero.

| **Vibe Coding** | **SDD — Spec-Driven Development** |
|-----------------|-----------------------------------|
| Improvisar: pedir algo vago, ver qué sale, re-pedir. | Especificar bien **primero**, luego el agente ejecuta. |
| Iterar a ciegas. Muchos intentos. | Casi de un solo tiro (**one-shot**). |
| Como darle instrucciones sueltas a un nuevo empleado. | Como entregarle un **brief claro** y dejarlo trabajar. |
| Rápido para jugar. Frustrante para producir. | Más lento al inicio, **mucho mejor resultado**. |

> **Frase ancla (voz Bruno):** *"La IA no premia al que más teclea. Premia al que piensa más claro."*

### Slide — Meta-prompting (mejorar tu propio prompt)

- **Idea:** antes de pedirle que ejecute, pídele que **mejore tu pedido**.
- **Cómo se ve:** *"Antes de hacerlo, dime: ¿qué te falta saber para hacer esto excelente?"*
- **Por qué gana:** el agente expone los huecos de tu instrucción ANTES de gastar esfuerzo en la
  dirección equivocada. El agente como **copiloto de tu propio pensamiento**.
- **Analogía emprendedor:** es la diferencia entre "hazme un plan de marketing" y dejar que tu
  asesor te haga las 5 preguntas correctas primero.

### Slide — Meta-planning (planear el plan antes de tocar nada)

- **Idea:** para tareas grandes, primero se produce un **plan**; lo revisas y apruebas; recién
  entonces se ejecuta. Nada se toca a ciegas.
- **Ejemplo vivo:** el **plan mode** de Claude Code. *(Meta honesta: este mismo brief se hizo así
  → explorar el entorno → preguntar lo que faltaba → escribir el plan → aprobar → ejecutar.)*
- **El loop de calidad:** **hipótesis → alternativas → confirmación → ejecutar.** Nunca ejecutar
  directo. **Revelado (momento clave nº4):** los 4 pasos entran **uno a uno con su flecha** (un
  `fragment` por paso) — refuerza que es una secuencia, no una lista.
- **Por qué gana:** el costo de corregir un plan de una página es minutos; el de corregir trabajo
  ya hecho, horas.

### Cierre del bloque
> *"Vibe coding para explorar. SDD para producir. El que mejor especifica, gana — y especificar es
> pensar claro, no programar."* → puente al cierre de la masterclass.

---

## 5. Cierre (3 min)

### Slide de cierre + CTA
- **Recap en una línea por bloque:**
  1. Aprendiste el idioma (9 conceptos).
  2. Viste un agente trabajar de verdad (1 instrucción → 4 herramientas).
  3. Te llevas la mentalidad (especificar > teclear).
- **CTA:** identifica **una** tarea repetitiva de tu negocio esta semana → esa es tu primera skill.
- **Marca:** Enter Tech School · **EnterX** (`enterx.pe`) · respaldo CETEMIN. Datos de contacto de Bruno.
- **Frase final (voz Bruno):** *"La IA no te va a reemplazar. Te va a reemplazar quien sepa usarla.
  Empieza simple."*

---

## 6. Guion del presentador + timing

> Para la **guía del presentador**. Columnas: minuto · slide · qué dice Bruno (bullets, voz cruda) ·
> qué hace (acción de pantalla).

| Min | Slide | Qué dice Bruno (bullets) | Qué hace |
|-----|-------|--------------------------|----------|
| 0–5 | 1–2 Título + Agenda | **Se presenta oralmente** (su historia: software/sistemas → Uber → Enter/EnterX, a su modo). Luego: "En 1 hora: el idioma, una demo en vivo, y cómo pensar." · "Vamos de lo simple a lo complejo." | Slide título + slide agenda |
| 5–7 | 3 Portada B1 + grid 3×3 | "Antes de la magia, 9 palabras." · **"Levanten la mano: ¿quién conoce al menos 4?"** (cuenta manos) · "¿Alguien define alguno?" | Slide con las 9 cards (solo término) |
| 7–18 | 3 (9 conceptos) | Revela uno a uno (clic), incorpora lo que dijo la sala. Cierra: "El #9, Harness, los abraza a todos — y de eso vive la demo." | Revelado por clic (~1 min c/u) |
| 18–20 | 4 Portada B2 + diagrama 3 pasos | "No les muestro algo terminado: lo construimos aquí, en tres prompts." Revela los 3 pasos. | Slide del diagrama |
| 20–30 | DEMO (terminal) | Crea `~/dev/masterclass-demo`, pide el CLAUDE.md, corre **prompt 1 → 2 → 3**, narra cada paso. Aside app vs terminal al arrancar. Remata. | **Compartir terminal** |
| 30–38 | 5 Q&A | Toma ~4 preguntas. Apóyate en el banco. Si no hay, lanza: "¿quién hace esto a mano hoy?" | Slide de preguntas |
| 38–40 | 6 Portada B3 + contraste | "Ya vieron QUÉ hace. Ahora, cómo crear sistemas sólidos, no solo pedir código." | Volver a slides |
| 40–44 | 6 Vibe vs SDD | "Vibe = improvisar. SDD = especificar primero." · "La IA no premia al que más teclea." | Slide contraste (revelado) |
| 44–48 | 7 Meta-prompting | "Antes de pedir, pídele que mejore tu pedido." (enlaza con el concepto **Prompt**) | Slide |
| 48–54 | 8 Meta-planning | "Planea el plan. Este brief se hizo así." · loop hipótesis→alternativas→confirmar→ejecutar | Slide (loop revelado) |
| 54–57 | 8 Cierre B3 | "Vibe para explorar, SDD para producir. El que mejor especifica, gana." | Slide |
| 57–60 | 9 Cierre + CTA | Recap 3 líneas · "Tu tarea: una rutina repetitiva = tu primera skill." · Frase final. | Slide |

**Momentos de pantalla:** un solo cambio mayor → en min 20 se **comparte la terminal** (demo), en
min 38 se **vuelve a los slides**. Avisar a la audiencia en ambos cambios.

---

## 7. Arco narrativo (mapa de slides)

| # | Slide | Bloque | Rol |
|---|-------|--------|-----|
| 1 | Título de la masterclass | Intro | Encuadre: Enter/EnterX · "de lo simple a lo complejo" *(Bruno se presenta oralmente; sin slide de bio)* |
| 2 | Agenda (3 bloques + timing) | Intro | Mapa de la hora |
| 3 | Portada B1 + grid 3×3 (9 conceptos) | B1 | "9 palabras que cambian el juego"; cards reveladas 1→9; #9 destacado |
| 4 | Portada B2 + diagrama de 3 pasos | B2 | Qué mirar en la demo (3 prompts) |
| — | (DEMO EN VIVO — terminal) | B2 | No es slide; placeholder de "compartir pantalla" |
| 5 | Preguntas frecuentes | B2 | Banco de Q&A |
| 6 | Portada B3 + Vibe vs SDD | B3 | El gran contraste (revelado) |
| 7 | Meta-prompting | B3 | Mejorar el prompt |
| 8 | Meta-planning + plan mode + loop | B3 | Planear el plan (loop revelado) |
| 9 | Cierre + CTA | Cierre | "El que mejor especifica, gana" |

> El número exacto de láminas lo afina quien implemente (el grid de 9 conceptos puede ir en 1 slide
> con revelado, o partirse). Esta tabla es la guía, no una camisa de fuerza.

---

## 8. Referencias

- **Plataforma:** reveal.js — https://revealjs.com (fragments para el revelado, `<aside class="notes">`
  para speaker notes).
- **Branding:** lo aplica el **agente de brand EnterX** en una pasada posterior — NO se define aquí.
  Contexto de marca para ese agente: submarca EnterX (`enterx.pe`), respaldo CETEMIN
  (`context/marca.md`, `assets/MANIFEST.md`).
- **Voz:** `SOUL.md` — frases entre comillas son de Bruno, intocables salvo ortografía.
- **Herramientas de la demo:** Claude Code (en terminal) · **gws-cli** v0.22.3 ya instalado/autenticado
  (`gws gmail +triage/+read`, `gws calendar +agenda/+insert --meet`) · skills y MCPs disponibles.
  La demo se levanta en `~/dev/masterclass-demo` con su propio `CLAUDE.md`.

---

## 9. Checklist de calidad (antes de presentar)

- [ ] Slides montados en **reveal.js** con los 4 momentos de revelado (9 conceptos, diagrama de 3
      pasos, contraste Vibe/SDD, loop) y todo lo demás entrando de golpe.
- [ ] Los 9 conceptos caben en ≤2 líneas cada uno y se leen bien en Zoom (grid 3×3).
- [ ] **9º concepto confirmado** (propuesto: Prompt).
- [ ] Diagrama de la demo claro (3 pasos, revelado uno a uno).
- [ ] **Tarea concreta del prompt 3 DEFINIDA** (ver placeholder en Bloque 2) y probada.
- [ ] **Branding EnterX aplicado** por el agente de brand (pasada posterior).
- [ ] **Ensayo de la demo** hecho: carpeta `~/dev/masterclass-demo`, CLAUDE.md, los 3 prompts.
- [ ] **GIF de fallback** grabado y a mano.
- [ ] Suma del timing ≤ 60 min (con colchón).
- [ ] Guía del presentador volcada en speaker notes de reveal.
- [ ] Nota técnica de integración Next.js (sección 10) pasada a quien implemente en enterx.pe.

---

## 10. Integración en enterx.pe (Next.js + TypeScript, App Router)

Los slides se publican en **`enterx.pe/masterclass-ia`** (Next.js/TS). reveal.js es una librería de
navegador (usa `window`/`document`), así que **no puede renderizarse en el servidor**. Patrón a
seguir (validado):

1. **Deck como Client Component.** El `<div class="reveal">` con los `<section>` vive en un componente
   `'use client'` que inicializa reveal en un `useEffect` y lo destruye al desmontar:
   ```tsx
   'use client'
   import { useEffect, useRef } from 'react'
   import Reveal from 'reveal.js'
   import 'reveal.js/dist/reveal.css'
   // tema EnterX (lo provee el agente de brand)
   export default function Deck() {
     const ref = useRef<HTMLDivElement>(null)
     useEffect(() => {
       const deck = new Reveal(ref.current!, { hash: true })
       deck.initialize()
       return () => deck.destroy()
     }, [])
     return <div className="reveal" ref={ref}><div className="slides">{/* <section> … */}</div></div>
   }
   ```
2. **Cargar con `ssr: false`.** En App Router, `ssr:false` no se permite dentro de Server Components,
   así que se envuelve en un wrapper cliente: `const Deck = dynamic(() => import('./Deck'), { ssr:false })`.
   La página (`app/masterclass-ia/page.tsx`) consume ese wrapper.
3. **Aislar el CSS.** Los estilos de reveal son globales y agresivos → montar el deck en su propia
   ruta/layout para no contaminar el resto de enterx.pe.
4. **Branding = tema de reveal.** El agente de brand EnterX aplica el look como un **tema CSS de
   reveal** (override de variables), no peleando con el design system del sitio.
5. **Fragments y speaker notes** funcionan igual que en reveal standalone (los 4 momentos de revelado
   de la sección 1; notas en `<aside class="notes">` + plugin `RevealNotes`).

> Gotcha clave: sin `ssr:false` el build falla con `window is not defined`. Es *el* error típico de
> esta integración.
