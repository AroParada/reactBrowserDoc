import * as esbuild from 'esbuild-wasm'
import axios from 'axios';
import localforage from 'localforage';

const filedCache = localforage.createInstance({
  name: 'filecache'
});

export const fetchPlugin = (inputCode: string) => {
    return {
        name: 'fetch-plugin',
        setup(build: esbuild.PluginBuild) {
        build.onLoad({ filter: /.*/ }, async (args: any) => {
            if (args.path === 'index.js') {
              return {
                loader: 'jsx',
                contents: inputCode,
              };
            }
    
            // check to see if we have already fetched file
            // and if its in the cache
            const cachedResult = await filedCache.getItem<esbuild.OnLoadResult>(args.path);
    
            // if it is, return it imediately
            if (cachedResult) {
              return cachedResult;
            }
    
            const { data , request } = await axios.get(args.path);
    
            const result: esbuild.OnLoadResult = {
              loader: 'jsx',
              contents: data,
              resolveDir: new URL('./', request.responseURL).pathname
            };
            // store response in cache 
            await filedCache.setItem(args.path, result)
    
            return result
          });
        }
    }
}