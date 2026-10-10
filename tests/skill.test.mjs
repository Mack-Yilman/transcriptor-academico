// Verificaciones estáticas de SKILL.md. No prueban el comportamiento del modelo
// (eso se hace a mano con ejemplos/), solo que el prompt sea coherente consigo mismo.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const leer = (...ruta) => readFileSync(join(repo, ...ruta), 'utf8').replace(/\r\n/g, '\n');
// La skill instalable vive en skills/<nombre>/; el resto del repo es del proyecto.
const [carpetaSkill] = readdirSync(join(repo, 'skills'));
const raiz = join(repo, 'skills', carpetaSkill);
const texto = leer('skills', carpetaSkill, 'SKILL.md');

const [, frontmatter, cuerpo] = texto.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/) ?? [];

// Líneas del cuerpo que quedan fuera de bloques de código.
function lineasFueraDeCodigo() {
  let dentro = false;
  return cuerpo.split('\n').filter((linea) => {
    if (linea.startsWith('```')) {
      dentro = !dentro;
      return false;
    }
    return !dentro;
  });
}

function seccion(inicio, fin) {
  const desde = cuerpo.indexOf(inicio);
  assert.notEqual(desde, -1, `falta la sección «${inicio}»`);
  const hasta = fin ? cuerpo.indexOf(fin, desde) : cuerpo.length;
  assert.notEqual(hasta, -1, `falta la sección «${fin}»`);
  return cuerpo.slice(desde, hasta);
}

const literales = (bloque) =>
  new Set(bloque.split('\n').filter((l) => l.startsWith('> ')).map((l) => l.slice(2)));

test('el frontmatter cumple el estándar Agent Skills', () => {
  assert.ok(frontmatter, 'SKILL.md debe empezar con frontmatter entre ---');
  const nombre = frontmatter.match(/^name:\s*(.+)$/m)?.[1].trim();
  const descripcion = frontmatter.match(/^description:\s*"(.+)"$/m)?.[1];
  assert.match(nombre ?? '', /^[a-z0-9]+(-[a-z0-9]+)*$/, 'name en minúsculas con guiones');
  assert.ok(nombre.length <= 64, 'name de 64 caracteres como máximo');
  assert.equal(nombre, basename(raiz), 'name debe coincidir con el nombre de la carpeta');
  assert.ok(descripcion, 'description entre comillas dobles y en una sola línea');
  assert.ok(descripcion.length <= 1024, `description de 1024 caracteres como máximo (tiene ${descripcion.length})`);
  assert.doesNotMatch(frontmatter, /[<>]/, 'el frontmatter no admite < ni >');
});

test('el cuerpo no usa título de nivel 1, nivel 4 ni divisores', () => {
  for (const linea of lineasFueraDeCodigo()) {
    assert.doesNotMatch(linea, /^#\s/, `título de nivel 1: ${linea}`);
    assert.doesNotMatch(linea, /^####/, `título de nivel 4: ${linea}`);
    assert.doesNotMatch(linea, /^\s*([-*_])(\s*\1){2,}\s*$/, `divisor horizontal: ${linea}`);
  }
});

test('el único bloque de código es el del índice', () => {
  const vallas = cuerpo.split('\n').filter((l) => l.startsWith('```'));
  assert.equal(vallas.length, 2, 'debe haber exactamente un bloque de código');
  assert.ok(seccion('### Fase 1', '### Fase 2').includes('```text'), 'el bloque debe estar en la Fase 1');
});

test('cada mensaje literal del flujo aparece idéntico en el recordatorio final', () => {
  const flujo = literales(seccion('## 🛠️ Flujo de trabajo', '## 🧭 Casos especiales'));
  const recordatorio = literales(seccion('## 🔚 Recordatorio final'));
  assert.ok(flujo.size >= 9, `se esperaban al menos 9 mensajes literales, hay ${flujo.size}`);
  assert.deepEqual([...flujo].sort(), [...recordatorio].sort());
});

test('la tabla de la Fase 3 tiene las filas que anuncia el prompt', () => {
  const fase3 = seccion('### Fase 3', '### Fase 4');
  const filas = fase3.split('\n').filter((l) => l.startsWith('| ') && !l.startsWith('| Opción'));
  const anunciadas = [...cuerpo.matchAll(/tabla (?:completa )?de (\d+) filas/g)].map((m) => Number(m[1]));
  assert.ok(anunciadas.length > 0, 'el prompt debe anunciar el número de filas');
  for (const n of anunciadas) assert.equal(n, filas.length);
  assert.match(filas.at(-1), /Empecemos una nueva transcripción\./, 'la última fila es la de reinicio');
});

test('es portable: no nombra plataformas ni herramientas propias de una', () => {
  assert.doesNotMatch(cuerpo, /\b(Gemini|Claude|ChatGPT|OpenAI|Copilot|Canvas|Artifacts?|Gems?)\b/i);
});

test('cabe en el límite recomendado de 500 líneas', () => {
  assert.ok(texto.split('\n').length <= 500);
});

test('la carpeta instalable solo contiene la skill y su licencia', () => {
  assert.deepEqual(readdirSync(join(repo, 'skills')), [carpetaSkill], 'una sola skill en skills/');
  assert.deepEqual(readdirSync(raiz).sort(), ['LICENSE.txt', 'SKILL.md']);
});

test('la licencia es CC BY-NC-ND 4.0 a nombre de Mack Chirinos en todas partes', () => {
  assert.match(frontmatter, /^license: CC BY-NC-ND 4\.0/m);
  for (const archivo of [leer('LICENSE'), leer('skills', carpetaSkill, 'LICENSE.txt')]) {
    assert.match(archivo, /Copyright \(c\) \d{4} Mack Chirinos/);
    assert.match(archivo, /by-nc-nd\/4\.0/);
  }
  assert.match(leer('LICENSE'), /Attribution-NonCommercial-NoDerivatives 4\.0\s+International Public\s+License/);
  assert.equal(JSON.parse(leer('package.json')).license, 'CC-BY-NC-ND-4.0');
});

test('la versión de package.json es la primera del CHANGELOG', () => {
  const { version } = JSON.parse(leer('package.json'));
  assert.equal(leer('CHANGELOG.md').match(/^## (\d+\.\d+\.\d+)/m)?.[1], version);
});

test('el instalador de PowerShell apunta a la skill y no lleva BOM', () => {
  const bytes = readFileSync(join(repo, 'install.ps1'));
  assert.notDeepEqual([...bytes.subarray(0, 3)], [0xef, 0xbb, 0xbf], 'un BOM rompe «irm | iex» en PowerShell 7');
  const ps = bytes.toString('utf8');
  assert.ok(ps.includes(`$nombre = '${carpetaSkill}'`), '$nombre debe ser el nombre de la skill');
  assert.ok(ps.includes('/main/skills/$nombre'), 'debe descargar desde skills/<nombre>');
  assert.ok(ps.includes('/releases/latest/download/$nombre.zip'), 'debe usar el .zip de la Release');
  assert.ok(![...bytes].some((b) => b > 127), 'solo ASCII: las tildes van como \\uXXXX');
});
