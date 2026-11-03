import { useCallback,useEffect,useRef,useState,type ReactNode } from 'react';

type Phase='idle'|'opening'|'closing';
type TriggerOrigin={x:number;y:number;capturedAt:number};
let lastTriggerOrigin:TriggerOrigin|null=null;

export function Modal({open,title,children,onClose}:{open:boolean;title:string;children:ReactNode;onClose:()=>void}){
  const ref=useRef<HTMLDialogElement>(null);
  const timer=useRef<number|undefined>(undefined);
  const [phase,setPhase]=useState<Phase>('idle');

  useEffect(()=>{
    const rememberTrigger=(event:PointerEvent)=>{
      const target=event.target instanceof Element?event.target.closest('button'):null;
      if(!target)return;
      const bounds=target.getBoundingClientRect();
      lastTriggerOrigin={x:bounds.left+bounds.width/2,y:bounds.top+bounds.height/2,capturedAt:Date.now()};
    };
    document.addEventListener('pointerdown',rememberTrigger,true);
    return()=>document.removeEventListener('pointerdown',rememberTrigger,true);
  },[]);

  const finishClose=useCallback(()=>{
    window.clearTimeout(timer.current);
    ref.current?.close();
    setPhase('idle');
    onClose();
  },[onClose]);

  const requestClose=useCallback(()=>{
    const dialog=ref.current;
    if(!dialog?.open||phase==='closing')return;
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){finishClose();return;}
    setPhase('closing');
    timer.current=window.setTimeout(finishClose,220);
  },[finishClose,phase]);

  useEffect(()=>{
    const dialog=ref.current;
    if(open&&!dialog?.open){
      const active=document.activeElement;
      const keyboardTrigger=active instanceof HTMLElement&&active!==document.body?active.getBoundingClientRect():null;
      const pointerTrigger=lastTriggerOrigin&&Date.now()-lastTriggerOrigin.capturedAt<1200?lastTriggerOrigin:null;
      dialog?.showModal();
      if(dialog){
        const bounds=dialog.getBoundingClientRect();
        const x=pointerTrigger?pointerTrigger.x-bounds.left:keyboardTrigger?keyboardTrigger.left+keyboardTrigger.width/2-bounds.left:bounds.width/2;
        const y=pointerTrigger?pointerTrigger.y-bounds.top:keyboardTrigger?keyboardTrigger.top+keyboardTrigger.height/2-bounds.top:bounds.height/2;
        dialog.style.setProperty('--dialog-origin-x',`${x}px`);
        dialog.style.setProperty('--dialog-origin-y',`${y}px`);
        setPhase(window.matchMedia('(prefers-reduced-motion: reduce)').matches?'idle':'opening');
        window.clearTimeout(timer.current);
        timer.current=window.setTimeout(()=>setPhase('idle'),260);
      }
    }
    if(!open&&dialog?.open)requestClose();
  },[open,requestClose]);

  useEffect(()=>()=>window.clearTimeout(timer.current),[]);

  return <dialog ref={ref} className={`dialog--${phase}`} onCancel={event=>{event.preventDefault();requestClose();}} aria-labelledby="modal-title">
    <div className="modal__head"><h2 id="modal-title">{title}</h2><button onClick={requestClose} aria-label="Close">×</button></div>
    {children}
  </dialog>;
}
