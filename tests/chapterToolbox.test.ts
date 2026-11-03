import {describe,expect,it} from 'vitest';
import {commandSignature,chapterToolbox} from '../src/data/missions/chapterToolbox';

describe('chapter command toolbox',()=>{
  it('removes answers but preserves meaningful command variants',()=>{
    expect(commandSignature('git switch -c feature/login')).toBe('git switch -c');
    expect(commandSignature('git revert c2')).toBe('git revert');
    expect(commandSignature('git push --force origin main')).toBe('git push --force');
    expect(commandSignature('git reset --hard c2')).toBe('git reset --hard');
  });

  it('provides a unique, non-empty toolbox for every chapter',()=>{
    for(const chapter of [1,2,3,4] as const){
      expect(chapterToolbox[chapter].length).toBeGreaterThan(0);
      expect(new Set(chapterToolbox[chapter]).size).toBe(chapterToolbox[chapter].length);
      expect(chapterToolbox[chapter].every(command=>command.startsWith('git '))).toBe(true);
    }
  });

  it('includes safe and chaotic ways to publish or recover',()=>{
    for(const chapter of [2,3,4] as const){
      expect(chapterToolbox[chapter]).toContain('git push --force-with-lease');
      expect(chapterToolbox[chapter]).toContain('git push --force');
    }
    for(const chapter of [3,4] as const){
      expect(chapterToolbox[chapter]).toContain('git reset');
      expect(chapterToolbox[chapter]).toContain('git reset --hard');
    }
  });
});
