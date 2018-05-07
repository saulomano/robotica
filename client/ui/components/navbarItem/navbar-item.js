'use strict';
import $ from 'jquery';
import { Z_DEFAULT_STRATEGY } from 'zlib';

export default angular
	.module('robotica-ui.components.navbarItem', [])
	.directive('rdNavbarItem', RdContainer)
	.name;

class RdNavbarItemController {
	/*@ngInject*/
	constructor($scope, $element, $state) {
		this.$scope = $scope;
        this.$element = $element;
        this.$state = $state;
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
    } 
    
    onClick(e, idElement) {
        if (idElement) {
            e.preventDefault();
            for (var j = 0; j < this.$scope.menuSectionsName.length; j++) {
                var el = document.getElementById("item-"+this.$scope.menuSectionsName[j]);
                // var el = this.parentNode;
                el.classList.contains('show-submenu') ? this.hideSubMenu(el) : false; 
            };
            var el = document.getElementById("item-"+idElement);
            el.classList.contains('show-submenu') ? this.hideSubMenu(el) : this.showSubMenu(el);
        } else {
            for (var j = 0; j < arraySectionsName.length; j++) {
                var el = document.getElementById("item-"+this.$scope.menuSectionsName[j]);
                // var el = this.parentNode;
                el.classList.contains('show-submenu') ? this.hideSubMenu(el) : false; 
            };
        }
    }

    showSubMenu(el) {
        el.classList.add('show-submenu');
        document.addEventListener('click', function onDocClick(e){
            e.preventDefault();
            if(el.contains(e.target)){
                return;
            }
            document.removeEventListener('click', onDocClick);
            this.onClick(false, false);
        });
    }

    hideSubMenu(el) {
        el.classList.remove('show-submenu');
        return;
    }

    itemClicked(item, event) {
        if (this.selected === item.section) return;
        let host = window.location.host;
        let protocol = window.location.protocol;
        if (item.action) {
            this.selected = item.action;
            window.location.href = `${protocol}//${host}/${item.action}`;
        } else {
            if (event) {
                this.onClick(event, item.section);
            } else {
                return;
            };
        }
        // this.$state.go('.', { seccion: item.section });
        // this.selected = item.section;
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
            menuSectionsName: '=',
			ngModel: '=',
			selected: '=navbarItemSelected'
		},
		template: require('./navbar-item.html')
	}
}