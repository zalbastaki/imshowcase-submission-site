const keystone = require('keystone');
const User = keystone.list('User');
const Project = keystone.list('Project');
const cookieParser = require('cookie-parser');
const jwt = require('../../utils/jwt');

exports = module.exports = async function (req, res) {

	const user = await User.model.findOne({ cognitoUsername: accessPayload.sub });

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

		if (project) {
			const id = project._id;
			
			locals.project = await Project.model.findById(id);

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
