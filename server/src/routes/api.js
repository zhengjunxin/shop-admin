const express = require('express')

const banner = require('../controllers/banner')
const home = require('../controllers/home')
const good = require('../controllers/good')
const category = require('../controllers/category')

const { getFile } = require('../utils/helper')

const router = express.Router()

router.get('/index/index', home.index)

router.get('/banners', banner.getBanners)
router.post('/banners', banner.addBanner)
router.post('/banners/:id', banner.updateBanner)
router.delete('/banners/:id', banner.remove)
router.get('/banners/:id', banner.getBanner)


// http://127.0.0.1:8360/api/goods/detail?id=1147048
router.get('/goods', good.list)
router.get('/goods/:id', good.show)
router.post('/goods', good.add)
router.post('/goods/:id', good.update)
router.delete('/goods/:id', good.remove)

router.get('/categorys', category.list)
router.get('/categorys/:id', category.show)
router.post('/categorys', category.add)
router.post('/categorys/:id', category.update)
router.delete('/categorys/:id', category.remove)

router.get('/goods/detail', (req, res) => {
    res.send(getFile(req))
})

router.get('/cart/goodscount', (req, res) => {
    res.send(getFile(req))
})

router.get('/cart/add', (req, res) => {
    res.send(getFile(req))
})

module.exports = router