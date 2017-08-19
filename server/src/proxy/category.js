const Model = require('../models/category')
const Base = require('./base')

class Category extends Base {
    add(entry) {
        return super.add(entry)
            .then(result => {
                const parent_id = result.parent_id
                if (parent_id === '0') {
                    return result
                }
                else {
                    return this.model.findByIdAndUpdate(parent_id, {
                        $push: {
                            subCategoryList: result
                        }
                    })
                    .then(() => result)
                }
            })
    }
    list(query) {
        return this.model.find(query)
            .populate('subCategoryList')
            .then(result => result.sort((c1, c2) => c1.sort_order > c2.sort_order))
            .then(result => {
                return result.map(category => {
                    category.subCategoryList.sort((sub1, sub2) => sub1.sort_order > sub2.sort_order)
                    return category
                })
            })
    }
}
const proxy = new Category(Model)

module.exports = proxy
