'use strict';

export default angular
	.module('robotica.social.components.resourceView', [])
	.directive('resourceView', resourceView)
	.name;

class ResourceViewController {
	/*@ngInject*/
	constructor($scope, $element, $state, $timeout){
		this.$scope = $scope;
		this.$element = $element;
		this.$state = $state;
    this.$element.addClass('resource-card');
    
		this.editable = this.$scope.editable === true;
		let captions = {
			'propuesta': 'Propuesta pedagógica',
			'actividad': 'Actividad accesible',
			'herramienta': 'Herramienta',
			'orientacion': 'Orientación',
			'mediateca': 'Mediateca',
		};

		this.isPublished = this.$scope.isPublished == true;

		if (this.resource){
			this.resource.typeCaption = captions[this.resource.type];
		}

		this.$scope.$watch(() => { return this.$scope.resource; }, (value) => {
			this.resource = this.$scope.resource;
			
			if (this.resource){
				this.resource.typeCaption = captions[this.resource.type];
			}
			$timeout(() => {
				this.$scope.$apply();
			});
		});
		
	}

	sumfiles(files){
		return _.sumBy(files, 'size');
	}
}

function resourceView($log){
	'ngInject';

	return {
		restrict: 'E',
		controller: ResourceViewController,
    controllerAs: '$ctrl',
    scope: {
			resource: '=',
			isPublished: '='
    },
		template: require('./resourceView.html')
	}
}