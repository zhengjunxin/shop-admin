const mongoose = require('mongoose')
const transformId = require('../utils/helper').transformId
const ObjectId = mongoose.Schema.Types.ObjectId

const a = {"name":"name","category":"category","breif":"brief","price":"100","stock":"100","imageUrl":"/images/logo-1502511283039.png"}

const Schema = new mongoose.Schema({
    "category_id": ObjectId,
    "goods_sn": String,
    "name": String,
    "brand_id": ObjectId,
    "goods_number": Number,
    "keywords": String,
    "goods_brief": String,
    "goods_desc": String,
    "is_on_sale": {
        type: Boolean,
        default: false,
    },
    "add_time": Number,
    "sort_order": Number,
    "is_delete": Number,
    "attribute_category": Number,
    "counter_price": Number,
    "extra_price": Number,
    "is_new": Number,
    "goods_unit": String,
    "primary_pic_url": String,
    "list_pic_url": String,
    "retail_price": Number,
    "sell_volume": Number,
    "primary_product_id": Number,
    "unit_price": Number,
    "promotion_desc": String,
    "promotion_tag": String,
    "app_exclusive_price": Number,
    "is_app_exclusive": Number,
    "is_limited": Number,
    "is_hot": Number,
    // banner
    "gallery": Array,
    // 产品参数
    "attribute": Array,
    "userHasCollect": Number,
    "issue": Array,
    "comment": Object,
    "brand": Object,
    // 商品规格
    "specificationList": Array,
    "productList": Array,
})

transformId(Schema)

module.exports = mongoose.model('Good', Schema)
