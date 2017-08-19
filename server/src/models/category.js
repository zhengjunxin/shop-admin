const mongoose = require('mongoose')
const transformId = require('../utils/helper').transformId
const ObjectId = mongoose.Schema.ObjectId

const Schema = new mongoose.Schema({
    name: String,
    front_name: String,
    sort_order: {
        type: Number,
        default: 0,
    },
    icon_url: String,
    wap_banner_url: String,
    parent_id: {
        type: String,
        default: '',
    },
    subCategoryList: [{
        type: ObjectId,
        ref: 'Category',
    }]
})

transformId(Schema)

const Category = mongoose.model('Category', Schema)

module.exports = Category
