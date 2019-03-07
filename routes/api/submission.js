const _ = require('lodash');
const keystone = require('keystone');
const User = keystone.list('User');
const Project = keystone.list('Project');
const cookieParser = require('cookie-parser');
const jwt = require('../../utils/jwt');
const promisify = require('../../utils/promisify');

module.exports = async function (req, res) {

	const user = await User.model.findOne({ cognitoUsername: accessPayload.sub });

	let project = await Project.model.findOne().where('developer', user.id);
	
	if (!project) {
		project = await Project.model.create({
			developer: user._id,
		});
	}
	
	const screenshot = req.files.screenshot && await promisify(project._.screenshot.upload)(req.files.screenshot);
	const demoVersion = req.files.demoVersion && await promisify(project._.demoVersion.upload)(req.files.demoVersion);
	const fullVersion = req.files.fullVersion && await promisify(project._.fullVersion.upload)(req.files.fullVersion);

	project = await project.update(_.omitBy({
		teamMembers: req.body.teamMembers,
		title: req.body.title,
		description: req.body.description,
		ageRestriction: req.body.ageRestriction,
		theStory: req.body.theStory,
		instructions: req.body.instructions,
		screenshot,
		techUsed: req.body.techUsed,
		devicesNeeded: req.body.devicesNeeded,
		demoVersion,
		fullVersion,
	}, _.isUndefined));

	res.redirect("/submission");
  
};
