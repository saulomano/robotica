'use strict';

import angular from "angular";
import _ from "lodash";
import $ from 'jquery';
export default angular
	.module('robotica.social.components.searchComponent', [])
	.directive('searchComponent', searchComponent)
	.name;

class SearchComponentController {
	/*@ngInject*/
	constructor($scope, $element, $state, $mdDialog) {
		this.$scope = $scope;
		this.$element = $element;
		this.$state = $state;
        this.$mdDialog = $mdDialog;
		this.$element.addClass('search-component');

		
	

			function onClick(e){
                e.preventDefault();
                var el = this.$window.document.getElementById('dd');
                el.classList.contains('active') ? hideSubMenu(el) : showSubMenu(el);
            }

            function showSubMenu(el){
                el.classList.add('active');
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
                el.classList.remove('active');
            }

	

	
	}

	
	
   
    

}

function searchComponent($log){
	'ngInject';

	return {
		restrict: 'E',
		controller: SearchComponentController,
	controllerAs: '$ctrl',
	binding: {		
		vista: '<'
	},
    scope: {
			resource: '=',			
			vista: '='
    },
		template: require('./searchComponent.html')
	}
}