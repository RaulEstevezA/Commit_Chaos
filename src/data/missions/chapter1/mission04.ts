import { baseFiles, m } from '../shared';

export const mission04 = m(4,1,['Una rama para experimentar','A branch to experiment'],['Quieres probar física para el pato sin romper main.','You want to test duck physics without breaking main.'],['Crea y cambia a la rama experimento.','Create and switch to branch experiment.'],{files:baseFiles},[{type:'branchExists',name:'experimento'},{type:'onBranch',name:'experimento'}],[['checkout -b hace las dos cosas.','checkout -b does both jobs.']],[['git checkout -b experimento'],['git branch experimento','git checkout experimento']]);
