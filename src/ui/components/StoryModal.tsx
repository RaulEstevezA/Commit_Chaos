import { useEffect,useState } from 'react';
import { personalize } from '../../core/missions/personalize';
import type { Lang } from '../../core/missions/types';
import type { StoryBeat } from '../../data/lore/story';
import { Modal } from './Modal';

const kindLabel={es:{prologue:'PRÓLOGO',scene:'ESCENA',closing:'CIERRE'},en:{prologue:'PROLOGUE',scene:'SCENE',closing:'CLOSING'}};

/** Shows one or more story windows in reading order, with paging between them. */
export function StoryModal({beats,startIndex=0,lang,playerName,onClose}:{beats:StoryBeat[]|null;startIndex?:number;lang:Lang;playerName:string;onClose:()=>void}) {
  const [index,setIndex]=useState(startIndex);
  // Keep the last pages on screen while the dialog plays its closing animation.
  const [shown,setShown]=useState(beats);
  useEffect(()=>{if(beats){setShown(beats);setIndex(startIndex);}},[beats,startIndex]);
  const beat=shown?.[Math.min(index,shown.length-1)];
  const text=(value:string)=>personalize(value,playerName);
  const last=!shown||index>=shown.length-1;
  return <Modal open={Boolean(beats)} title={beat?text(beat.title[lang]):''} onClose={onClose}>
    {beat&&shown&&<article className={`chapter-prologue chapter-prologue--${beat.chapter}`} key={beat.id}>
      <p className="chapter-prologue__signal">{kindLabel[lang][beat.kind]} · CHAPTER {String(beat.chapter).padStart(2,'0')} // {beat.signal[lang]}</p>
      <div className="chapter-prologue__story">{beat.paragraphs[lang].map(paragraph=><p key={paragraph}>{text(paragraph)}</p>)}</div>
      {beat.lines.length>0&&<div className="chapter-prologue__lines">{beat.lines.map((line,i)=><blockquote key={i}><b>{line.speaker[lang]}</b><p>{text(line.text[lang])}</p></blockquote>)}</div>}
      {shown.length>1&&<nav className="chapter-prologue__pager" aria-label={lang==='es'?'Páginas de la historia':'Story pages'}>
        <button className="text-button" disabled={index===0} onClick={()=>setIndex(i=>i-1)}>← {lang==='es'?'Anterior':'Previous'}</button>
        <span>{shown.map((b,i)=><button key={b.id} className={i===index?'is-current':''} aria-current={i===index?'step':undefined} aria-label={text(b.title[lang])} onClick={()=>setIndex(i)}/>)}</span>
        <small>{index+1}/{shown.length}</small>
      </nav>}
      <button className="pixel-button pixel-button--primary" onClick={()=>last?onClose():setIndex(i=>i+1)}>{beat.action[lang]} →</button>
    </article>}
  </Modal>;
}
