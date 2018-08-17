'use strict';

import angular from "angular";
import _ from "lodash";

export default angular
	.module('robotica.social.components.propuestaTalleresCard', [])
	.directive('propuestatallerCard', propuestaTalleresCard)
	.name;

class PropuestaTallerCardController {
	/*@ngInject*/
	constructor($scope, $element, $state, $mdDialog){
		this.$scope = $scope;
		this.$element = $element;
		this.$state = $state;
        this.$mdDialog = $mdDialog;
		this.$element.addClass('propuestaTalleres-card');

        this.captions = {
            'propuestatalleres': 'Propuesta Talleres'
        };
		this.resource = this.$scope.resource;



        let captionsAreas = {
            'Cs. Naturales' : 'naturales',
            'Matemática' : 'Matemática',
            'Prácticas del Lenguajes' : 'lengua'
        };

        this.iconsAreas = _.map(this.resource.area, p =>{
            return captionsAreas[p.type];         
        });



		this.editable = this.$scope.editable === true;
		

		this.resource.typeCaption = this.captions[this.resource.type];
		this.modoVista = this.$scope.vista;
		if (this.modoVista==='social'){
			this.resource = this.$scope.resource;

		}
	}

	editResource(){
		this.$state.go('curador.propuestataller', { uid: this.resource._id, action: 'edit' });
    }
    

    showConfirm(ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm =this.$mdDialog.confirm()
              .title('Eliminar?')
              .textContent('Esta seguro que desea eliminar este taller?')
              .ariaLabel('')
              .targetEvent(ev)
              .ok('Si!')
              .cancel('No');
              confirm.resource= this.resource;
              confirm.$state= this.$state;
        this.$mdDialog.show(confirm).then(function() {
            confirm.resource
            .remove()
            .then( data => {
                confirm.$state.go('curador.dashboardpropuestataller', {}, {reload: true});
            })
            .catch( err => {
                throw err;
            });
        }, function() {
         
        });
      };




      getFieldClass(entry){
        if (entry == "Cs. Naturales")
            return "iconPed-naturales step";
        if (entry == "Matemática")
            return "iconPed-matematica step";
        if (entry == "Prácticas del Lenguaje")
            return "iconPed-lengua step";            



        return  "iconPed-"+entry +" step";

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
            this.$state.go('curador.propuestataller', {type: 'propuestataller', searh: item.section});
		} else {
            this.$state.go('curador.new', { type: item.section });
		}
	}

    viewResource($event, resource, modoVista){       

        if (!modoVista || modoVista === 'curador')
            return;

        this.$state.go('social.orientacionpedagogica', { tallerid: resource._id });
    }

}

function propuestaTalleresCard($log){
	'ngInject';

	return {
		restrict: 'E',
		controller: PropuestaTallerCardController,
	controllerAs: '$ctrl',
	binding: {		
		vista: '<'
	},
    scope: {
			resource: '=',
			editable: '=',
			vista: '='
    },
		template: require('./propuestaTalleresCard.html')
	}
}