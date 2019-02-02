'use strict';
/*eslint no-invalid-this:0*/
mongoose.Promise = require('bluebird');
import mongoose, {Schema} from 'mongoose';
import {registerEvents} from './propuestadesafio.events';

var ops = {};
ops.timestamps = true;
var PropuestaDesafioSchema = new Schema({
		status: { type: String, default: 'ninguno'},
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
		step: { type: String, default: 'ficha'},
		deleted: { type:Boolean, default: false },		
		rate: { type:Number, default: 0 },
		tipoDesafio: { type: Schema.Types.ObjectId, ref: 'TipoDesafio' },
	}, ops);

registerEvents(PropuestaDesafioSchema);
export default mongoose.model('PropuestaDesafio', PropuestaDesafioSchema);