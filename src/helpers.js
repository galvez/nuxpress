
import fs from 'fs-extra'

export const isDirectory = (source) => {
  return fs.lstatSync(source).isDirectory()
}

export const parseEntry = (entryFile) => {
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
    markdown: entryFile.replace(/^.*\/entries\//, './entries/')
  }
}

export const loadEntry = (fullpath) => {
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
