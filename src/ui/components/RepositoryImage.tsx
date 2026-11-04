import { useEffect,useState } from 'react';

const artifactFiles:Record<string,string>={
  'cc-7f3a':'./assets/data/cc-7f3a.bin',
  'e1-a91c':'./assets/data/e1-a91c.bin',
  'e2-b42d':'./assets/data/e2-b42d.bin',
  'e3-c73f':'./assets/data/e3-c73f.bin',
  'e4-d18a':'./assets/data/e4-d18a.bin',
};

export function RepositoryImage({artifact,className='terminal__image',alt='Recovered image from repository'}:{artifact:string;className?:string;alt?:string}){
  const[url,setUrl]=useState<string|null>(null);
  const[failed,setFailed]=useState(false);

  useEffect(()=>{
    let objectUrl:string|undefined;
    const controller=new AbortController();
    const source=artifactFiles[artifact];
    if(!source){setFailed(true);return()=>controller.abort();}
    setFailed(false);setUrl(null);
    fetch(source,{signal:controller.signal})
      .then(response=>{if(!response.ok)throw new Error(`Artifact ${response.status}`);if(!response.body)throw new Error('Artifact stream unavailable');return new Response(response.body.pipeThrough(new DecompressionStream('gzip'))).arrayBuffer();})
      .then(bytes=>{objectUrl=URL.createObjectURL(new Blob([bytes],{type:'image/png'}));setUrl(objectUrl);})
      .catch(error=>{if((error as Error).name!=='AbortError')setFailed(true);});
    return()=>{controller.abort();if(objectUrl)URL.revokeObjectURL(objectUrl);};
  },[artifact]);

  if(failed)return <span className="terminal__artifact-error">fatal: recovered artifact could not be decoded</span>;
  if(!url)return <span className="terminal__artifact-loading">Decoding binary artifact…</span>;
  return <img className={className} src={url} alt={alt}/>;
}
