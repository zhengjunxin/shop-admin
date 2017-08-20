const path = require('path')
const { mockPath } = require('./paths')

exports.transformId = (Schema) => {
    Schema.set('toJSON', {
        transform(doc, ret, options) {
            ret.id = ret._id
            delete ret._id
            delete ret.__v
            
            return ret
        },
        virtuals: true,
    })
    Schema.set('toObject', {
        transform(doc, ret, options) {
            ret.id = ret._id
            delete ret._id
            delete ret.__v
            
            return ret
        },
        virtuals: true,
    })
}

exports.getFile = req => {
    const route = req.route.path.slice(1).replace(/\//g, '.') + '.json'
    const json = path.join(mockPath, route)
    return require(json)
}

exports.sum = array => {
    const length = array.length
    let result = 0
    for (let i = 0; i < length; i++) {
        result += array[i]
    }
    return result
}

exports.prefixImageUrl = imageUrl => `http://localhost:8080${imageUrl}`
