'use strict';

export default angular
	.module('robotica.social.components.noticiaView', [])
	.directive('noticiaView', noticiaView)
	.name;

class NoticiaViewController {
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
    	this.$element.addClass('noticia-card');
    
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

function noticiaView($log){
	'ngInject';

	return {
		restrict: 'E',
		controller: NoticiaViewController,
		controllerAs: '$ctrl',
		scope: {
			desafio: '=',
			isPublished: '='
		
		},
		template: require('./noticiaView.html')
	}
}