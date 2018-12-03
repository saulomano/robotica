'use strict';

import SocialComponent from '../../social.component';
//import angular from 'angular';

export default angular
	.module('robotica.social.components.orientacionpedagogicaView', [])
	.directive('orientacionpedagogicaView', orientacionpedagogicaView)
	.name;

class OrientacionPedagogicaViewController extends SocialComponent{
	/*@ngInject*/
	constructor($scope, $element, $state, $timeout, Auth,$mdMedia,Restangular,$mdDialog){
		super({$element});
		this.$scope = $scope;
		this.$element = $element;
		this.$state = $state;
		this.rateView = this.$scope.rate;
		this.$mdDialog = $mdDialog;
        this.Auth = Auth;
        this.getUser();
		this.role = '';
		this.readOnlyRating = false;
    	this.$element.addClass('orientacionpedagogica-card');
		this.Restangular = Restangular;
		this.editable = this.$scope.editable === true;		
		this.isMobile;
		this.isPublished = this.$scope.isPublished == true;
		this.modoVista = this.$scope.vista;		

		this.$scope.$watch(() => { return this.$scope.resource; }, (value) => {	
			
			this.resource = this.$scope.resource;
			


			if(this.resource.postBody){
				for (var i =0 ; i< this.resource.postBody.length;i++){
					this.resource.postBody[i].content = this.resource.postBody[i].content.replace(/<img/g, '<img class="responsive"');
				}
			}
			console.log(this.resource);

			$timeout(() => {
				this.$scope.$apply();
			});
		});


		this.$scope.$watch(() => { return $mdMedia('xs') }, (mobile) => {
            this.isMobile = mobile === true;    
           
		  });
		  

		
	}

	siguiente(){


	

		this.Restangular.one('publishedOrientacionPedagogica/pororden/'+this.$scope.resource.area[0]+'/'+(this.$scope.resource.orden+1))
		.get({
			anio:this.$scope.resource.anio,
			complementarias: this.$scope.resource.complementarias,
			intensivo: this.$scope.resource.intensivo
		})
		.then(data => {
			if(data && data.length > 0)
			this.$scope.resource = data[0];
		
		})
		.catch(err => {
			throw err;
		});





	}

	anterior(){


	

		this.Restangular.one('publishedOrientacionPedagogica/pororden/'+this.$scope.resource.area[0]+'/'+(this.$scope.resource.orden-1))
		.get({
			anio:this.$scope.resource.anio,
			complementarias: this.$scope.resource.complementarias,
			intensivo: this.$scope.resource.intensivo
		})
		.then(data => {
			if(data && data.length > 0)
			this.$scope.resource = data[0];
		
		})
		.catch(err => {
			throw err;
		});





	}

	sumfiles(files){
		return _.sumBy(files, 'size');
	}

    getUser(){
        this.Auth
            .getCurrentUser()
            .then(user => {
				this.role = user.role;
				if (this.role === 'user') this.readOnlyRating = true;
            });
	}
	
	getFieldClass(entry){

		if (angular.isArray(entry) && entry.length>1)
			entry= entry[0];
		
        if (entry == "Cs. Naturales")
            return "iconPed-naturales step";
        if (entry == "Matemática")
            return "iconPed-matematica step";
        if (entry == "Prácticas del Lenguaje")
            return "iconPed-lengua step";            



        return  "iconPed-"+entry +" step";

	}
	
	viewResource($event, resource, id){

		if (!this.$mdDialog)
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
	
			//this.Resource = Restangular.one('publisheds', id);
	
			this.closeDialog = function() {
				$mdDialog.hide();
			}
			this.resource = resource;
			this.loading = false;


		/*	this.Resource
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
				});*/
		}
	}

	viewResourcePedag($event, resource, id){

		if (!this.$mdDialog)
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
	
			this.Resource = Restangular.one('orientacionpedagogica', id);
	
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

function orientacionpedagogicaView($log){
	'ngInject';

	return {
		restrict: 'E',
		controller: OrientacionPedagogicaViewController,
		controllerAs: '$ctrl',
		binding: {		
			vista: '<',
		  
		   
		},
		scope: {
			resource: '=',
			isPublished: '=',
			vista: '=',
		
		},
		template: require('./orientacionpedagogicaView.html')
	}
}








