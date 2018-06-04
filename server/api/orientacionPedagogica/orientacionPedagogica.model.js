'use strict';
/*eslint no-invalid-this:0*/
mongoose.Promise = require('bluebird');
import mongoose, {Schema} from 'mongoose';
import {registerEvents} from './orientacionPedagogica.events';

var ops = {};
ops.timestamps = true;
var ResourceSchema = new Schema({
		status: { type: String, default: 'ninguno'},
		type: String,
		objetivo: String,
		descripcion: String,
		thumbnail: String,		
		area: [String],		
		category: Schema.Types.Mixed,
		postBody: [{ moduleType: String, content: Schema.Types.Mixed }],
		tags: [String],
		owner: { type: Schema.Types.ObjectId, ref: 'User' },	
		files: [{ type: Schema.Types.ObjectId, ref: 'File' }],
		published: { type: Schema.Types.ObjectId, ref: 'Published' },		
		step: { type: String, default: 'ficha'},
		deleted: { type:Boolean, default: false },		
		kitusado: String,				
		publicaHome: { type:Boolean, default: false },
	}, ops);

registerEvents(ResourceSchema);
export default mongoose.model('OrientacionPedagogica', ResourceSchema);