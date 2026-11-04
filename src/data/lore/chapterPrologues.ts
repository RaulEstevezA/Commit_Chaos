import type { Localized } from '../../core/missions/types';

export interface ChapterPrologue {
  chapter: 1 | 2 | 3 | 4;
  signal: Localized;
  title: Localized;
  paragraphs: { es: string[]; en: string[] };
  speaker: Localized;
  quote: Localized;
  action: Localized;
}

export const chapterPrologues: Record<ChapterPrologue['chapter'], ChapterPrologue> = {
  1: {
    chapter: 1,
    signal: { es: 'CASA · 01:12 · PROYECTO PERSONAL', en: 'HOME · 01:12 · PERSONAL PROJECT' },
    title: { es: 'La primera víctima del repositorio', en: 'The repository’s first victim' },
    paragraphs: {
      es: [
        'Es tarde. Demasiado tarde para empezar algo y demasiado pronto para admitir que deberías dormir. Has abierto ese juego sobre un pato que, según el README, era “una prueba rápida”.',
        'Solo estáis tú, una taza de café y un pato de goma con gafas de sol e inquietantes responsabilidades técnicas. No recuerdas haberlo comprado. Aquí no hay compañeros, procesos ni copias mágicas: cada desastre será tuyo y cada recuperación también.',
      ],
      en: [
        'It is late. Too late to start something and too early to admit you should be asleep. You have opened that game about a duck, which the README calls “a quick experiment”.',
        'It is just you, a mug of coffee and a rubber duck with sunglasses and alarming technical responsibilities. You do not remember buying it. There are no coworkers, processes or magic backups here: every disaster will be yours, and so will every recovery.',
      ],
    },
    speaker: { es: 'PATO DE GOMA', en: 'RUBBER DUCK' },
    quote: { es: '“{player}, antes de tocar nada: mira dónde estás.”', en: '“{player}, before touching anything: check where you are.”' },
    action: { es: 'Abrir la terminal', en: 'Open the terminal' },
  },
  2: {
    chapter: 2,
    signal: { es: 'CHAOSWARE · DÍA 1 · 08:57', en: 'CHAOSWARE · DAY 1 · 08:57' },
    title: { es: 'Bienvenido. No rompas nada.', en: 'Welcome. Do not break anything.' },
    paragraphs: {
      es: [
        'Tu primer día en ChaosWare, creadores de CalmOps, “estabilidad como servicio”, empieza con un portátil nuevo, una mesa impecable y la sospechosa promesa de que aquí todo está bajo control. Laura te enseña el repositorio compartido y señala producción con el respeto reservado a los animales salvajes. Cuentan que hace años escribía más código que toda la planta junta. Ahora escribe, sobre todo, invitaciones de calendario.',
        'Marcos aparece antes de que termines de configurar el teclado. Dice que necesita “un favor rápido”. A partir de ahora tus commits ya no viven solos: pueden bloquear a otra persona, salvar una entrega o convertir la daily en una investigación forense.',
      ],
      en: [
        'Your first day at ChaosWare, makers of CalmOps, “stability as a service”, begins with a new laptop, a spotless desk and the suspicious promise that everything is under control. Laura shows you the shared repository and points at production with the respect normally reserved for wild animals. They say she once wrote more code than the whole floor combined. These days she mostly writes calendar invites.',
        'Marcos appears before you finish configuring the keyboard. He needs “a quick favor”. From now on your commits do not live alone: they can block a teammate, save a release or turn the daily into a forensic investigation.',
      ],
    },
    speaker: { es: 'LAURA · TEAM LEAD', en: 'LAURA · TEAM LEAD' },
    quote: { es: '“Pregunta antes de hacer force push. Preferiblemente varios días antes.”', en: '“Ask before force pushing. Preferably several days before.”' },
    action: { es: 'Fichar en ChaosWare', en: 'Clock in at ChaosWare' },
  },
  3: {
    chapter: 3,
    signal: { es: 'CHAOSWARE · TU ESCRITORIO · AÑOS DESPUÉS', en: 'CHAOSWARE · YOUR DESK · YEARS LATER' },
    title: { es: 'Ahora te llaman a ti', en: 'Now they call you' },
    paragraphs: {
      es: [
        'El portátil ganó dos monitores. La mesa ganó plantas, libros, notas indescifrables y, en el fondo de la oficina, una taza de “Keep calm and git push” que nadie se atreve a tocar. Tú ganaste experiencia suficiente para reconocer un conflicto por el sonido que hace Marcos al acercarse.',
        'Laura coordina las entregas y, de vez en cuando, te pregunta cómo se hacía algo con aire de estar examinándote; tú rescatas ramas, reconstruyes historiales y proteges trabajo que no escribiste. Ya no basta con encontrar una solución: debe ser segura, explicable y dejar al equipo en mejor estado del que lo encontraste.',
      ],
      en: [
        'The laptop gained two monitors. The desk gained plants, books, indecipherable notes and, at the back of the office, a “Keep calm and git push” mug nobody dares to touch. You gained enough experience to recognize a conflict by the sound Marcos makes while approaching.',
        'Laura coordinates releases and now and then asks you how something is done, as though she were testing you; you rescue branches, rebuild histories and protect work you did not write. Finding a solution is no longer enough: it must be safe, explainable and leave the team better than you found it.',
      ],
    },
    speaker: { es: 'MARCOS · DESDE ALGÚN LUGAR', en: 'MARCOS · FROM SOMEWHERE' },
    quote: { es: '“{player}, Git ha hecho una cosa rara. Yo solo estaba mirando.”', en: '“{player}, Git did something weird. I was only looking.”' },
    action: { es: 'Investigar el ruido', en: 'Investigate the noise' },
  },
  4: {
    chapter: 4,
    signal: { es: 'PRODUCCIÓN · VIERNES · 17:59', en: 'PRODUCTION · FRIDAY · 17:59' },
    title: { es: 'Todo está ardiendo', en: 'Everything is on fire' },
    paragraphs: {
      es: [
        'CalmOps ha caído, y la página de estado sigue diciendo que todo va bien. Alguien instala un tercer monitor porque dos crisis simultáneas ya no caben en los anteriores. Afuera hay tormenta; dentro, las alertas rojas compiten con una caja de pizza por el último espacio libre de la mesa.',
        'Laura dirige el incidente. Se ha ofrecido a desplegar ella misma, ha escrito `svn commit` y todo el mundo ha fingido no verlo. Marcos ha pronunciado las palabras “creo que el reflog lo guarda”. Tú eres la persona que más tiempo lleva aquí y, por una cadena de decisiones administrativas cuestionables, también eres la última esperanza de ChaosWare.',
        'A partir de ahora no solo importa que producción sobreviva. La forma en que uses Git decidirá qué historia contará la empresa sobre ti.',
      ],
      en: [
        'CalmOps is down, and the status page still says everything is fine. Somebody installs a third monitor because two simultaneous crises no longer fit on the others. A storm rages outside; inside, red alerts compete with a pizza box for the last free patch of desk.',
        'Laura runs the incident. She offered to deploy it herself, typed `svn commit`, and everyone pretended not to see. Marcos has spoken the words “I think the reflog keeps it”. You are the longest-serving person here and, through a chain of questionable management decisions, ChaosWare’s last hope.',
        'From now on, production surviving is not the only thing that matters. The way you use Git will decide which story the company tells about you.',
      ],
    },
    speaker: { es: 'LAURA · CANAL DE INCIDENTES', en: 'LAURA · INCIDENT CHANNEL' },
    quote: { es: '“{player}, respira. Mira el historial. Y no empeores el viernes.”', en: '“{player}, breathe. Read the history. And do not make Friday worse.”' },
    action: { es: 'Entrar en el incidente', en: 'Join the incident' },
  },
};
