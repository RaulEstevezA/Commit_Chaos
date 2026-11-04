import { describe, expect, it } from 'vitest';
import { executeCommand } from '../src/core/git/simulator';
import { createMissionRepo } from '../src/core/missions/createMissionRepo';
import { validateMission, type Lang } from '../src/core/missions/types';
import { achievementsFor, defaultProgress } from '../src/core/progression/progress';
import { endings } from '../src/data/lore/endings';
import { reactionsFor } from '../src/data/lore/reactions';
import { missions } from '../src/data/missions';

const langs: Lang[] = ['es', 'en'];
const mission = (id: number) => missions[id - 1];

function play(id: number, lang: Lang, commands: string[]) {
  let state = createMissionRepo(mission(id), lang);
  const effects: string[] = [];
  const output: string[] = [];
  for (const command of commands) {
    const result = executeCommand(state, command);
    state = result.state;
    effects.push(...result.effects);
    output.push(...result.output);
  }
  return { state, effects, output, complete: validateMission(mission(id), state, effects).complete };
}

describe('mission story', () => {
  it('gives every mission its own opening and closing line in both languages', () => {
    for (const lang of langs) {
      expect(new Set(missions.map((item) => item.dialogue[lang])).size).toBe(32);
      expect(new Set(missions.map((item) => item.outro[lang])).size).toBe(32);
    }
  });

  it.each(langs)('solves every mission with its localized history in %s', (lang) => {
    for (const item of missions) {
      for (const solution of item.solutions) {
        expect(play(item.id, lang, solution).complete, `mission ${item.id}`).toBe(true);
      }
    }
  });

  it.each(langs)('never completes a mission just by looking around in %s', (lang) => {
    for (const item of missions) {
      expect(play(item.id, lang, ['git status', 'git log --oneline']).complete, `mission ${item.id}`).toBe(false);
    }
  });

  it('accepts the requested commit message in either language', () => {
    expect(play(2, 'en', ['git add README.md', 'git commit -m "start of the project"']).complete).toBe(true);
    expect(play(2, 'es', ['git add README.md', 'git commit -m "inicio del proyecto"']).complete).toBe(true);
  });

  it('requires reverting the guilty commit, not any commit', () => {
    expect(play(32, 'es', ['git log', 'git revert c3', 'git push origin main']).complete).toBe(false);
    expect(play(32, 'es', ['git log', 'git revert c5', 'git push origin main']).complete).toBe(true);
  });

  it('restores the duck physics when the final mission is solved', () => {
    const { state } = play(32, 'es', mission(32).solutions[0]);
    expect(state.workingTree['physics/pato.ts']).toContain('NO TOCAR');
  });

  it('lets the reflog tell the story of the lost commit', () => {
    expect(play(20, 'es', ['git reflog']).output.join('\n')).toContain('c2 HEAD@{1}');
    expect(createMissionRepo(mission(27), 'en', 'Ada').reflog[0]).toContain('Ada');
  });
});

describe('cast reactions', () => {
  const context = { input: 'git status', effects: [] as string[], chapter: 2, errors: 0 };

  it('reacts once per mission to dangerous commands', () => {
    const push = { ...context, input: 'git push --force', effects: ['force-push'] };
    expect(reactionsFor(push, [])[0].text.es).toContain('Laura');
    expect(reactionsFor(push, ['force-push'])).toEqual([]);
  });

  it('keeps chapter one to the duck, since nobody else has been met yet', () => {
    for (const effects of [['force-push'], ['hard-reset'], ['detached'], ['safe-force']]) {
      expect(reactionsFor({ ...context, chapter: 1, effects }, [])[0].text.es).toMatch(/^Pato:/);
    }
  });

  it('notices blame, lazy commit messages and repeated errors', () => {
    expect(reactionsFor({ ...context, input: 'git blame src/app.ts' }, [])[0].text.es).toContain('Marcos');
    expect(reactionsFor({ ...context, input: 'git commit -m "fix"' }, [])[0].tag).toBe('lazy-message');
    expect(reactionsFor({ ...context, input: 'git commit -m "arregla el login"' }, [])).toEqual([]);
    expect(reactionsFor({ ...context, errors: 3 }, [])[0].key).toBe('errors');
  });

  it('needs fewer words to blame Marcos as the story advances', () => {
    const blame = (chapter: number) => reactionsFor({ ...context, chapter, input: 'git blame' }, [])[0].text.es;
    expect(blame(2).length).toBeGreaterThan(blame(3).length);
    expect(blame(4)).toBe('ChaosBot: Marcos.');
  });

  it('awards the achievements tied to those moments', () => {
    const earned = achievementsFor(defaultProgress(), ['blame', 'force-push', 'lazy-message', 'reflog']);
    expect(earned).toEqual(expect.arrayContaining(['it-was-marcos', 'crusher', 'fix-poet', 'time-traveler']));
  });
});

describe('endings', () => {
  it('tells a full epilogue in both languages for all four endings', () => {
    for (const ending of Object.values(endings)) {
      expect(ending.body.es.length).toBeGreaterThanOrEqual(3);
      expect(ending.body.en).toHaveLength(ending.body.es.length);
    }
  });
});
