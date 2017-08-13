const Model = require('../models/good')
const Base = require('./base')

class Good extends Base {

}
const proxy = new Good(Model)

module.exports = proxy