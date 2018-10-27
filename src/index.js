
const path = require('path')
const consola = require('consola')
const webpack = require('webpack')
const fs = require('fs-extra')
const path = require('path')
const lodash = require('lodash')
const mdit = require('markdown-it')()
const logger = consola.withScope('nuxt:press')
const defaultOptions = require('./common/options')

const generateEntryPermalink = (title, published, lang = null) => {
  const slug = title.replace(/\s+/g, '-')
  const date = published.toString().split(/\s+/).slice(1, 4).reverse()
  return `${lang ? `${lang}/` : ''}${date[0]}/${date[2]}/${date[1]}/${slug}`
}

const loadEntries = (lang = null) => {
  const entriesRoot = lang
    ? path.resolve(__dirname, 'entries', lang)
    : path.resolve(__dirname, 'entries')
  const entries = []
  const dirEntries = fs.readdirSync(entriesRoot)
  for (let i = 0; i < dirEntries.length; i++) {
    const validEntry = loadEntry(path.join(entriesRoot, dirEntries[i]))
    if (validEntry) {
      entries.push(
        Object.assign({}, {
          permalink: generateEntryPermalink(
            validEntry.title,
            validEntry.published,
            lang
          ),
          published: validEntry.published.toISOString()
        }, validEntry)
      )
    }
  }
  entries.sort((a, b) => b.published - a.published)
  return entries
}

const generateIndex = () => {
  fs.writeFileSync(
    path.resolve(__dirname, 'entries.json'),
    JSON.stringify(entries, null, 2)
  )
}

const generateFeeds = (entries) => {
  return languages.reduce((arr, lang) => {
    const options = {
      domain,
      entries: entries[lang].slice(0, 10)
    }
    return arr.concat[
      {
        options,
        src: './feeds/rss.xml.template',
        dst: `../static/rss.${lang}.xml`,
      },
      {
        options,
        src: './feeds/atom.xml.template',
        dst: `../static/atom.${lang}.xml`
      }
    ]
  }, [])
}

// new webpack.IgnorePlugin(/^entries/),
// new CopyWebpackPlugin([
//   { from: 'entries/*', to: 'entries/' },
//   { from: 'pages/*.md', to: 'pages/' }
// ])

module.exports = function (userOptions) {
  const templatesPath = join(__dirname, 'templates')
  const options = { ...defaultOptions, ...userOptions }
  const isMultilingual = Array.isArray(options.languages) && options.languages.length
  let entries
  if (isMultilingual) {
    entries = {}
    for (const lang in options.languages) {
      entries[lang] = loadEntries(lang)
    }
  } else {
    entries = loadEntries()
  }

  this.extendBuild((config) => {
    config.plugins = [
      new webpack.IgnorePlugin(/^entries/),
      new CopyWebpackPlugin([
        { from: 'entries/*', to: 'entries/' },
        { from: 'pages/*.md', to: 'pages/' }
      ])
    ]
  })

  this.addTemplate()
}
