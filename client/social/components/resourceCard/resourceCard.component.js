'use strict';

export default angular
	.module('robotica.social.components.resourceCard', [])
	.directive('resourceCard', resourceCard)
	.name;
	import SocialComponent from '../../social.component';
class ResourceCardController extends SocialComponent{
	/*@ngInject*/
	constructor($scope, $element, $state){
		super({$element});
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
			'mediateca': 'Mediateca'
		};

		this.resource.typeCaption = captions[this.resource.type];
	}

	editResource(){
		this.$state.go(`curador.recurso`, { uid: this.resource._id, action: 'edit' });
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