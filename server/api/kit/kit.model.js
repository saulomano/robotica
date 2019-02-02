'use strict';
/*eslint no-invalid-this:0*/
mongoose.Promise = require('bluebird');
import mongoose, {Schema} from 'mongoose';
import {registerEvents} from './kit.events';

var ops = {};
ops.timestamps = true;
var ResourceSchema = new Schema({
		status: { type: String, default: 'ninguno'},
		type: String,
		nombre: String,
		descripcion: String,
		thumbnail: String,
		potencialidades: [{ moduleType: String, content: Schema.Types.Mixed }],
		armado: [{ moduleType: String, content: Schema.Types.Mixed }],
		habilidad:[{ moduleType: String, content: Schema.Types.Mixed }],		
		owner: { type: Schema.Types.ObjectId, ref: 'User' },	
		files: [{ type: Schema.Types.ObjectId, ref: 'File' }],
		published: { type: Schema.Types.ObjectId, ref: 'PublishedKits' },		
		step: { type: String, default: 'ficha'}		
	}, ops);

registerEvents(ResourceSchema);
export default mongoose.model('Kit', ResourceSchema);