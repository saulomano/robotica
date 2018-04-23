'use strict';

<% 
var modelName = _.capitalize($this.name);
-%>
import <%- modelName -%> from './<%- _.lowerCase($this.name) -%>.model';

<% if ($this.routes['index']) {%>
/**
 * Get list of <%-$this.plural%>
 * restriction: '<%-$this.routes['index'].auth%>'
 */
export function index(req, res, next) {
	var query = req.querymen;
	
	<%-modelName%>
		.find({})
		.count()
		.exec((err, count) => {
			if (err){
				return next(err);
			}
			req.totalItems = count;
			req.result = <%-modelName%>
										.find(query.query)
										.skip(query.cursor.skip)
										.limit(query.cursor.limit)
										.sort(query.sort)
										.select(query.select)
										.exec();
			next();
		});
}
<%}-%>

<% if ($this.routes['create']) {%>
/**
 * Creates a new <%-$this.name%>
 * restriction: '<%-$this.routes['create'].auth%>'
 */
export function create(req, res, next) {
  var new<%-modelName%> = new <%-modelName%>(req.body);
  
	req.result = new<%-modelName%>.save();
	next();
}
<%}-%>

<% if ($this.routes['update']) {%>
/**
 * Updates a <%-$this.name%>
 * restriction: '<%-$this.routes['update'].auth%>'
 */
export function update(req, res, next) {
	delete req.body._id;

	req.result = <%-modelName%>.update({ _id: req.params.id}, req.body);
	next();
}
<%}-%>

<% if ($this.routes['show']) {%>
/**
 * Get a single <%-$this.name%>
 * restriction: '<%-$this.routes['show'].auth%>'
 */
export function show(req, res, next) {
  var <%-$this.name%>Id = req.params.id;

	req.result = <%-modelName%>.findById(<%-$this.name%>Id).exec();
	next();
}
<%}-%>

<% if ($this.routes['destroy']) {%>
/**
 * Deletes a <%-$this.name%>
 * restriction: '<%-$this.routes['show'].auth%>'
 */
export function destroy(req, res, next) {
	req.result =  <%-modelName%>.findByIdAndRemove(req.params.id).exec();
	req.statusCode = 204;
	next();
}
<%}-%>