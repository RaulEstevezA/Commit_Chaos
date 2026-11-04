import type { Lang, Localized } from '../../core/missions/types';

export interface GlossaryEntry {
  id: string;
  term: Localized;
  definition: Localized;
  quip: Localized;
  /** Words marked in mission text. */
  aliases: { es: string[]; en: string[] };
  /** Extra names accepted by `git help`, such as the commands this entry explains. */
  help?: string[];
  /** Match aliases with their exact capitalization: "HEAD" is not "head". */
  exact?: boolean;
}

const l = (es: string, en: string): Localized => ({ es, en });
const same = (...aliases: string[]) => ({ es: aliases, en: aliases });

export const glossary: GlossaryEntry[] = [
  {
    id: 'repository',
    term: l('Repositorio', 'Repository'),
    definition: l('Carpeta de un proyecto cuyo historial de cambios guarda Git. git init crea uno.', 'A project folder whose change history is kept by Git. git init creates one.'),
    quip: l('Pato: Sin él, solo es una carpeta con esperanzas.', 'Duck: Without one, it is just a folder with hopes.'),
    aliases: { es: ['repositorio', 'repositorios'], en: ['repository', 'repositories'] },
    help: ['init'],
  },
  {
    id: 'commit',
    term: l('Commit', 'Commit'),
    definition: l('Una foto guardada del proyecto, con un mensaje y un identificador. El historial es una cadena de commits.', 'A saved snapshot of the project, with a message and an id. The history is a chain of commits.'),
    quip: l('Pato: Escribe el mensaje pensando en quien lo leerá a las tres de la mañana. Serás tú.', 'Duck: Write the message for whoever reads it at three in the morning. It will be you.'),
    aliases: same('commit', 'commits'),
  },
  {
    id: 'staging',
    term: l('Preparar cambios (staging)', 'Staging'),
    definition: l('Zona intermedia donde eliges qué cambios entrarán en el próximo commit. git add los pone ahí.', 'An intermediate area where you choose which changes go into the next commit. git add puts them there.'),
    quip: l('Pato: Es la maleta antes de cerrar la cremallera. Aún puedes sacar los calcetines.', 'Duck: It is the suitcase before you zip it. You can still take the socks out.'),
    aliases: { es: ['staging', 'prepara', 'preparar', 'preparado', 'preparados'], en: ['staging', 'stage', 'staged'] },
    help: ['add', 'preparar'],
  },
  {
    id: 'status',
    term: l('git status', 'git status'),
    definition: l('Muestra en qué rama estás y qué cambios tienes, preparados o no. No modifica nada.', 'Shows which branch you are on and what has changed, staged or not. It modifies nothing.'),
    quip: l('Pato: Antes de tocar nada, mira dónde estás.', 'Duck: Before touching anything, check where you are.'),
    aliases: same('git status'),
    help: ['status'],
  },
  {
    id: 'log',
    term: l('git log', 'git log'),
    definition: l('Muestra el historial de commits desde donde estás, del más reciente al más antiguo.', 'Shows the commit history from where you are, newest first.'),
    quip: l('Laura: Está todo ahí. Salir de él ya es otra cosa.', 'Laura: It is all in there. Getting out is another matter.'),
    aliases: same('git log'),
    help: ['log'],
  },
  {
    id: 'show',
    term: l('git show', 'git show'),
    definition: l('Enseña un commit concreto. Con commit:ruta, el contenido de un archivo en ese commit.', 'Displays a specific commit. With commit:path, the contents of a file in that commit.'),
    quip: l('ChaosBot: Útil para averiguar qué era exactamente un “cambio mínimo”.', 'ChaosBot: Useful for finding out what exactly a “tiny change” was.'),
    aliases: same('git show'),
    help: ['show'],
  },
  {
    id: 'branch',
    term: l('Rama', 'Branch'),
    definition: l('Línea de trabajo independiente: un nombre que apunta a un commit y avanza con cada commit nuevo. git switch o git checkout cambian de una a otra.', 'An independent line of work: a name that points to a commit and moves forward with each new one. git switch or git checkout move between them.'),
    quip: l('Laura: Aquí una rama evita una reunión.', 'Laura: A branch here prevents a meeting.'),
    aliases: { es: ['rama', 'ramas'], en: ['branch', 'branches'] },
    help: ['branch', 'switch', 'checkout'],
  },
  {
    id: 'main',
    term: l('main', 'main'),
    definition: l('La rama principal, por convención. Suele contener lo que funciona o lo que se publica.', 'The primary branch, by convention. It usually holds what works or what gets released.'),
    quip: l('Pato: “Suele”.', 'Duck: “Usually”.'),
    aliases: same('main', 'Main'),
    exact: true,
  },
  {
    id: 'head',
    term: l('HEAD', 'HEAD'),
    definition: l('Indica dónde estás ahora: normalmente, en tu rama actual y su último commit.', 'Marks where you are now: normally your current branch and its latest commit.'),
    quip: l('Pato: Es el “usted está aquí” del mapa.', 'Duck: It is the “you are here” on the map.'),
    aliases: same('HEAD'),
    exact: true,
  },
  {
    id: 'detached',
    term: l('Detached HEAD', 'Detached HEAD'),
    definition: l('HEAD apunta a un commit, no a una rama. Puedes mirar, pero los commits que hagas quedarán sueltos si no les creas una rama.', 'HEAD points to a commit, not a branch. You can look around, but any commits you make stay loose unless you create a branch for them.'),
    quip: l('Marcos: Solo estaba mirando.', 'Marcos: I was only looking.'),
    aliases: same('detached HEAD'),
    help: ['detached'],
  },
  {
    id: 'merge',
    term: l('Merge (fusión)', 'Merge'),
    definition: l('Une el trabajo de otra rama a la actual, normalmente con un commit de dos padres. La historia de ambas se conserva.', 'Combines another branch’s work into the current one, usually with a two-parent commit. Both histories are kept.'),
    quip: l('Laura: Y si las dos tocan lo mismo, mira “conflicto”.', 'Laura: And if both touch the same thing, see “conflict”.'),
    aliases: { es: ['merge', 'merges', 'fusiona', 'fusionar', 'fusión', 'fusiones'], en: ['merge', 'merges', 'merged', 'merging'] },
    help: ['fusion'],
  },
  {
    id: 'conflict',
    term: l('Conflicto', 'Conflict'),
    definition: l('Ocurre cuando dos ramas cambian lo mismo y Git no puede elegir. Decides el resultado, lo preparas con git add y haces commit.', 'Happens when two branches change the same thing and Git cannot choose. You decide the result, stage it with git add, and commit.'),
    quip: l('Laura: Es Git pidiéndote que hables con alguien. Por eso da tanto miedo.', 'Laura: It is Git asking you to talk to someone. That is why it is so scary.'),
    aliases: { es: ['conflicto', 'conflictos'], en: ['conflict', 'conflicts', 'conflicted'] },
  },
  {
    id: 'stash',
    term: l('Stash', 'Stash'),
    definition: l('Guarda tus cambios sin hacer commit y deja la carpeta limpia. git stash pop los recupera y los quita del stash.', 'Saves your changes without committing and leaves the folder clean. git stash pop brings them back and removes them from the stash.'),
    quip: l('Pato: Como el táper del fondo de la nevera. Ábrelo antes de que desarrolle opiniones propias.', 'Duck: Like the tupperware at the back of the fridge. Open it before it develops opinions.'),
    aliases: same('stash', 'stashes'),
  },
  {
    id: 'remote',
    term: l('Remoto (origin)', 'Remote (origin)'),
    definition: l('Copia del repositorio en otro lugar, normalmente un servidor compartido. origin es el nombre habitual del principal.', 'A copy of the repository somewhere else, usually a shared server. origin is the usual name for the main one.'),
    quip: l('Pato: Hasta aquí, tus errores eran privados.', 'Duck: Until now, your mistakes were private.'),
    aliases: { es: ['remoto', 'remotos', 'origin', 'origin/main'], en: ['remote', 'remotes', 'origin', 'origin/main'] },
  },
  {
    id: 'fetch',
    term: l('Fetch', 'Fetch'),
    definition: l('Descarga las novedades del remoto sin tocar tu rama ni tus archivos.', 'Downloads what is new on the remote without touching your branch or your files.'),
    quip: l('Pato: Mirar antes de saltar. Pruébalo alguna vez.', 'Duck: Look before you leap. Try it sometime.'),
    aliases: same('fetch'),
  },
  {
    id: 'pull',
    term: l('Pull', 'Pull'),
    definition: l('Trae los cambios del remoto y los integra en tu rama: un fetch seguido de una integración.', 'Brings in changes from the remote and integrates them into your branch: a fetch followed by an integration.'),
    quip: l('Marcos: Yo hago pull y luego miro. A veces.', 'Marcos: I pull first and look later. Sometimes.'),
    aliases: same('pull'),
  },
  {
    id: 'push',
    term: l('Push', 'Push'),
    definition: l('Envía tus commits al remoto para que los vea el resto.', 'Sends your commits to the remote so everyone else can see them.'),
    quip: l('ChaosBot: A partir de aquí, también es problema de otros.', 'ChaosBot: From here on, it is also someone else’s problem.'),
    aliases: { es: ['push'], en: ['push', 'pushed', 'pushing'] },
  },
  {
    id: 'force',
    term: l('Force push', 'Force push'),
    definition: l('Sobrescribe el remoto con tu versión, aunque eso borre lo que otros subieron.', 'Overwrites the remote with your version, even if that erases what others pushed.'),
    quip: l('ChaosBot: --force es salir por el parabrisas.', 'ChaosBot: --force is leaving through the windshield.'),
    aliases: same('--force', 'force push'),
    help: ['force', 'force-push'],
  },
  {
    id: 'lease',
    term: l('--force-with-lease', '--force-with-lease'),
    definition: l('Push forzado que se cancela si alguien ha subido algo que no has visto. Es la forma prudente de publicar una rama reescrita.', 'A forced push that cancels itself if someone pushed something you have not seen. It is the careful way to publish a rewritten branch.'),
    quip: l('ChaosBot: Es el cinturón de seguridad.', 'ChaosBot: It is the seat belt.'),
    aliases: { es: ['--force-with-lease', 'force-with-lease', 'push forzado seguro', 'lease'], en: ['--force-with-lease', 'force-with-lease', 'safe forced push', 'lease'] },
  },
  {
    id: 'rebase',
    term: l('Rebase', 'Rebase'),
    definition: l('Reaplica los commits de tu rama sobre otra base para dejar una historia lineal. Reescribe esos commits, así que ten cuidado si ya son compartidos.', 'Replays your branch’s commits on a new base to keep history linear. It rewrites those commits, so be careful if they are already shared.'),
    quip: l('Laura: Historia limpia. Hazle una foto.', 'Laura: Clean history. Take a picture.'),
    aliases: { es: ['rebase', 'rebasea', 'rebasear'], en: ['rebase', 'rebased'] },
  },
  {
    id: 'cherry-pick',
    term: l('Cherry-pick', 'Cherry-pick'),
    definition: l('Copia un commit concreto a tu rama actual, sin traer el resto de su rama.', 'Copies one specific commit onto your current branch, without the rest of its branch.'),
    quip: l('Marcos: Llévate lo que quieras. Menos lo de TEST NO BORRAR.', 'Marcos: Take whatever you want. Except TEST DO NOT DELETE.'),
    aliases: same('cherry-pick'),
  },
  {
    id: 'reset',
    term: l('Reset', 'Reset'),
    definition: l('Mueve la rama actual a otro commit. Con --hard también descarta los cambios sin confirmar, así que úsalo con cuidado.', 'Moves the current branch to another commit. With --hard it also discards uncommitted changes, so use it carefully.'),
    quip: l('Pato: Conoces el reflog, ¿verdad? …¿Verdad?', 'Duck: You do know about the reflog, right? …Right?'),
    aliases: same('reset'),
  },
  {
    id: 'revert',
    term: l('Revert', 'Revert'),
    definition: l('Crea un commit nuevo que deshace otro. No reescribe la historia, así que es seguro en ramas compartidas.', 'Creates a new commit that undoes another. It does not rewrite history, so it is safe on shared branches.'),
    quip: l('Laura: Marcos ya tiene doce. Los colecciona.', 'Laura: Marcos has twelve now. He collects them.'),
    aliases: { es: ['revert', 'reverts', 'revierte', 'revertir', 'reviértelo', 'reversión'], en: ['revert', 'reverts', 'reverted'] },
  },
  {
    id: 'reflog',
    term: l('Reflog', 'Reflog'),
    definition: l('Registro local de por dónde ha pasado HEAD. Sirve para recuperar commits que ya no salen en git log, aunque las entradas acaban caducando.', 'A local record of where HEAD has been. It can recover commits that no longer appear in git log, although entries eventually expire.'),
    quip: l('Marcos: Quiero un abogado.', 'Marcos: I want a lawyer.'),
    aliases: same('reflog'),
  },
  {
    id: 'tag',
    term: l('Tag (etiqueta)', 'Tag'),
    definition: l('Nombre fijo para un commit concreto, normalmente una versión como v1.0.', 'A fixed name for a specific commit, usually a version like v1.0.'),
    quip: l('Pato: Cuando todo arda, querrás saber que una vez funcionó.', 'Duck: When everything burns, you will want to know it worked once.'),
    aliases: { es: ['tag', 'tags', 'etiqueta', 'etiquetas'], en: ['tag', 'tags'] },
    help: ['etiqueta'],
  },
  {
    id: 'hotfix',
    term: l('Hotfix', 'Hotfix'),
    definition: l('Arreglo urgente de un problema en producción. También se llama así a la rama donde se prepara.', 'An urgent fix for a production problem. The branch where it is prepared often has the same name.'),
    quip: l('Laura: “Urgente” no significa “sin revisar”. Marcos.', 'Laura: “Urgent” does not mean “unreviewed”. Marcos.'),
    aliases: same('hotfix'),
  },
  {
    id: 'production',
    term: l('Producción', 'Production'),
    definition: l('El sistema real que usan los clientes. Si se rompe, se nota.', 'The real system customers use. If it breaks, people notice.'),
    quip: l('ChaosBot: Estado: Todo bajo control™.', 'ChaosBot: Status: Everything under control™.'),
    aliases: { es: ['producción'], en: ['production'] },
    help: ['produccion'],
  },
  {
    id: 'deploy',
    term: l('Despliegue (deploy)', 'Deployment'),
    definition: l('Poner en marcha una versión del software en producción.', 'Putting a version of the software live in production.'),
    quip: l('Sonia (Ventas): Ya está desplegado. En la presentación.', 'Sonia (Sales): It is already deployed. In the slides.'),
    aliases: { es: ['despliegue', 'despliegues', 'desplegar', 'deploy'], en: ['deployment', 'deployments', 'deploy'] },
    help: ['despliegue'],
  },
];

