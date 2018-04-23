'use strict';

import {Router} from 'express';
import * as controller from './<%- _.lowerCase($this.name) -%>.controller';
import * as auth from '../../auth/auth.service';
import querymen from 'querymen';

var router = new Router();

<% 
_.each(_.keys($this.routes), function(key) {
	var route = $this.routes[key];
	var auth = '';
	if (route.auth === 'authenticate'){
		auth = ', auth.isAuthenticated()';
	} else if (typeof route.auth === 'string') {
		auth = ", auth.hasRole('"+route.auth+"')";
	}
-%>
<% if (route.method === 'get' && route.route === '/') { -%>
router.<%- route.method %>('<%- route.route %>'<%- auth %>, querymen.middleware(), controller.<%-key%>);
<%} else {-%>
router.<%- route.method %>('<%- route.route %>'<%- auth %>, controller.<%-key%>);
<%}-%>
<%})-%>

module.exports = router;