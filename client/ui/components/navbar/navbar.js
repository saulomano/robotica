'use strict';

import $ from 'jquery';

const HIEGHT_BREACKPOINT = 100;

export default angular
	.module('robotica-ui.components.navbar', [])
	.directive('rdNavbar', RdNavbar)
	.name;

class RdNavbarController {
	/*@ngInject*/
	constructor($scope, $element, $window, $mdMedia, $timeout){
		this.$scope = $scope;
    this.$element = $element;
    this.$timeout = $timeout;

    this.$element.addClass('rd-navbar md-whiteframe-4dp');

    this.$scope.$watch(() => { return $mdMedia('xs') || $mdMedia('sm'); }, (mobile) => {
    	this.isMobile = mobile === true;
    });

		let clsScrolled = 'rd-navbar--scrolled';
		this.isCompact = this.$scope.rdCompact;
		this.$scope.$watch(() => { return this.$scope.rdCompact; }, (rdCompact) => {
			this.isCompact = this.$scope.rdCompact;
			if (this.isCompact) {
				this.$element.addClass(clsScrolled);
			}	
    });
		if (this.isCompact) {
			this.$element.addClass(clsScrolled);
		}

    $(document).ready(() => {
		  var scrollTop = 0;
		  $(window).scroll(() => {
		    scrollTop = $(window).scrollTop();
		    if (scrollTop >= HIEGHT_BREACKPOINT) {
		      this.$element.addClass(clsScrolled);
		    } else if (scrollTop < HIEGHT_BREACKPOINT) {
					if (!this.isCompact){
						this.$element.removeClass(clsScrolled);
					}
		    } 

		    this.removeDropdown();
		  }); 

		  $(document).click(() => {
		  	this.removeDropdown();
		  });
		});

		// the dropdown
		this.dropdownOpened = false;
		this.toggleDropdown = ($event) => {
			this.dropdownOpened = !this.dropdownOpened;
			$event.stopPropagation();
		};

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

	removeDropdown(){
		// remove the dropdown
    if (this.dropdownOpened) {
    	this.dropdownOpened = false;
    	this.$timeout(() => {
    		//this.$apply();
    	});
    }
	}

    myFunction() {
        var x = document.getElementById("myTopnav");
        if (x.className === "nav") {
            x.className += " responsive";
        } else {
            x.className = "nav";
        }
    }
}

function RdNavbar($window){
	'ngInject';

	return {
		restrict: 'E',
		controller: RdNavbarController,
		controllerAs: '$rdNavbarController',
		scope: {
			rdCompact: '='
		},
		transclude: {
			'items': 'rdNavbarNavigation',
			'tools': 'rdNavbarTools',
			'brand': 'rdNavbarBrand',
			'body': '?rdNavbarBody',
			'profile': '?rdNavbarProfile'
		},
		template: require('./navbar.html')
	}
}