'use strict';
/*eslint no-invalid-this:0*/
mongoose.Promise = require('bluebird');
import mongoose, {Schema} from 'mongoose';
import {registerEvents} from './publishedOrientacionPedagogica.events';

var ops = {};
ops.timestamps = true;

var PublishedSchema = new Schema({
	status: { type: String, default: 'ninguno'},
	type: String,
	objetivo: String,
	descripcion: String,
	thumbnail: String,		
	area: [String],		
	category: Schema.Types.Mixed,
	potencialidades: [{ moduleType: String, content: Schema.Types.Mixed }],
	tema: [{ moduleType: String, content: Schema.Types.Mixed }],
	habilidad:[{ moduleType: String, content: Schema.Types.Mixed }],	
	postBody: [{ moduleType: String, content: Schema.Types.Mixed }],
	tags: [String],
	owner: { type: Schema.Types.ObjectId, ref: 'User' },	
	files: [{ type: Schema.Types.ObjectId, ref: 'File' }],	
	step: { type: String, default: 'ficha'},
	deleted: { type:Boolean, default: false },		
	kitusado: String,				
	publicaHome: { type:Boolean, default: false },
}, ops);

registerEvents(PublishedSchema);
export default mongoose.model('PublishedOrientacionPedagogica', PublishedSchema);