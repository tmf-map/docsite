const mkdirp = require('mkdirp')
const _ = require('lodash')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

let option = process.argv.slice(2)
let name = option[0]

if (name) {
  let dir = path.join(__dirname, '../src/components/' + name + '/')
  let template = path.join(__dirname, 'template/')

  mkdirp.sync(dir)

  let files = [{
    source: template + 'index.js',
    target: dir + 'index.js'
  }, {
    source: template + 'index.less',
    target: dir + 'index.less'
  }, {
    source: template + 'doc.js',
    target: path.join(__dirname, '../site/pages/components/docs/') + name + '.doc'
  }]

  let context = {
    name: name,
    className: name.replace(/([A-Z])/g, '-$1').slice(1).toLowerCase()
  }
  files.forEach(function (item) {
    fs.writeFileSync(item.target, _.template(fs.readFileSync(item.source, 'utf8'))(context))
  })

  console.log(chalk.green('Build success!'))
} else {
  console.log(chalk.red('No component name provided, try `npm run create MyComponent` instead.'))
}
