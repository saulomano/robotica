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
	constructor($scope, $element, $state, $mdDialog,Restangular,$mdMedia, $q,$stateParams) {
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
	   this.cantidadPropuestasTalleres= 0;
	   this.cantidadTalleresIntensivos= 0;
	   this.cantidadadActividadesComplementarias= 0;
	   this.cantidadTutoriales= 0;
	   this.cantidadProgramas= 0;
	   this.cantidadHerramientas= 0;
	   this.resetWaterfall;		
		this.textSearch = $stateParams.search;
		this.filter=$stateParams.filter.split(",");



		this.talleresIntensivos = this.filter.includes('talleresIntensivos');
		this.propuestasTalleres = this.filter.includes('propuestasTalleres');
		this.actividadesComplementarias = this.filter.includes('actividadesComplementarias');
		this.tutoriales = this.filter.includes('tutoriales');
		this.programas = this.filter.includes('programas');
		this.herramientas = this.filter.includes('herramientas');
		this.Published = this.Restangular.all('published');
	  

		this.$scope.$watch(() => { return $mdMedia('xs') || $mdMedia('sm'); }, (mobile) => {
			this.isMobile = mobile === true;      
		  });

		console.log($stateParams);
		console.log($scope.filter);
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
		//	this.hideSubMenu(el);
		});
	}

	 hideSubMenu(el){
		el.classList.remove('active');
	}
	

	buscar(e){

			this.hideSubMenu(document.getElementById('dd'));
			console.log(this.talleresIntensivos);
			let filtro=[];
			if (this.propuestasTalleres)
				filtro.push('propuestasTalleres');
			if (this.talleresIntensivos)
				filtro.push('talleresIntensivos');
			if (this.actividadesComplementarias)
				filtro.push('actividadesComplementarias');
			if (this.tutoriales)
				filtro.push('tutoriales');
			if (this.programas)
				filtro.push('programas');
			if (this.herramientas)
				filtro.push('herramientas');	

		
			console.log(this.textSearch );
				this.$state.go(this.$state.current, {search: this.textSearch , filter : filtro.join(",")			
				}, {reload:true});
			
	}
	
   


	fetchDataPropuestaTaller(){

		console.log('dispara');		

		let def = this.$q.defer();
				  
					let q;
					if (this.textSearch){
						q = this.textSearch
					}
			
					this.PublishedsPropuestasTaller
					.getList({
						page: 1,               
						type: 'orientacionpedagogica',              
						complementarias: false,
						intensivo: false,
						sort: 'orden',
						q:this.textSearch
					})
					.then(data => {
						let total = data.$total;          
						this.cantidadPropuestasTalleres= data.$total;
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


	  fetchProgramas(){

		console.log('dispara');		

		let def = this.$q.defer();
				  
					let q;
					if (this.textSearch){
						q = this.textSearch
					}
			
					this.Published
					.getList({
						page: 1,               
						type: 'resource',   
						subtype: 'programa',       
						q:this.textSearch
					})
					.then(data => {
						let total = data.$total;          
						this.cantidadProgramas= data.$total;
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

	  fetchHerramientas(){

		console.log('dispara');		

		let def = this.$q.defer();
				  
					let q;
					if (this.textSearch){
						q = this.textSearch
					}
			
					this.Published
					.getList({
						page: 1,               
						type: 'resource',   
						subtype: 'herramienta',       
						q:this.textSearch
					})
					.then(data => {
						let total = data.$total;          
						this.cantidadHerramientas= data.$total;
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


