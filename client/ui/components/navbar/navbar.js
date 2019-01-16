'use strict';

import $ from 'jquery';

const HIEGHT_BREACKPOINT = 100;

export default angular
	.module('robotica-ui.components.navbar', [])
	.directive('rdNavbar', RdNavbar)
	.name;

class RdNavbarController {
	/*@ngInject*/
	constructor($scope, $element, $window, $mdMedia, $timeout, $state, Auth){
		this.$scope = $scope;
    	this.$element = $element;
		this.$timeout = $timeout;
		this.$state = $state;
		this.Auth = Auth;
		this.showingDropdown = false;
		this.selected = '';
		this.navBarItems = this.$scope.rdItems;
		this.getUser();

    	this.$element.addClass('rd-navbar');

		this.$scope.$watch(() => { return $mdMedia('(max-width: 959px)')  }, (mobile) => {
			this.isMobile = mobile === true;
			if(this.isMobile) {
                this.$element.addClass(clsScrolled);
			} else {
                this.$element.removeClass(clsScrolled);
			}
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
				// if (scrollTop >= HIEGHT_BREACKPOINT) {
				// 	this.$element.addClass(clsScrolled);
				// } else if (scrollTop < HIEGHT_BREACKPOINT) {
				// 	if (!this.isCompact){
				// 		this.$element.removeClass(clsScrolled);
				// 	}
				// }
				this.removeDropdown();
			});

			$(window).resize(() => {
				this.removeDropdown();
			});

			$(document).click((e) => {
				if (e.target.classList.contains('nav-link') || e.target.classList.contains('ng-binding')) {} else {this.removeDropdown();}
			});

            [].slice.call(document.querySelectorAll('.dropdown .nav-link')).forEach(function(el){
                el.addEventListener('click', onClick, false);
            });

            function onClick(e){
                e.preventDefault();
                var el = this.parentNode;
                el.classList.contains('show-submenu') ? hideSubMenu(el) : showSubMenu(el);
            }

            function showSubMenu(el){
                el.classList.add('show-submenu');
                document.addEventListener('click', function onDocClick(e){
                    e.preventDefault();
                    if(el.contains(e.target)){
                        return;
                    }
                    document.removeEventListener('click', onDocClick);
                    hideSubMenu(el);
                });
            }

            function hideSubMenu(el){
                el.classList.remove('show-submenu');
            }
		});

		// the dropdown
		this.dropdownOpened = false;
		this.toggleDropdown = ($event) => {
			this.dropdownOpened = !this.dropdownOpened;
			$event.stopPropagation();
		};
	}

	getUser(){
		this.Auth
		  .getCurrentUser()
		  .then(user => {
			this.user = user;
		  })
		  .catch(err => {
			throw err;
		  });
	}

	toggleProfile($event){
		this.showingDropdown = !this.showingDropdown;
		$event.stopPropagation();
	}
	
	logout(){
		this.Auth.logout();
		this.$state.go('app.login');
	}

	removeDropdown(){
		// remove the dropdown
		if (this.dropdownOpened) {
			this.dropdownOpened = false;
			this.showingDropdown = false;
			this.$timeout(() => {
				//this.$apply();
			});
		}
	}


	itemClicked(item) {
     
		if (this.selected === item.action) return;
        let host = window.location.host;
		let protocol = window.location.protocol;
		let types = /^(desafios|subidesafio|desafiosaprobados)$/ig;
		console.log('cai en nav var');
		//Si es query string viene por aca sino redirige
		
		if(!item.nodes){
			if (item.action.includes("?seccion=")){
				this.$state.go('social.home', {  seccion: item.action.slice(item.action.indexOf('=')+1)   }, {reload: true});
			}else if (item.params){
				this.$state.go(item.action,{params:item.params},{reload:true});
			} else {
				this.$state.go(item.action, { type: item.section }, {reload:true});
			}
	}


    }

    // itemClicked(item) {
    //     if (this.selected === item.section) return;
    //     let host = window.location.host;
    //     let protocol = window.location.protocol;
    //     if (item.action) {
    //         this.selected = item.action;
    //         window.location.href = `${protocol}//${host}/${item.action}`;
    //     } else {
    //         return;
    //     }
    //
    //
    //     // this.$state.go('.', { seccion: item.section });
    //     // this.selected = item.section;
    // }
}

function RdNavbar($window){
	'ngInject';

	return {
		restrict: 'E',
		controller: RdNavbarController,
		controllerAs: '$rdNavbarController',
		scope: {
			rdCompact: '=',
            rdItems: '='
		},
		transclude: {
			'items': 'rdNavbarNavigation',
			'tools': '?rdNavbarTools',
			'brand': 'rdNavbarBrand',
			'body': '?rdNavbarBody',
			'profile': '?rdNavbarProfile'
		},
		template: require('./navbar.html')
	}

}