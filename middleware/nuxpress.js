
const Markdown = do {
  if (process.server) {
    require('@dimerapp/markdown')
  }
}

const fs = do {
  if (process.server) {
    require('fs-extra')
  }
}

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
  return (new Markdown(transformed, {skipToc: true})).toHTML()
}

export default async (ctx) => {
  if (process.server) {
    let source
    let page
    const { app, error, params } = ctx
    if (params.pageSlug && app.$pages[params.pageSlug]) {
      source = await fs.readFile(app.$pages[params.pageSlug], 'utf-8')
      page = await transformMarkdownLinks(source)
      app.$page = page.contents
      const title = source.trimStart().match(/^#\s+(.*)/)
      app.$title = do {
        if (title && title.length > 1) {
          title[1]
        }
      }
    } else if (params.entrySlug && app.$permalinks[params.entrySlug]) {
      const entry = app.$permalinks[params.entrySlug]
      source = await fs.readFile(entry.markdown, 'utf-8')
      const hashSign = source.indexOf('#')
      page = await transformMarkdownLinks(source.substr(hashSign))
      app.$entry = Object.assign(entry, {
        html: page.contents
      })
    }
  }
}
