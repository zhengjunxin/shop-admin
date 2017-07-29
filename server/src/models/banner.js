const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    "id": Number,
    "ad_position_id": Number,
    "media_type": Number,
    "name": String,
    "link": String,
    "image_url": String,
    "content": String,
    "end_time": Date,
    "enabled": Number,
})

const Banner = mongoose.model('Banner', Schema)

module.exports = Banner
