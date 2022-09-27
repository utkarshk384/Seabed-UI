import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import postcss from './postcss.config.js';

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss,
  },
  plugins: [svelte({}), CustomHmr()],
})

function CustomHmr() {
  return {
    name: 'custom-hmr',
    enforce: 'post',

    handleHotUpdate({ file, server }) {
      if (file.endsWith('.json')) {
        console.log('reloading json file...');

        server.ws.send({
          type: 'full-reload',          
          path: '*'
        });
      }
    },
  }
}
   