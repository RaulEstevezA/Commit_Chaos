export type FileState = 'modified' | 'deleted' | 'untracked' | 'conflicted';
export interface Commit { id: string; message: string; parents: string[]; files: Record<string,string>; }
export interface Branch { name: string; commitId: string; }
export interface Remote { name: string; branches: Record<string,string>; }
export interface GitState {
  initialized: boolean; commits: Record<string,Commit>; branches: Record<string,Branch>;
  head: { type:'branch'; name:string } | { type:'detached'; commitId:string };
  workingTree: Record<string,string>; index: Record<string,string|null>; remotes: Record<string,Remote>;
  stash: Array<{ id:string; message:string; changes:Record<string,string|null> }>;
  conflicts: string[]; mergeHead?: string; rebase?: { onto:string; remaining:string[] };
  reflog: string[]; nextId: number; commandCount: number;
}
export interface CommandResult { state:GitState; ok:boolean; output:string[]; command:string; effects:string[]; chaosDelta:number; }
export const emptyGitState = ():GitState => ({initialized:false,commits:{},branches:{},head:{type:'branch',name:'main'},workingTree:{},index:{},remotes:{},stash:[],conflicts:[],reflog:[],nextId:1,commandCount:0});
export const cloneState = (state:GitState):GitState => structuredClone(state);
export const headId = (s:GitState):string|undefined => s.head.type==='branch' ? s.branches[s.head.name]?.commitId : s.head.commitId;
export const headCommit = (s:GitState):Commit|undefined => { const id=headId(s); return id ? s.commits[id] : undefined; };
