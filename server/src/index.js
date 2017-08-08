const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const multer = require('multer')
const fs = require('fs')
const sharp = require('sharp')

require('./models')
require('./test')
const logger = require('./common/logger')
const { imagesPath, buildPath } = require('./utils/paths')
const apiRoute = require('./routes/api')

const app = express()
const port = 8080
const upload = multer()

fs.access(imagesPath, (err) => {
    if (err) {
        fs.mkdir(imagesPath)
    }
})

app.use(bodyParser.json())
app.use(express.static(buildPath))
app.use('/images', express.static(imagesPath))
app.use('/api', apiRoute)

app.post('/api/upload', upload.single('file'), function (req, res) {
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