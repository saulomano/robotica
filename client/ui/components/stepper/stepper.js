'use strict';

import _ from 'lodash';

export default angular
	.module('robotica-ui.components.stepper', [])
	.directive('rdStepper', rdStepper)
	.name;

class RdStepperController {
	steps = [];

	/*@ngInject*/
	constructor($scope, $element, $timeout, Auth){
		this.$scope = $scope;
    	this.$element = $element;
		this.$timeout = $timeout;
		this.Auth = Auth;
		this.userRole = '';

		this.$element.addClass('rd-stepper');
		this.currentStepIndex_ = 0;
		this.steps = this.$scope.steps;
		this.type = this.$scope.type;
		this.getCurrentUser();

		this.$scope.$watch(() => { return this.$scope.steps }, (value) => {
			this.steps = this.$scope.steps;
		});

		this.$scope.$watch(() => { return this.currentStepIndex_ }, (value) => {
			this.releaseEnterStep(value);
		});

		this.$scope.$watch(() => { return this.$scope.initStepIndex }, (value) => {
			if (value){
				this.currentStepIndex_ = value;
				//this.releaseEnterStep(value);
			}
		});
	}

	getCurrentUser() {
		this.Auth
            .getCurrentUser()
            .then(user => {
				this.userRole = user.role;
            })
            .catch((err) => {
                this.$log.error(err)
            });
	}

	getStepByIndex_(idx) {
		if (idx >= this.steps.length){
			return undefined;
		}

		return this.steps[idx];
	}

	currentStep(){
		return this.getStepByIndex_(this.currentStepIndex_);
	}

	currentStepName(){
		return this.currentStep().name;
	}

	stepStatus(step){
		let idx = _.findIndex(this.steps, { 'name': step.name });

		if (idx > this.currentStepIndex_){
			return 'none';
		}
		
		return idx < this.currentStepIndex_ ? 'completed' : 'editing';
	}

	next(){
		this.currentStep().error = undefined;
		
		let canNextFn = this.$scope.canNext;
		if (typeof canNextFn === 'function'){
			if (!canNextFn(this.currentStep())){
				let st = this.currentStep();
				st.error = true;
				return;
			}
		}

		this.currentStepIndex_++;
	}

	back(){
		this.currentStepIndex_--;
	}

	toRefuse($event) {
		let toRefuseFn = this.$scope.onToRefuse;
		if (typeof toRefuseFn === 'function') {
			toRefuseFn($event); 
		}
	}

	cancel($event) {
		let onCancelFn = this.$scope.onCancel;
		if (typeof onCancelFn === 'function') {
			onCancelFn($event);
		}
	}

	finish($event){
		let finishFn = this.$scope.onFinish;
		if (typeof finishFn === 'function'){
			finishFn($event);
		}
	}

	showNext(){
		return this.currentStepIndex_ < (this.steps.length-1);
	}

	canBack(){
		return this.currentStepIndex_ > 0;
	}

	releaseEnterStep(idx){
		let onEnterStepFn = this.$scope.onEnterStep;
		if (typeof onEnterStepFn === 'function'){
			onEnterStepFn(this.getStepByIndex_(idx));
		}
	}

	goToStep(idx){
		//if (idx < this.currentStepIndex_){
			this.currentStepIndex_ = idx;
		//}
	}

	releaseSave(button){
		let onSaveFn = this.$scope.onSave;
		if (typeof onSaveFn === 'function'){
			onSaveFn(button);
		}
	}
}

function rdStepper($log){
	'ngInject';

	return {
		restrict: 'E',
		controller: RdStepperController,
		controllerAs: '$rdStepperController',
		scope: {
			canNext: '=',
			onToRefuse: '=',
			onFinish: '=',
			onEnterStep: '=',
			onSave: '=',
			onCancel: '=',
			autoSave: '=',
			ngModel: '=',
			initStepIndex: '=',
			steps: '=',
			type:'=',
			

		},
		template: require('./stepper.html')
	}
}