export const glossaryById = Object.fromEntries(glossary.map((entry) => [entry.id, entry])) as Record<string, GlossaryEntry>;

export const sortedGlossary = (lang: Lang) => [...glossary].sort((a, b) => a.term[lang].replace(/^-+/, '').localeCompare(b.term[lang].replace(/^-+/, ''), lang));

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function aliasPattern(lang: Lang) {
  const aliases = glossary.flatMap((entry) => entry.aliases[lang]).sort((a, b) => b.length - a.length);
  // Words only: never inside a path like src/status.ts or a name like feature/login.
  return new RegExp(`(?<![\\p{L}\\p{N}_/.-])(?:${aliases.map(escapeRegExp).join('|')})(?![\\p{L}\\p{N}_/-]|\\.\\p{L})`, 'giu');
}

const patterns: Record<Lang, RegExp> = { es: aliasPattern('es'), en: aliasPattern('en') };

function entryForMatch(match: string, lang: Lang) {
  const lower = match.toLowerCase();
  return glossary.find((entry) => entry.aliases[lang].some((alias) => (entry.exact ? alias === match : alias.toLowerCase() === lower)));
}

export interface GlossarySegment {
  text: string;
  termId?: string;
}

/** Splits text so the first mention of each glossary term can be marked. */
export function splitGlossary(text: string, lang: Lang): GlossarySegment[] {
  const segments: GlossarySegment[] = [];
  const marked = new Set<string>();
  let cursor = 0;
  for (const match of text.matchAll(patterns[lang])) {
    const entry = entryForMatch(match[0], lang);
    if (!entry || marked.has(entry.id)) continue;
    marked.add(entry.id);
    if (match.index > cursor) segments.push({ text: text.slice(cursor, match.index) });
    segments.push({ text: match[0], termId: entry.id });
    cursor = match.index + match[0].length;
  }
  if (cursor < text.length) segments.push({ text: text.slice(cursor) });
  return segments;
}

