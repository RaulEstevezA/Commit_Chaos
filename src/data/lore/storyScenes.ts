import type { Localized } from '../../core/missions/types';
import type { Chapter, StoryBeat, StoryLine } from './story';

const l = (es: string, en: string): Localized => ({ es, en });
const say = (speaker: Localized, es: string, en: string): StoryLine => ({ speaker, text: l(es, en) });

const DUCK = l('PATO DE GOMA', 'RUBBER DUCK');
const LAURA = l('LAURA · TEAM LEAD', 'LAURA · TEAM LEAD');
const MARCOS = l('MARCOS', 'MARCOS');
const SONIA = l('SONIA · VENTAS', 'SONIA · SALES');
const BOT = l('CHAOSBOT', 'CHAOSBOT');

interface SceneInput {
  signal: [string, string];
  title: [string, string];
  es: string[];
  en: string[];
  lines: StoryLine[];
  action: [string, string];
}

const beat = (kind: 'scene' | 'closing', chapter: Chapter, mission: number, input: SceneInput): StoryBeat => ({
  id: `${kind}-${String(mission).padStart(2, '0')}`,
  chapter,
  kind,
  mission,
  signal: l(...input.signal),
  title: l(...input.title),
  paragraphs: { es: input.es, en: input.en },
  lines: input.lines,
  action: l(...input.action),
});
const scene = (chapter: Chapter, mission: number, input: SceneInput) => beat('scene', chapter, mission, input);
const closing = (chapter: Chapter, mission: number, input: SceneInput) => beat('closing', chapter, mission, input);

