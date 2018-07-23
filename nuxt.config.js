
const webpack = require('webpack')
const fs = require('fs-extra')
const path = require('path')
const lodash = require('lodash')
const mdit = require('markdown-it')()

const domain = 'hire.jonasgalvez.com.br'

const isDirectory = (source) => {
  return fs.lstatSync(source).isDirectory()
}

const parseEntry = (entryFile) => {
  const raw = fs.readFileSync(entryFile, 'utf8')
  let [
    published,
    summary
  ] = raw
    .substr(0, raw.indexOf('#'))
    .trim()
    .split(/\n\n/)
  const publishedText = published
  published = new Date(Date.parse(published))
  const md = raw.substr(raw.indexOf('#'))
  const title = md
    .substr(raw.indexOf('\n'))
    .match(/^#\s+(.*)/)[1]
  return {
    title,
    summary,
    published,
    publishedText,
    id: `tag:${domain},${published.getFullYear()}:${published.getTime()}`,
    markdown: entryFile
  }
}

const loadEntry = (fullpath) => {
  if (isDirectory(fullpath)) {
    const entryFiles = fs.readdirSync(fullpath)
    const text = entryFiles.find((f) => f.endsWith('.entry'))
    if (!text) {
      return false
    }
    const assetsRoot = path.join('static', 'entries')
    fs.ensureDirSync(assetsRoot)
    const others = entryFiles
      .filter((f) => !f.endsWith('.entry'))
      .forEach((f) => {
        fs.copySync(
          path.join(fullpath, f),
          path.join(assetsRoot, f)
        )
      })
    return parseEntry(path.join(fullpath, text))
  } else if (fullpath.endsWith('.entry')) {
    return parseEntry(fullpath)
  } else {
    return false
  }
}

const generateEntryPermalink = (title, published) => {
  const slug = title.replace(/\s+/g, '-')
  const date = published.toString().split(/\s+/).slice(1, 4).reverse()
  return `${date[0]}/${date[2]}/${date[1]}/${slug}`
}

const entries = (() => {
  const entriesRoot = path.resolve(__dirname, 'entries')
  const entries = []
  const dirEntries = fs.readdirSync(entriesRoot)
  for (let i = 0; i < dirEntries.length; i++) {
    const validEntry = loadEntry(path.join(entriesRoot, dirEntries[i]))
    if (validEntry) {
      entries.push(
        Object.assign({}, {
          permalink: generateEntryPermalink(validEntry.title, validEntry.published),
          published: validEntry.published.toISOString()
        }, validEntry)
      )
    }
  }
  entries.sort((a, b) => {
    return b.published - a.published
  })
  return entries
})()

const generateIndex = () => {
  fs.writeFileSync(
    path.resolve(__dirname, 'entries.json'),
    JSON.stringify(entries, null, 2)
  )
}

const generateFeeds = () => {
  const rssFeedTemplate = lodash.template(
    fs.readFileSync('./feeds/rss.xml.template', 'utf8')
  )
  const atomFeedTemplate = lodash.template(
    fs.readFileSync('./feeds/atom.xml.template', 'utf8')
  )
  const data = {
    entries: entries.slice(0, 10),
    domain
  }
  fs.writeFileSync('./static/rss.xml', rssFeedTemplate(data))
  fs.writeFileSync('./static/atom.xml', atomFeedTemplate(data))
}

const routes = require('./pages/index')

module.exports = {
  plugins: ['~/plugins/nuxpress.js'],
  srcDir: './',
  router: {
    extendRoutes: (nuxtRoutes, resolve) => {
      nuxtRoutes.splice(0, nuxtRoutes.length, ...routes.map((route) => {
        return Object.assign({}, route, {
          component: resolve(__dirname, route.component)
        })
      }))
    }
  },
  build: {
    babel: {
      presets: ['env', 'stage-2'],
      plugins: ['transform-runtime', 'transform-do-expressions']
    },
    plugins: [
      new webpack.IgnorePlugin(/^entries/)
    ],
    extend (config, { isDev }) {
      // Generate entries.json file with all entry metadata
      generateIndex()
      // Generate /static/atom.xml and /static/rss.xml
      generateFeeds()
      // Tweak for GitHub pages
      if (!isDev) {
        config.output.publicPath = './_nuxt/'
      } else {
        // Ensure linting on dev mode
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          exclude: /(node_modules)/
        })
      }
    }
  }
}
