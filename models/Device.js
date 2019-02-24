var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Device Model
 * ==========
 */
var Device = new keystone.List('Device');

Device.add({
	device: { type: Types.Name, initial: true, required: true, index: true },
});

/**
 * Registration
 */
Device.defaultColumns = 'device';
Device.register();
