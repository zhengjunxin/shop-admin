const Model = require('../models/user')
const Base = require('./base')
const mongoose = require('mongoose')
const { sum, prefixImageUrl } = require('../utils/helper')

class User extends Base {
    cart = (userId) => {
        return this.show(userId)
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

                return data
            })
    }
    addToCart = (userId, goodId, number) => {
        return this.model.findById(userId)
            .then(result => {
                const index = result.cartList.findIndex(good => good.goodId.toString() === goodId)

                if (index !== -1) {
                    return this.model.findByIdAndUpdate(userId, {
                        $inc: {
                            [`cartList.${index}.number`]: number,
                        }
                    })
                }
                else {
                    return this.model.findByIdAndUpdate(userId, {
                        $push: {
                            cartList: {
                                number,
                                goodId,
                            }
                        }
                    })
                }
            })
    }
    updateCart = (userId, goodId, key, value) => {
        return this.model.findById(userId)
            .then(user => {
                const index = user.cartList.findIndex(good => good.goodId.toString() === goodId)

                return this.model.findByIdAndUpdate(userId, {
                    $set: {
                        [`cartList.${index}.${key}`]: value
                    }
                })
            })
    }
}

module.exports = new User(Model)
