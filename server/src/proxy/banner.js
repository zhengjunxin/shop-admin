const Banner = require('../models/banner')

exports.getBanners = () => {
    return Banner.find({})
}

exports.setBanner = (banner) => {
    return new Banner(banner).save()
}

exports.removeBanner = _id => {
    return Banner.findOneAndRemove({
        _id,
    })
}
