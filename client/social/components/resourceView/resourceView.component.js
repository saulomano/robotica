'use strict';



export default angular
	.module('robotica.social.components.resourceView', [])	
	.filter('trustUrl', function ($sce) {
		return function(url) {
		  return $sce.trustAsResourceUrl(url);
		};
	  })
	  .filter('souncloudTrusted', function ($sce) {
		return function(soundId) {
		  return $sce.trustAsResourceUrl('https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/'+soundId+'&color=%23ff5500&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&show_teaser=dalse&visual=false');
		};
	})
	.directive('resourceView', resourceView)
	.name;
	import SocialComponent from '../../social.component';

class ResourceViewController  extends SocialComponent{
	/*@ngInject*/
	constructor($scope, $element, $state, $timeout, Auth){
		super({$element});
		this.$scope = $scope;
		this.$element = $element;
		this.$state = $state;
		this.rateView = this.$scope.rate;
        this.Auth = Auth;
        this.getUser();
        this.role = '';
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
            return "assets/images/recurso-presentacion-line.svg";
        if (entry == "Video")
			return "assets/images/recurso-video-line.svg";
        if (entry == "Plantilla")
			return "assets/images/recurso-video-line.svg"; 
		if (entry == "Texto")
			return "assets/images/recurso-pdf-line.svg";
		if (entry == "Imagen")
			return "assets/images/recurso-imagen-line.svg";
		if (entry == "Audio")
			return "assets/images/recurso-audio-line.svg";                  
    }

	onClickStar($event) {
		this.$scope.rate = $event.rating;
	} 

	sumfiles(files){
		return _.sumBy(files, 'size');
	}

    getUser(){
        this.Auth
            .getCurrentUser()
            .then(user => {
                this.role = user.role;
            });
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
			isPublished: '=',
			rate: '='
    },
		template: require('./resourceView.html')
	}
}