function lookup(query: string) {
  const wanted = query.trim().toLowerCase().replace(/^git\s+/, '');
  return glossary.find((entry) => entry.id === wanted
    || entry.help?.includes(wanted)
    || [entry.term.es, entry.term.en, ...entry.aliases.es, ...entry.aliases.en].some((name) => name.toLowerCase().replace(/^git\s+/, '') === wanted));
}

export interface HelpResult {
  output: string[];
  quip?: string;
}

/** Answers `git help`, `git help <term>` and `git <command> --help`. Returns null for anything else. */
export function helpFor(input: string, lang: Lang): HelpResult | null {
  const command = input.trim();
  const general = /^git(?:\s+help|\s+--help|\s+-h)$/i.test(command);
  const query = /^git\s+help\s+(.+)$/i.exec(command)?.[1] ?? /^git\s+(\S+)\s+(?:--help|-h)$/i.exec(command)?.[1];
  if (!general && !query) return null;
  if (general) {
    return {
      output: [
        lang === 'es' ? 'Uso: git help <término>. Puedes preguntar por:' : 'Usage: git help <term>. You can ask about:',
        sortedGlossary(lang).map((entry) => entry.term[lang]).join(', '),
      ],
    };
  }
  const entry = lookup(query!.replace(/^["']|["']$/g, ''));
  if (!entry) {
    return {
      output: [lang === 'es' ? `No hay ayuda sobre “${query}”.` : `No help available for “${query}”.`],
      quip: lang === 'es' ? 'Pato: De eso no tengo nada. Escribe git help para ver lo que sé.' : 'Duck: I have nothing on that. Type git help to see what I know.',
    };
  }
  return { output: [`${entry.term[lang]}: ${entry.definition[lang]}`], quip: entry.quip[lang] };
}
