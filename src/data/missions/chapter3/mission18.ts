import { commits, m } from '../shared';

export const mission18 = m(18,3,['El commit tóxico','The toxic commit'],['c2 llegó a producción y debe deshacerse sin reescribir historia compartida.','c2 reached production and must be undone without rewriting shared history.'],['Revierte c2.','Revert c2.'],{commits,branches:{main:'c2'},head:'main',working:commits[1].files},[{type:'commitMessage',includes:'Revert'}],[['revert crea un commit inverso.','revert creates an inverse commit.']],[['git revert c2']]);
