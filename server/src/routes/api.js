const express = require('express')

const banner = require('../controllers/banner')
const home = require('../controllers/home')

const { getFile } = require('../utils/helper')

const router = express.Router()

router.get('/index/index', home.index)

router.get('/banners', banner.getBanners)
router.post('/banners', banner.addBanner)
router.post('/banners/:id', banner.updateBanner)
router.delete('/banners/:id', banner.remove)
router.get('/banners/:id', banner.getBanner)

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