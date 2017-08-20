const Proxy = require('../proxy/user')
const Base = require('./base')
const { sum, prefixImageUrl } = require('../utils/helper')

const defaultUserId = '599944f82f4b27bc96529b62'

class User extends Base {
    cart = (req, res) => {
        this.proxy.show(defaultUserId)
            .populate('cartList.goodId')
            .then(result => {
                
                const cartList = result.cartList.map(cart => {
                    const good = Object.assign({}, {
                        checked: cart.checked,
                        number: cart.number,
                    }, cart.goodId.toObject())

                    good.goods_name = good.name
                    good.list_pic_url = prefixImageUrl(good.list_pic_url)

                    return good
                })

                const cartTotal = {
                    "checkedGoodsCount": sum(cartList.map(good => good.number)),
                    "checkedGoodsAmount": sum(cartList.map(good => good.number * good.retail_price)),
                }

                const data = {
                    cartList,
                    cartTotal,
                }
                
                res.send({
                    errno: 0,
                    errmsg: '',
                    data,
                })
            })
    }
    addTocart = (req, res) => {
        const { goodsId, number } = req.body
        this.proxy.addToCart(defaultUserId, goodsId, number)
            .then(result => {
                res.send({
                    errno: 0,
                    errmsg: '',
                    data: result,
                })
            })
    }
    goodscount = (req, res) => {
        res.send({
            errno: 0,
            errmsg: '',
            data: {
                cartTotal: {
                    goodsCount: 9,
                }
            }
        })
    }
}

module.exports = new User(Proxy)
