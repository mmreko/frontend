// server parameters
const serverSettings = {
	port: 3000
}

// authentication service parameters
const authOptions = {
	host: "192.168.99.103",
	port: 3000
}

// visualization service parameters
const visualizationOptions = {
	host: "192.168.99.106",
	port: 3000
}

module.exports = Object.assign({}, { serverSettings, authOptions, visualizationOptions })