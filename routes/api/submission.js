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

	if (req.body.screenshotDelete) {
		await promisify(project._.screenshot.remove)();
		await project.update({
			screenshot: 'remove',
		});
	}
	
	if (req.body.demoVersionDelete) {
		await promisify(project._.demoVersion.remove)();
		await project.update({
			demoVersion: 'remove',
		});
	}
	
	if (req.body.fullVersionDelete) {
		await promisify(project._.fullVersion.remove)();
		await project.update({
			fullVersion: 'remove',
		});
	}

	if (project.screenshot.filename && req.files.screenshot) {
		await promisify(project._.screenshot.remove)();
	}

	if (project.demoVersion.filename && req.files.demoVersion) {
		await promisify(project._.demoVersion.remove)();
	}

	if (project.fullVersion.filename && req.files.fullVersion) {
		await promisify(project._.fullVersion.remove)();
	}

	var screenshot = req.files.screenshot && await promisify(project._.screenshot.upload)(req.files.screenshot);
	var demoVersion = req.files.demoVersion && await promisify(project._.demoVersion.upload)(req.files.demoVersion);
	var fullVersion = req.files.fullVersion && await promisify(project._.fullVersion.upload)(req.files.fullVersion);

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
