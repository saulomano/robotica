'use strict';

import $ from 'jquery';
import _ from 'lodash';

export default angular
	.module('robotica-ui.components.pdf', [])
	.directive('rdPdf', rdPdf)
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
	  maxFiles: 1,
	  clickable: '.dz-tumbnail-clickable',
	  maxFilesize : 1024,
	  timeout: 18000000,
      //maxFilesize : '10',
      acceptedFiles : 'application/pdf',
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
				//xhr.description = xhr.description || '';
				//this.images.push(xhr);
				this.resource.thumbnail = xhr.url;
			},
			'processing': () => {
				this.canContinue = false;
			},
			'queuecomplete': () => {
				this.canContinue = this.images.length > 0;
			}
    };
	}

	/*continuar() {
		this.editing = true;
		this.message = 'Describir imagenes';
	}*/

	cancel(){
		this.$mdDialog.hide(false);
	}

	aceptar(){
		this.$mdDialog.hide({galleryType: this.galleryType, images: this.images});
	}

	clear(){
	}
}

class RdPdfController {
	/*@ngInject*/
	constructor($scope, $element, $timeout, $mdDialog){
		this.$scope = $scope;
    this.$element = $element;
    this.$timeout = $timeout;
		this.$element.addClass('rd-pdf');
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

function rdPdf($log){
	'ngInject';

	return {
		restrict: 'E',
		controller: RdPdfController,
		controllerAs: '$rdPdfController',
		scope: {
			'modules': '=',
			'relative': '=',
			'readonly': '=',
			'onDelete': '='
		},
		template: require('./pdf.html')
	}
}