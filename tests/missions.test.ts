import {describe,expect,it} from 'vitest';
import {createRepo} from '../src/core/git/factory';
import {executeCommand} from '../src/core/git/simulator';
import {validateMission} from '../src/core/missions/types';
import {missions} from '../src/data/missions';
describe('32 mission campaign',()=>{it('contains four chapters of eight missions',()=>{expect(missions).toHaveLength(32);for(let c=1;c<=4;c++)expect(missions.filter(m=>m.chapter===c)).toHaveLength(8);});it.each(missions.map(m=>[m.id,m] as const))('mission %s is solvable by its reference path',(_id,mission)=>{let state=createRepo(mission.seed);const effects:string[]=[];for(const command of mission.solutions[0]){const result=executeCommand(state,command);state=result.state;effects.push(...result.effects);}const v=validateMission(mission,state,effects);expect(v.complete,`${mission.id}: ${mission.title.en} (${v.summary})`).toBe(true);});it('reference solutions are commands, not quiz answers',()=>{for(const mission of missions)for(const path of mission.solutions)for(const command of path)expect(command.startsWith('git ')).toBe(true);});});
