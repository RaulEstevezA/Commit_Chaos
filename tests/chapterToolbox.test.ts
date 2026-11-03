import {describe,expect,it} from 'vitest';
import {baseGitCommand,chapterToolbox} from '../src/data/missions/chapterToolbox';

describe('chapter command toolbox',()=>{
  it('removes arguments and flags that could reveal mission answers',()=>{
    expect(baseGitCommand('git switch -c feature/login')).toBe('git switch');
    expect(baseGitCommand('git revert c2')).toBe('git revert');
  });

  it('provides a unique, non-empty toolbox for every chapter',()=>{
    for(const chapter of [1,2,3,4] as const){
      expect(chapterToolbox[chapter].length).toBeGreaterThan(0);
      expect(new Set(chapterToolbox[chapter]).size).toBe(chapterToolbox[chapter].length);
      expect(chapterToolbox[chapter].every(command=>/^git [a-z-]+$/.test(command))).toBe(true);
    }
  });
});
