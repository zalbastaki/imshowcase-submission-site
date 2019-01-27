var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Project Model
 * ==========
 */
var Project = new keystone.List('Project');

Project.add({
	title: { type: Types.Text, initial: true, required: true },
	description: { type: Types.Textarea, initial: true, required: true },
	ageRestriction: { type: Types.Text, initial: true },
	techUsed: { type: Types.Text, initial: true },
	deviceNeeded: { type: Types.Select, options: 'Surface Pro, etc', initial: true, required: true,  }
});

/**
 * Registration
 */
Project.defaultColumns = 'name, email, isAdmin';
Project.register();