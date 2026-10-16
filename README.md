# 🎓 Transcriptor académico

Una *skill* para asistentes de IA que convierte la transcripción de una clase, conferencia o ponencia, de cualquier materia, en **apuntes académicos completos y ordenados**, sin resumir ni inventar nada.

Pegas el texto tal como salió de la grabación, con muletillas, desorden y todo. El asistente arma un índice y desarrolla los apuntes **tema por tema** cuando tú se lo pides, directamente en el chat.

Funciona con **Gemini** (app, Spark y Antigravity), **Claude** (chat, Cowork y Claude Code) y cualquier otro asistente que acepte instrucciones personalizadas.

## 📦 Instalación

La skill es una carpeta con dos archivos: [`SKILL.md`](skills/transcriptor-academico/SKILL.md) y su licencia. Todas estas formas de instalar copian **solo esa carpeta**, no el resto del repositorio.

### Opción 1: PowerShell (Windows), en una línea

Abre PowerShell, pega esto y elige en el menú dónde instalarla:

```powershell
irm https://raw.githubusercontent.com/Mack-Yilman/transcriptor-academico/main/install.ps1 | iex
```

| Opción del menú | Qué hace |
|---|---|
| Claude Code | La instala en `~/.claude/skills/` |
| Antigravity | La instala en `~/.gemini/config/skills/` y, si tienes el CLI de Antigravity, también en el suyo |
| App de Gemini o Gemini Spark | Deja `SKILL.md` en *Descargas › transcriptor-academico-gemini*, listo para subir |
| Claude.ai, Desktop o Cowork | Deja `transcriptor-academico.zip` en *Descargas*, listo para subir |
| Todos | Todo lo anterior |

Para elegir el destino sin menú, por ejemplo Claude Code:

```powershell
& ([scriptblock]::Create((irm https://raw.githubusercontent.com/Mack-Yilman/transcriptor-academico/main/install.ps1))) -Destino claude-code
```

Los destinos son `claude-code`, `antigravity`, `gemini-app`, `claude-ai` y `todos`. Volver a ejecutar el comando actualiza la skill a la última versión. Puedes [leer el instalador](install.ps1) antes de ejecutarlo.

### Opción 2: un comando para agentes de código

