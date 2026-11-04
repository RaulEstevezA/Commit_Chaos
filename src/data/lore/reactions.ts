import type { Localized } from '../../core/missions/types';

type Voice = 1 | 2 | 3 | 4;
const line = (es: string, en: string): Localized => ({ es, en });

/** What the cast says the first time a mission sees a Git effect. Chapter 1 only has the duck. */
const effectLines: Record<string, Record<Voice, Localized>> = {
  'force-push': {
    1: line('Pato: Force push en un repositorio donde solo estás tú. Te has aplastado a ti mismo. Impresionante.', 'Duck: A force push in a repository with only you in it. You crushed yourself. Impressive.'),
    2: line('Laura: {player}, te acabo de enviar una invitación. Se titula “Hablemos”. Dura hasta el jueves.', 'Laura: {player}, I just sent you an invite. It is called “Let’s talk”. It runs until Thursday.'),
    3: line('Marcos: ¡Yo también lo hago así! Laura, ¿por qué me miras?', 'Marcos: That is how I do it too! Laura, why are you looking at me?'),
    4: line('ChaosBot: Force push registrado. Añadido a tu epílogo.', 'ChaosBot: Force push logged. Added to your epilogue.'),
  },
  'hard-reset': {
    1: line('Pato: Un reset --hard de madrugada. Clásico. Conoces el reflog, ¿verdad? …¿Verdad?', 'Duck: A reset --hard in the small hours. A classic. You do know about the reflog, right? …Right?'),
    2: line('Laura: {player}, dime que eso no lo has hecho en una rama compartida. No, mejor no me lo digas.', 'Laura: {player}, tell me that was not on a shared branch. No, actually, do not tell me.'),
    3: line('Marcos: Mira, justo así empezó lo mío.', 'Marcos: See, that is exactly how mine started.'),
    4: line('ChaosBot: Reset --hard detectado. Marcos ha soltado una lágrima de orgullo.', 'ChaosBot: Reset --hard detected. Marcos has shed a single proud tear.'),
  },
  detached: {
    1: line('Pato: Estás fuera de toda rama. Yo estuve ahí una vez. Llévate una bufanda.', 'Duck: You are outside every branch. I was there once. Take a scarf.'),
    2: line('Laura: {player}, tu HEAD no está en ninguna rama. Tu contrato sí. Vuelve.', 'Laura: {player}, your HEAD is not on any branch. Your contract is. Come back.'),
    3: line('Pato: Así empezó el Royal Maintainer. Un vistazo rápido a un commit viejo. Nada más.', 'Duck: That is how the Royal Maintainer started. A quick look at an old commit. Nothing more.'),
    4: line('ChaosBot: HEAD desacoplado. Tu silla ha quedado reservada indefinidamente.', 'ChaosBot: HEAD detached. Your chair has been reserved indefinitely.'),
  },
  'safe-force': {
    1: line('Pato: --force-with-lease. Alguien ha estado leyendo.', 'Duck: --force-with-lease. Somebody has been reading.'),
    2: line('Laura: Con lease. Esta reunión nos la ahorramos.', 'Laura: With a lease. We can skip that meeting.'),
    3: line('Marcos: ¿Y eso qué hace? Laura: Lo que tú no. Creo.', 'Marcos: What does that one do? Laura: What you do not. I think.'),
    4: line('ChaosBot: Push forzado con cinturón. Epílogo actualizado favorablemente.', 'ChaosBot: Forced push, seat belt on. Epilogue updated favorably.'),
  },
};

const errorLines: Record<Voice, Localized> = {
  1: line('Pato: Tercer error. No juzgo. Solo parpadeo muy despacio. Hay un botón de ayuda, por cierto.', 'Duck: Third error. I am not judging. I am just blinking very slowly. There is a help button, by the way.'),
  2: line('Laura: Tres errores. Ya has igualado la media de Marcos antes del café. Prueba con el botón de ayuda.', 'Laura: Three errors. That matches Marcos’s pre-coffee average. Try the help button.'),
  3: line('Marcos: Tranquilidad, a mí también me pasa. Aunque a mí me pasa en producción.', 'Marcos: Relax, it happens to me too. Although it happens to me in production.'),
  4: line('ChaosBot: Tres errores. Te recuerdo que eres la documentación.', 'ChaosBot: Three errors. Reminder: you are the documentation.'),
};

const lazyMessages = new Set(['fix', 'fixes', 'wip', 'asdf', 'test', 'cambios', 'changes', 'update', 'arreglo', '.', '...', 'ahora si', 'ahora sí', 'final']);

export interface ReactionContext {
  input: string;
  effects: string[];
  chapter: number | null;
  errors: number;
}

export interface Reaction {
  key: string;
  text: Localized;
  tag?: string;
}

function inputReactions(input: string, voice: Voice): Reaction[] {
  const command = input.trim().toLowerCase();
  if (command.startsWith('git blame')) {
    return [{
      key: 'blame',
      tag: 'blame',
      text: voice === 1
        ? line('Pato: Aquí no hay git blame. Tampoco hace falta: solo estamos tú y yo, y yo no tengo manos.', 'Duck: There is no git blame here. No need for one: it is just you and me, and I have no hands.')
        : voice === 2
          ? line('ChaosBot: El simulador no tiene git blame. Pero en esta oficina el resultado suele ser Marcos, sobre todo si el commit dice “temporal”.', 'ChaosBot: The simulator has no git blame. But in this office the result is usually Marcos, especially if the commit says “temporary”.')
          : voice === 3
            ? line('ChaosBot: No hay git blame. Resultado igualmente: Marcos.', 'ChaosBot: No git blame here. Result anyway: Marcos.')
            : line('ChaosBot: Marcos.', 'ChaosBot: Marcos.'),
    }];
  }
  if (command.startsWith('git gud')) return [{ key: 'gud', text: line('Pato: Ojalá existiera.', 'Duck: If only that existed.') }];
  if (command.startsWith('rm ')) return [{ key: 'rm', text: line('Pato: Suelta eso. Aquí solo se habla con Git.', 'Duck: Put that down. We only speak Git here.') }];
  if (command.startsWith('sudo')) return [{ key: 'sudo', text: line('Pato: Git no te odia por falta de permisos, {player}. Te odia por lo otro.', 'Duck: Git does not hate you for lack of permissions, {player}. It hates you for the other thing.') }];
  const message = /(?:-m|--message)\s+["']([^"']*)["']/.exec(input)?.[1]?.trim().toLowerCase();
  if (command.startsWith('git commit') && message !== undefined && lazyMessages.has(message)) {
    return [{
      key: 'lazy-message',
      tag: 'lazy-message',
      text: voice === 1
        ? line('Pato: Ese mensaje lo leerás dentro de seis meses. Sin contexto. A las tres de la mañana.', 'Duck: You will read that message in six months. Without context. At three in the morning.')
        : line('Laura: Un mensaje de commit precioso. Se lo voy a enseñar a Recursos Humanos.', 'Laura: What a beautiful commit message. I will be showing it to HR.'),
    }];
  }
  return [];
}

/** Cast reactions to a command. Each one fires at most once per mission, so they never become noise. */
export function reactionsFor(context: ReactionContext, seen: string[]): Reaction[] {
  const voice = (context.chapter ?? 1) as Voice;
  const found = inputReactions(context.input, voice);
  for (const effect of context.effects) {
    const lines = effectLines[effect];
    if (lines) found.push({ key: effect, text: lines[voice] });
  }
  if (context.errors === 3) found.push({ key: 'errors', text: errorLines[voice] });
  return found.filter((reaction) => !seen.includes(reaction.key));
}
