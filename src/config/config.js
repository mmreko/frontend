// server parameters
const serverSettings = {
	port: 80
}

// authentication service parameters
const authOptions = {
	//host: "192.168.99.100",
	host: "http://authentication",
	port: 3000
}

// visualization service parameters
const visualizationOptions = {
	//host: "192.168.99.100",
	host: "http://visualization",
	port: 5000
}

module.exports = Object.assign({}, { serverSettings, authOptions, visualizationOptions })