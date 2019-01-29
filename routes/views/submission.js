var keystone = require('keystone');
var Project = keystone.list('Project');

exports = module.exports = async function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	var id = req.params.id;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'submission';

	if (id) {
		locals.project = await Project.model.findById(id);

		if (!locals.project) {
			view.render('submission-not-found');
			res.status(404).end();
			return;
		}
	}
	
	// Render the view
	view.render('submission');
};