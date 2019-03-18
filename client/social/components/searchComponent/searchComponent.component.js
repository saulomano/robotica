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
		this.recursos= false;		
		this.textoABuscar= '';
		this.PublishedsPropuestasTaller = this.Restangular.all('publishedOrientacionPedagogica');
	   this.cantidadBusqueda= 0;	  
	   this.resetWaterfall;		
		this.textSearch = $stateParams.search;
		this.textoBuscado = $stateParams.search;
		this.filter=$stateParams.filter.split(",");

		console.log(this.filter);

		this.talleresIntensivos = this.filter.includes('talleresIntensivos');
		this.propuestasTalleres = this.filter.includes('propuestasTalleres');
		this.actividadesComplementarias = this.filter.includes('actividadesComplementarias');
		this.recursos = this.filter.includes('recursos');

		this.talleresIntensivosExecute = false;
		this.propuestasTalleresExecute = false;
		this.actividadesComplementariasExecute = false;
		this.recursosExecute = false;
		this.finishSearch = false;
		this.Publisheds = this.Restangular.all('publisheds');

		this.$scope.$watch(() => { return $mdMedia('xs') || $mdMedia('sm'); }, (mobile) => {
			this.isMobile = mobile === true;      
		  });

		console.log($stateParams);
		console.log($scope.filter);



	
		
	}


	



	setExceuteVisible(){
		console.log(' this.talleresIntensivosExecute ' + this.talleresIntensivosExecute);

		if(!this.filter.includes('talleresIntensivos'))
		this.talleresIntensivosExecute = true;
	if(!this.filter.includes('propuestasTalleres'))
		this.propuestasTalleresExecute = true;
	if (!this.filter.includes('actividadesComplementarias'))
		this.actividadesComplementariasExecute = true;
	if (! this.filter.includes('recursos'))
		this.recursosExecute = true;



this.finishSearch = ( this.talleresIntensivosExecute && this.propuestasTalleresExecute
	&& this.actividadesComplementariasExecute && this.recursosExecute); 
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
		});
	}

	 hideSubMenu(el){
		el.classList.remove('active');
	}
	

	buscar(e){


			 if (this.searchText==='')
			    return;
			 
			this.hideSubMenu(document.getElementById('dd'));
			let filtro=[];

			if (this.propuestasTalleres || this.talleresIntensivos ||
				this.actividadesComplementarias || this.recursos ) {
			if (this.propuestasTalleres)
				filtro.push('propuestasTalleres');
			if (this.talleresIntensivos)
				filtro.push('talleresIntensivos');
			if (this.actividadesComplementarias)
				filtro.push('actividadesComplementarias');
			if (this.recursos)
				filtro.push('recursos');
			}else{
				filtro.push('propuestasTalleres');
				filtro.push('talleresIntensivos');
				filtro.push('actividadesComplementarias');
				filtro.push('recursos');
			}
		
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
						this.cantidadBusqueda+= data.$total;
						let res = {
							count: total,
							items: data,
					//     page: this.page,
						//   limit: this.limit
						};
						this.propuestasTalleresExecute = true;
						this.setExceuteVisible();
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
				q:this.textSearch
            })
            .then(data => {
				
				let total = data.$total;    
				this.cantidadBusqueda+=total;      
                let res = {
                    count: total,
                    items: data,
               //     page: this.page,
                 //   limit: this.limit
                };
				this.actividadesComplementariasExecute = true;
				this.setExceuteVisible();
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
				q:this.textSearch
            })
            .then(data => {
				let total = data.$total;   
				this.cantidadBusqueda+=total;       
                let res = {
                    count: total,
                    items: data,
               //     page: this.page,
                 //   limit: this.limit
                };
	
				this.talleresIntensivosExecute=true;
				this.setExceuteVisible();

                def.resolve(res);
            })
      
	  
			  return def.promise;
	  }


	  fetchRecursos(){

		console.log('dispara');		

		let def = this.$q.defer();
				  
					let q;
					if (this.textSearch){
						q = this.textSearch
					}
			
					this.Publisheds
					.getList({
						page: 1,               
						type: 'resource',   
						q:this.textSearch
					})
					.then(data => {
						let total = data.$total;          
						this.cantidadBusqueda+= data.$total;
						let res = {
							count: total,
							items: data,
					//     page: this.page,
						//   limit: this.limit
						};
						this.recursosExecute = true;
						this.setExceuteVisible();
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


