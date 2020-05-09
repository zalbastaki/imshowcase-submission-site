const keystone = require('keystone');
const User = keystone.list('User');
const Project = keystone.list('Project');
const hbs = require('handlebars');

exports = module.exports = async function (req, res) {

	const user = await User.model.findOne({ cognitoUsername: accessPayload.sub });

	if (!user) {
		res.redirect('/signin');
		return;
	} else {
		const view = new keystone.View(req, res);
		const locals = res.locals;

		let projects = await Project.model.find().where('developer', user.id);

		// locals.section is used to set the currently selected
		// item in the header navigation.
		locals.section = 'dashboard';

		locals.user = user;

		if (projects) {
			locals.projects = projects;
		}

		// Render the view
		view.render('dashboard');
	}
	
};
