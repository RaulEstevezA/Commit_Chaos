import { missions } from './index';

export function baseGitCommand(command:string):string {
  const [git,name] = command.trim().split(/\s+/);
  return git === 'git' && name ? `${git} ${name}` : command.trim();
}

export const chapterToolbox = Object.fromEntries([1,2,3,4].map(chapter=>[
  chapter,
  [...new Set(missions
    .filter(mission=>mission.chapter===chapter)
    .flatMap(mission=>mission.solutions)
    .flatMap(solution=>solution)
    .map(baseGitCommand))].sort((a,b)=>a.localeCompare(b)),
])) as Record<1|2|3|4,string[]>;
