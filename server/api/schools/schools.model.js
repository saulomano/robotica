'use strict';
/*eslint no-invalid-this:0*/
mongoose.Promise = require('bluebird');
import mongoose, {Schema} from 'mongoose';
import {registerEvents} from './schools.events';

var ops = {};
var SchoolsSchema = new Schema({
		code: Number,
		name: String,
		region: Number,
		schools: [{}]
	}, ops);

registerEvents(SchoolsSchema);
export default mongoose.model('colegios', SchoolsSchema);