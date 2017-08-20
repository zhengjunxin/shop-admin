const Proxy = require('../proxy/user')
const Base = require('./base')

const defaultUserId = '599944f82f4b27bc96529b62'

class User extends Base {
    cart = (req, res) => {
        this.proxy.cart(defaultUserId)
            .then(data => {
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
    update = (req, res) => {
        const { isChecked, goodId } = req.body

        this.proxy.updateCart(defaultUserId, goodId, 'checked', !!isChecked)
            .then(() => {
                this.proxy.cart(defaultUserId)
                    .then(data => {
                        res.send({
                            errno: 0,
                            errmsg: '',
                            data,
                        })
                    })
            })
    }
}

module.exports = new User(Proxy)