export const storyScenes: StoryBeat[] = [
  // ── Capítulo 1: en casa ──────────────────────────────────────────────
  scene(1, 3, {
    signal: ['CASA · AL DÍA SIGUIENTE · 14:37', 'HOME · THE NEXT DAY · 14:37'],
    title: ['Resaca de código', 'Code hangover'],
    es: [
      'Te despiertas sobre el escritorio con la marca de la tecla Enter en la mejilla. El café de anoche ha formado una película que podría tener su propio repositorio. En la pantalla, un archivo con cuatrocientas jotas seguidas y un cursor parpadeando con cara de saber algo.',
      'El pato no se ha movido. O sí: juras que anoche miraba hacia la ventana. Ahora te mira a ti. app.ts tiene cambios, y tú no recuerdas ninguno.',
    ],
    en: [
      'You wake up on the desk with the Enter key printed on your cheek. Last night’s coffee has grown a film that could have its own repository. On screen: a file with four hundred j’s in a row and a cursor blinking like it knows something.',
      'The duck has not moved. Or has it: you could swear it was facing the window last night. Now it is facing you. app.ts has changes, and you remember none of them.',
    ],
    lines: [
      say(DUCK, 'Dormiste sobre el teclado. Las jotas son lo mejor que has programado esta semana.', 'You fell asleep on the keyboard. The j’s are the best code you wrote this week.'),
      say(DUCK, 'Lo otro lo escribiste despierto. Eso es lo preocupante.', 'The other thing you wrote awake. That is the worrying part.'),
    ],
    action: ['Mirar qué hice', 'See what I did'],
  }),
  scene(1, 5, {
    signal: ['CASA · MARTES · 23:40', 'HOME · TUESDAY · 23:40'],
    title: ['Llamada perdida (de tu madre)', 'Missed call (from your mother)'],
    es: [
      'Tres llamadas perdidas y un audio de cuatro minutos. Lo escuchas a doble velocidad: “¿Sigues con lo del pato? Tu primo ya tiene plaza fija. No te digo nada. Pero tiene plaza fija”.',
      'Le contestas que estás “montando un proyecto con salida profesional”. Detrás de ti, el pato de tu juego sale disparado hacia el techo cada vez que alguien pulsa pausa. Nadie ha pulsado pausa. El pato de goma ha decidido no comentar nada, lo cual es peor.',
    ],
    en: [
      'Three missed calls and a four-minute voice note. You play it at double speed: “Are you still doing the duck thing? Your cousin got a permanent position. I am not saying anything. But permanent.”',
      'You reply that you are “building a project with real career prospects”. Behind you, the duck in your game shoots up to the ceiling whenever someone presses pause. Nobody has pressed pause. The rubber duck has chosen not to comment, which is worse.',
    ],
    lines: [
      say(DUCK, 'Tu madre tiene razón en una cosa: deberías cenar.', 'Your mother is right about one thing: you should eat.'),
      say(DUCK, 'En lo del pato se equivoca. Ahora aparca eso y arregla main antes de que llame otra vez.', 'About the duck she is wrong. Now park that and fix main before she calls again.'),
    ],
    action: ['Silenciar el móvil', 'Mute the phone'],
  }),
  scene(1, 7, {
    signal: ['CASA · SÁBADO · 04:02', 'HOME · SATURDAY · 04:02'],
    title: ['Tres likes y un mal presentimiento', 'Three likes and a bad feeling'],
    es: [
      'Has subido una captura de la pantalla de título a un foro de desarrollo: un pato, unas gafas de sol y la palabra GAME en Comic Sans. Tres likes. Uno es tuyo, desde otra cuenta. Otro, de tu madre, que no sabes cómo ha llegado ahí.',
      'El tercero es de una cuenta llamada “ChaosWare Talent” con un logo que parece un nudo de ramas. El pato de goma se queda mirando la notificación mucho rato. Por primera vez desde que lo conoces, no tiene nada sarcástico que decir.',
    ],
    en: [
      'You posted a screenshot of the title screen to a dev forum: a duck, sunglasses and the word GAME in Comic Sans. Three likes. One is yours, from another account. Another is your mother’s, and you do not know how she got there.',
      'The third is from an account called “ChaosWare Talent”, with a logo that looks like a knot of branches. The rubber duck stares at the notification for a long time. For the first time since you met it, it has nothing sarcastic to say.',
    ],
    lines: [
      say(DUCK, '…', '…'),
      say(DUCK, 'Nada. Fusiona esa rama. Y no te quites las gafas del título. Las vas a necesitar.', 'Nothing. Merge that branch. And keep the sunglasses on the title screen. You are going to need them.'),
    ],
    action: ['Ignorar el presentimiento', 'Ignore the feeling'],
  }),
  closing(1, 8, {
    signal: ['CASA · DOMINGO · 23:58', 'HOME · SUNDAY · 23:58'],
    title: ['El lunes empieza todo', 'Everything starts on Monday'],
    es: [
      'Preparas la mochila: portátil, cargador, una camisa que solo has planchado por delante. El README sigue diciendo que esto era “una prueba rápida”. Ahora tiene una etiqueta v1.0 y una oferta de trabajo detrás.',
      'Cuando vas a cerrar la cremallera, el pato ya está dentro. No lo has metido tú. Lleva las gafas puestas y una expresión de quien vuelve a un sitio en el que ya estuvo.',
    ],
    en: [
      'You pack your bag: laptop, charger, a shirt you only ironed on the front. The README still says this was “a quick experiment”. Now it has a v1.0 tag and a job offer behind it.',
      'When you go to zip the bag, the duck is already inside. You did not put it there. It has its sunglasses on and the look of someone returning to a place they have been before.',
    ],
    lines: [
      say(DUCK, 'Me voy contigo. No era una pregunta.', 'I am coming with you. That was not a question.'),
      say(DUCK, 'Una cosa, {player}: allí hay más gente. Y no todos tienen un pato.', 'One thing, {player}: there are other people there. And not all of them have a duck.'),
    ],
    action: ['Poner tres alarmas', 'Set three alarms'],
  }),

  // ── Capítulo 2: primer trabajo en ChaosWare ─────────────────────────
  scene(2, 11, {
    signal: ['CHAOSWARE · DÍA 1 · 12:30 · VISITA GUIADA', 'CHAOSWARE · DAY 1 · 12:30 · GUIDED TOUR'],
    title: ['La visita guiada', 'The guided tour'],
    es: [
      'Laura te enseña la oficina a paso de incidente. La sala “Sinergia”, con una pizarra que pone NO BORRAR desde 2019. El rack de servidores, con un pósit que dice “no tocar, funciona”. La cocina, donde alguien ha etiquetado un yogur con “PRODUCCIÓN”. Y al fondo, una silla vacía con un cartel de “Reservado” y una taza de “Keep calm and git push”. Nadie te explica para quién es.',
      'Entonces aparece Sonia, de Ventas, que en treinta segundos te da la mano, te llama “recurso” y te vende una garantía extendida para tu propio portátil.',
    ],
    en: [
      'Laura shows you the office at incident pace. The “Synergy” room, with a whiteboard that has said DO NOT ERASE since 2019. The server rack, with a sticky note saying “do not touch, it works”. The kitchen, where someone has labelled a yogurt “PRODUCTION”. And at the back, an empty chair with a “Reserved” sign and a “Keep calm and git push” mug. Nobody tells you who it is for.',
      'Then Sonia from Sales shows up and, in thirty seconds, shakes your hand, calls you “a resource” and sells you an extended warranty for your own laptop.',
    ],
    lines: [
      say(SONIA, '¡La persona nueva! ¿Sabes hacer que el botón de soporte haga algo? Se lo he prometido a un cliente. Para ayer.', 'The new person! Can you make the support button do something? I promised a client. For yesterday.'),
      say(LAURA, 'Ya lo ha arreglado, Sonia. Solo falta subirlo.', 'It is already fixed, Sonia. It just needs pushing.'),
      say(SONIA, 'Perfecto. Entonces lo vendo como “soporte predictivo”.', 'Perfect. Then I will sell it as “predictive support”.'),
    ],
    action: ['Volver a tu mesa', 'Back to your desk'],
  }),
  scene(2, 13, {
    signal: ['CHAOSWARE · SEMANA 2 · DAILY (15 MIN)', 'CHAOSWARE · WEEK 2 · DAILY (15 MIN)'],
    title: ['La daily de quince minutos', 'The fifteen-minute daily'],
    es: [
      'La daily dura cuarenta y siete minutos. Marcos informa: “Ayer estuve mirando cosas. Hoy seguiré mirando cosas. Sin bloqueos”. Sonia pregunta si alguien puede “añadir IA” a la página de estado. El calendario de Laura tiene, a las once, una reunión titulada “Reducir reuniones”.',
      'Laura sigue eufórica por su commit de ayer, el primero en dos años. Tan eufórica que anuncia que hoy también tocará código: va a cambiar ella misma el mensaje de error. El mismo que tú cambiaste anoche. El pato, desde tu mochila, emite un leve chirrido.',
    ],
    en: [
      'The daily lasts forty-seven minutes. Marcos reports: “Yesterday I was looking at things. Today I will keep looking at things. No blockers.” Sonia asks whether someone can “add AI” to the status page. Laura’s calendar has an eleven o’clock meeting called “Reduce meetings”.',
      'Laura is still euphoric about yesterday’s commit, her first in two years. So euphoric that she announces she will touch code again today: she is changing the error message herself. The same one you changed last night. From your backpack, the duck lets out a faint squeak.',
    ],
    lines: [
      say(LAURA, 'Llevo años diciendo que “Todo bajo control” no es un mensaje de error. Es una amenaza.', 'I have been saying for years that “Everything under control” is not an error message. It is a threat.'),
      say(MARCOS, '¿Y si lo dejamos como está? A mí me tranquiliza.', 'What if we leave it as it is? I find it soothing.'),
      say(DUCK, '{player}. Huele a conflicto.', '{player}. I smell a conflict.'),
    ],
    action: ['Abrir el archivo con miedo', 'Open the file, nervously'],
  }),
  scene(2, 15, {
    signal: ['CHAOSWARE · SEMANA 6 · REVISIÓN DE CÓDIGO', 'CHAOSWARE · WEEK 6 · CODE REVIEW'],
    title: ['Tu primera code review', 'Your first code review'],
    es: [
      'Has abierto tu primera pull request. En dos minutos tiene treinta y siete comentarios. Treinta y seis son de ChaosBot y tratan de espacios en blanco. El otro es de Marcos: “LGTM 👍”, enviado antes de que terminara de cargar la página.',
      'Laura la mira de verdad. Dice que el código está bien, pero que tu rama parece venir del pasado: nació antes del último cambio de main y la revisión es un viaje en el tiempo con efectos secundarios.',
    ],
    en: [
      'You have opened your first pull request. Within two minutes it has thirty-seven comments. Thirty-six are from ChaosBot, about whitespace. The other is from Marcos: “LGTM 👍”, sent before the page had finished loading.',
      'Laura actually reads it. She says the code is fine, but your branch looks like it comes from the past: it was born before main’s latest change, and reviewing it is time travel with side effects.',
    ],
    lines: [
      say(BOT, 'Comentario 36 de 36: espacio al final de la línea 4. Te estoy vigilando.', 'Comment 36 of 36: trailing space on line 4. I am watching you.'),
      say(MARCOS, 'Yo te lo apruebo. Yo lo apruebo todo. Es mi forma de dar cariño.', 'I approve it. I approve everything. It is how I show affection.'),
      say(LAURA, 'Por eso tu aprobación no cuenta, Marcos. Está en las normas. La escribí por ti.', 'That is why your approval does not count, Marcos. It is in the rules. I wrote that rule for you.'),
    ],
    action: ['Traer la rama al presente', 'Bring the branch to the present'],
  }),
  closing(2, 16, {
    signal: ['CHAOSWARE · FIN DEL PERIODO DE PRUEBA', 'CHAOSWARE · END OF PROBATION'],
    title: ['Contrato indefinido (con letra pequeña)', 'Permanent contract (with fine print)'],
    es: [
      'Recursos Humanos te entrega la tarjeta definitiva: “{player} — Junior (temporal)”. Te explican que lo de “temporal” es un campo que nadie sabe quitar. Igual que la página de estado. Laura te regala una taza normal y te recuerda, otra vez, que la del fondo no se toca.',
      'Luego pasan los años. Se miden en reorganizaciones: tres. En sillas ergonómicas: dos. En veces que Marcos ha sido reasignado a tu equipo: cuatro. La página de estado no se ha puesto roja ni una sola vez, por motivos que ya conoces.',
    ],
    en: [
      'HR hands you your permanent badge: “{player} — Junior (temporary)”. They explain that “temporary” is a field nobody knows how to remove. Just like the status page. Laura gives you a perfectly normal mug and reminds you, again, that the one at the back is not to be touched.',
      'Then the years go by. They are measured in reorganizations: three. In ergonomic chairs: two. In times Marcos has been reassigned to your team: four. The status page has not turned red once, for reasons you already know.',
    ],
    lines: [
      say(LAURA, 'Bienvenido de verdad, {player}. Ahora ya puedes romper cosas oficialmente.', 'Welcome for real, {player}. Now you can officially break things.'),
      say(DUCK, 'Guárdate el contrato en un tag. Por si acaso.', 'Keep that contract in a tag. Just in case.'),
    ],
    action: ['Dejar pasar los años', 'Let the years go by'],
  }),

  // ── Capítulo 3: veterano ─────────────────────────────────────────────
  scene(3, 19, {
    signal: ['CHAOSWARE · LUNES · 09:15 · CAFETERA', 'CHAOSWARE · MONDAY · 09:15 · COFFEE MACHINE'],
    title: ['La leyenda de la silla vacía', 'The legend of the empty chair'],
    es: [
      'Una persona recién contratada pregunta, en voz demasiado alta, de quién es la silla reservada del fondo. La cafetera deja de hacer ruido. Sonia cuelga una llamada a medias. Marcos se sienta encima de una mesa, como quien va a contar una historia de campamento.',
      'El Royal Maintainer, dice, fundó ChaosWare. Una tarde fue a “echar un vistazo rápido” a un commit viejo y no volvió. Su cuenta sigue activa. Cada uno de enero aparece un commit suyo con el mensaje “feliz año, no toquéis main”. Nadie sabe desde dónde los hace.',
    ],
    en: [
      'A brand-new hire asks, far too loudly, whose reserved chair that is at the back. The coffee machine goes quiet. Sonia hangs up mid-call. Marcos sits on a desk like someone about to tell a campfire story.',
      'The Royal Maintainer, he says, founded ChaosWare. One afternoon he went to “take a quick look” at an old commit and never came back. His account is still active. Every first of January a commit of his appears with the message “happy new year, do not touch main”. Nobody knows where he pushes from.',
    ],
    lines: [
      say(MARCOS, 'Dicen que si haces checkout de un commit viejo a medianoche, todavía le oyes escribir git status.', 'They say if you check out an old commit at midnight, you can still hear him typing git status.'),
      say(LAURA, 'Marcos, deja de asustar a la gente nueva.', 'Marcos, stop scaring the new people.'),
      say(MARCOS, 'Vale, vale. Por cierto, {player}… hablando de commits viejos. ¿Tú sabes cómo se vuelve de uno?', 'Fine, fine. By the way, {player}… speaking of old commits. Do you know how you get back from one?'),
    ],
    action: ['Temerse lo peor', 'Fear the worst'],
  }),
  scene(3, 21, {
    signal: ['CHAOSWARE · MIÉRCOLES · 11:00 · CONTABILIDAD', 'CHAOSWARE · WEDNESDAY · 11:00 · ACCOUNTING'],
    title: ['El programa de fidelización', 'The loyalty program'],
    es: [
      'Contabilidad sube a la planta de desarrollo, algo que no ocurría desde la fiesta de 2018. Traen un informe: llevamos una semana pagando a los clientes por usar CalmOps. Uno ha dejado su trabajo para dedicarse a ello a tiempo completo.',
      'El arreglo existe. Lo hizo Marcos ayer, en marcos-misc, una rama que es a la vez su cajón de sastre, su diario y, al parecer, su lista de la compra. Tú ya no preguntas qué más hay dentro. Has aprendido que la respuesta siempre es peor que la pregunta.',
    ],
    en: [
      'Accounting comes up to the dev floor, something that has not happened since the 2018 party. They bring a report: for a week we have been paying customers to use CalmOps. One of them has quit their job to do it full time.',
      'The fix exists. Marcos wrote it yesterday, on marcos-misc, a branch that is at once his junk drawer, his diary and, apparently, his shopping list. You no longer ask what else is in there. You have learned that the answer is always worse than the question.',
    ],
    lines: [
      say(SONIA, 'Lo estoy vendiendo como “programa de fidelización”. Tenemos lista de espera.', 'I am selling it as a “loyalty program”. There is a waiting list.'),
      say(MARCOS, 'Llévate el arreglo, pero solo el arreglo. Lo otro es personal.', 'Take the fix, but only the fix. The rest is personal.'),
    ],
    action: ['No abrir lo personal', 'Do not open the personal stuff'],
  }),
  scene(3, 23, {
    signal: ['CHAOSWARE · VIERNES · 16:45 · SEGURIDAD', 'CHAOSWARE · FRIDAY · 16:45 · SECURITY'],
    title: ['El commit “no mirar”', 'The “do not look” commit'],
    es: [
      'El equipo de Seguridad, que es una sola persona con una camiseta que pone root, ha encontrado una contraseña subida al repositorio. Estaba en un commit titulado “no mirar”. Según las métricas, se ha mirado doscientas catorce veces.',
      'Nadie dice de quién es la contraseña. Nadie lo necesita. En la otra punta de la oficina, alguien cambia el fondo de pantalla de su gato por uno más serio. Tú ya has reescrito la rama. Solo queda publicarla sin pasar por encima de nadie.',
    ],
    en: [
      'The Security team, which is one person in a shirt that says root, has found a password committed to the repository. It was in a commit called “do not look”. According to the metrics, it has been looked at two hundred and fourteen times.',
      'Nobody says whose password it is. Nobody needs to. At the other end of the office, someone swaps their cat wallpaper for a more serious one. You have already rewritten the branch. All that is left is to publish it without running anyone over.',
    ],
    lines: [
      say(LAURA, 'No voy a preguntar de quién es. Solo voy a mirar fijamente en una dirección.', 'I am not going to ask whose it is. I am just going to stare very hard in one direction.'),
      say(BOT, 'Commit “no mirar”: 214 visitas. Récord del repositorio.', '“Do not look” commit: 214 views. Repository record.'),
    ],
    action: ['Mirar en otra dirección', 'Look the other way'],
  }),
  closing(3, 24, {
    signal: ['CHAOSWARE · CENA DE EMPRESA · 22:10', 'CHAOSWARE · COMPANY DINNER · 22:10'],
    title: ['Una década sin incidentes (oficialmente)', 'A decade without incidents (officially)'],
    es: [
      'ChaosWare celebra diez años de “Todo bajo control™” con la página de estado proyectada en la pared, verde como siempre. Hay premios: Marcos recibe el de “Empleado más revertido” y lo levanta con orgullo sincero. A ti te dan el de “Persona que más veces ha dicho déjame ver el log”. Laura da un discurso precioso y luego no recuerda la contraseña de su portátil.',
      'Sonia anuncia que CalmOps escalará a otro continente y todos aplauden. Afuera empieza a llover. Nadie pregunta qué pasa si CalmOps escala de verdad.',
    ],
    en: [
      'ChaosWare celebrates ten years of “Everything under control™” with the status page projected on the wall, green as ever. There are awards: Marcos wins “Most Reverted Employee” and raises it with sincere pride. You get “Person Who Most Often Said Let Me See The Log”. Laura gives a lovely speech and then cannot remember her laptop password.',
      'Sonia announces that CalmOps will scale to another continent and everybody claps. Outside, it starts to rain. Nobody asks what happens if CalmOps actually scales.',
    ],
    lines: [
      say(DUCK, 'Nadie ha preguntado de dónde sacó CalmOps su forma de escalar.', 'Nobody has asked where CalmOps got its scaling from.'),
      say(BOT, 'Recordatorio: despliegue programado para el viernes a las 17:58. Que aproveche.', 'Reminder: deployment scheduled for Friday, 17:58. Enjoy your meal.'),
    ],
    action: ['Pedir el postre', 'Order dessert'],
  }),

  // ── Capítulo 4: viernes de producción ───────────────────────────────
  scene(4, 27, {
    signal: ['PRODUCCIÓN · VIERNES · 18:19', 'PRODUCTION · FRIDAY · 18:19'],
    title: ['Dos minutos de paz', 'Two minutes of peace'],
    es: [
      'Los euros han vuelto. Durante dos minutos no suena ninguna alerta. Vas a la cafetera, que te devuelve “error: café no encontrado”, y vuelves con las manos vacías y una sola idea: limpiar un poco la rama antes del siguiente fuego. Lo siguiente lo recuerdas borroso.',
      'Un grito: el despliegue bueno ha desaparecido de git log. Toda la oficina se gira a la vez hacia el mismo sitio. Marcos está junto a la ventana, con una porción de pizza en cada mano.',
    ],
    en: [
      'The euros are back. For two minutes no alert goes off. You go to the coffee machine, which answers “error: coffee not found”, and come back empty-handed with a single idea: tidy up the branch a little before the next fire. What comes next is blurry.',
      'A shout: the good deployment has vanished from git log. The whole office turns towards the same spot at once. Marcos is by the window, holding a slice of pizza in each hand.',
    ],
    lines: [
      say(l('TODA LA OFICINA', 'THE WHOLE OFFICE'), 'Marcos.', 'Marcos.'),
      say(MARCOS, 'Llevo veinte minutos comiendo. Tengo testigos. Tengo grasa en las dos manos.', 'I have been eating for twenty minutes. I have witnesses. I have grease on both hands.'),
      say(DUCK, '{player}… ¿qué hiciste tú hace dos minutos?', '{player}… what did you do two minutes ago?'),
    ],
    action: ['No querer saberlo', 'Not want to know'],
  }),
  scene(4, 29, {
    signal: ['PRODUCCIÓN · VIERNES · 19:40', 'PRODUCTION · FRIDAY · 19:40'],
    title: ['El auditor al teléfono', 'The auditor on the phone'],
    es: [
      'Sonia habla por teléfono con el auditor del lunes mientras, a su espalda, arden dos incendios y medio. Laura necesita una pizarra para dibujar el incidente y solo queda una: la de NO BORRAR, en la sala Sinergia. La borra. Debajo, escrita a rotulador y casi invisible, aparece una sola línea: “git checkout main — RM”.',
      'Nadie dice nada. Laura la deja donde está y dibuja alrededor. ChaosBot publica la causa de la vulnerabilidad en el canal antes de que nadie la pregunte.',
    ],
    en: [
      'Sonia is on the phone with Monday’s auditor while two and a half fires burn behind her. Laura needs a whiteboard to draw the incident and only one is left: the DO NOT ERASE one in the Synergy room. She erases it. Underneath, in faint marker, a single line appears: “git checkout main — RM”.',
      'Nobody says anything. Laura leaves it there and draws around it. ChaosBot posts the root cause of the vulnerability in the channel before anyone asks.',
    ],
    lines: [
      say(SONIA, '¿Incidentes? No, no. Eso que oye son fuegos artificiales. Estamos celebrando la estabilidad.', 'Incidents? No, no. What you hear are fireworks. We are celebrating stability.'),
      say(BOT, 'Vulnerabilidad detectada. Causa: Marcos.', 'Vulnerability detected. Cause: Marcos.'),
    ],
    action: ['Preparar el bisturí', 'Prepare the scalpel'],
  }),
  scene(4, 31, {
    signal: ['PRODUCCIÓN · VIERNES · 22:47', 'PRODUCTION · FRIDAY · 22:47'],
    title: ['Se acaba la pizza', 'The pizza runs out'],
    es: [
      'La tormenta no para. La pizza se acabó hace una hora. Han pedido más, pero el repartidor no puede entrar: la puerta del edificio usa el login de CalmOps y CalmOps está caído. Le pasan las cajas por la ventana del baño. Marcos duerme en un puf y murmura “solo estaba mirando”.',
      'Laura se sienta a tu lado por primera vez en toda la noche. Mira tu terminal como quien mira una foto de su pueblo.',
    ],
    en: [
      'The storm will not stop. The pizza ran out an hour ago. More has been ordered, but the delivery driver cannot get in: the building door uses CalmOps login, and CalmOps is down. The boxes come in through the bathroom window. Marcos is asleep on a beanbag, murmuring “I was only looking”.',
      'Laura sits next to you for the first time all night. She looks at your terminal the way people look at photos of their hometown.',
    ],
    lines: [
      say(LAURA, '¿Sabes por qué dejé de programar, {player}? Me ascendieron por arreglar un viernes como este. Ten cuidado.', 'Do you know why I stopped coding, {player}? They promoted me for fixing a Friday like this one. Be careful.'),
      say(DUCK, 'Lo que no arregla un merge lo arregla dormir. Esta noche no hay de lo segundo.', 'Whatever a merge cannot fix, sleep can. There is none of the second tonight.'),
    ],
    action: ['Abrir otra terminal', 'Open another terminal'],
  }),
  scene(4, 32, {
    signal: ['PRODUCCIÓN · VIERNES · 23:59', 'PRODUCTION · FRIDAY · 23:59'],
    title: ['La pregunta que nadie hizo', 'The question nobody asked'],
    es: [
      'Toda la oficina se ha juntado alrededor de tu mesa: Laura, Sonia, el equipo de Seguridad con su camiseta de root y Marcos, recién despierto y con la marca del puf en la cara. Laura levanta la mano como quien dirige una orquesta. “Todos a la vez: ¿qué ha pasado?”.',
      '“MARCOS”, responde la oficina. Marcos asiente, resignado. Y entonces pregunta algo que no se había preguntado en años: “Vale, pero ¿alguien ha mirado qué hice?”. Silencio. Nadie lo había mirado nunca. El pato se quita las gafas de sol por primera vez.',
    ],
    en: [
      'The whole office has gathered around your desk: Laura, Sonia, the Security team in its root shirt and Marcos, freshly awake with the beanbag printed on his face. Laura raises a hand like a conductor. “All together: what happened?”',
      '“MARCOS”, the office answers. Marcos nods, resigned. And then he asks something nobody has asked in years: “Fine, but has anyone actually looked at what I did?” Silence. Nobody ever had. The duck takes off its sunglasses for the first time.',
    ],
    lines: [
      say(DUCK, '{player}. Desde el primer commit. Todo.', '{player}. From the first commit. All of it.'),
    ],
    action: ['Leer el repositorio entero', 'Read the whole repository'],
  }),
];
