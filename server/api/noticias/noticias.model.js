'use strict';
/*eslint no-invalid-this:0*/
mongoose.Promise = require('bluebird');
import mongoose, {Schema} from 'mongoose';
import {registerEvents} from './noticias.events';

var ops = {};
ops.timestamps = true;
var ResourceSchema = new Schema({
		status: { type: String, default: 'ninguno'},
		type: String,
		title: String,
		summary: String,
		thumbnail: String,
		nivel: [String],
		area: [String],		
		category: Schema.Types.Mixed,
		postBody: [{ moduleType: String, content: Schema.Types.Mixed }],
		tags: [String],
		owner: { type: Schema.Types.ObjectId, ref: 'User' },	
		files: [{ type: Schema.Types.ObjectId, ref: 'File' }],
		published: { type: Schema.Types.ObjectId, ref: 'PublishedNoticia' },		
		step: { type: String, default: 'ficha'},
		deleted: { type:Boolean, default: false },
		video : String,
		orientacionPedagogica: { type:Boolean, default: false },
		publicaHome: { type:Boolean, default: false },
		urlVideo:{ type: String},
		createdAt:{type: Date}
	}, ops);

registerEvents(ResourceSchema);
export default mongoose.model('Noticia', ResourceSchema);