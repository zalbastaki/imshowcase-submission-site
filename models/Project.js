var keystone = require('keystone');
var Types = keystone.Field.Types;
var storage = require("../storage/index.js");

/**
 * Project Model
 * ==========
 */
var Project = new keystone.List('Project');

Project.add({
	//who
	developer: { type: Types.Relationship, ref: 'User', initial: true, note: "required", required: true },
	teamMembers: { type: Types.Text, note: "Comma seperated list." },
	webLinks: { type: Types.Text, note: "Comma seperated list." },
	//what
	title: { type: Types.Text, initial: true, note: "required" },
	description: { type: Types.Textarea, initial: true, note: "required" },
	//details
	contentWarnings: { type: Types.Text, note: "Comma seperated list." },
	instructions: { type: Types.Textarea },
	//showcase
	accessibility: { type: Types.Text },
	devicesNeeded: { type: Types.Relationship, ref: 'Device', many: true, initial: true, note: "required" },
	//project
	video: { type: Types.File, storage: storage },
	sourceCode: { type: Types.File, storage: storage, initial: true, note: "required" },
});

/**
 * Registration
 */
Project.defaultColumns = 'developer, title, devicesNeeded';
Project.register();
