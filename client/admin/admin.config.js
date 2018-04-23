'use strict';

export function adminConfig($stateProvider) {
	'ngInject';
	
	$stateProvider
	.state('admin', {
		abstract: true,
		template: `
			<admin-header></admin-header>
			<main ui-view=""></main>
		`
	});
}