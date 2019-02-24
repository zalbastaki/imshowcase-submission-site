const keystone = require('keystone');
const User = keystone.list('User');
const Project = keystone.list('Project');
const cookieParser = require('cookie-parser');
const jwt = require('../../utils/jwt');

module.exports = async function (req, res) {

	const user = await User.model.findOne({ cognitoUsername: accessPayload.sub });

	let project = await Project.model.findOne().where('developer', user.id);

	if (!project) {
		var newProject = await Project.model.create({
				developer: user._id,
				teamMembers: req.body.teamMembers,
				title: req.body.title,
				description: req.body.description,
				ageRestriction: req.body.ageRestriction,
				theStory: req.body.theStory,
				instructions: req.body.instructions,
				images: req.body.images,
				techUsed: req.body.techUsed,
				devicesNeeded: req.body.devicesNeeded,
				demoVersion: req.body.demoVersion,
				fullVersion: req.body.fullVersion,
		});
	}
	else if (project) {
			
		await project.update({
			teamMembers: req.body.teamMembers,
			title: req.body.title,
			description: req.body.description,
			ageRestriction: req.body.ageRestriction,
			theStory: req.body.theStory,
			instructions: req.body.instructions,
			images: req.body.images,
			techUsed: req.body.techUsed,
			devicesNeeded: req.body.devicesNeeded,
			demoVersion: req.body.demoVersion,
			fullVersion: req.body.fullVersion,
		});
	}

	res.redirect("/submission");
  
};
