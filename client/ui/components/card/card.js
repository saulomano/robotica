'use strict';

import $ from 'jquery';

export default angular
	.module('robotica-ui.components.card', [])
	.directive('rdCard', rdCard)
	.name;

class RdCardController {
	/*@ngInject*/
	constructor($scope, $element, $timeout){
		this.$scope = $scope;
    this.$element = $element;
    this.$timeout = $timeout;

		this.$element.addClass('rd-card');
	}
}

function rdCard($log){
	'ngInject';

	return {
		restrict: 'E',
		controller: RdCardController,
		controllerAs: '$rdCardController',
		transclude: {
			toolbar: '?rdCardToolbar',
			cover: '?rdCardCover',
			header: '?rdCardHeader',
			body: '?rdCardBody',
			footer: '?rdCardFooter',
		},
		template: require('./card.html')
	}
}