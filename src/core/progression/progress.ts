export interface Progress {version:1;playerName:string;completed:number[];unlocked:number;chaosLegacy:number;commands:number;hints:number;achievements:string[];chapterIntrosSeen:number[];ending?:Ending;}
export type Ending='wizard'|'lead'|'lord'|'detached';
export const defaultProgress=():Progress=>({version:1,playerName:'Terminator',completed:[],unlocked:1,chaosLegacy:0,commands:0,hints:0,achievements:[],chapterIntrosSeen:[]});
export function sanitizeName(name:string){return name.trim().slice(0,24)||'Terminator';}
export function endingFor(p:Progress,effects:string[]):Ending {if(effects.includes('detached'))return'detached';if(p.chaosLegacy>=55||effects.includes('force-push'))return'lord';if(p.hints<=8&&p.chaosLegacy<=15)return'wizard';return'lead';}
export function achievementsFor(p:Progress,effects:string[]):string[]{const a=new Set(p.achievements);if(p.completed.length>=1)a.add('first-commit');if(p.completed.length>=8)a.add('home-survivor');if(p.completed.length>=16)a.add('probation');if(p.completed.length>=24)a.add('veteran');if(p.completed.length===32)a.add('last-hope');if(p.hints===0&&p.completed.length>=8)a.add('no-manual');if(effects.includes('safe-force'))a.add('lease-holder');if(effects.includes('reflog'))a.add('time-traveler');return [...a];}
export const achievementLabels={
 'first-commit':['Primer commit','First commit'],'home-survivor':['Superviviente doméstico','Home survivor'],probation:['Contrato indefinido','Permanent contract'],veteran:['Veterano de guerra','Battle-hardened'], 'last-hope':['Última esperanza','Last hope'],'no-manual':['Sin ruedines','No training wheels'],'lease-holder':['Fuerza responsable','Responsible force'],'time-traveler':['Viajero del tiempo','Time traveler']
} as const;
