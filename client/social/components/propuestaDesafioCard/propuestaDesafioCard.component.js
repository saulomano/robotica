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
		this.modoVista = this.$scope.vista;
		if (this.modoVista==='social'){
			this.resource = this.$scope.resource.propuesta;

		}
	}

	editResource(){
		this.$state.go(`curador.propuestadesafio`, { uid: this.resource._id, action: 'edit' });
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



	resolverDesafio(){
		this.$state.go(`social.new`, { desafioresolver: this.resource._id, action: 'edit' ,type:'resolvedesafio' });
	}

}

function propuestaDesafioCard($log){
	'ngInject';

	return {
		restrict: 'E',
		controller: PropuestaDesafioCardController,
	controllerAs: '$ctrl',
	binding: {		
		vista: '<'
	},
    scope: {
			resource: '=',
			editable: '=',
			vista: '='
    },
		template: require('./propuestaDesafioCard.html')
	}
}