const Banner = require('../proxy/banner')
const path = require('path')
const fs = require('fs')
const { imagesPath } = require('../utils/paths')

exports.getBanners = (req, res, next) => {
    Banner.getBanners()
        .then(banners => {
            res.send({
                errno: 0,
                banners,
            })
        })
        .catch(err => {
            next(err)
        })
}

exports.addBanner = (req, res) => {
    const banner = req.body

    if (banner) {
        Banner.addBanner({
            ad_position_id: banner.position,
            name: banner.name,
            link: banner.goodId ? `/good/${banner.goodId}` : '',
            image_url: banner.imageUrl,
            enabled: banner.enabled,
        })
            .then(banner => {
                res.send({
                    errno: 0,
                })
            })
    }
    else {
        res.send({
            errno: 1,
        })
    }
}

exports.updateBanner = (req, res, next) => {
    const { id } = req.params
    const props = req.body

    Banner.updateBanner(id, props)
        .then(banner => {
            res.send({
                banner,
            })
        })
        .catch(err => {
            next(err)
        })
}

exports.remove = (req, res) => {
    const _id = req.params.id

    if (_id) {
        Banner.removeBanner({
            _id,
        })
        .then(banner => {
            res.send({
                errno: 0,
            })
            return banner
        })
        .then(banner => {
            // 删除对应的图片文件
            const { image_url } = banner
            const basename = path.basename(image_url)
            const filePath = path.join(imagesPath, basename)

            fs.unlink(filePath)
        })
    }
}

exports.getBanner = (req, res) => {
    const id = req.params.id

    if (id) {
        Banner.getBanner(id)
            .then(banner => {
                res.send({
                    banner,
                })
            })
    }
}
