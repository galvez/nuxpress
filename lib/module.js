const path = require('path')
const consola = require('consola')

const logger = consola.withScope('nuxt:axios')

module.exports = function nuxtPress (_options) {
  _options = Object.assign({}, this.options.press, _options)
}
