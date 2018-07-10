'use strict';

import angular from "angular";
import _ from "lodash";

export default angular
	.module('robotica.social.components.orientacionpedagogicaCard', [])
	.directive('orientacionpedagogicaCard', orientacionpedagogicaCard)
	.name;

class OrientacionPedagogicaCardController {
	/*@ngInject*/
	constructor($scope, $element, $state, $mdDialog){
		this.$scope = $scope;
		this.$element = $element;
		this.$state = $state;
        this.$mdDialog = $mdDialog;
		this.$element.addClass('rd-card-orientaciones');

        this.captions = {
            'orientacionpedagogica': 'Orientacion Pedagogica',
            'noticia': 'Noticia',
            'kit': 'Kit'
        };
	
		
		
		this.resource = this.$scope.resource;



		this.editable = this.$scope.editable === true;
		let captions = {
			'orientacionpedagogica': 'OrientacionPedagogica'
		};

		this.resource.typeCaption = captions[this.resource.type];
		this.modoVista = this.$scope.vista;
		if (this.modoVista==='social'){
			this.resource = this.$scope.resource;

		}
	}

	editResource(){
		this.$state.go(`curador.orientacionpedagogica`, { uid: this.resource._id, action: 'edit' });
    }
    

    showConfirm(ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm =this.$mdDialog.confirm()
              .title('Eliminar?')
              .textContent('Esta seguro que desea eliminar este Orientacion.')
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
                confirm.$state.go('curador.dashboardorientacionpedagogica', {}, {reload: true});
            })
            .catch( err => {
                throw err;
            });
        }, function() {
         
        });
      };


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
            this.$state.go('curador.orientacionpedagogica', {type: 'orientacionpedagogica', searh: item.section});
		} else {
            this.$state.go('curador.new', { type: item.section });
		}
	}

    viewResource($event, resource, modoVista){

        if (!this.$mdDialog)
            return;

        if (!modoVista || modoVista === 'curador')
            return;

        this.$mdDialog.show({
            template: require('../modalView/modalView.html'),
            parent: angular.element(document.body),
            targetEvent: $event,
            clickOutsideToClose: true,
            fullscreen: true, // Only for -xs, -sm breakpoints.
            locals: {
                resource: resource
            },
            controller: DialogController,
            controllerAs: '$ctrl'
        })
            .then((data) => {
                console.log(data);
            }, () => {

            })
            .catch(function(res) {
                if (!(res === 'cancel' || res === 'escape key press')) {
                    throw res;
                }
            });

        function DialogController($scope, $mdDialog, resource, Restangular, $timeout) {
            'ngInject';
            //this.$scope = $scope;
            this.loading = true;

            this.Resource = Restangular.one('publishedOrientacionPedagogica', resource._id);

            this.closeDialog = function() {
                $mdDialog.hide();
            }

            this.Resource
                .get()
                .then(data => {

                    let captions = {
                        'propuesta': 'Propuesta pedagógica',
                        'actividad': 'Actividad accesible',
                        'herramientas': 'Herramienta',
                        'orientacion': 'Orientación',
                        'mediateca': 'Mediateca',
                        'noticias': 'Noticias',
                        'calendario': 'Calendario'
                    };

                    data.links = _.map(data.links, p =>{
                        p.typeCaption = captions[p.type];
                        return p;
                    });

                    this.resource = data;
                    this.loading = false;
                    $timeout(() => {
                        $scope.$apply();
                    });
                })
                .catch(err => {
                    throw err;
                });
        }
    }

}

function orientacionpedagogicaCard($log){
	'ngInject';

	return {
		restrict: 'E',
		controller: OrientacionPedagogicaCardController,
	controllerAs: '$ctrl',
	binding: {		
		vista: '<'
	},
    scope: {
			resource: '=',
			editable: '=',
			vista: '='
    },
		template: require('./orientacionpedagogicaCard.html')
	}
}