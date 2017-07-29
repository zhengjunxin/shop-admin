const mongoose = require('mongoose')

const env = process.env.NODE_ENV === 'production' ? 'production' : 'development'
const db = `mongodb://localhost/${env}`

mongoose.connect(db, {
    useMongoClient: true,
})

mongoose.Promise = global.Promise
require('./banner')
