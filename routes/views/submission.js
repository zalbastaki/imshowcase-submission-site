const keystone = require('keystone');
const User = keystone.list('User');
const Project = keystone.list('Project');
const cookieParser = require('cookie-parser');
const jwt = require('../../utils/jwt');
const hbs = require('handlebars');

exports = module.exports = async function (req, res) {

	const user = await User.model.findOne({ cognitoUsername: accessPayload.sub });
	const users = await User.model.find({ isAdmin: false }, 'name');

	if (!user) {
		res.redirect('/signin');
		return;
	} else {
		const view = new keystone.View(req, res);
		const locals = res.locals;

		let project = await Project.model.findOne().where('developer', user.id);

		// locals.section is used to set the currently selected
		// item in the header navigation.
		locals.section = 'submission';

		locals.user = user;
		locals.users = users;

		if (project) {
			locals.project = project;

			if (!locals.project) {
				view.render('submission-not-found');
				res.status(404).end();
				return;
			}

			hbs.registerHelper("ifTeamMember", function(id, opts) {
				for (var i = 0; i < users.length; i++) {
					if (project.teamMembers[i] == id) {
						return opts.fn(this);
					}
				}
				return;	
			});
		}
		
		// Render the view
		view.render('submission');
	}
	
};
