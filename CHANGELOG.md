# Historial de versiones

## 3.4.0 — 2026-10-15

### Fidelidad (probada con Gemini 3.8 Flash y Claude Sonnet sobre una clase real)

- Solo lo que dijo el expositor: prohibido completar con conocimiento propio definiciones, causas, ventajas, detalles técnicos o adjetivos, y lo que el docente solo nombra queda sin definir.
- Pasar a limpio no es elevar el registro: se usa el vocabulario del expositor, sin convertir la clase en documentación técnica.
- Los consejos, recomendaciones, avisos y comentarios prácticos del docente son contenido, aunque no parezcan académicos. El callout 🎯 incluye los consejos a los alumnos.
- En las demostraciones se quita la narración de clics, pero se conservan los pasos, los problemas, cómo se resolvieron y lo que el docente comenta del resultado.
- Lo que el expositor le escribe a una herramienta o a una IA durante una demostración va completo en 📌 Dictado.
- Las tablas y las etiquetas no se rellenan con datos que el expositor no dio.
- Cada tema se escribe recorriendo su tramo del corpus en orden, no de memoria. Si hay marcas de tiempo, el índice muestra el intervalo de cada tema y las marcas se quitan de los apuntes.

### Entrega

- La forma de crear el archivo depende de lo que pueda hacer el entorno: carpeta de trabajo (con nombre `apuntes-<tema>` y sin sobrescribir), conector de documentos, archivo generado como respuesta, código con descarga, o el chat.
- Si no puede crear el formato pedido, entrega todo en el chat en la misma respuesta, sin remitir a un archivo anterior.
- El Markdown puede entregarse como `.txt` si el entorno no crea `.md`. En PDF y documentos, una fuente que muestre emojis y símbolos, y esquemas en monoespaciada.
- La reagrupación final solo mueve bloques tardíos sin encabezado propio, así el índice y la numeración no cambian.

### Correcciones

- Las reglas ya no citan mensajes literales recortados, que el modelo podía mezclar con los completos; una prueba lo vigila.
- Se aclara que el último literal de un turno es el final cuando el turno lleva más de uno.

## 3.3.0 — 2026-10-15

### Mensajes

- Tres mensajes literales nuevos: uno al responder **Sí** en la recepción, uno cuando el texto pegado está vacío o no es material académico, y un aviso fijo ante una orden no reconocida, seguido del cierre pendiente de la fase.
- **➡️ Siguiente** también avanza la entrega en el chat cuando llega por partes.

### Formato

- Los encabezados llevan el número antes del emoji (`### 1.1. 🔹 …`, `**1.1.1. 🔸 …**`), y bajo el título del tema no hay párrafos sueltos: todo va dentro de sus subtemas.
- Las viñetas con sangría conservan la explicación completa en cada nivel; nunca se reducen a palabras sueltas.
- Una comparación va en tabla solo si cada celda cabe en una o dos oraciones; si no, va en viñetas con sangría, para no resumir.
- Los callouts 🔬 **Caso** y 📌 **Dictado** no tienen límite de extensión; los demás, de una a tres oraciones.

### Reagrupación y entrega

- La reagrupación final une los temas en su orden y solo reubica los bloques tardíos (una pregunta o aclaración al final de la clase), copiados palabra por palabra.
- El documento editable se crea por defecto en Google Docs, o en Word si el usuario lo pide o si el entorno no tiene Docs.
- Si el archivo se arma con herramientas, se escribe por bloques para no truncar temas, y la entrega cierra solo con la línea literal.

## 3.2.0 — 2026-10-10

### Entrega sin resúmenes

- Las órdenes de la tabla final piden el contenido «copiado palabra por palabra, sin resumir». Así llega a la herramienta de archivos, que genera el archivo como una respuesta nueva.
- La entrega tiene reglas estrictas: copiar en lugar de regenerar, y una lista de lo prohibido (resumir, convertir tablas, omitir títulos, abreviar con «…»).
- Antes de entregar el archivo, el modelo verifica que tenga los mismos títulos, subtítulos, tablas y callouts. Si no puede incluir todo en un archivo, entrega el contenido completo en el chat.

### Formato

- Todo tema lleva su título y al menos un subtítulo, siempre con número y emoji, también en el archivo final.
- Viñetas con sangría para la información jerárquica, con reglas de sangría y un ejemplo.
- Esquemas según el caso:
  - flechas en el texto para los flujos lineales;
  - viñetas con sangría para las jerarquías;
  - un esquema con `├──` en un bloque de código para las decisiones con varias ramas.
