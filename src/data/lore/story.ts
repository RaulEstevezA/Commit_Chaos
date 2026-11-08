import type { Localized } from '../../core/missions/types';
import { chapterPrologues } from './chapterPrologues';
import { storyScenes } from './storyScenes';

export type Chapter = 1 | 2 | 3 | 4;

export interface StoryLine {
  speaker: Localized;
  text: Localized;
}

/**
 * One story window. Prologues open a chapter, scenes play before a mission
 * and closings play after the last mission of a chapter.
 */
export interface StoryBeat {
  id: string;
  chapter: Chapter;
  kind: 'prologue' | 'scene' | 'closing';
  /** Mission the beat plays before (prologue, scene) or after (closing). */
  mission: number;
  signal: Localized;
  title: Localized;
  paragraphs: { es: string[]; en: string[] };
  lines: StoryLine[];
  action: Localized;
}

const firstMission = (chapter: Chapter) => (chapter - 1) * 8 + 1;

export const prologueBeats: StoryBeat[] = Object.values(chapterPrologues).map((prologue) => ({
  id: `prologue-${prologue.chapter}`,
  chapter: prologue.chapter,
  kind: 'prologue',
  mission: firstMission(prologue.chapter),
  signal: prologue.signal,
  title: prologue.title,
  paragraphs: prologue.paragraphs,
  lines: [{ speaker: prologue.speaker, text: prologue.quote }],
  action: prologue.action,
}));

const order = { prologue: 0, scene: 1, closing: 2 } as const;
const position = (beat: StoryBeat) => beat.mission * 4 + (beat.kind === 'closing' ? 3 : order[beat.kind]);

/** Every beat in reading order. */
export const storyBeats: StoryBeat[] = [...prologueBeats, ...storyScenes].sort((a, b) => position(a) - position(b));

export const storyBeatById = Object.fromEntries(storyBeats.map((beat) => [beat.id, beat])) as Record<string, StoryBeat>;

export type SeenCheck = (beat: StoryBeat) => boolean;

/**
 * Beats that play automatically when a mission starts: the closing of the
 * mission just finished, the chapter prologue and the scenes of this mission.
 */
export function beatsForMissionStart(mission: { id: number; chapter: number }, previous: number | null, seen: SeenCheck): StoryBeat[] {
  return storyBeats.filter((beat) => {
    if (seen(beat)) return false;
    if (beat.kind === 'closing') return previous !== null && beat.mission === previous;
    if (beat.kind === 'prologue') return beat.chapter === mission.chapter;
    return beat.mission === mission.id;
  });
}

/** The chapter story so far, as read from inside a mission. */
export function chapterStoryUntil(chapter: Chapter, mission: number): StoryBeat[] {
  return storyBeats.filter((beat) => beat.chapter === chapter && beat.kind !== 'closing' && beat.mission <= mission);
}

/** The chapter story as read from the mission map: only what the player has already lived. */
export function chapterStoryRead(chapter: Chapter, seen: SeenCheck, showAll = false): StoryBeat[] {
  return storyBeats.filter((beat) => beat.chapter === chapter && (showAll || seen(beat)));
}
