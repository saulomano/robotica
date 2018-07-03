'use strict';
/*eslint no-invalid-this:0*/
mongoose.Promise = require('bluebird');
import mongoose, {Schema} from 'mongoose';
import {registerEvents} from './publishednoticia.events';

var ops = {};
ops.timestamps = true;

var PublishedSchema = new Schema({
		type: String,
		title: String,
		summary: String,
		thumbnail: String,
		nivel: [String],		
		category: Schema.Types.Mixed,
		postBody: [{ moduleType: String, content: Schema.Types.Mixed }],
		tags: [String],
		owner: { type: Schema.Types.ObjectId, ref: 'User' },
		collaborators: [{ type: Schema.Types.ObjectId, ref: 'User' }],
		files: [{ type: Schema.Types.ObjectId, ref: 'File' }],	
		deleted: { type:Boolean, default: false },
		noticia: { type: Schema.Types.ObjectId, ref: 'Noticia' },
		video : String,
		orientacionPedagogica: { type:Boolean, default: false },
		publicaHome: { type:Boolean, default: false },
		urlVideo:{ type: String },
	}, ops);

registerEvents(PublishedSchema);
export default mongoose.model('PublishedNoticia', PublishedSchema);