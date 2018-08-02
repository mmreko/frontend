'use strict'
const status = require('http-status')

module.exports = (app, options) => {
	
	const {repo} = options
	
	// GET /
	app.get('/',function(req, res) {
		let session = req.session;
		if(session.email) {
			res.redirect('/visualization');
		}
		else {
			res.render('home.html', {
				logout: 'hidden',
				login: 'visible'
			});
		}
	})
	
	// GET /visualization
	app.get('/visualization',function(req, res, next) {
		repo.visualize().then(data => {
			let session = req.session;
			if(session.email) {
				res.render('data-visualization.html', {
					logout: 'visible',
					login: 'hidden',
					data: data
				});
			}
			else {
				res.redirect('/');
			}
		}).catch(next)
	})
	
	// POST /login
	app.post('/login', (req, res, next) => {
		repo.login(req.body.email, req.body.password).then(researcher => {
			if (researcher == null) {
				req.session.error = 'Authentication failed.';
			}
			else {
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