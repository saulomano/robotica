'use strict';

import _ from 'lodash';

export default angular
	.module('robotica-ui.components.stepper', [])
	.directive('rdStepper', rdStepper)
	.name;

class RdStepperController {
	steps = [];

	/*@ngInject*/
	constructor($scope, $element, $timeout){
		this.$scope = $scope;
    	this.$element = $element;
    	this.$timeout = $timeout;

		this.$element.addClass('rd-stepper');
		this.currentStepIndex_ = 0;
		this.steps = this.$scope.steps;

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

	releaseSave(){
		let onSaveFn = this.$scope.onSave;
		if (typeof onSaveFn === 'function'){
			onSaveFn(this.currentStep());
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
			onFinish: '=',
			onEnterStep: '=',
			onSave: '=',
			autoSave: '=',
			ngModel: '=',
			initStepIndex: '=',
			steps: '='
		},
		template: require('./stepper.html')
	}
}