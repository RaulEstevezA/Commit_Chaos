import { baseFiles, commits, m } from '../shared';

export const mission27 = m(27,4,['La recuperación del reflog','Reflog recovery'],['Un hard reset borró de la vista el despliegue bueno c2.','A hard reset hid the good c2 deployment.'],['Usa el reflog y recupera c2.','Use reflog and recover c2.'],{commits,branches:{main:'c1'},head:'main',working:baseFiles},[{type:'effectUsed',effect:'inspect'},{type:'headIs',ref:'c2'}],[['Git recuerda más de lo que Marcos desearía.','Git remembers more than Marcos would like.']],[['git reflog','git reset --hard c2']]);