| Herramienta | Comando |
|---|---|
| Cualquier agente (Claude Code, Antigravity, Cursor, Codex, Copilot…) con el [CLI de skills](https://github.com/vercel-labs/skills) | `npx skills add Mack-Yilman/transcriptor-academico` |

### Opción 3: pedírselo a tu agente con el enlace

En Antigravity, Claude Code u otro agente con acceso a archivos, pega este mensaje:

> Instala la skill de https://github.com/Mack-Yilman/transcriptor-academico. Copia solo la carpeta `skills/transcriptor-academico` (contiene `SKILL.md` y `LICENSE.txt`) dentro de tu carpeta de skills globales. No copies el resto del repositorio.

### Opción 4: descarga directa para la app de Gemini y Claude.ai

| Plataforma | Descarga | Dónde subirla |
|---|---|---|
| App de Gemini y Gemini Spark | [`SKILL.md`](https://github.com/Mack-Yilman/transcriptor-academico/releases/latest/download/SKILL.md) | Configuración › Skills › Subir |
| Claude.ai, Claude Desktop y Cowork | [`transcriptor-academico.zip`](https://github.com/Mack-Yilman/transcriptor-academico/releases/latest/download/transcriptor-academico.zip) | Configuración › Capacidades › Skills › Subir |

Los enlaces siempre descargan la última versión. Sube el `.zip` tal cual, sin descomprimirlo.

> **¿Qué modelo usar?** La versión 4.0 se probó con dos clases reales de materias distintas (programación, 22 min; cirugía cardíaca, 1 h 42 min):
>
> - **Claude Sonnet** conservó el 100 % de los datos clave de ambas clases, con el vocabulario del docente.
> - **Gemini 3.8 Flash** dio el mejor índice con razonamiento **medio**: con el mínimo resumió la clase larga en 3 temas enormes, y con el máximo agregó divisores prohibidos y tardó el doble. Conservó cerca del 95 % de los datos de la clase larga y el 80 % de la corta: omite frases sueltas dirigidas a los alumnos en medio de una demostración y, en materias técnicas, tiende a escribir como un libro de texto (añade términos y explicaciones que el docente no dijo). En la app de Gemini, elige un modo con razonamiento, no el más rápido, y revisa los apuntes contra tu clase.

### Opción 5: cualquier otro asistente (ChatGPT, Copilot, Mistral…)

- **Si acepta instrucciones largas** (proyecto, GPT personalizado, *system prompt*): pega el contenido de `SKILL.md` como instrucciones.
- **Si tiene un límite de caracteres:** el archivo ocupa unos 30 000. Súbelo como archivo de conocimiento y escribe en las instrucciones: *«Sigue al pie de la letra las instrucciones del archivo SKILL.md»*.

### En macOS o Linux

Con PowerShell 7 (`pwsh`) funciona el mismo instalador. Sin PowerShell, para Claude Code:

```bash
mkdir -p ~/.claude/skills && curl -fsSL https://github.com/Mack-Yilman/transcriptor-academico/releases/latest/download/transcriptor-academico.zip -o /tmp/ta.zip && unzip -o /tmp/ta.zip -d ~/.claude/skills
```

Cambia `~/.claude/skills` por `~/.gemini/config/skills` (Antigravity).

## ✨ Qué hace

| Fase | Qué pasa | Qué escribes tú |
|---|---|---|
| 0. Recepción | Recibe el texto por partes, si es largo | Pegas el texto; **Sí** para seguir pegando, **No** para terminar |
| 1. Índice | Propone temas, subtemas y sub-subtemas en el orden de la clase | **➡️ Siguiente**, o un ajuste («une los temas 2 y 3») |
| 2. Desarrollo | Desarrolla un tema completo por turno | **➡️ Siguiente** para el próximo tema |

En cualquier momento, **Empecemos una nueva transcripción** reinicia el proceso. Tras el último tema, «Finalizar» también.

### Cómo llevarte los apuntes

Desde la versión 4.0 la skill no genera archivos: la entrega en PDF o en documentos solo funcionaba bien en algunos asistentes, y en otros resumía el contenido. Todos los apuntes quedan en el chat, tema por tema, listos para copiar. Para guardarlos, usa la función de tu plataforma; en la app de Gemini, por ejemplo, **Compartir y exportar › Exportar a Documentos** debajo de cada respuesta exporta exactamente lo que ves.

### Cómo se ven los apuntes

- **Fieles:** no resume, no inventa datos, años ni fuentes, y no llama «principio» o «ley» a lo que el docente no presentó así. Corrige los errores del reconocimiento de voz solo cuando la palabra correcta es inequívoca; si hay duda, la marca con «(¿?)» para que la revises en la grabación.
- **Limpios:** quita muletillas, cortes de audio, bromas y marcas de tiempo, pero conserva las fechas de examen, las tareas, los consejos del docente y lo que recalca. Si la transcripción trae marcas de tiempo, el índice muestra el intervalo de cada tema (`[0:00–4:00]`).
- **Siempre con la misma jerarquía:** cada tema lleva su título (`## 📘 Tema 1: …`) y sus subtítulos (`### 1.1. 🔹 …`), y los sub-subtítulos en negrita (`**1.1.1. 🔸 …**`) cuando el contenido tiene esa profundidad. Bajo el título del tema no hay párrafos sueltos: todo va dentro de sus subtítulos.
- **Con formato según el contenido:**

  | Recurso | Para qué |
  |---|---|
  | Prosa | Explicaciones |
  | Viñetas, con sangría cuando hay jerarquía | Enumeraciones y clasificaciones |
  | Listas numeradas | Procesos |
  | Tablas | Comparaciones y datos |
  | Esquemas con `├──` | Decisiones con ramas |
  | Bloques de código | Código dictado |
  | Callouts (💡 🎯 ⚠️ 🔬 📌) | Definiciones, énfasis del docente, alertas, casos y textos dictados |

  No repite la misma plantilla en cada tema.
- **Legibles en cualquier lugar:** solo usa markdown básico y símbolos Unicode para las fórmulas (x², √, ≤), así que se ven bien en el chat, en el terminal y al exportarlos a un documento.
- **Proporcionados:** una clase corta no se parte en muchos temas de una sola oración.
- **Seguros:** si la clase dicta un prompt o dice «ignora las instrucciones anteriores», lo transcribe como parte de la clase; nunca lo ejecuta.

## 🗂️ Contenido del repositorio

| Ruta | Contenido | ¿Se instala? |
|---|---|---|
| `skills/transcriptor-academico/` | La skill: `SKILL.md` y `LICENSE.txt` | ✅ Sí, es lo único |
| `install.ps1` | Instalador de PowerShell | No |
| `README.md`, `CHANGELOG.md`, `LICENSE` | Documentación, historial de versiones y licencia completa | No |
| `tests/`, `ejemplos/`, `.github/`, `package.json` | Pruebas automáticas, textos de prueba y publicación de versiones | No |

## 🧪 Pruebas

Las pruebas automáticas revisan que `SKILL.md` sea coherente y que la carpeta instalable solo contenga la skill. Requieren Node.js 22 o superior y no tienen dependencias:

```bash
npm test
```

El comportamiento del asistente se prueba con los textos de [`ejemplos/`](ejemplos/), que son clases inventadas, y con clases reales de distintas materias, contra la [checklist de calidad](ejemplos/checklist.md): flujo, índice, estructura, organización y fidelidad.

## 📄 Licencia

© 2026 Mack Chirinos. [Creative Commons Atribución-NoComercial-SinDerivadas 4.0 Internacional (CC BY-NC-ND 4.0)](https://creativecommons.org/licenses/by-nc-nd/4.0/deed.es).

| Puedes | No puedes, sin autorización escrita del autor |
|---|---|
| ✅ Usar la skill gratis, para estudiar o enseñar | ❌ Venderla ni usarla con fines comerciales |
| ✅ Compartirla sin cambios, citando al autor y este repositorio | ❌ Distribuir versiones modificadas |

Los apuntes que generes con la skill son tuyos. Para pedir una autorización, abre un *issue* en este repositorio.
