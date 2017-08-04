exports.transformId = (Schema) => {
    Schema.set('toJSON', {
        transform(doc, ret, options) {
            ret.id = ret._id
            delete ret._id

            return ret
        }
    })
}