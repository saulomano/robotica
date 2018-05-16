'use strict';

export default angular
	.module('robotica.social.components.resourceCard', [])
	.directive('resourceCard', resourceCard)
	.name;

class ResourceCardController {
	/*@ngInject*/
	constructor($scope, $element, $state){
		this.$scope = $scope;
		this.$element = $element;
		this.$state = $state;
    	this.$element.addClass('resource-card');
    
		this.resource = this.$scope.resource;
		this.editable = this.$scope.editable === true;
		let captions = {
			'propuesta': 'Propuesta pedagógica',
			'actividad': 'Actividad accesible',
			'herramienta': 'Herramienta',
			'orientacion': 'Orientación',
			'mediateca': 'Mediateca',
			'desafio': 'Desafío',
		};

		this.resource.typeCaption = captions[this.resource.type];
	}

	editResource(){
		this.$state.go(`curador.recurso`, { uid: this.resource._id });
	}

	deleteResource(){
		this.$state.go(`curador.recurso`, { uid: this.resource._id, action: 'remove' });
	}

    clickedAction(item) {
        let types = /^(pendiente|aprobado|rechazado)$/ig;
		if (types.test(item.section)) {
            this.$state.go('curador.dashboard', {type: 'desafios', searh: item.section});
		} else {
            this.$state.go('curador.new', { type: item.section });
		}
	}
}

function resourceCard($log){
	'ngInject';

	return {
		restrict: 'E',
		controller: ResourceCardController,
    controllerAs: '$ctrl',
    scope: {
			resource: '=',
			editable: '='
    },
		template: require('./resourceCard.html')
	}
}