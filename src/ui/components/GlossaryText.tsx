import type { Lang } from '../../core/missions/types';
import { glossaryById, splitGlossary } from '../../data/lore/glossary';

export function GlossaryText({text,lang,onTerm}:{text:string;lang:Lang;onTerm:(id:string)=>void}) {
  return <>{splitGlossary(text,lang).map((segment,index)=>segment.termId
    ?<button key={index} type="button" className="glossary-term" title={glossaryById[segment.termId].term[lang]} onClick={()=>onTerm(segment.termId!)}>{segment.text}</button>
    :<span key={index}>{segment.text}</span>)}</>;
}
