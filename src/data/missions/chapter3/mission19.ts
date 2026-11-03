import { baseFiles, commits, m } from '../shared';

export const mission19 = m(19,3,['HEAD sin cuerpo','A head without a body'],['Marcos dejó el repositorio en detached HEAD. Vuelve a main.','Marcos left the repository in detached HEAD. Return to main.'],['Cambia a main.','Switch to main.'],{commits,branches:{main:'c2'},detached:'c1',working:baseFiles},[{type:'onBranch',name:'main'}],[['Una rama vuelve a conectar HEAD.','A branch reconnects HEAD.']],[['git checkout main']]);
