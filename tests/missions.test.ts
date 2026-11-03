import { describe, expect, it } from 'vitest';
import { createRepo } from '../src/core/git/factory';
import { executeCommand } from '../src/core/git/simulator';
import { validateMission } from '../src/core/missions/types';
import { missions } from '../src/data/missions';

describe('32 mission campaign', () => {
  it('contains four chapters of eight missions', () => {
    expect(missions).toHaveLength(32);
    for (let chapter = 1; chapter <= 4; chapter += 1) {
      expect(missions.filter((mission) => mission.chapter === chapter)).toHaveLength(8);
    }
  });

  it('registers every mission id exactly once and in campaign order', () => {
    expect(missions.map((mission) => mission.id)).toEqual(
      Array.from({ length: 32 }, (_, index) => index + 1),
    );
  });

  it.each(missions.map((mission) => [mission.id, mission] as const))(
    'mission %s is solvable by its reference path',
    (_id, mission) => {
      let state = createRepo(mission.seed);
      const effects: string[] = [];
      for (const command of mission.solutions[0]) {
        const result = executeCommand(state, command);
        state = result.state;
        effects.push(...result.effects);
      }
      const validation = validateMission(mission, state, effects);
      expect(
        validation.complete,
        `${mission.id}: ${mission.title.en} (${validation.summary})`,
      ).toBe(true);
    },
  );

  it('uses commands rather than quiz answers in reference solutions', () => {
    for (const mission of missions) {
      for (const path of mission.solutions) {
        for (const command of path) expect(command.startsWith('git ')).toBe(true);
      }
    }
  });
});
