import type { Mission, Localized } from '../../core/missions/types';

export const l = (es: string, en: string): Localized => ({ es, en });

// The README never changes, even inside ChaosWare. That is the point of the story.
export const baseFiles = {
  'README.md': '# Pato Simulator',
  'src/app.ts': 'console.log("hello")',
};

export const firstCommit = { c1: l('inicio del proyecto', 'start of the project') };
export const calmOpsCommit = { c1: l('CalmOps: estabilidad como servicio', 'CalmOps: stability as a service') };

/** [spanish message, english message, file changes (null deletes), parent id (defaults to the previous commit)] */
export type Step = [string, string, Record<string, string | null>?, string?];

/** Builds a commit history whose messages are localized when the mission starts. */
export function chain(base: Record<string, string>, ...steps: Step[]) {
  const snapshots: Record<string, Record<string, string>> = {};
  const log: Record<string, Localized> = {};
  const commits = steps.map(([es, en, changes, explicitParent], index) => {
    const id = `c${index + 1}`;
    const parent = explicitParent ?? (index ? `c${index}` : undefined);
    const files = { ...(parent ? snapshots[parent] : base) };
    for (const [path, content] of Object.entries(changes ?? {})) {
      if (content === null) delete files[path];
      else files[path] = content;
    }
    snapshots[id] = files;
    log[id] = l(es, en);
    return { id, message: en, files, parents: parent ? [parent] : [] };
  });
  return { commits, log, files: (id: string) => snapshots[id] };
}

export interface MissionExtras {
  log?: Mission['log'];
  reflog?: [string, string][];
}

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
  dialogue: [string, string],
  outro: [string, string],
  extras: MissionExtras = {},
): Mission => ({
  id,
  chapter,
  title: l(...title),
  briefing: l(...brief),
  objective: l(...objective),
  dialogue: l(...dialogue),
  outro: l(...outro),
  seed,
  goals,
  hints: hints.map((hint) => l(...hint)),
  solutions,
  log: extras.log,
  reflog: extras.reflog?.map((line) => l(...line)),
});
