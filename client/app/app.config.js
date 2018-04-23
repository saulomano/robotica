'use strict';

export function appConfig($stateProvider) {
	'ngInject';
	
	$stateProvider
	.state('app', {
		abstract: true,
		template: `<main ui-view=""></main>`
	});
}