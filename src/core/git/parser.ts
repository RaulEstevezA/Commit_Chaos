export interface ParsedCommand { name:string; args:string[]; flags:Set<string>; message?:string; }
export function tokenize(input:string):string[] {
  const tokens:string[]=[]; let current=''; let quote='';
  for(let i=0;i<input.length;i++){ const c=input[i]; if(quote){ if(c===quote) quote=''; else current+=c; }
    else if(c==='"'||c==="'") quote=c; else if(/\s/.test(c)){ if(current){tokens.push(current);current='';} } else current+=c; }
  if(quote) throw new Error('Unclosed quote.'); if(current) tokens.push(current); return tokens;
}
export function parseCommand(input:string):ParsedCommand {
  const tokens=tokenize(input.trim()); if(tokens[0]!=='git') throw new Error('command not found: use git <command>');
  if(!tokens[1]) throw new Error('usage: git <command> [<args>]');
  const flags=new Set(tokens.filter(t=>t.startsWith('-'))); const mi=tokens.findIndex(t=>t==='-m'||t==='--message');
  return {name:tokens[1],args:tokens.slice(2).filter((_,i)=>!tokens[i+2].startsWith('-') && i+2!==mi+1),flags,message:mi>=0?tokens[mi+1]:undefined};
}
