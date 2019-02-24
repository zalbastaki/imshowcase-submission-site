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
	teamMembers: { type: Types.Relationship, ref: 'User', many: true },
	//what
	title: { type: Types.Text, initial: true, note: "required", required: true },
	description: { type: Types.Textarea, max: 120, initial: true, note: "required", required: true },
	//details
	ageRestriction: { type: Types.Text },
	theStory: { type: Types.Textarea },
	instructions: { type: Types.Textarea },
	images: { type: Types.File, storage: storage },
	//tech
	techUsed: { type: Types.Text },
	devicesNeeded: { type: Types.Relationship, ref: 'Device', many: true, initial: true, note: "required", required: true },
	//code
	demoVersion: { type: Types.File, storage: storage },
	fullVersion: { type: Types.File, storage: storage, initial: true, note: "required" },
});

/**
 * Registration
 */
Project.defaultColumns = 'developer, title, devicesNeeded';
Project.register();
