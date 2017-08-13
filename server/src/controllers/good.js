const Proxy = require('../proxy/good')
const Base = require('./base')


const mock = {
    "info": {
        "id": 1006013,
        "name": "双宫茧桑蚕丝被 空调被",
        "goods_brief": "一级桑蚕丝，吸湿透气柔软",
        "retail_price": 699,
        "category_id": 1036000,
        "is_on_sale": 1,
        "goods_number": 100,
    },
    "gallery": [
        {
            "id": 13,
            "goods_id": 1006013,
            "img_url": "http://yanxuan.nosdn.127.net/d83cbd9ec177276ba2582ee393eff3db.jpg",
            "img_desc": "",
            "sort_order": 5
        },
        {
            "id": 14,
            "goods_id": 1006013,
            "img_url": "http://yanxuan.nosdn.127.net/b73852cf22939c4995a5bc8996a4afdd.jpg",
            "img_desc": "",
            "sort_order": 5
        },
        {
            "id": 15,
            "goods_id": 1006013,
            "img_url": "http://yanxuan.nosdn.127.net/d2fe16d259e0187d6b53eef028e843d1.jpg",
            "img_desc": "",
            "sort_order": 5
        },
        {
            "id": 16,
            "goods_id": 1006013,
            "img_url": "http://yanxuan.nosdn.127.net/4e8f5c09ae9dd03b5ae5b1287b598cc5.jpg",
            "img_desc": "",
            "sort_order": 5
        }
    ],
    "attribute": [
        {
            "value": "200*230cm/ 220*240cm",
            "name": "尺寸"
        },
        {
            "value": "100%棉",
            "name": "面料"
        },
        {
            "value": "100%双宫茧桑蚕丝",
            "name": "填充物"
        },
        {
            "value": "0.5KG/1KG",
            "name": "填充物重量"
        },
        {
            "value": "天然桑蚕丝具有正常蛋白味道，通风晾晒2-3天即可散去",
            "name": "温馨提示"
        }
    ],
    specificationList: [],
}

class Good extends Base {

}

module.exports = new Good(Proxy)
