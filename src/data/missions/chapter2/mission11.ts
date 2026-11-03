import { commits, m } from '../shared';

export const mission11 = m(11,2,['Antes de enviar','Before sending'],['Tu arreglo está confirmado localmente. Compártelo con el equipo.','Your fix is committed locally. Share it with the team.'],['Haz push de main a origin.','Push main to origin.'],{commits,branches:{main:'c2'},head:'main',working:commits[1].files,remotes:{origin:{main:'c1'}}},[{type:'remoteEquals',remote:'origin',branch:'main',ref:'main'}],[['git push recibe remoto y rama.','git push takes a remote and branch.']],[['git push origin main']]);
