'use strict';

export default angular
	.module('robotica.social.components.orientacionpedagogicaView', [])
	.directive('orientacionpedagogicaView', orientacionpedagogicaView)
	.name;

class OrientacionPedagogicaViewController {
	/*@ngInject*/
	constructor($scope, $element, $state, $timeout, Auth,$mdMedia,Restangular){
		this.$scope = $scope;
		this.$element = $element;
		this.$state = $state;
		this.rateView = this.$scope.rate;
        this.Auth = Auth;
        this.getUser();
		this.role = '';
		this.readOnlyRating = false;
    	this.$element.addClass('orientacionpedagogica-card');
		this.Restangular = Restangular;
		this.editable = this.$scope.editable === true;		
		this.isMobile;
		this.isPublished = this.$scope.isPublished == true;		

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
        if (entry == "Cs. Naturales")
            return "iconPed-naturales step";
        if (entry == "Matemática")
            return "iconPed-matematica step";
        if (entry == "Prácticas del Lenguaje")
            return "iconPed-lengua step";            



        return  "iconPed-"+entry +" step";

    }
}

function orientacionpedagogicaView($log){
	'ngInject';

	return {
		restrict: 'E',
		controller: OrientacionPedagogicaViewController,
		controllerAs: '$ctrl',
		scope: {
			resource: '=',
			isPublished: '='
		
		},
		template: require('./orientacionpedagogicaView.html')
	}
}