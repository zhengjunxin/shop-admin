const Category = require('../models/category')

exports.add = good => {
    return Category.create(good)
}

exports.list = () => {
    return Category.find()
}

exports.remove = _id => {
    return Category.findByIdAndRemove(_id)
}