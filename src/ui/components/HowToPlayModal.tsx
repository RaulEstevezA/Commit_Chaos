import type { Lang } from '../../core/missions/types';
import { howToPlay as text } from '../../data/lore/howToPlay';
import { Modal } from './Modal';

/** Explains what the game is and how a mission works. */
export function HowToPlayModal({open,lang,onClose}:{open:boolean;lang:Lang;onClose:()=>void}) {
  return <Modal open={open} title={text.title[lang]} onClose={onClose}>
    <article className="how-to-play">
      <p className="eyebrow">{text.eyebrow[lang]}</p>
      <p className="how-to-play__intro">{text.intro[lang]}</p>
      <section className="how-to-play__git"><h3>{text.whatIsGit.title[lang]}</h3><p>{text.whatIsGit.body[lang]}</p></section>
      <ol className="how-to-play__steps">{text.steps.map((step,i)=><li key={step.title.en}><span>{i+1}</span><div><strong>{step.title[lang]}</strong><p>{step.body[lang]}</p></div></li>)}</ol>
      <div className="how-to-play__cards">{text.cards.map(card=><section key={card.title.en}><h3>{card.title[lang]}</h3><p>{card.body[lang]}</p></section>)}</div>
      <blockquote className="how-to-play__tip">{text.tip[lang]}</blockquote>
      <p className="how-to-play__reopen">{text.reopen[lang]}</p>
      <button className="pixel-button pixel-button--primary" onClick={onClose}>{text.close[lang]} →</button>
    </article>
  </Modal>;
}
