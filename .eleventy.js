const { build: viteBuild } = require('vite')
const requireFromString = require('require-from-string')
const { renderToString } = require('react-dom/server')
const React = require('react')

module.exports = function (eleventyConfig) {
  eleventyConfig.ignores.add('*.md')
  eleventyConfig.ignores.add('*.mdx')

  eleventyConfig.addPassthroughCopy('_data/**')
  eleventyConfig.addPassthroughCopy('assets/**')

  let id = 0
  eleventyConfig.on('beforeBuild', function () {
    id = 0
  })

  eleventyConfig.addShortcode('react', async function (componentPath) {
    id++
    const componentRootId = `component-root-${id}`

    const { output } = await viteBuild({
      root: '_site',
      build: {
        ssr: true,
        write: false,
        rollupOptions: {
          input: componentPath
        }
      },
      ssr: {
        format: 'cjs'
      },
      legacy: {
        buildSsrCjsExternalHeuristics: true
      }
    })

    const { default: Component } = requireFromString(output[0].code)
    const html = renderToString(React.createElement(Component))

    return `
        <div id="${componentRootId}">${html}</div>
        <script type="module">
          import Component${id} from '/${componentPath.replace('.tsx', '.js')}'
          import React from 'react'
          import { hydrateRoot } from 'react-dom/client'
          const componentRoot${id} = document.getElementById('${componentRootId}')
          hydrateRoot(componentRoot${id}, React.createElement(Component${id}))
        </script>
      `
  })
}
