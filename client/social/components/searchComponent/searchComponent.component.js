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
	constructor($scope, $element, $state, $mdDialog,Restangular, $q,) {
		this.$scope = $scope;
		this.$element = $element;
		this.$state = $state;
        this.$mdDialog = $mdDialog;
		this.$element.addClass('search-component');
		this.Restangular = Restangular;
		this.$q = $q;
		this.propuestasTalleres= false;
		this.talleresIntensivos= false;
		this.actividadesComplementarias= false;
		this.kits= false;
		this.tutoriales= false;
		this.programas= false;
		this.herramientas= false;
		this.textoABuscar= '';
		this.PublishedsPropuestasTaller = this.Restangular.all('publishedOrientacionPedagogica');
      

	

	
	}
	onClick(e){
		e.preventDefault();
		var el = document.getElementById('dd');
		el.classList.contains('active') ? this.hideSubMenu(el) : this.showSubMenu(el);
	}

	 showSubMenu(el){
		el.classList.add('active');
		document.addEventListener('click', function onDocClick(e){
			e.preventDefault();
			if(el.contains(e.target)){
				return;
			}
			document.removeEventListener('click', onDocClick);
			this.hideSubMenu(el);
		});
	}

	 hideSubMenu(el){
		el.classList.remove('active');
	}
	

	buscar(e){

		console.log(this.propuestasTalleres + " " +
			this.talleresIntensivos + " " +
			this.actividadesComplementarias);
			this.hideSubMenu(document.getElementById('dd'));
	}
	
   


	fetchDataPropuestaTaller(){

		let def = this.$q.defer();
			  
			  let q;
			  if (this.searchText){
				  q = this.searchText
			  }
	  
			  this.PublishedsPropuestasTaller
            .getList({
                page: 1,               
                type: 'orientacionpedagogica',              
                complementarias: false,
                intensivo: false,
                sort: 'orden',
            })
            .then(data => {
                let total = data.$total;          
                let res = {
                    count: total,
                    items: data,
               //     page: this.page,
                 //   limit: this.limit
                };
    
                def.resolve(res);
            })
      
	  
			  return def.promise;
	  }


	  fetchActividadComplementarias(){

		let def = this.$q.defer();
			  
			  let q;
			  if (this.searchText){
				  q = this.searchText
			  }
	  
			  this.PublishedsPropuestasTaller
            .getList({
                page: 1,               
                type: 'orientacionpedagogica',              
                complementarias: true,
                intensivo: false,
                sort: 'orden',
            })
            .then(data => {
                let total = data.$total;          
                let res = {
                    count: total,
                    items: data,
               //     page: this.page,
                 //   limit: this.limit
                };
    
                def.resolve(res);
            })
      
	  
			  return def.promise;
	  }




	  fetchTalleresIntensivos(){

		let def = this.$q.defer();
			  
			  let q;
			  if (this.searchText){
				  q = this.searchText
			  }
	  
			  this.PublishedsPropuestasTaller
            .getList({
                page: 1,               
                type: 'orientacionpedagogica',              
                complementarias: true,
                intensivo: false,
                sort: 'orden',
            })
            .then(data => {
                let total = data.$total;          
                let res = {
                    count: total,
                    items: data,
               //     page: this.page,
                 //   limit: this.limit
                };
    
                def.resolve(res);
            })
      
	  
			  return def.promise;
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


