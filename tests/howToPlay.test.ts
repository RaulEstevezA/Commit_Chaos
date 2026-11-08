import {describe,expect,it} from 'vitest';
import {howToPlay} from '../src/data/lore/howToPlay';
import {helpFor} from '../src/data/lore/glossary';

describe('how to play',()=>{
  it('is complete in both languages',()=>{
    const texts=[howToPlay.title,howToPlay.intro,howToPlay.whatIsGit.title,howToPlay.whatIsGit.body,howToPlay.tip,howToPlay.reopen,howToPlay.close,...[...howToPlay.steps,...howToPlay.cards].flatMap(x=>[x.title,x.body])];
    for(const text of texts){expect(text.es).toBeTruthy();expect(text.en).toBeTruthy();}
  });

  it('starts by saying it is a Git command simulator and how to reopen it',()=>{
    expect(howToPlay.intro.es).toMatch(/^Commit Chaos es un simulador de comandos Git/);
    expect(howToPlay.intro.en).toMatch(/^Commit Chaos is a Git command simulator/);
    expect(howToPlay.reopen.es).toContain('menú principal');
  });

  it('only promises git help terms that exist',()=>{
    expect(helpFor('git help rama','es')?.output[0]).not.toMatch(/No hay ayuda/);
    expect(helpFor('git help branch','en')?.output[0]).not.toMatch(/No help/);
  });
});
