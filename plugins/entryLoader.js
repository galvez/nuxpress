
let entries
const permalinks = {}

if (process.server) {

  const fs = require('fs-extra')
  const path = require('path')
  const mdit = require('markdown-it')()

  // collectRanges returns index ranges for a given RegExp matches
  const collectRanges = (re, str) => {
    const ranges = []
    let m = re.exec(str)
    while (m !== null) {
      ranges.push([m.index, m[0].length - 1])
      m = re.exec(str)
    }
    return ranges
  }

  const transformMarkdownLinks = (md) => {
    // First collect index ranges for escaped blocks
    const escapedRanges = collectRanges(/`[^`]+`/g, md)
    let linkIndex = 1
    // Then, enumerate `\n[]:` occurrences that don't
    // fall inside escaped blocks
    let transformed = md.replace(/\n\[\]:/g, (match, index) => {
      if (!escapedRanges.find((r) => r[0] <= index && index <= r[1])) {
        return `\n[${linkIndex++}]:`
      }
    })
    // Finally, enumerate the actual `][]` references
    // throughout the text, also ignoring escaped blocks
    linkIndex = 1
    transformed = transformed.replace(/\]\[\]/g, (match, index) => {
      if (!escapedRanges.find((r) => r[0] <= index && index <= r[1])) {
        return `][${linkIndex++}]`
      }
    })
    return mdit.render(transformed)
  }

  entries = require('../entries.json').map((entry) => {
    const md = fs.readFileSync(
      // Required so deploying to Heroku works
      process.env.NODE_ENV === 'production'
        ? entry.markdown.replace(/^.*\/entries\//, './entries/')
        : entry.markdown,
      'utf8'
    )
    permalinks[entry.permalink] = entry
    return Object.assign(entry, {
      summary: mdit.render(entry.summary)
        .replace(/<\/?p>/g, ''),
      html: transformMarkdownLinks(md.substr(md.indexOf('#')))
    })
  })

}

export default async (ctx) => {
  if (process.server) {
    ctx.app.$entries = entries
    ctx.app.$permalinks = permalinks
  }
}
