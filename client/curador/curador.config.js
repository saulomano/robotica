'use strict';

export function curadorConfig($stateProvider) {
	'ngInject';
	
	$stateProvider
	.state('curador', {
		abstract: true,
		template: `
			<curador-header></curador-header>
			<main ui-view=""></main>
		`
	});
}