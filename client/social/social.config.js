'use strict';

export function socialConfig($stateProvider) {
	'ngInject';
	
	$stateProvider
	.state('social', {
		abstract: true,
		template: `
			<social-header></social-header>
			<main ui-view=""></main>
			<social-footer class="footer"></social-footer>
		`
	});
}