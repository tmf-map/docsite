const webpack = require('webpack')
const path = require('path')
const rimraf = require('rimraf')
const LiveReloadPlugin = require('webpack-livereload-plugin')
const beautify = require('code-beautify')
const fs = require('fs')
const sitePath = path.resolve(__dirname, '../site')
const sourcePath = path.resolve(__dirname, '../src')
const outputPath = path.resolve(__dirname, '../site/dist')

const isProduction = process.env.SITE_ENV === 'production'

rimraf.sync(outputPath)

const config = {
  entry: {
    site: `${sitePath}/router.js`
  },
  output: {
    path: outputPath,
    filename: '[name]' + (isProduction ? '.[hash]' : '') + '.js',
    chunkFilename: '[id]' + (isProduction ? '.[hash]' : '') + '.js',
    publicPath: '/dist/'
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      options: {
        cacheDirectory: true
        // babelrc: false,
        // extends: 'config/.babelrc'
      },
      exclude: /node_modules/
    }, {
      test: /.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
      loader: 'file-loader?name=files/[hash].[ext]'
    }, {
      test: /\.less$/,
      loader: 'style-loader!css-loader!postcss-loader?config.path=config/postcss.config.js!less-loader'
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader!postcss-loader?config.path=config/postcss.config.js'
    }, {
      test: /\.md$/,
      loader: 'html-loader!markdown-loader'
    }, {
      test: /\.doc$/,
      loader: 'babel-loader!doc-loader'
    }]
  },
  resolveLoader: {
    alias: {
      'doc-loader': path.join(__dirname, '../site/loaders/doc')
    }
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      sitePath,
      'node_modules'
    ],
    alias: {
      'earth-ui/lib': `${sourcePath}/components`,
      'widgets': `${sitePath}/widgets`,
      'doc': `${sitePath}/loaders/doc`,
      'variable.less': `${sourcePath}/styles/variable.less`,
      'mixin.less': `${sourcePath}/styles/mixin.less`,
      'core.less': `${sourcePath}/styles/core.less`
    }
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'prop-types': 'PropTypes'
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      test: /\.md$/,
      options: {
        markdownLoader: { highlight: (code, lang) => beautify(code, lang) }
      }
    })
  ]
}

if (isProduction) {
  config.plugins.push(new webpack.DefinePlugin({
    'process.env': {
      'SITE_ENV': JSON.stringify('production')
    }
  }))
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    output: {
      comments: false
    }
  }))
} else {
  config.plugins.push(new LiveReloadPlugin({
    appendScriptTag: true
  }))
}

config.plugins.push(new webpack.DefinePlugin({
  'prefixCls': JSON.stringify('earthui')
}))

// Generate index.html in 'site' dir
config.plugins.push(function () {
  this.plugin('done', function (statsData) {
    const stats = statsData.toJson()
    let html = fs.readFileSync(`${sitePath}/index.html`, 'utf8')
    const distPath = config.output.publicPath + 'site.' + (isProduction ? stats.hash + '.' : '') + 'js'
    html = html.replace(/(<script src=").*?dist.*?(")/, '$1' + distPath + '$2')
    fs.writeFileSync(path.join(`${sitePath}/index.html`), html)
  })
})

module.exports = config
