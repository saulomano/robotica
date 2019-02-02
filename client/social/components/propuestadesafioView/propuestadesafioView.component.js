'use strict';

export default angular
	.module('robotica.social.components.propuestadesafioView', [])
	.directive('propuestadesafioView', propuestadesafioView)
	.name;

class propuestadesafioViewController {
	/*@ngInject*/
	constructor($scope, $element, $state, $timeout, Auth){
		this.$scope = $scope;
		this.$element = $element;
		this.$state = $state;
		this.rateView = this.$scope.rate;
        this.Auth = Auth;
        this.getUser();
        this.role = '';
    	this.$element.addClass('propuestadesafio-card');
    
		this.editable = this.$scope.editable === true;
		
		this.isPublished = this.$scope.isPublished == true;
		let captions = {
			'desafiopropuesto': 'Desafio Propuesto',
		
		};


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

function propuestadesafioView($log){
	'ngInject';

	return {
		restrict: 'E',
		controller: propuestadesafioViewController,
    controllerAs: '$ctrl',
    scope: {
			resource: '=',
			isPublished: '=',
			rate: '='
    },
		template: require('./propuestadesafioView.html')
	}
}