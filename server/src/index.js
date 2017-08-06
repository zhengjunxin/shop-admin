const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const multer = require('multer')
const fs = require('fs')
const sharp = require('sharp')
// require('./test')

const banner = require('./controllers/banner')
const home = require('./controllers/home')

require('./models')
const logger = require('./common/logger')
const { imagesPath } = require('./utils/paths')

const app = express()
const port = 8080
const build = path.resolve(__dirname, '../../build')
const index = path.join(build, './index.html')
const mock = path.join(__dirname, '..', 'mock')
const getFile = req => {
    const route = req.route.path.slice(1).replace(/\//g, '.') + '.json'
    const json = path.join(mock, route)
    return require(json)
}

app.use(bodyParser.json())
app.use(express.static(build))

fs.access(imagesPath, (err) => {
    if (err) {
        fs.mkdir(imagesPath)
    }
})
app.use('/images', express.static(imagesPath))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, imagesPath)
    },
    filename: function (req, file, cb) {
        const extname = path.extname(file.originalname)
        const filename = file.fieldname + '-' + Date.now() + extname
        cb(null, filename)
    }
})

const upload = multer()


app.get('/list', (req, res) => {
    res.send(JSON.stringify({
        data: {
            a: 1,
        },
        ret: 0,
    }))
})

app.get('/index/index', home.index)

app.get('/banners', banner.getBanners)
app.post('/banner', banner.addBanner)
app.post('/banner/:id', banner.updateBanner)
app.delete('/banner/:id', banner.remove)
app.get('/banner/:id', banner.getBanner)

app.get('/api/goods/detail', (req, res) => {
    res.send(getFile(req))
})

app.get('/api/cart/goodscount', (req, res) => {
    res.send(getFile(req))
})

app.get('/api/cart/add', (req, res) => {
    res.send(getFile(req))
})

app.post('/upload', upload.single('file'), function (req, res) {
    const extname = path.extname(req.file.originalname)
    const file = req.file.originalname.replace(extname, '')
    const filename = `${file}-${Date.now()}${extname}`

    sharp(req.file.buffer)
        .toFile(path.join(imagesPath, filename))
        .then(() => {
            res.send({
                url: `/images/${filename}`,
            })
        })
})

app.get('*', (req, res) => {
    res.sendFile(index)
})

// 错误处理
app.use((err, req, res, next) => {
    logger.error(err)
    return res.status(500)
        .send({
            errno: 1,
            errmsg: '500',
        })
})

app.listen(port, () => {
    console.log(`server start at http://localhost:${port}`)
})