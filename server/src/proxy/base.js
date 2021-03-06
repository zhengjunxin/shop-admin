class Base {
    constructor(model) {
        this.model = model
    }
    add(entry) {
        return this.model.create(entry)
    }
    list(query) {
        return this.model.find(query)
    }
    remove(_id) {
        return this.model.findByIdAndRemove(_id)
    }
    update(_id, entry) {
        return this.model.findByIdAndUpdate({
            _id,
        }, {
            $set: entry,
        }, {
            new: true,
        })
    }
    show(_id) {
        return this.model.findById(_id)
    }
}

module.exports = Base
