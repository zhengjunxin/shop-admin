const Banner = require('../models/banner')

exports.getBanners = () => {
    return Banner.find({})
}

exports.addBanner = (banner) => {
    return new Banner(banner).save()
}

exports.updateBanner = (_id, props) => {
    return Banner.findOneAndUpdate({
        _id,
    }, {
        $set: props,
    }, {
        new: true,
    })
}

exports.removeBanner = _id => {
    return Banner.findOneAndRemove({
        _id,
    })
}

exports.getBanner = _id => {
    return Banner.findById(_id)
}
