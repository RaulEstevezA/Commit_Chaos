import { useCallback,useState } from 'react';
import { defaultProgress,type Progress } from '../../core/progression/progress';
const KEY='commit-chaos.progress';
function load():Progress{try{const raw=localStorage.getItem(KEY);if(!raw)return defaultProgress();const p=JSON.parse(raw) as Progress;return p.version===1?{...defaultProgress(),...p}:defaultProgress();}catch{return defaultProgress();}}
export function useProgress(){const [progress,setState]=useState(load);const setProgress=useCallback((next:Progress|((p:Progress)=>Progress))=>{setState(p=>{const value=typeof next==='function'?next(p):next;try{localStorage.setItem(KEY,JSON.stringify(value));}catch{/* session-only fallback */}return value;});},[]);const reset=useCallback(()=>{try{localStorage.removeItem(KEY);}catch{/* noop */}setState(defaultProgress());},[]);return{progress,setProgress,reset};}
