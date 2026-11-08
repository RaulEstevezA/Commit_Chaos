import {describe,expect,it} from 'vitest';
import {missions} from '../src/data/missions';
import {beatsForMissionStart,chapterStoryRead,chapterStoryUntil,storyBeats,type StoryBeat} from '../src/data/lore/story';

const ids=(beats:StoryBeat[])=>beats.map(b=>b.id);
const none=()=>false;

describe('story beats',()=>{
  it('are complete in both languages and have unique ids',()=>{
    expect(new Set(ids(storyBeats)).size).toBe(storyBeats.length);
    for(const beat of storyBeats){
      for(const lang of ['es','en'] as const){
        expect(beat.title[lang],beat.id).toBeTruthy();
        expect(beat.signal[lang],beat.id).toBeTruthy();
        expect(beat.action[lang],beat.id).toBeTruthy();
        for(const line of beat.lines){expect(line.speaker[lang],beat.id).toBeTruthy();expect(line.text[lang],beat.id).toBeTruthy();}
      }
      expect(beat.paragraphs.es.length,beat.id).toBeGreaterThanOrEqual(1);
      expect(beat.paragraphs.en,beat.id).toHaveLength(beat.paragraphs.es.length);
    }
  });

  it('belong to a mission of their own chapter',()=>{
    for(const beat of storyBeats)expect(missions.find(m=>m.id===beat.mission)?.chapter,beat.id).toBe(beat.chapter);
  });

  it('give every chapter a prologue and story between missions',()=>{
    for(const chapter of [1,2,3,4] as const){
      const beats=storyBeats.filter(b=>b.chapter===chapter);
      expect(beats.filter(b=>b.kind==='prologue')).toHaveLength(1);
      expect(beats.filter(b=>b.kind==='scene').length).toBeGreaterThanOrEqual(3);
    }
    expect(storyBeats.filter(b=>b.kind==='closing').map(b=>b.mission)).toEqual([8,16,24]);
  });

  it('plays the prologue and the scenes when a mission starts',()=>{
    expect(ids(beatsForMissionStart(missions[0],null,none))).toEqual(['prologue-1']);
    expect(ids(beatsForMissionStart(missions[1],1,none))).toEqual(['prologue-1']);
    expect(ids(beatsForMissionStart(missions[2],2,none))).toEqual(['prologue-1','scene-03']);
  });

  it('closes a chapter before opening the next one',()=>{
    expect(ids(beatsForMissionStart(missions[8],8,none))).toEqual(['closing-08','prologue-2']);
  });

  it('does not repeat what the player has already seen',()=>{
    const seen=(b:StoryBeat)=>b.id==='prologue-1';
    expect(ids(beatsForMissionStart(missions[2],2,seen))).toEqual(['scene-03']);
    expect(beatsForMissionStart(missions[3],3,seen)).toEqual([]);
  });

  it('rereads the chapter story up to the current mission',()=>{
    expect(ids(chapterStoryUntil(2,13))).toEqual(['prologue-2','scene-11','scene-13']);
    expect(ids(chapterStoryUntil(2,16))).not.toContain('closing-16');
  });

  it('only shows lived story on the map unless everything is unlocked',()=>{
    expect(chapterStoryRead(3,none)).toEqual([]);
    expect(ids(chapterStoryRead(1,b=>b.id==='prologue-1'))).toEqual(['prologue-1']);
    expect(chapterStoryRead(1,none,true)).toHaveLength(storyBeats.filter(b=>b.chapter===1).length);
  });
});
