'use strict';
/*eslint no-invalid-this:0*/
mongoose.Promise = require('bluebird');
import mongoose, {Schema} from 'mongoose';
import {registerEvents} from './resource.events';

var ops = {};
ops.timestamps = true;
var ResourceSchema = new Schema({
		type: String,
		title: String,
		summary: String,
		thumbnail: String,
		nivel: [String],
		area: [String],
		accessibility: [String],
		usability: [String],
		platform: [String],
		category: Schema.Types.Mixed,
		postBody: [{ moduleType: String, content: Schema.Types.Mixed }],
		tags: [String],
		owner: { type: Schema.Types.ObjectId, ref: 'User' },
		collaborators: [{ type: Schema.Types.ObjectId, ref: 'User' }],
		files: [{ type: Schema.Types.ObjectId, ref: 'File' }],
		published: { type: Schema.Types.ObjectId, ref: 'Published' },
		links: [{ type: Schema.Types.ObjectId, ref: 'Published' }],
		step: String,
		deleted: { type:Boolean, default: false }
	}, ops);

registerEvents(ResourceSchema);
export default mongoose.model('Resource', ResourceSchema);