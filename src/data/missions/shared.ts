import type { Mission, Localized } from '../../core/missions/types';

export const l = (es: string, en: string): Localized => ({ es, en });

export const baseFiles = {
  'README.md': '# Commit Chaos',
  'src/app.ts': 'console.log("hello")',
};

export const commits = [
  { id: 'c1', message: 'Initial commit', files: baseFiles },
  {
    id: 'c2',
    message: 'Add app',
    files: { ...baseFiles, 'src/app.ts': 'console.log("ready")' },
  },
];

export const m = (
  id: number,
  chapter: number,
  title: [string, string],
  brief: [string, string],
  objective: [string, string],
  seed: Mission['seed'],
  goals: Mission['goals'],
  hints: [string, string][],
  solutions: string[][],
  dialogue?: [string, string],
): Mission => ({
  id,
  chapter,
  title: l(...title),
  briefing: l(...brief),
  objective: l(...objective),
  dialogue: l(...(dialogue ?? [
    '{player}, Git no es una copia de seguridad con sentimientos.',
    '{player}, Git is not a backup with feelings.',
  ])),
  seed,
  goals,
  hints: hints.map((hint) => l(...hint)),
  solutions,
});
