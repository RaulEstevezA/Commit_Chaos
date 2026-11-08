import type { GitState, Commit } from './types';
import { emptyGitState } from './types';
export interface RepoSeed { initialized?:boolean; files?:Record<string,string>; commits?:Array<{id?:string;message:string;files:Record<string,string>;parents?:string[]}>; branches?:Record<string,string>; head?:string; detached?:string; working?:Record<string,string>; index?:Record<string,string|null>; remotes?:Record<string,Record<string,string>>; conflicts?:string[]; stash?:Array<{message:string;changes:Record<string,string|null>}>; }
export function createRepo(seed:RepoSeed={}):GitState {
  const s=emptyGitState(); s.initialized=seed.initialized??true; let last='';
  for(const item of seed.commits??[]){ const id=item.id??`c${s.nextId++}`; const c:Commit={id,message:item.message,files:{...item.files},parents:item.parents??(last?[last]:[])}; s.commits[id]=c; last=id; }
  const base=seed.files??(last?s.commits[last].files:{}); if(!last && Object.keys(base).length){last=`c${s.nextId++}`;s.commits[last]={id:last,message:'Initial commit',parents:[],files:{...base}};}
  s.branches=Object.fromEntries(Object.entries(seed.branches??{main:last}).map(([name,commitId])=>[name,{name,commitId}]));
  s.head=seed.detached?{type:'detached',commitId:seed.detached}:{type:'branch',name:seed.head??'main'};
  s.workingTree={...(seed.working??base)}; s.index={...seed.index}; s.conflicts=[...(seed.conflicts??[])];
  s.remotes=Object.fromEntries(Object.entries(seed.remotes??{}).map(([name,branches])=>[name,{name,branches:{...branches}}]));
  s.stash=(seed.stash??[]).map((x,i)=>({id:`stash@{${i}}`,...x})); s.nextId=Math.max(s.nextId,Object.keys(s.commits).length+1); return s;
}
