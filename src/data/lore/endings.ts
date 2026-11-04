import type { Ending } from '../../core/progression/progress';

export const endings: Record<Ending, { title: string; body: { es: string[]; en: string[] } }> = {
  wizard: {
    title: 'Git Wizard',
    body: {
      es: [
        'Dominas la historia sin sacrificarla. En ChaosWare pronuncian tu nombre antes de cada deploy, en voz baja, por si acaso.',
        'Te han dado un bastón. Nadie recuerda quién lo aprobó, pero figura en el inventario como “material de oficina”. La página de estado por fin dice la verdad, y Sonia ya la vende como funcionalidad.',
        'El pato ha aceptado un sombrero. Marcos tiene permisos de solo lectura. Dice que “solo está mirando” y, por primera vez, es cierto.',
      ],
      en: [
        'You master history without sacrificing it. At ChaosWare they say your name before every deploy, quietly, just in case.',
        'They gave you a staff. Nobody remembers approving it, but the inventory lists it as “office supplies”. The status page finally tells the truth, and Sonia is already selling that as a feature.',
        'The duck has accepted a hat. Marcos has read-only access. He says he is “only looking” and, for the first time, it is true.',
      ],
    },
  },
  lead: {
    title: 'Team Lead',
    body: {
      es: [
        'No solo arreglaste repositorios: enseñaste al equipo a no romperlos igual dos veces. Ahora los rompen de formas nuevas y, según te dicen, eso es crecimiento.',
        'Laura lleva 41 reuniones evitadas y ha convocado una para celebrarlo. También ha hecho un commit sin ayuda y tiene la captura enmarcada. Marcos imparte una formación llamada “Cosas que no se hacen”: cuatro sesiones, todas con ejemplos propios.',
        'El pato tiene tarjeta de empleado y corbata. Cobra más que tú. Nadie ha encontrado el commit que lo aprobó.',
      ],
      en: [
        'You did not just fix repositories: you taught the team not to break them the same way twice. Now they break them in new ways and, you are told, that is growth.',
        'Laura is at 41 meetings prevented and has called one to celebrate. She also made a commit unaided and has the screenshot framed. Marcos teaches a course called “Things You Do Not Do”: four sessions, all with first-hand examples.',
        'The duck has an employee badge and a tie. It earns more than you. Nobody has found the commit that approved it.',
      ],
    },
  },
  lord: {
    title: 'Chaos Lord',
    body: {
      es: [
        'Producción vive, pero el reflog susurra historias sobre tus force pushes.',
        'Te sientas en un trono de servidores con la mano sobre un botón rojo que nadie sabe qué hace. Tú tampoco. La tormenta ya no se va, y Ventas la vende como “resiliencia”.',
        'Laura dimitió, pero su carta estaba en una rama que aplastaste y volvió a los diez minutos. Marcos te llama “Su Majestad” y, por primera vez, le da miedo mirar. El pato lleva corona. Tú no se la pusiste.',
      ],
      en: [
        'Production lives, but the reflog whispers tales of your force pushes.',
        'You sit on a throne of servers with one hand on a red button nobody understands. Neither do you. The storm no longer leaves, and Sales markets it as “resilience”.',
        'Laura resigned, but her letter was on a branch you crushed, so she was back in ten minutes. Marcos calls you “Your Majesty” and, for the first time, is afraid to look. The duck wears a crown. You did not put it there.',
      ],
    },
  },
  detached: {
    title: 'Detached HEAD',
    body: {
      es: [
        'Salvaste la empresa desde fuera de toda rama. Técnicamente existes. Operativamente, nadie sabe dónde.',
        'Tu cabeza flota a unos metros de ti y sigue contestando en el canal de incidentes. Tu silla tiene la cuenta activa. Ahora entiendes lo de la silla del Royal Maintainer: ayer os cruzasteis y te saludó con un cetro.',
        'El pato orbita atado a tu silla, con su traje espacial. Dice que ya estuvo aquí y que antes había mejor wifi. A veces, si alguien hace checkout del commit correcto, os llega olor a pizza.',
      ],
      en: [
        'You saved the company from outside every branch. Technically you exist. Operationally, nobody knows where.',
        'Your head floats a few meters away and still answers the incident channel. Your chair’s account remains active. Now you understand the Royal Maintainer’s chair: you crossed paths yesterday, and they waved a scepter at you.',
        'The duck orbits on a tether from your chair, in its space suit. It says it has been here before and the wifi used to be better. Sometimes, when someone checks out the right commit, the smell of pizza drifts by.',
      ],
    },
  },
};
