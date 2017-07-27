const express = require('express')
const path = require('path')
require('./models')
const Banner = require('./controllers/banner')

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

app.use(express.static(build))

app.get('/list', (req, res) => {
    res.send(JSON.stringify({
        data: {
            a: 1,
        },
        ret: 0,
    }))
})

app.get('/index/index', (req, res) => {
    res.send(getFile(req))
})

app.get('/api/goods/detail', (req, res) => {
    res.send(getFile(req))
})

app.get('/api/cart/goodscount', (req, res) => {
    res.send(getFile(req))
})

app.get('/api/cart/add', (req, res) => {
    res.send(getFile(req))
})

app.get('*', (req, res) => {
    res.sendFile(index)
})

app.listen(port, () => {
    console.log(`server start at http://localhost:${port}`)
})