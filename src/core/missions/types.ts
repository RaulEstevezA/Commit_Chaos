import type { RepoSeed } from '../git/factory';
import type { GitState } from '../git/types';
export type Lang='es'|'en';
export interface Localized { es:string; en:string; }
export type Goal =
 | {type:'initialized'} | {type:'clean'} | {type:'commitMessage';includes:string|string[]} | {type:'branchExists';name:string}
 | {type:'onBranch';name:string} | {type:'headIs';ref:string} | {type:'remoteEquals';remote:string;branch:string;ref:string}
 | {type:'noConflicts'} | {type:'stashCount';count:number} | {type:'effectUsed';effect:string}
 | {type:'fileEquals';path:string;content:string} | {type:'commitParents';count:number}
 | {type:'picked';commit:string} | {type:'reverted';commit:string};
export interface Mission { id:number; chapter:number; title:Localized; briefing:Localized; dialogue:Localized; outro:Localized; objective:Localized; seed:RepoSeed; goals:Goal[]; hints:Localized[]; solutions:string[][]; allowed?:string[]; log?:Record<string,Localized>; reflog?:Localized[]; }
export interface Validation {complete:boolean; satisfied:boolean[]; summary:string;}
export function validateMission(m:Mission,s:GitState,effects:string[]):Validation {
 const ref=(name:string)=>s.branches[name]?.commitId??s.remotes.origin?.branches[name]??(s.commits[name]?name:undefined);
 const head=s.head.type==='branch'?s.branches[s.head.name]?.commitId:s.head.commitId;
 const base=head?s.commits[head]?.files:{};
 const reachable=()=>{const seen=new Set<string>();const pending=head?[head]:[];while(pending.length){const id=pending.pop()!;if(seen.has(id)||!s.commits[id])continue;seen.add(id);pending.push(...s.commits[id].parents);}return [...seen].map(id=>s.commits[id]);};
 const satisfied=m.goals.map(g=>{switch(g.type){case'initialized':return s.initialized;case'clean':return Object.keys(s.index).length===0&&s.conflicts.length===0&&JSON.stringify(s.workingTree)===JSON.stringify(base??{});case'commitMessage':{const wanted=[g.includes].flat().map(x=>x.toLowerCase());return Object.values(s.commits).some(c=>wanted.some(x=>c.message.toLowerCase().includes(x)));}case'branchExists':return Boolean(s.branches[g.name]);case'onBranch':return s.head.type==='branch'&&s.head.name===g.name;case'headIs':return head===ref(g.ref);case'remoteEquals':return s.remotes[g.remote]?.branches[g.branch]===ref(g.ref);case'noConflicts':return s.conflicts.length===0;case'stashCount':return s.stash.length===g.count;case'effectUsed':return effects.includes(g.effect);case'fileEquals':return s.workingTree[g.path]===g.content;case'commitParents':return Boolean(head&&s.commits[head]?.parents.length===g.count);case'picked':{const source=s.commits[g.commit];return Boolean(source)&&reachable().some(c=>c.id!==g.commit&&c.message===source.message);}case'reverted':{const source=s.commits[g.commit];return Boolean(source)&&reachable().some(c=>c.message===`Revert "${source.message}"`);}}});
 return {complete:satisfied.every(Boolean),satisfied,summary:`${satisfied.filter(Boolean).length}/${satisfied.length}`};
}
