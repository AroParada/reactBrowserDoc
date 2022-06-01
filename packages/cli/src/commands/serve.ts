import path from 'path';
import { Command } from 'commander';
import { serve } from 'local-api'

export const serveCommand = new Command()
//square brackets tell commander its a optional value & angle brackets are required
 .command('serve [filename]')
 .description('Open a file for editing')
 .option('-p, --port <number>', 'port to run server on', '4005' )
 .action((filename = 'notebook.js', options: { port: string }) => {
    const dir = path.join(process.cwd(), path.dirname(filename)) 
     serve(parseInt(options.port), path.basename(filename), dir);  
 });