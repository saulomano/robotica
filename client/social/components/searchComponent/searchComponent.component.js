'use strict';

import angular from "angular";
import _ from "lodash";

export default angular
	.module('robotica.social.components.searchComponent', [])
	.directive('searchComponent', searchComponent)
	.name;

class NoticiaCardController {
	/*@ngInject*/
	constructor($scope, $element, $state, $mdDialog) {
		this.$scope = $scope;
		this.$element = $element;
		this.$state = $state;
        this.$mdDialog = $mdDialog;
		this.$element.addClass('search-component');

		
		this.resource = this.$scope.resource;



		this.editable = this.$scope.editable === true;
		let captions = {
			'search': 'Serach Component'
		};

		this.resource.typeCaption = captions[this.resource.type];
		this.modoVista = this.$scope.vista;
		if (this.modoVista==='social'){
			this.resource = this.$scope.resource;

		}
	}

	
	
   
    

}

function searchComponent($log){
	'ngInject';

	return {
		restrict: 'E',
		controller: SearchComponentController,
	controllerAs: '$ctrl',
	binding: {		
		vista: '<'
	},
    scope: {
			resource: '=',			
			vista: '='
    },
		template: require('./searchComponent.html')
	}
}