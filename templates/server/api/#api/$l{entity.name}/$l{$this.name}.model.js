'use strict';
/*eslint no-invalid-this:0*/
mongoose.Promise = require('bluebird');
import mongoose, {Schema} from 'mongoose';
import {registerEvents} from './<%- _.lowerCase($this.name) -%>.events';

<% 
var capName = _.capitalize($this.name);
-%>
var ops = {};
<% if ($this.timestamps) {-%>
ops.timestamps = true;
<%}-%>
var <%-capName-%>Schema = new Schema({
	<% _.each($this.props, function(prop){ -%>
	<%- prop.name -%>: <%- prop.type -%>,
	<%})-%>
}, ops);

registerEvents(<%-capName-%>Schema);
export default mongoose.model('<%-capName-%>', <%-capName-%>Schema);