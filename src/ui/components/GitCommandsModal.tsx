import type { Lang } from '../../core/missions/types';
import { Modal } from './Modal';

const commands = [
  ['git init','Crear un repositorio','Create a repository'],
  ['git status','Revisar el estado actual','Inspect the current state'],
  ['git add <archivo>','Preparar cambios','Stage changes'],
  ['git commit -m "mensaje"','Crear un commit','Create a commit'],
  ['git log','Ver el historial','Read the history'],
  ['git branch [nombre]','Listar o crear ramas','List or create branches'],
  ['git switch [-c] <rama>','Cambiar o crear una rama','Switch or create a branch'],
  ['git checkout [-b] <rama>','Alternativa a switch','Alternative to switch'],
  ['git merge <rama>','Fusionar una rama','Merge a branch'],
  ['git stash [pop|apply]','Guardar o recuperar cambios','Store or restore changes'],
  ['git remote [add <nombre>]','Gestionar remotos','Manage remotes'],
  ['git fetch [remoto]','Consultar cambios remotos','Fetch remote changes'],
  ['git pull [remoto] [rama]','Traer y fusionar cambios','Fetch and merge changes'],
  ['git push [--force-with-lease]','Publicar cambios','Publish changes'],
  ['git reset [--hard] <ref>','Mover HEAD a una referencia','Move HEAD to a reference'],
  ['git revert <ref>','Deshacer con un nuevo commit','Undo with a new commit'],
  ['git reflog','Consultar movimientos de HEAD','Inspect HEAD movements'],
  ['git cherry-pick <ref>','Aplicar un commit concreto','Apply one specific commit'],
  ['git rebase <ref>','Recolocar la historia','Rebase the history'],
  ['git tag [nombre]','Crear una etiqueta','Create a tag'],
] as const;

export function GitCommandsModal({open,lang,onClose}:{open:boolean;lang:Lang;onClose:()=>void}) {
  return <Modal open={open} title={lang==='es'?'Comandos GIT':'GIT commands'} onClose={onClose}>
    <div className="command-reference">
      <p>{lang==='es'?'Referencia de los comandos disponibles en el simulador. Los argumentos entre < > son obligatorios; los que están entre [ ] son opcionales.':'Reference for commands available in the simulator. Arguments inside < > are required; arguments inside [ ] are optional.'}</p>
      <dl>{commands.map(([command,es,en])=><div key={command}><dt><code>{command}</code></dt><dd>{lang==='es'?es:en}</dd></div>)}</dl>
    </div>
  </Modal>;
}
