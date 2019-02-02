'use strict';
/*eslint no-invalid-this:0*/
mongoose.Promise = require('bluebird');
import mongoose, {Schema} from 'mongoose';
import {registerEvents} from './publisheddesafios.events';

var ops = {};
ops.timestamps = true;

var PublishedSchema = new Schema({
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
		links: [{ type: Schema.Types.ObjectId, ref: 'Published' }],
		deleted: { type:Boolean, default: false },
		district: String,
		school: String,
		rate: Number,
		desafio: { type: Schema.Types.ObjectId, ref: 'Desafio' },
	}, ops);

registerEvents(PublishedSchema);
export default mongoose.model('PublishedDesafios', PublishedSchema);