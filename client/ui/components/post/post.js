'use strict';

import $ from 'jquery';
import _ from 'lodash';

export default angular
	.module('robotica-ui.components.post', [])
	.directive('rdPost', rdPost)
	.name;

class TextDialogController {
	/*@ngInject*/
	constructor($scope, $mdDialog){
		this.$scope = $scope;
		this.$mdDialog = $mdDialog;
	}

	cancel(){
		this.$mdDialog.hide(false);
	}

	aceptar(){
		this.$mdDialog.hide(true);
	}

	clear(){
		this.$scope.currentText = '';
	}
}

class MediaDialogController {
	/*@ngInject*/
	constructor($scope, $mdDialog, Util, $timeout){
		this.$scope = $scope;
		this.$mdDialog = $mdDialog;

		this.galleryType = 'image-gallery';
		this.message = 'Subir archivos';
		this.editing = false;
		this.canContinue = false;
		
		this.images = [];

    this.dzOptions = {
      url : '/upload?relative=' + this.$scope.relative,
      paramName : 'Imágen',
      //maxFilesize : '10',
      acceptedFiles : 'image/jpeg, images/jpg, image/png',
      addRemoveLinks : true,
      headers: Util.getHeaders()
    };

    this.dzCallbacks = {
      'addedfile' : (file) => {
				this.showBusyText = true;
			},
			'removedfile' : (file) => {
				_.remove(this.images, i => i._id === file.xhr.response._id);
				this.canContinue = this.images.length > 0;
      },
      'success' : (file, xhr) => {
				xhr.description = xhr.description || '';
				this.images.push(xhr);
			},
			'processing': () => {
				this.canContinue = false;
			},
			'queuecomplete': () => {
				this.canContinue = this.images.length > 0;
			}
    };
	}

	continuar() {
		this.editing = true;
		this.message = 'Describir imagenes';
	}

	cancel(){
		this.$mdDialog.hide(false);
	}

	aceptar(){
		this.$mdDialog.hide({galleryType: this.galleryType, images: this.images});
	}

	clear(){
	}
}

class RdPostController {
	/*@ngInject*/
	constructor($scope, $element, $timeout, $mdDialog){
		this.$scope = $scope;
    this.$element = $element;
    this.$timeout = $timeout;
		this.$element.addClass('rd-post');
		this.$mdDialog = $mdDialog;

		this.readonly = this.$scope.readonly == true;
		this.modules = [];
		this.relative = $scope.relative || '';
		this.$scope.currentText = '';
		this.textEditing = false;
		this.mediaEditing = false;
		this.models = {
			selected: null
		};
	}

	getModel(){
		return this.$scope.modules;
	}

	deleteModule($index){
		//this.modules.splice($index, 1);
		if (this.$scope.onDelete){
			this.$scope.onDelete($index);
		}
	}

	editModule(module){
		module.editing = true;
	}

	editedModule(module){
		module.editing = false;
	}

	addDivisor($event) {
		this.getModel().push({
			moduleType: 'divisor',
			content: '<hr />'
		});
	}

	addText(ev) {
		this.$mdDialog.show({
			controller: TextDialogController,
			scope: this.$scope,
			preserveScope: true,
      template: require('./text-dialog.tmpl.html'),
      parent: angular.element(document.body),
      targetEvent: ev,
			clickOutsideToClose: false,
			controllerAs: '$ctrl',
			fullscreen: false, // Only for -xs, -sm breakpoints.
    })
    .then((add) => {
      if (add && !this.textEditing){
				if (_.trim(this.$scope.currentText) !== ''){
					this.getModel().push({
						moduleType: 'text',
						content: this.$scope.currentText
					});
					this.$scope.currentText = '';
				}
			}
    });
	}

	addMedia(ev) {
		this.$mdDialog.show({
			controller: MediaDialogController,
			scope: this.$scope,
			preserveScope: true,
      template: require('./media-dialog.tmpl.html'),
      parent: angular.element(document.body),
      targetEvent: ev,
			clickOutsideToClose: false,
			controllerAs: '$ctrl',
			fullscreen: false, // Only for -xs, -sm breakpoints.
    })
    .then((data) => {
      if (data && !this.mediaEditing){
				let imgs = _.map(data.images, i => {
					return {
						src: i.url,
						description: i.description
					};
				});

				this.getModel().push({
					moduleType: data.galleryType,
					content: imgs
				});
			}
    });
	}


}

function rdPost($log){
	'ngInject';

	return {
		restrict: 'E',
		controller: RdPostController,
		controllerAs: '$rdPostController',
		scope: {
			'modules': '=',
			'relative': '=',
			'readonly': '=',
			'onDelete': '='
		},
		template: require('./post.html')
	}
}