'use strict'
const status = require('http-status')

module.exports = (app, options) => {
	
	const {repo} = options
	
	// GET /
	app.get('/',function(req, res) {
		console.log("Home page")
		let session = req.session;
		if(session.email) {
			console.log("Home page - redirecting to visualization")
			res.redirect('/visualization');
		}
		else {
			console.log("Home page - rendering home page")
			res.render('home.html', {
				logout: 'hidden',
				login: 'visible'
			});
		}
	})
	
	// GET /visualization
	app.get('/visualization',function(req, res, next) {
		console.log("Visualization")
		repo.visualize().then(data => {
			console.log("API: " + data[0])
			let session = req.session;
			if(session.email) {
				console.log("Visualization - rendering visualization")
				res.render('data-visualization.html', {
					logout: 'visible',
					login: 'hidden',
					data: data
				});
			}
			else {
				console.log("Visualization - redirecting to home")
				res.redirect('/');
			}
		}).catch(next)
	})
	
	// POST /login
	app.post('/login', (req, res, next) => {
		console.log("Login")
		repo.login(req.body.email, req.body.password).then(researcher => {
			if (researcher == null) {
				req.session.error = 'Authentication failed.';
				console.log('API: Authentication failed');
			}
			else {
				console.log("API: " + researcher.name)
				req.session.email = researcher.email
				req.session.name = researcher.name
				req.session.group = researcher.group
				req.session.success = 'Authenticated as ' + researcher.name + '.';
			}
			res.redirect("/visualization");
		}).catch(next)
	})
	
	// GET /logout
	app.get('/logout', (req, res, next) => {
		req.session.destroy(function (err) {
			if(err) {
				console.log(err);
			} 
		})
		res.redirect("/")
	})
	
}