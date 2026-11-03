import { baseFiles, commits, m } from '../shared';

export const mission20 = m(20,3,['El commit perdido','The lost commit'],['Un reset movió main a c1. El reflog recuerda c2.','A reset moved main to c1. The reflog remembers c2.'],['Consulta reflog y recupera c2.','Inspect reflog and recover c2.'],{commits,branches:{main:'c1'},head:'main',working:baseFiles},[{type:'effectUsed',effect:'inspect'},{type:'headIs',ref:'c2'}],[['Después de reflog, reset puede mover la referencia.','After reflog, reset can move the reference.']],[['git reflog','git reset --hard c2']]);
