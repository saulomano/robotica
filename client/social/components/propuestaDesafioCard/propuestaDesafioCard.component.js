'use strict';

import _ from "lodash";
import angular from "angular";

export default angular
	.module('robotica.social.components.propuestaDesafioCard', [])
	.directive('propuestaDesafioCard', propuestaDesafioCard)
	.name;

class PropuestaDesafioCardController {
	/*@ngInject*/
	constructor($scope, $element, $state, $mdDialog){
		this.$scope = $scope;
		this.$element = $element;
        this.$mdDialog = $mdDialog;
		this.$state = $state;
		this.$element.addClass('resource-card');
		this.resource = this.$scope.resource;
		this.$scope.elementType = this.elementType;

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

    viewResource($event, resource){

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

            this.Resource = Restangular.one(resource.route, resource._id);

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