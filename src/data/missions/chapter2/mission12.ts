import { baseFiles, commits, m } from '../shared';

export const mission12 = m(12,2,['Cambio entrante','Incoming change'],['Laura publicó una mejora. Actualiza tu main.','Laura published an improvement. Update your main.'],['Integra origin/main en tu rama.','Integrate origin/main into your branch.'],{commits,branches:{main:'c1'},head:'main',working:baseFiles,remotes:{origin:{main:'c2'}}},[{type:'fileEquals',path:'src/app.ts',content:'console.log("ready")'}],[['pull equivale a fetch más integración.','pull combines fetch and integration.']],[['git pull origin main']]);
