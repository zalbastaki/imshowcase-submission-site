var keystone = require('keystone');

module.exports = async function (req, res) {
	var view = new keystone.View(req, res);

	view.render('submission-success');
}
