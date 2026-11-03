import { chapter1Missions } from './chapter1';
import { chapter2Missions } from './chapter2';
import { chapter3Missions } from './chapter3';
import { chapter4Missions } from './chapter4';

export { chapters } from './chapters';

export const missions = [
  ...chapter1Missions,
  ...chapter2Missions,
  ...chapter3Missions,
  ...chapter4Missions,
];
