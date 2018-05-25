'use strict';

export default angular
	.module('robotica.social.components.propuestaDesafioCard', [])
	.directive('propuestaDesafioCard', propuestaDesafioCard)
	.name;

class PropuestaDesafioCardController {
	/*@ngInject*/
	constructor($scope, $element, $state){
		this.$scope = $scope;
		this.$element = $element;
		this.$state = $state;
    	this.$element.addClass('resource-card');
    
		this.resource = this.$scope.resource;
		this.editable = this.$scope.editable === true;
		let captions = {
			'desafiopropuesto': 'Propuesta Desafio'
		};

		this.resource.typeCaption = captions[this.resource.type];
		this.modoVista = this.$scope.modoVista;


	}

	editResource(){
		this.$state.go(`curador.propuestadesafio`, { uid: this.resource._id });
	}

	deleteResource(){
        this.resource
            .remove()
            .then( data => {
                this.$state.go(this.$state.current, {}, {reload: true});
            })
            .catch( err => {
                throw err;
            });


	}

    clickedAction(item) {
        let types = /^(pendiente|aprobado|rechazado)$/ig;
		if (types.test(item.section)) {
            this.$state.go('curador.propuestadesafio', {type: 'desafiopropuesto', searh: item.section});
		} else {
            this.$state.go('curador.new', { type: item.section });
		}
	}
}

function propuestaDesafioCard($log){
	'ngInject';

	return {
		restrict: 'E',
		controller: PropuestaDesafioCardController,
    controllerAs: '$ctrl',
    scope: {
			resource: '=',
			editable: '='
    },
		template: require('./propuestaDesafioCard.html')
	}
}