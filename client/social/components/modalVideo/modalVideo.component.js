'use strict';

class ModalVideoComponent {
	/*@ngInject*/
	constructor($scope, $element, $state, $stateParams,$mdMedia,  elementType){
		this.$scope = $scope;
		this.$element = $element;
		this.$state = $state;
		this.$stateParams = $stateParams;
		$scope.$mdMedia = $mdMedia;
		//this.Restangular = Restangular;
	//	this.Resource = this.Restangular.one(elementType, $scope.$parent.resource._id);

		this.loading = true;
		this.width=0;
		this.height=0;


		this.$scope.$watch(() => { return $mdMedia('xs') }, (mobile) => {

		if ( mobile === true)    {
			this.width=500;
			this.height=280;
		}else {
			this.width=854;
			this.height=480;
		}
		});
		

	
	}


	
}

export default angular.module('robotica.social.components.modalVideo', [])
											.component('modalView', {
												template: require('./modalVideo.html'),
												controller: ModalVideoComponent,
												controllerAs: '$ctrl'
											})
											.name;