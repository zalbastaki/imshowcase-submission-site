const _ = require('lodash');
const keystone = require('keystone');
const User = keystone.list('User');
const Project = keystone.list('Project');
const cookieParser = require('cookie-parser');
const jwt = require('../../utils/jwt');
const promisify = require('../../utils/promisify');

module.exports = async function (req, res) {

	try {
	
		const user = await User.model.findOne({ cognitoUsername: accessPayload.sub });

		let project = await Project.model.findOne().where('_id', req.body.projectId);
		
		if (!project) {
			project = await Project.model.create({
				developer: user._id,
			});
		}
		
		if (req.body.videoDelete) {
			await promisify(project._.video.remove)();
			await project.update({
				video: 'remove',
			});
		}
		
		if (req.body.sourceCodeDelete) {
			await promisify(project._.sourceCode.remove)();
			await project.update({
				sourceCode: 'remove',
			});
		}

		if (project.video.filename && req.files.video) {
			await promisify(project._.video.remove)();
		}

		if (project.sourceCode.filename && req.files.sourceCode) {
			await promisify(project._.sourceCode.remove)();
		}

		var video = req.files.video && await promisify(project._.video.upload)(req.files.video);
		var sourceCode = req.files.sourceCode && await promisify(project._.sourceCode.upload)(req.files.sourceCode);

		project = await project.update(_.omitBy({
			teamMembers: req.body.teamMembers,
			webLinks: req.body.webLinks,
			title: req.body.title,
			description: req.body.description,
			contentWarnings: req.body.contentWarnings,
			instructions: req.body.instructions,
			accessibility: req.body.accessibility,
			devicesNeeded: req.body.devicesNeeded,
			video,
			sourceCode,
		}, _.isUndefined));

		res.status(200);
		res.redirect('/submission-success');
	} catch(err) {
		console.log(err);
		res.status(500);
		res.render('error', { error: err });
		res.redirect('/submission-fail');
	}
  
};
