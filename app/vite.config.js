/**import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          monaco: ['monaco-editor']
        }
      }
    }
  }
})*/
// vite.config.ts
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    watch: {
      // Adjust glob pattern as needed
      // This watches a specific package inside node_modules
      // (e.g., when working with a local development package)
      ignored: (str) => str.indexOf('node_modules/@alle0017!') < 0,
      
    },
  },
  optimizeDeps: {
    // Exclude the watched package from pre-bundling so it's not cached
    exclude: [],
  },
  resolve: {
    // Useful if using symlinked packages in a monorepo
    preserveSymlinks: true,
  },
})

