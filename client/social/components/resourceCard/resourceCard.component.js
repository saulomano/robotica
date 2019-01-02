'use strict';

export default angular
	.module('robotica.social.components.resourceCard', [])
	.directive('resourceCard', resourceCard)
	.name;
	import SocialComponent from '../../social.component';
class ResourceCardController extends SocialComponent{
	/*@ngInject*/
	constructor($scope, $element, $state, $mdDialog){
		super({$element});
		this.$scope = $scope;
		this.$element = $element;
		this.$state = $state;
		this.$mdDialog = $mdDialog;
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

	getResourceTypeDescription(resourceType) {

		if(resourceType == 'tutorial')
			return "Tutorial";
		if(resourceType == 'herramienta')
			return "Herramienta";
		if(resourceType == 'experiencia')
			return "Experiencia";
		if(resourceType == 'materialapoyo')
			return "Material de apoyo";
		if(resourceType == 'ejemplos')
			return "Ejemplo";
		
		return resourceType;
	}

	getFieldClass(entry){
        if (entry == "Presentación")
            return "assets/images/recurso-presentacion.svg";
        if (entry == "Video")
			return "assets/images/recurso-video.svg";
			
        if (entry == "Plantilla")
			return "assets/images/recurso-video.svg"; 
		if (entry == "Texto")
			return "assets/images/recurso-pdf.svg";
		if (entry == "Imagen")
			return "assets/images/recurso-imagen.svg";
		if (entry == "Audio")
			return "assets/images/recurso-audio.svg";                  



       // return  "iconPed-"+entry +" step";

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

	viewResource($event, resource){//, modoVista){

        if (!this.$mdDialog)
            return;
		/*
	    if (!modoVista || modoVista === 'curador')
	        return;
		*/
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
            };

            this.Resource
                .get()
                .then(data => {
					
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