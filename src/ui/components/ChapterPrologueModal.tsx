import { personalize } from '../../core/missions/personalize';
import type { Lang } from '../../core/missions/types';
import { chapterPrologues, type ChapterPrologue } from '../../data/lore/chapterPrologues';
import { Modal } from './Modal';

export function ChapterPrologueModal({chapter,lang,playerName,onContinue}:{chapter:ChapterPrologue['chapter']|null;lang:Lang;playerName:string;onContinue:()=>void}) {
  if (chapter === null) return null;
  const prologue = chapterPrologues[chapter];
  const text = (value:string) => personalize(value,playerName);
  return <Modal open title={text(prologue.title[lang])} onClose={onContinue}>
    <article className={`chapter-prologue chapter-prologue--${chapter}`}>
      <p className="chapter-prologue__signal">CHAPTER {String(chapter).padStart(2,'0')} // {prologue.signal[lang]}</p>
      <div className="chapter-prologue__story">{prologue.paragraphs[lang].map(paragraph=><p key={paragraph}>{text(paragraph)}</p>)}</div>
      <blockquote><b>{prologue.speaker[lang]}</b><p>{text(prologue.quote[lang])}</p></blockquote>
      <button className="pixel-button pixel-button--primary" onClick={onContinue}>{prologue.action[lang]} →</button>
    </article>
  </Modal>;
}
