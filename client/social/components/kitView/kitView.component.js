'use strict';

export default angular
	.module('robotica.social.components.kitView', [])
	.directive('kitView', kitView)
	.name;

class KitViewController {
	/*@ngInject*/
	constructor($scope, $element, $state, $timeout, Auth){
		this.$scope = $scope;
		this.$element = $element;
		this.$state = $state;	
        this.Auth = Auth;
        this.getUser();
		this.role = '';
		this.readOnlyRating = false;
    	this.$element.addClass('kit-card');
    
		this.editable = this.$scope.editable === true;		

		this.isPublished = this.$scope.isPublished == true;		

		this.$scope.$watch(() => { return this.$scope.resource; }, (value) => {	
			
			this.resource = this.$scope.resource;
			
			
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
}

function kitView($log){
	'ngInject';

	return {
		restrict: 'E',
		controller: KitViewController,
		controllerAs: '$ctrl',
		scope: {
			resource: '=',
			isPublished: '='
		
		},
		template: require('./kitView.html')
	}
}