'use strict';

export default angular
	.module('robotica.social.components.noticiaCard', [])
	.directive('noticiaCard', noticiaCard)
	.name;

class NoticiaCardController {
	/*@ngInject*/
	constructor($scope, $element, $state){
		this.$scope = $scope;
		this.$element = $element;
		this.$state = $state;
		this.$element.addClass('noticia-card');
		

	
		
		
		this.resource = this.$scope.resource;



		this.editable = this.$scope.editable === true;
		let captions = {
			'noticia': 'Noticia'
		};

		this.resource.typeCaption = captions[this.resource.type];
		this.modoVista = this.$scope.vista;
		if (this.modoVista==='social'){
			this.resource = this.$scope.resource;

		}
	}

	editResource(){
		this.$state.go(`curador.noticia`, { uid: this.resource._id, action: 'edit' });
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
            this.$state.go('curador.noticia', {type: 'noticia', searh: item.section});
		} else {
            this.$state.go('curador.new', { type: item.section });
		}
	}

}

function noticiaCard($log){
	'ngInject';

	return {
		restrict: 'E',
		controller: NoticiaCardController,
	controllerAs: '$ctrl',
	binding: {		
		vista: '<'
	},
    scope: {
			resource: '=',
			editable: '=',
			vista: '='
    },
		template: require('./noticiaCard.html')
	}
}