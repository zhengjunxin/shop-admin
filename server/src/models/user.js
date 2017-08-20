const mongoose = require('mongoose')
const transformId = require('../utils/helper').transformId

const Schema = new mongoose.Schema({
    cartList: [
        {
            number: Number,
            checked: {
                type: Boolean,
                default: true,
            },
            goodId: {
                type: mongoose.Schema.ObjectId,
                ref: 'Good',
            }
        }
    ],
})

transformId(Schema)


const virtual = Schema.virtual('cartTotal')

virtual.get(function() {
    const goodsCount = this.cartList.reduce((acc, good) => {
        acc += good.number
        return acc
    }, 0)
    return {
        goodsCount,
    }
})

module.exports = mongoose.model('User', Schema)
