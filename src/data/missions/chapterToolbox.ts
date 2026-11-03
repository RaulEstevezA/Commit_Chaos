import { missions } from './index';

export function commandSignature(command:string):string {
  const [git,name,...args] = command.trim().split(/\s+/);
  if(git!=='git'||!name)return command.trim();
  if(name==='push'){
    if(args.includes('--force-with-lease'))return 'git push --force-with-lease';
    if(args.includes('--force')||args.includes('-f'))return 'git push --force';
  }
  if(name==='reset'&&args.includes('--hard'))return 'git reset --hard';
  if(name==='checkout'&&args.includes('-b'))return 'git checkout -b';
  if(name==='switch'&&args.includes('-c'))return 'git switch -c';
  return `${git} ${name}`;
}

function withValidAlternatives(commands:string[]):string[]{
  const expanded=new Set(commands);
  if(commands.some(command=>command.startsWith('git push')))['git push','git push --force-with-lease','git push --force'].forEach(command=>expanded.add(command));
  if(commands.some(command=>command.startsWith('git reset')))['git reset','git reset --hard'].forEach(command=>expanded.add(command));
  if(commands.includes('git checkout -b'))expanded.add('git switch -c');
  if(commands.includes('git switch -c'))expanded.add('git checkout -b');
  if(commands.includes('git checkout'))expanded.add('git switch');
  if(commands.includes('git switch'))expanded.add('git checkout');
  return [...expanded].sort((a,b)=>a.localeCompare(b));
}

export const chapterToolbox = Object.fromEntries([1,2,3,4].map(chapter=>{
  const declared=missions
    .filter(mission=>mission.chapter===chapter)
    .flatMap(mission=>mission.solutions)
    .flatMap(solution=>solution)
    .map(commandSignature);
  return [chapter,withValidAlternatives(declared)];
})) as Record<1|2|3|4,string[]>;
