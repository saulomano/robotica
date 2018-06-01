'use strict';
/*eslint no-invalid-this:0*/
mongoose.Promise = require('bluebird');
import mongoose, {Schema} from 'mongoose';
import {registerEvents} from './tipoDesafio.events';

var ops = {};
var TipoDesafioSchema = new Schema({
		type: String,
		descripcion:String,
		caption: String,
	}, ops);

registerEvents(TipoDesafioSchema);
export default mongoose.model('TipoDesafio', TipoDesafioSchema);