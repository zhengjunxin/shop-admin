const mongoose = require('mongoose')
const transformId = require('../utils/helper').transformId

const Schema = new mongoose.Schema({
    name: String,
})

transformId(Schema)

const Category = mongoose.model('Category', Schema)

module.exports = Category
