let config = {
	allowedOrigins: 'http://localhost:3000',
	secret: 'IfIspinaroundclockwiseforsomereason,Ihavetospinaroundcounterclockwiserightawaysoastounwindmyself.',
}

if (process.env.NODE_ENV == 'production') {
	config.secret = process.env.SECRET
	config.allowedOrigins = 'https://example-cb-frontend.herokuapp.com/'
}

config.options = (origin, callback) => {
	if (!origin) {
		callback(null, true)
	}
	if (config.allowedOrigins.includes(origin)) {
		callback(null, true)
	} else {
		callback(new Error('Not allowed by CORS'))
	}
}

module.exports = config