- Indicadores ✅ ❌ ⚠️ para estados y valoraciones.
- Fórmulas con símbolos Unicode en lugar de LaTeX, que salía crudo en el terminal y en los archivos.
- Reglas de compatibilidad con el chat y el terminal: solo markdown básico, sin HTML; tablas de hasta 4 columnas con celdas breves; callouts de un párrafo.

## 3.1.0 — 2026-10-10

### Instalación

- La skill pasó a `skills/transcriptor-academico/` y contiene solo `SKILL.md` y `LICENSE.txt`. Todas las formas de instalar copian esa carpeta y nada más del repositorio.
- Instalador de PowerShell en una línea, con menú: Claude Code, Antigravity, Gemini CLI, o deja preparado el archivo para la app de Gemini o para Claude.ai.
- Compatible con `npx skills add` y `gemini skills install`.
- Cada versión publica una Release con `transcriptor-academico.zip` y `SKILL.md` listos para descargar.
- «Code › Download ZIP» ya no incluye pruebas, ejemplos ni configuración.

### Licencia

- La licencia cambió de MIT a **CC BY-NC-ND 4.0**, a nombre de Mack Chirinos. Permite el uso libre y compartir la skill sin cambios; prohíbe el uso comercial y distribuir versiones modificadas sin autorización.

### Prompt

- El recordatorio final usa una etiqueta por mensaje en lugar de listas vacías, que se veían mal en Markdown.

## 3.0.0 — 2026-10-10

Reescritura que une el control de fases de la versión 1 con las reglas de exhaustividad de la versión 2, y corrige el formato monótono de la versión 2.

### Formato

- Se eliminó la estructura fija por subtema (párrafo → viñetas → tabla). Ahora el recurso se elige por la **forma del contenido**, con una tabla de decisión.
- Se eliminaron las tablas «de síntesis» al cierre de cada sección. Esas tablas resumían y repetían lo ya dicho.
- Se prohibió repetir la misma información en dos formatos.
- Los callouts ya no tienen cuota. Van junto al contenido que comentan, nunca agrupados al final, y se añadió `📌 Dictado` para prompts y textos dictados.
- Se añadió una revisión anti-plantilla antes de entregar cada tema.
- El índice crece en proporción al contenido. Un encabezado necesita al menos un párrafo o una lista propia, y los elementos paralelos van en un solo subtema para poder compararlos en una tabla. Se prohibieron las frases de relleno.

### Fidelidad

- Volvió la jerarquía de reglas: fidelidad, luego legibilidad, luego forma.
- Las fechas de examen, las tareas y los avisos se conservan; antes podían descartarse como «ruido logístico».
- Las citas solo llevan los datos que dijo el expositor; antes se pedía completar autor, obra y año.
- Se prohibió inventar etiquetas como «Recomendación práctica» o «Criterio sugerido».

### Flujo

- Volvieron la reagrupación final (**📦 Finalizar**) y la entrega en archivo. La entrega ahora se adapta a la plataforma: si el entorno no puede crear el archivo, entrega el contenido en el chat.
- **Finalizar** ya no borra la sesión. El reinicio requiere **Empecemos una nueva transcripción**.
- Se definieron órdenes válidas por fase. Un mensaje largo siempre se trata como corpus.
- Volvió el recordatorio final de mensajes de cierre, ahora idéntico a los mensajes de cada fase y verificado por pruebas.
- Se añadieron los mensajes de inicio sin texto, de entrega por partes y de entrega lista.

### Portabilidad

- Un solo archivo autocontenido, sin referencias a herramientas de una plataforma.
- La carpeta se llama igual que el campo `name`, como exige el estándar de skills.

## 2.0.0

- Añadió reglas de exhaustividad: no agrupar ideas, transcribir analogías y ejemplos completos, énfasis docente y fórmulas en LaTeX.
- Introdujo una estructura fija por subtema y una lista cerrada de cuatro callouts. Esto volvió monótonos los apuntes.
- Quitó la reagrupación final, la exportación a archivo y el recordatorio de mensajes de cierre.

## 1.0.0

- Primera versión, pensada para Gemini: fases con mensajes literales, límite entre dato y orden, reagrupación final y exportación con la función nativa de Gemini.
