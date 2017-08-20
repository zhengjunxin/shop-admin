const express = require('express')

const banner = require('../controllers/banner')
const home = require('../controllers/home')
const good = require('../controllers/good')
const category = require('../controllers/category')
const user = require('../controllers/user')

const { getFile } = require('../utils/helper')

const router = express.Router()

router.get('/index/index', home.index)

router.get('/banners', banner.getBanners)
router.post('/banners', banner.addBanner)
router.post('/banners/:id', banner.updateBanner)
router.delete('/banners/:id', banner.remove)
router.get('/banners/:id', banner.getBanner)

// 兼容严选的api
router.get('/goods/detail', good.detail)
router.get('/goods/related', good.related)
router.get('/cart/index', user.cart)
router.post('/cart/add', user.addTocart)
router.get('/cart/goodscount', user.goodscount)
router.post('/cart/checked', user.update)

// http://127.0.0.1:8360/api/goods/detail?id=1147048
router.get('/goods', good.list)
router.get('/goods/:id', good.show)
router.post('/goods', good.add)
router.post('/goods/:id', good.update)
router.delete('/goods/:id', good.remove)

router.get('/categories', category.list)
router.get('/categories/:id', category.show)
router.post('/categories', category.add)
router.post('/categories/:id', category.update)
router.delete('/categories/:id', category.remove)

router.get('/goods/detail', (req, res) => {
    res.send(getFile(req))
})

router.get('/cart/goodscount', (req, res) => {
    res.send(getFile(req))
})

module.exports = router