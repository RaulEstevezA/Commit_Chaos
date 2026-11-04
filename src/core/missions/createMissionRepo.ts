import { createRepo } from '../git/factory';
import type { GitState } from '../git/types';
import { personalize } from './personalize';
import type { Lang, Mission } from './types';

/** Starts a mission repository with its commit messages and reflog in the player's language. */
export function createMissionRepo(mission: Mission, lang: Lang, playerName = 'Terminator'): GitState {
  const state = createRepo(mission.seed);
  for (const [id, message] of Object.entries(mission.log ?? {})) {
    if (state.commits[id]) state.commits[id].message = message[lang];
  }
  state.reflog = (mission.reflog ?? []).map((line) => personalize(line[lang], playerName));
  return state;
}
