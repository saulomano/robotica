'use strict';
/*eslint no-invalid-this:0*/
mongoose.Promise = require('bluebird');
import mongoose, {Schema} from 'mongoose';
import {registerEvents} from './publishedkits.events';

var ops = {};
ops.timestamps = true;

var PublishedSchema = new Schema({
		type: String,		
		deleted: { type:Boolean, default: false },			
		nombre: String,
		descripcion: String,
		thumbnail: String,
		potencialidades: [{ moduleType: String, content: Schema.Types.Mixed }],
		armado: [{ moduleType: String, content: Schema.Types.Mixed }],
		habilidad:[{ moduleType: String, content: Schema.Types.Mixed }],		
		owner: { type: Schema.Types.ObjectId, ref: 'User' },	
		files: [{ type: Schema.Types.ObjectId, ref: 'File' }],			
		step: { type: String, default: 'ficha'}		



	}, ops);

registerEvents(PublishedSchema);
export default mongoose.model('PublishedKits', PublishedSchema);