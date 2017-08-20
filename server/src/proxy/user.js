const Model = require('../models/user')
const Base = require('./base')

class User extends Base {
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
}

module.exports = new User(Model)
