const { build: viteBuild } = require('vite')
const requireFromString = require('require-from-string')
const { renderToString } = require('react-dom/server')
const React = require('react')

module.exports = function (eleventyConfig) {
  eleventyConfig.ignores.add('*.md')
  eleventyConfig.addPassthroughCopy('assets/**')
  eleventyConfig.addPassthroughCopy('components/**')

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
          input: `./${componentPath}`
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
          import Component from '/${componentPath}';
          import React from 'react';
          import ReactDOM from 'react-dom';
          const componentRoot = document.getElementById('${componentRootId}');
          ReactDOM.hydrate(React.createElement(Component), componentRoot);
        </script>
      `
  })
}
