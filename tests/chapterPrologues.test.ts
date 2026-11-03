import {describe,expect,it} from 'vitest';
import {personalize} from '../src/core/missions/personalize';
import {chapterPrologues} from '../src/data/lore/chapterPrologues';

describe('chapter prologues',()=>{
  it('provides complete localized lore for all four chapters',()=>{
    expect(Object.keys(chapterPrologues)).toEqual(['1','2','3','4']);
    for(const prologue of Object.values(chapterPrologues)){
      expect(prologue.title.es).toBeTruthy();
      expect(prologue.title.en).toBeTruthy();
      expect(prologue.paragraphs.es.length).toBeGreaterThanOrEqual(2);
      expect(prologue.paragraphs.en).toHaveLength(prologue.paragraphs.es.length);
      expect(prologue.action.es).toBeTruthy();
      expect(prologue.action.en).toBeTruthy();
    }
  });

  it('personalizes chapter dialogue',()=>{
    expect(personalize(chapterPrologues[4].quote.es,'Ada')).toContain('Ada');
  });
});
