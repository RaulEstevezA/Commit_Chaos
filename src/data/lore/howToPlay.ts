import type { Localized } from '../../core/missions/types';

const l = (es: string, en: string): Localized => ({ es, en });

interface TitledText {
  title: Localized;
  body: Localized;
}

/** Texts of the “How to play” window. */
export const howToPlay = {
  title: l('Cómo jugar', 'How to play'),
  eyebrow: l('Antes de tocar nada', 'Before touching anything'),
  intro: l(
    'Commit Chaos es un simulador de comandos Git. No hay preguntas tipo test ni botones de respuesta: cada misión se resuelve escribiendo comandos Git de verdad en una terminal, como lo harías en tu ordenador. La diferencia es que aquí puedes romperlo todo sin que nadie te cite a una reunión.',
    'Commit Chaos is a Git command simulator. There are no quizzes and no answer buttons: every mission is solved by typing real Git commands into a terminal, just as you would on your own computer. The difference is that here you can break everything without anyone inviting you to a meeting.',
  ),
  whatIsGit: {
    title: l('¿Qué es Git? (por si no eres de informática)', 'What is Git? (in case you are not a developer)'),
    body: l(
      'Git es la herramienta que usan los equipos de desarrollo para guardar la historia de un proyecto. Cada vez que guardas un punto, llamado commit, puedes volver a él más tarde. Puedes abrir ramas para probar ideas sin estropear la versión buena y juntar el trabajo de varias personas sin que se pisen. Piensa en el control de cambios de un documento, pero para proyectos enteros y con muchas más formas de liarla. No necesitas saber nada antes de empezar: las primeras misiones te lo enseñan paso a paso.',
      'Git is the tool development teams use to keep the history of a project. Every time you save a checkpoint, called a commit, you can come back to it later. You can open branches to try ideas without breaking the good version, and combine several people’s work without them stepping on each other. Think of track changes in a document, but for whole projects and with many more ways to make a mess. You do not need to know anything beforehand: the first missions teach you step by step.',
    ),
  },
  steps: [
    {
      title: l('Lee la misión', 'Read the mission'),
      body: l('Arriba tienes la situación y el objetivo. Los círculos ○ se convierten en ✓ a medida que lo cumples.', 'At the top you have the situation and the objective. The ○ circles turn into ✓ as you complete it.'),
    },
    {
      title: l('Escribe comandos en la terminal', 'Type commands in the terminal'),
      body: l('Por ejemplo, git status o git commit -m "mensaje". Si un comando falla, verás el error como en un Git real y nada se rompe.', 'For example, git status or git commit -m "message". If a command fails, you will see the error just like in real Git, and nothing breaks.'),
    },
    {
      title: l('Mira el árbol de commits', 'Watch the commit tree'),
      body: l('A la derecha ves cómo cambia el repositorio con cada comando: commits, ramas y dónde estás (HEAD).', 'On the right you see how the repository changes with each command: commits, branches and where you are (HEAD).'),
    },
    {
      title: l('Resuélvela a tu manera', 'Solve it your way'),
      body: l('Se valida el resultado final, no un comando concreto. Si hay varios caminos, cualquiera que deje el repositorio bien vale.', 'The final result is checked, not one specific command. If there are several paths, any one that leaves the repository right counts.'),
    },
  ] satisfies TitledText[],
  cards: [
    {
      title: l('Palabras subrayadas y git help', 'Underlined words and git help'),
      body: l('Pulsa cualquier palabra subrayada para ver qué significa. En la terminal, git help muestra el glosario y git help rama explica un término.', 'Click any underlined word to see what it means. In the terminal, git help lists the glossary and git help branch explains a term.'),
    },
    {
      title: l('Botones de la misión', 'Mission buttons'),
      body: l('Pedir ayuda da pistas cada vez más claras. Comandos GIT muestra los que vas a necesitar. Historia vuelve a contarte la escena. Reiniciar misión deja todo como al principio.', 'Get help gives increasingly clear hints. GIT commands shows the ones you will need. Story replays the scene. Restart mission resets everything.'),
    },
    {
      title: l('Caos y finales', 'Chaos and endings'),
      body: l('Los errores, las pistas y las maniobras arriesgadas (force push, reset --hard, perderse fuera de una rama) suben el Chaos Meter. Mirar antes de actuar lo baja. Lo que acumules durante toda la partida, el Chaos Legacy, decide cuál de los cuatro finales te toca.', 'Errors, hints and risky moves (force push, reset --hard, wandering off a branch) raise the Chaos Meter. Looking before acting lowers it. What you accumulate over the whole game, your Chaos Legacy, decides which of the four endings you get.'),
    },
    {
      title: l('Modo libre y progreso', 'Free mode and progress'),
      body: l('El modo libre es un repositorio para practicar sin consecuencias. Dicen que esconde algo. Tu progreso se guarda solo en este navegador.', 'Free mode is a repository to practise in with no consequences. Rumour says it hides something. Your progress is saved only in this browser.'),
    },
  ] satisfies TitledText[],
  tip: l('Pato: En la primera misión solo necesitas un comando: git init. Yo te espero aquí. No tengo otra cosa que hacer.', 'Duck: In the first mission you only need one command: git init. I will wait here. I have nothing else to do.'),
  reopen: l('Puedes volver a abrir esta guía cuando quieras desde «Cómo jugar», en el menú principal.', 'You can reopen this guide at any time from “How to play” in the main menu.'),
  close: l('Entendido', 'Got it'),
};
