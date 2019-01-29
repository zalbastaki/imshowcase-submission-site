var keystone = require('keystone');
var Project = keystone.list('Project');

module.exports = async function (req, res) {
  
  var id = req.params.id;

  if (!id) {
    var newProject = new Project.model({
      title: req.body.title,
    });
    
    await newProject.save();
    
    res.redirect("/submission/" + newProject._id);
  }
  else if (id) {
		await Project.model.update({_id:id}, {
      title: req.body.title,
    });

    res.redirect("/submission/" + id);
	}
  
};