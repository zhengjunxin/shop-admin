const Model = require('../models/good')
const Base = require('./base')

class Good extends Base {
    getByCategory = categoryId => {
        return this.model.find({
            category_id: categoryId
        })
    }
}
const proxy = new Good(Model)

module.exports = proxy