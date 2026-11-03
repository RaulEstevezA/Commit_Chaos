import type { Lang } from '../../core/missions/types';

const ambience = {
  1: {
    location: { es: 'Casa · 01:12', en: 'Home · 01:12' },
    mood: {
      es: 'Tu escritorio. Tu proyecto. Tu desastre.',
      en: 'Your desk. Your project. Your disaster.',
    },
    details: {
      es: ['Café todavía caliente', 'Pato de goma de guardia', 'Nadie más a quien culpar'],
      en: ['Coffee still warm', 'Rubber duck on duty', 'Nobody else to blame'],
    },
  },
  2: {
    location: { es: 'ChaosWare · Día 1', en: 'ChaosWare · Day 1' },
    mood: {
      es: 'Mesa impecable. Procesos impecables. De momento.',
      en: 'Perfect desk. Perfect processes. For now.',
    },
    details: {
      es: ['Portátil recién entregado', 'Cables ordenados', 'Periodo de prueba activo'],
      en: ['Freshly issued laptop', 'Cables neatly routed', 'Probation in progress'],
    },
  },
  3: {
    location: { es: 'ChaosWare · Tu sitio', en: 'ChaosWare · Your desk' },
    mood: {
      es: 'Ya sabes dónde cruje el repositorio.',
      en: 'You know where the repository creaks.',
    },
    details: {
      es: ['Taza propia', 'Notas que solo tú entiendes', 'Marcos pide ayuda'],
      en: ['Your own mug', 'Notes only you understand', 'Marcos needs help'],
    },
  },
  4: {
    location: { es: 'Producción · Viernes 17:59', en: 'Production · Friday 17:59' },
    mood: {
      es: 'Todo pita. Nada está documentado. Eres la documentación.',
      en: 'Everything beeps. Nothing is documented. You are the documentation.',
    },
    details: {
      es: ['Tres incidentes activos', 'Pizza de emergencia', 'Marcos estuvo aquí'],
      en: ['Three active incidents', 'Emergency pizza', 'Marcos was here'],
    },
  },
} as const;

export function ChapterAtmosphere({ chapter, lang }: { chapter: 1 | 2 | 3 | 4; lang: Lang }) {
  const scene = ambience[chapter];
  return (
    <aside className={`atmosphere atmosphere--${chapter}`} aria-label={scene.location[lang]}>
      <div className="atmosphere__copy">
        <span>{scene.location[lang]}</span>
        <strong>{scene.mood[lang]}</strong>
      </div>
      <ul>
        {scene.details[lang].map((detail) => <li key={detail}>{detail}</li>)}
      </ul>
    </aside>
  );
}
