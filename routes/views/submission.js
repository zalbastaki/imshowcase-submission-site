const keystone = require('keystone');
const User = keystone.list('User');
const Project = keystone.list('Project');
const Device = keystone.list('Device');
const cookieParser = require('cookie-parser');
const jwt = require('../../utils/jwt');
const hbs = require('handlebars');

exports = module.exports = async function (req, res) {

	const user = await User.model.findOne({ cognitoUsername: accessPayload.sub });
	const users = await User.model.find({ isAdmin: false }, 'name');
	const devices = await Device.model.find({ }, 'device');

	if (!user) {
		res.redirect('/signin');
		return;
	} else {
		const view = new keystone.View(req, res);
		const locals = res.locals;

		let project = await Project.model.findOne().where('developer', user.id);

		hbs.registerHelper("ifTeamMember", function(id, opts) {
			if (project) {
				for (var i = 0; i < project.teamMembers.length; i++) {
					if (project.teamMembers[i] == id) {
						return opts.fn(this);
					}
				}
				return;
			}
			return;
		});

		hbs.registerHelper("ifDeviceNeeded", function(id, opts) {
			if (project) {
				for (var i = 0; i < project.devicesNeeded.length; i++) {
					if (project.devicesNeeded[i] == id) {
						return opts.fn(this);
					}
				}
				return;
			}
			return;	
		});

		// locals.section is used to set the currently selected
		// item in the header navigation.
		locals.section = 'submission';

		locals.user = user;
		locals.users = users;
		locals.devices = devices;

		if (project) {
			locals.project = project;

			if (!locals.project) {
				view.render('submission-not-found');
				res.status(404).end();
				return;
			}
		}
		
		// Render the view
		view.render('submission');
	}
	
};
