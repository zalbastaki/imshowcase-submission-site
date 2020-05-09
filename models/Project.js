var keystone = require('keystone');
var Types = keystone.Field.Types;
var storage = require("../storage/index.js");

/**
 * Project Model
 * ==========
 */
var Project = new keystone.List('Project');

Project.add({
	// 3 projects per user
	//who
	developer: { type: Types.Relationship, ref: 'User', initial: true, note: "required", required: true },
	teamMembers: { type: Types.Relationship, ref: 'User', many: true }, // change into text field
	//what
	title: { type: Types.Text, initial: true, note: "required" },
	description: { type: Types.Textarea, initial: true, note: "required" }, // add prompts
	//details
	ageRestriction: { type: Types.Text }, // change to content warnings (add guidance)
	theStory: { type: Types.Textarea }, // remove
	instructions: { type: Types.Textarea },
	screenshot: { type: Types.File, storage: storage }, // remove
	//tech
	techUsed: { type: Types.Text }, // remove
	devicesNeeded: { type: Types.Relationship, ref: 'Device', many: true, initial: true, note: "required" },
	//code
	demoVersion: { type: Types.File, storage: storage }, // remove
	fullVersion: { type: Types.File, storage: storage, initial: true, note: "required" },
	// add up to 3 supporting files
	// add LinkedIn, portfolio, twitter, other (add guidance -> github gitlab behance)
});

/**
 * Registration
 */
Project.defaultColumns = 'developer, title, devicesNeeded';
Project.register();
