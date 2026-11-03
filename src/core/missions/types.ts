import type { RepoSeed } from '../git/factory';
import type { GitState } from '../git/types';
export type Lang='es'|'en';
export interface Localized { es:string; en:string; }
export type Goal =
 | {type:'initialized'} | {type:'clean'} | {type:'commitMessage';includes:string} | {type:'branchExists';name:string}
 | {type:'onBranch';name:string} | {type:'headIs';ref:string} | {type:'remoteEquals';remote:string;branch:string;ref:string}
 | {type:'noConflicts'} | {type:'stashCount';count:number} | {type:'effectUsed';effect:string}
 | {type:'fileEquals';path:string;content:string} | {type:'commitParents';count:number};
export interface Mission { id:number; chapter:number; title:Localized; briefing:Localized; dialogue:Localized; objective:Localized; seed:RepoSeed; goals:Goal[]; hints:Localized[]; solutions:string[][]; allowed?:string[]; }
export interface Validation {complete:boolean; satisfied:boolean[]; summary:string;}
export function validateMission(m:Mission,s:GitState,effects:string[]):Validation {
 const ref=(name:string)=>s.branches[name]?.commitId??s.remotes.origin?.branches[name]??(s.commits[name]?name:undefined);
 const head=s.head.type==='branch'?s.branches[s.head.name]?.commitId:s.head.commitId;
 const base=head?s.commits[head]?.files:{};
 const satisfied=m.goals.map(g=>{switch(g.type){case'initialized':return s.initialized;case'clean':return Object.keys(s.index).length===0&&s.conflicts.length===0&&JSON.stringify(s.workingTree)===JSON.stringify(base??{});case'commitMessage':return Object.values(s.commits).some(c=>c.message.toLowerCase().includes(g.includes.toLowerCase()));case'branchExists':return Boolean(s.branches[g.name]);case'onBranch':return s.head.type==='branch'&&s.head.name===g.name;case'headIs':return head===ref(g.ref);case'remoteEquals':return s.remotes[g.remote]?.branches[g.branch]===ref(g.ref);case'noConflicts':return s.conflicts.length===0;case'stashCount':return s.stash.length===g.count;case'effectUsed':return effects.includes(g.effect);case'fileEquals':return s.workingTree[g.path]===g.content;case'commitParents':return Boolean(head&&s.commits[head]?.parents.length===g.count);}});
 return {complete:satisfied.every(Boolean),satisfied,summary:`${satisfied.filter(Boolean).length}/${satisfied.length}`};
}
