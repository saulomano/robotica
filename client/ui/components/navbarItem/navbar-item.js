'use strict';

export default angular
	.module('robotica-ui.components.navbarItem', [])
	.directive('rdNavbarItem', RdContainer)
	.name;

class RdNavbarItemController {
	/*@ngInject*/
	constructor($scope, $element){
		this.$scope = $scope;
    this.$element = $element;
    // has a model?
    let m = this.$scope.ngModel;
		if (m && typeof m === 'object') {
			//replace the scope;
			this.icon = m.icon;
			this.caption = m.caption;
			this.section = m.section;
		} else {
			this.icon = this.$scope.icon;
			this.caption = this.$scope.caption;
		}

    this.$element.addClass('rd-navbar__item');
		this.$element.attr('data-rd-section', this.section);
		
		//this.$element.attr('role', 'menuitem');

    this.$scope.$watch(() => { return this.$scope.selected }, (value) => {
    	if (value) {
    		this.$element.addClass('rd-navbar__item--selected');
    	} else {
    		this.$element.removeClass('rd-navbar__item--selected')
    	}
    });
	}
}

function RdContainer(){
	'ngInject';

	return {
		restrict: 'E',
		controller: RdNavbarItemController,
		controllerAs: '$rdNavbarItemCtrl',
		scope: {
			icon: '@navbarItemIcon',
			caption: '@navbarItemCaption',
			section: '@navbarItemSection',
			ngModel: '=',
			selected: '=navbarItemSelected'
		},
		template: require('./navbar-item.html')
	}
}