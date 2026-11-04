import { describe, expect, it } from 'vitest';
import type { Lang } from '../src/core/missions/types';
import { glossary, helpFor, splitGlossary } from '../src/data/lore/glossary';
import { missions } from '../src/data/missions';

const langs: Lang[] = ['es', 'en'];
const marked = (text: string, lang: Lang) => splitGlossary(text, lang).filter((part) => part.termId).map((part) => part.termId);

describe('glossary', () => {
  it('defines every term in both languages', () => {
    expect(new Set(glossary.map((entry) => entry.id)).size).toBe(glossary.length);
    for (const entry of glossary) {
      for (const lang of langs) {
        expect(entry.term[lang]).toBeTruthy();
        expect(entry.definition[lang]).toBeTruthy();
        expect(entry.quip[lang]).toBeTruthy();
        expect(entry.aliases[lang].length).toBeGreaterThan(0);
      }
    }
  });

  it('explains every command the simulator supports', () => {
    for (const command of ['init', 'status', 'add', 'commit', 'log', 'show', 'branch', 'checkout', 'switch', 'merge', 'stash', 'remote', 'fetch', 'pull', 'push', 'reset', 'revert', 'reflog', 'cherry-pick', 'rebase', 'tag']) {
      expect(helpFor(`git help ${command}`, 'es')?.quip, command).not.toContain('De eso no tengo nada');
    }
  });
});

describe('marked terms', () => {
  it.each(langs)('never alters mission text in %s', (lang) => {
    for (const mission of missions) {
      for (const text of [mission.briefing[lang], mission.objective[lang], ...mission.hints.map((hint) => hint[lang])]) {
        expect(splitGlossary(text, lang).map((part) => part.text).join('')).toBe(text);
      }
    }
  });

  it('marks only the first mention of each term', () => {
    expect(marked('stash y otro stash', 'es')).toEqual(['stash']);
  });

  it('prefers the longest term', () => {
    expect(marked('Quedó en detached HEAD', 'en')).toEqual(['detached']);
    expect(marked('usa --force-with-lease', 'es')).toEqual(['lease']);
  });

  it('skips paths, other names and ordinary words', () => {
    expect(marked('Main y release chocan en src/status.ts', 'es')).toEqual(['main']);
    expect(marked('The status page is green', 'en')).toEqual([]);
    expect(marked('feature/login', 'es')).toEqual([]);
    expect(marked('a head without a body', 'en')).toEqual([]);
  });

  it('keeps terms at the end of a sentence', () => {
    expect(marked('Vuelve a main.', 'es')).toEqual(['main']);
  });
});

describe('git help', () => {
  it('answers the usual forms and ignores other commands', () => {
    expect(helpFor('git help stash', 'es')?.output[0]).toContain('Stash:');
    expect(helpFor('git stash --help', 'en')?.output[0]).toContain('Stash:');
    expect(helpFor('git help detached head', 'es')?.output[0]).toContain('Detached HEAD');
    expect(helpFor('git help', 'es')?.output[1]).toContain('Reflog');
    expect(helpFor('git --help', 'en')?.output[1]).toContain('Reflog');
    expect(helpFor('git stash', 'es')).toBeNull();
    expect(helpFor('git push --force origin main', 'es')).toBeNull();
  });

  it('answers in character when it does not know the term', () => {
    expect(helpFor('git help blockchain', 'es')?.quip).toMatch(/^Pato:/);
    expect(helpFor('git help blockchain', 'en')?.quip).toMatch(/^Duck:/);
  });
});
