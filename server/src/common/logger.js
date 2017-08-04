const log4js = require('log4js')

const env = process.env.NODE_ENV || "development"
const debug = env === 'development'

log4js.configure({
	appenders: {
		console: {
			type: 'console',
		},
		log2file: {
			type: 'file',
			filename: 'logs/cheese.log',
		}
	},
	categories: {
		default: {
			appenders: ['console'],
			level: 'all',
		},
		console: {
			appenders: ['console'],
			level: 'all',
		},
		log2file: {
			appenders: ['log2file'],
			level: 'error',
		}
	}
})

const logger = log4js.getLogger(debug ? 'console' : 'log2file')

module.exports = logger