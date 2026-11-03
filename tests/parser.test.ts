import {describe,expect,it} from 'vitest';
import {parseCommand,tokenize} from '../src/core/git/parser';
describe('command parser',()=>{it('keeps quoted commit messages together',()=>{expect(tokenize('git commit -m "hello world"')).toEqual(['git','commit','-m','hello world']);expect(parseCommand('git commit -m "hello world"').message).toBe('hello world');});it('rejects non-git commands',()=>{expect(()=>parseCommand('rm -rf repo')).toThrow(/command not found/);});});
