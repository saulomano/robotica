'use strict';
/*eslint no-invalid-this:0*/
mongoose.Promise = require('bluebird');
import mongoose, {Schema} from 'mongoose';
import {registerEvents} from './resource.events';

var ops = {};
ops.timestamps = true;
var ResourceSchema = new Schema({
		status: { type: String, default: 'ninguno'},
		type: String,
		subtype: String,
		category: String,
		title: String,
		summary: String,
		tags: [String],
		owner: { type: Schema.Types.ObjectId, ref: 'User' },		
		video: String,
		files: [{ type: Schema.Types.ObjectId, ref: 'File' }],
		audio: String,
		postBody: [{ moduleType: String, content: Schema.Types.Mixed }],
		tipoRecurso:  String,
		published: { type: Schema.Types.ObjectId, ref: 'Published' },		
		step: { type: String, default: 'ficha'},
		deleted: { type:Boolean, default: false },
		
	}, ops);

registerEvents(ResourceSchema);
export default mongoose.model('Resource', ResourceSchema);
