'use strict'
const server = require('./server/server')
const repository = require('./repository/repository')
const config = require('./config/config')
const api = require('./api/influenzanet')
const http = require('http')

console.log('--- InfluenzaNet Frontend ---')
console.log('Connecting to frontend repository...')

// error handling
process.on('uncaughtException', (err) => {
	console.error('Unhandled Exception', err)
})

process.on('uncaughtRejection', (err, promise) => {
	console.error('Unhandled Rejection', err)
})

let repo
repository.connect()
	.then(rep => {
		console.log('Connected. Starting Server')
		repo = rep
		return server.start({
			port: config.serverSettings.port,
			repo
		})
	})
	.then(app => {
		console.log(`Server started succesfully, running on port: ${config.serverSettings.port}.`)
		app.on('close', () => {
			console.log("Server stopped")
		})
	})
