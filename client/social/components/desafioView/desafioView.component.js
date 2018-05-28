'use strict';

export default angular
	.module('robotica.social.components.desafioView', [])
	.directive('desafioView', desafioView)
	.name;

class DesafioViewController {
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
    	this.$element.addClass('desafio-card');
    
		this.editable = this.$scope.editable === true;
		let captions = {
			'propuesta': 'Propuesta pedagógica',
			'actividad': 'Actividad accesible',
			'herramienta': 'Herramienta',
			'orientacion': 'Orientación',
			'mediateca': 'Mediateca',
		};

		this.isPublished = this.$scope.isPublished == true;

		if (this.desafio){
			this.desafio.typeCaption = captions[this.desafio.type];
		}

		this.$scope.$watch(() => { return this.$scope.desafio; }, (value) => {
			this.desafio = this.$scope.desafio;
			
			if (this.desafio){
				this.desafio.typeCaption = captions[this.desafio.type];
			}
			$timeout(() => {
				this.$scope.$apply();
			});
		});
		
	}

	onClickStar(event) {
		this.$scope.rate = event.rating;
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

function desafioView($log){
	'ngInject';

	return {
		restrict: 'E',
		controller: DesafioViewController,
		controllerAs: '$ctrl',
		scope: {
			desafio: '=',
			isPublished: '=',
			rate: '='
		},
		template: require('./desafioView.html')
	}
}