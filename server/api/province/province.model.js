'use strict';
/*eslint no-invalid-this:0*/
mongoose.Promise = require('bluebird');
import mongoose, {Schema} from 'mongoose';
import {registerEvents} from './province.events';

var ops = {};
var ProvinceSchema = new Schema({
		name: String,
		district: [{
			region: String,
			number: Number,
			name: String,
			schools: [{}]
		}]
	}, ops);

registerEvents(ProvinceSchema);
export default mongoose.model('Province', ProvinceSchema);