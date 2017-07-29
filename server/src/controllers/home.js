const Banner = require('../proxy/banner')

exports.index = (req, res) => {
    
    Promise.all([Banner.getBanners()])
        .then(([banners]) => {
            const result = {
                errno: 0,
                errmsg: '',
                data: {
                    banners,
                }
            }
            res.send(result)
        })
}