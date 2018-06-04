'use strict';

class ModalViewComponent {
	/*@ngInject*/
	constructor($scope, $element, $state, $stateParams, Restangular, elementType){
		this.$scope = $scope;
		this.$element = $element;
		this.$state = $state;
		this.$stateParams = $stateParams;
		this.Restangular = Restangular;

		this.Resource = this.Restangular.one(elementType, $scope.$parent.resource._id);

		this.loading = true;
	}

	sumfiles(files){
		return _.sumBy(files, 'size');
	}

	$onInit(){
		this.Resource
			.get()
			.then(data => {
				this.resource = data;
				this.loading = false;
			})
			.catch(err => {
				throw err;
			});
	}
}


export default angular.module('robotica.social.components.modalView', [])
											.component('modalView', {
												template: require('./modalView.html'),
												controller: ModalViewComponent,
												controllerAs: '$ctrl'
											})
											.name;