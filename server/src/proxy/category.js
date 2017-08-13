const Model = require('../models/category')
const Base = require('./base')

class Category extends Base {

}
const proxy = new Category(Model)

module.exports = proxy
