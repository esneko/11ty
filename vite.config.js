import fs from 'fs'
import { defineConfig } from 'vite'

export const getFiles = (entry, extensions = []) => {
  let fileNames = []

  const dirs = fs.readdirSync(entry)

  dirs.forEach((dir) => {
    const path = `${entry}/${dir}`

    if (fs.lstatSync(path).isDirectory()) {
      fileNames = [...fileNames, ...getFiles(path, extensions)]
      return
    }

    if (extensions.some((ext) => dir.endsWith(ext))) {
      fileNames.push(path)
    }
  })

  return fileNames
}

export default defineConfig({
  server: {
    mode: 'development',
    middlewareMode: true
  },
  build: {
    mode: 'production',
    target: 'esnext',
    rollupOptions: {
      preserveModules: true,
      preserveEntrySignatures: true,
      input: [...getFiles('./components', ['.tsx'])],
      output: {
        dir: 'dist'
      }
    }
  }
})
