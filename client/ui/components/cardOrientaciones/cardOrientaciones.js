'use strict';

import $ from 'jquery';

export default angular
	.module('robotica-ui.components.cardOrientaciones', [])
	.directive('rdCardOrientaciones', rdCardOrientaciones)
	.name;

class RdCardOrientacionesController {
	/*@ngInject*/
	constructor($scope, $element, $timeout){
		this.$scope = $scope;
    this.$element = $element;
    this.$timeout = $timeout;

		this.$element.addClass('rd-card-orientaciones');
	}
}

function rdCardOrientaciones($log){
	'ngInject';

	return {
		restrict: 'E',
		controller: RdCardOrientacionesController,
		controllerAs: '$rdCardOrientacionesController',
		transclude: {
			toolbar: '?rdCardOrientacionesToolbar',
			cover: '?rdCardOrientacionesCover',
			header: '?rdCardOrientacionesHeader',
			body: '?rdCardOrientacionesBody',
			footer: '?rdCardOrientacionesFooter',
		},
		template: require('./cardOrientaciones.html')
	}
}