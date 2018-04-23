'use strict';
/*eslint no-invalid-this:0*/
mongoose.Promise = require('bluebird');
import mongoose, {Schema} from 'mongoose';
import {registerEvents} from './category.events';

var ops = {};
var CategorySchema = new Schema({
		type: String,
		values: [String],
		caption: String,
	}, ops);

registerEvents(CategorySchema);
export default mongoose.model('Category', CategorySchema);