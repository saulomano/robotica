'use strict';
/*eslint no-invalid-this:0*/
mongoose.Promise = require('bluebird');
import mongoose, {Schema} from 'mongoose';
import {registerEvents} from './publishedPropuestTaller.events';

var ops = {};
ops.timestamps = true;

var PublishedSchema = new Schema({		
	descripcion: String,
	thumbnail: String,		
	area: [String],			
	owner: { type: Schema.Types.ObjectId, ref: 'User' },		
	published: { type: Schema.Types.ObjectId, ref: 'PublishedPropuestasTaller' },		
	step: { type: String, default: 'ficha'},
	deleted: { type:Boolean, default: false },						
	publicaHome: { type:Boolean, default: false },			
	anio: [String],	
	propuestas: [{ type: Schema.Types.ObjectId, ref: 'PublishedPropuestasTaller' }],	
	introductoria: { type:Boolean, default: false },
}, ops);

registerEvents(PublishedSchema);
export default mongoose.model('PublishedPropuestTaller', PublishedSchema);