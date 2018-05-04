'use strict';

export default angular
	.module('robotica-ui.components.navbarItem', [])
	.directive('rdNavbarItem', RdContainer)
	.name;

class RdNavbarItemController {
	/*@ngInject*/
	constructor($scope, $element) {
		this.$scope = $scope;
        this.$element = $element;
        this.parentNode = this.parentNode;
        // has a model?
        this.model = this.$scope.ngModel;
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

        [].slice.call(document.querySelectorAll('.dropdown .nav-link')).forEach(function(el){
            el.addEventListener('mouseover', onClick, false);
        });

        function onClick(e){
            e.preventDefault();
            var el = this.parentNode;
            el.classList.contains('show-submenu') ? hideSubMenu(el) : showSubMenu(el);
        }

        function showSubMenu(el){
            el.classList.add('show-submenu');
            document.addEventListener('mouseover', function onDocClick(e){
                e.preventDefault();
                if(el.contains(e.target)){
                    return;
                }
                document.removeEventListener('mouseover', onDocClick);
                hideSubMenu(el);
            });
        }

        function hideSubMenu(el){
            el.classList.remove('show-submenu');
        }
	}

    itemClicked(item) {
        if (this.selected === item.section){
            return;
        }
        this.$state.go('.', { seccion: item.section });
        this.selected = item.section;
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