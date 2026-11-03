import type { Lang } from '../../core/missions/types';

export function MissionActions({lang,onHelp,onCommands,onMessage,onRetry}:{lang:Lang;onHelp:()=>void;onCommands:()=>void;onMessage:()=>void;onRetry:()=>void}) {
  return <div className="briefing__actions">
    <button className="pixel-button" onClick={onHelp}>{lang==='es'?'Pedir ayuda':'Get help'}</button>
    <button className="pixel-button" onClick={onCommands}>{lang==='es'?'Comandos GIT':'GIT commands'}</button>
    <button className="pixel-button" onClick={onMessage}>{lang==='es'?'Ver mensaje':'View message'}</button>
    <button className="pixel-button" onClick={onRetry}>{lang==='es'?'Reiniciar misión':'Restart mission'}</button>
  </div>;
}
