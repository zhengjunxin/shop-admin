const mongoose = require('mongoose')
const transformId = require('../utils/helper').transformId

const Schema = new mongoose.Schema({
    "ad_position_id": Number,
    "media_type": Number,
    "name": String,
    "link": String,
    "image_url": String,
    "content": String,
    "end_time": Date,
    "enabled": {
        type: Boolean,
        default: false,
    }
})

transformId(Schema)

const Banner = mongoose.model('Banner', Schema)

module.exports = Banner
