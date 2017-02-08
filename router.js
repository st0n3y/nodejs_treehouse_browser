const Profile = require('./profile.js');
const renderer = require('./renderer.js');

function home(req, res) {
	if(req.url === "/") {
		res.statusCode = 200;
	  	res.setHeader('Content-Type', 'text/html');
	  	renderer.view('header', {}, res);
	  	renderer.view('search', {}, res);
	  	renderer.view('footer', {}, res);
	  	res.end();
	}
}

function user(req, res) {
	const username = req.url.replace('/', '');
	if(username.length > 0) {
		res.statusCode = 200;
	  	res.setHeader('Content-Type', 'text/html');
	  	renderer.view('header', {}, res);

	  	const studentProfile = new Profile(username);

	  	studentProfile.on("end", profileJSON => {
	  		const values = {
	  			avatarUrl: profileJSON.gravatar_url,
	  			username: profileJSON.profile_name,
	  			badgeCount: profileJSON.badges.length,
	  			javascriptPoints: profileJSON.points.JavaScript,
	  		}
	  		renderer.view('profile', values, res);
	  		renderer.view('footer', {}, res);
	  		res.end();
	  	});

	  	studentProfile.on('error', err => {
	  		renderer.view('error', {errorMessage: err.message}, res);
	  		renderer.view('search', {}, res);
	  		renderer.view('footer', {}, res);
	  		res.end();
	  	});
	}
}

module.exports.home = home;
module.exports.user = user;