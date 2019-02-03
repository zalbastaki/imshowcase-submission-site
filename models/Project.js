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
	developer: { type: Types.Relationship, ref: 'User', initial: true, note: "required" },
	teamMembers: { type: Types.Relationship, ref: 'User', many: true },
	//what
	title: { type: Types.Text, initial: true, note: "required" },
	description: { type: Types.Textarea, max: 120, initial: true, note: "required" },
	//details
	theStory: { type: Types.Markdown },
	instructions: { type: Types.Markdown },
	ageRestriction: { type: Types.Text },
	images: { type: Types.CloudinaryImage },
	//tech
	techUsed: { type: Types.Text },
	deviceNeeded: { type: Types.Select, options: 'Surface Pro, etc', initial: true, note: "required" },
	//code
	githubLink: { type: Types.Url, match: /^https?:\/\/github\.com\/.+\/.+$/i },
	demoVersion: { type: Types.File, storage: storage },
	fullVersion: { type: Types.File, storage: storage, initial: true, note: "required" },
});

/**
 * Registration
 */
Project.defaultColumns = 'developer, title, deviceNeeded';
Project.register();