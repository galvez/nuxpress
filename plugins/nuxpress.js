
const mdit = require('markdown-it')()

let entries
const pages = {}
const permalinks = {}
const archive = {}

if (process.server) {

  const fs = require('fs-extra')
  const path = require('path')

  const addArchiveEntry = (entry) => {
    entry.published = new Date(entry.published)
    const year = entry.published.getFullYear()
    const month = (entry.published.getMonth() + 1)
      .toString()
      .padStart(2, '0')
    if (!archive[year]) {
      archive[year] = {}
    }
    if (!archive[year][month]) {
      archive[year][month] = []
    }
    archive[year][month].unshift(entry)
  }

  fs.readdirSync('./pages')
    .filter((i) => i.match(/\.md$/))
    .forEach((page) => {
      pages[page.split('.md')[0]] = path.join('./pages', page)
    })

  entries = require('../entries.json').map((entry) => {
    addArchiveEntry(entry)
    permalinks[entry.permalink] = entry
    return Object.assign(entry, {
      summary: mdit.render(entry.summary).replace(/<\/?p>/g, ''),
    })
  })

}

export default async (ctx) => {
  if (process.server) {
    ctx.app.$entries = entries
    ctx.app.$pages = pages
    ctx.app.$permalinks = permalinks
    ctx.app.$archive = archive
  }
}
