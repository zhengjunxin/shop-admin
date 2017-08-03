const Banner = require('../proxy/banner')

exports.getBanners = (req, res, next) => {
    Banner.getBanners()
        .then(banners => {
            res.send(banners)
        })
        .catch(err => {
            next(err)
        })
}

exports.setBanner = (req, res) => {
    const banner = req.body
    if (banner) {
        Banner.setBanner(banner)
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

exports.remove = (req, res) => {
    const _id = req.params.id
    if (_id) {
        Banner.removeBanner({
            _id,
        })
        .then(resp => {
            res.send({
                errno: 0,
            })
        })
    }
}
