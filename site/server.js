const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const multiparty = require('multiparty')
const compression = require('compression')
// const domain = require('domain')
const fs = require('fs')

const app = express()
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(express.static(path.join(__dirname, './')))

// Error handle
// app.use(function (req, res, next) {
//   const reqDomain = domain.create()
//   reqDomain.on('error', function (err) {
//     res.send(500, '<pre>' + err.stack + '</pre>')
//   })
//   reqDomain.run(next)
// })

if (process.env.SITE_ENV !== 'production') {
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const WebpackConfig = require('../config/webpack.config.site')
  app.use(webpackDevMiddleware(webpack(WebpackConfig), {
    publicPath: WebpackConfig.output.publicPath,
    stats: {
      colors: true,
      profile: true
    }
  }))
}

app.post('/api/form', function (req, res) {
  res.json({
    code: 200,
    data: {}
  })
})

app.delete('/user/test', function (req, res) {
  res.json({
    code: 200,
    data: {}
  })
})

function clone (obj) {
  let o
  if (typeof obj === 'object') {
    if (obj === null) {
      o = null
    } else {
      if (obj instanceof Array) {
        o = []
        for (let i = 0, len = obj.length; i < len; i++) {
          o.push(clone(obj[i]))
        }
      } else {
        o = {}
        for (let j in obj) {
          o[j] = clone(obj[j])
        }
      }
    }
  } else {
    o = obj
  }
  return o
}

function getTableDate (page, size) {
  const data = [
    { id: 1, name: '张三', age: 28, gender: 'male', country: '中国', area: '北京', regdate: '2016-03-01' },
    { id: 2, name: '李四', age: 25, gender: 'female', country: '中国', area: '杭州', regdate: '2016-04-11' },
    { id: 3, name: '王五', age: 43, gender: 'male', country: '中国', area: '沈阳', regdate: '2016-05-06' },
    { id: 4, name: '赵某某', age: 30, gender: 'female', country: '中国', area: '上海', regdate: '2016-03-09' },
    { id: 5, name: '钱某某', age: 39, gender: 'male', country: '中国', area: '深圳', regdate: '2015-11-11' },
    { id: 6, name: '孙某某', age: 50, gender: 'male', country: '中国', area: '石家庄', regdate: '2016-06-01' },
    { id: 7, name: '周某某', age: 21, gender: 'female', country: '中国', area: '西安', regdate: '2016-08-13' },
    { id: 8, name: '吴某某', age: 19, gender: 'female', country: '中国', area: '天津', regdate: '2016-02-22' },
    { id: 9, name: '郑某某', age: 51, gender: 'male', country: '中国', area: '武汉', regdate: '2016-01-18' },
    { id: 10, name: '冯某某', age: 24, gender: 'male', country: '中国', area: '广州', regdate: '2016-09-20' }
  ]

  if (page <= 1) {
    return data
  } else {
    const index = page * size
    const newData = []
    for (let i = 0; i < size && i < 10; i++) {
      const item = clone(data[i])
      item.id = item.id + index
      item.name += item.id
      newData.push(item)
    }
    return newData
  }
}

app.get('/api/table', function (req, res) {
  const currentPage = req.query.currentPage || 1
  const pageSize = req.query.pageSize || 10
  const data = getTableDate(currentPage, pageSize)

  res.json({
    code: 200,
    totalList: data,
    currentPage: 1,
    totalPageNum: 300
  })
})

app.post('/upload.do', function (req, res) {
  const form = new multiparty.Form({uploadDir: './upload'})
  form.on('error', function (err) {
    console.log('Error parsing form: ' + err.stack)
  })
  form.parse(req, function (err, fields, files) {
    const filesTmp = JSON.stringify(files, null, 2)
    try {
      if (err) {
        console.log('parse error: ' + err)
        res.send('写文件操作失败。')
      } else {
        res.send('文件上传成功')
        console.log('parse files: ' + filesTmp)
        const fileNameArr = Object.keys(files)
        const firstFilename = fileNameArr[0]
        const fileDataArr = files[firstFilename]
        const fileData = fileDataArr[0]
        const uploadedPath = fileData.path
        const dstPath = './upload/' + fileData.originalFilename
        fs.rename(uploadedPath, dstPath, function (err) {
          if (err) {
            console.log('重命名文件错误：' + err)
          } else {
            console.log('重命名文件成功。')
          }
        })
      }
    } catch (e) {}
  })
  res.json({
    code: 200,
    data: {
      id: new Date().getTime()
    }
  })
})

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
})

const port = process.env.PORT || 3003

app.listen(port, function () {
  console.log('Server listening on http://localhost:' + port + ', Ctrl+C to stop')
})
