'use strict';

export default angular
	.module('robotica.social.components.orientacionpedagogicaView', [])
	.directive('orientacionpedagogicaView', orientacionpedagogicaView)
	.name;

class OrientacionPedagogicaViewController {
	/*@ngInject*/
	constructor($scope, $element, $state, $timeout, Auth){
		this.$scope = $scope;
		this.$element = $element;
		this.$state = $state;
		this.rateView = this.$scope.rate;
        this.Auth = Auth;
        this.getUser();
		this.role = '';
		this.readOnlyRating = false;
    	this.$element.addClass('orientacionpedagogica-card');
    
		this.editable = this.$scope.editable === true;		

		this.isPublished = this.$scope.isPublished == true;		

		this.$scope.$watch(() => { return this.$scope.resource; }, (value) => {	
			
			this.resource = this.$scope.resource;

			for (var i =0 ; i<= this.resource.postBody.length;i++){
				this.resource.postBody[i].content = this.resource.postBody[i].content.replace("<img", '<img class="responsive"');
			}


			$timeout(() => {
				this.$scope.$apply();
			});
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