# Historial de versiones

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
