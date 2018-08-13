'use strict'
const passwordHash = require('password-hash');
const http = require('http')
const authOptions = require('../config/config').authOptions
const visualizationOptions = require('../config/config').visualizationOptions

const repository = () => {
	
	// calls authentication service to check username and password
	const login = (email, password) => {
		return new Promise((resolve, reject) => {
			
			let researcher
			let data = []
			
			const options = {
				host: authOptions.host,
				port: authOptions.port,
				path: "/authentication/login",
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				}
			}
			
			const payload = {
				email: email,
				password: password 
			}
			
			const requestData = JSON.stringify(payload)
			
			const req = http.request(options, (res) => {
				res.setEncoding('utf8');
				res.on('data', (chunk) => {
					data.push(chunk)
				});
				res.on('end', () => {
					researcher = JSON.parse(data.join(''));
					console.log("Repo: " + researcher.name)
					resolve(researcher)
				});
			});

			req.on('error', (e) => {
				console.error(`Problem with request: ${e.message}`);
			});
			
			req.write(requestData);
			req.end();
		})
	}
	
	// calls visualization service to fetch visualization data
	const visualize = () => {
		return new Promise((resolve, reject) => {
			
			let visualizationData
			let data = []
			
			const options = {
				host: visualizationOptions.host,
				port: visualizationOptions.port,
				path: "/visualization/all",
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				}
			}
			
			const req = http.request(options, (res) => {
				res.setEncoding('utf8');
				res.on('data', (chunk) => {
					data.push(chunk)
				});
				res.on('end', () => {
					visualizationData = JSON.parse(data.join(''));
					console.log("Repo: " + visualizationData[0])
					resolve(visualizationData)
				});
			});

			req.on('error', (e) => {
				console.error(`Problem with request: ${e.message}`);
			});
			
			req.end();
		})
	}
	
	return Object.create({
		login,
		visualize 
	})
	
}

const connect = () => {
	return new Promise((resolve, reject) => {
		resolve(repository())
	})
}

module.exports = Object.assign({}, {connect})