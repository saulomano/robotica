'use strict';
import angular from 'angular';
import CuradorComponent from '../curador.component';
import _ from 'lodash';

export default class DashboardPropuestaTallerComponent extends CuradorComponent {
  /*@ngInject*/
  constructor($element, $rootScope, $q, $http, $log, $stateParams, $state, Restangular, Auth, ngMeta) {
    super({$element, $log});
    this.$q = $q;
    this.$http = $http;
    this.Restangular = Restangular;
    this.$state = $state;
    this.Auth = Auth;
    this.$rootScope = $rootScope;

    this.page = 0;
    this.limit = 20;

    this.type = $stateParams.type;

    this.Resources = this.Restangular.all('propuestasTaller');

    this.viewResource = ($event, resource) => { 
      this.viewResource_($event, resource);
    };
	let captions = {
		'propuestasTaller': 'Propuestas Taller'
	};
    this.getUser();
    ngMeta.setTitle('OrientacionPedagogica');
    this.searchText = $stateParams.search;

   
  }

  	getUser(){
    	this.Auth
    		.getCurrentUser()
    		.then(user => {
      			this.user = user;
      			this.username = user.name;
    		});
	}
	  
	


  	fetchData(){
    	let def = this.$q.defer();
    	this.page++;
    	let addNewItem = {
			type: 'addnew',
			options: [				
				{ section: 'propuestataller', icon: 'ri ri-propuestasTaller', caption: 'Propuesta Taller' },
			 
			]
    	};

    
       		/*addNewItem.push( {
        		type: 'desafios',
        		options: [
          			{ section: 'aprobado', icon: 'ri ri-desafio', caption: 'Desafíos Aprobados' },
            		{ section: 'pendiente', icon: 'ri ri-desafio', caption: 'Desafíos Pendientes' },
            		{ section: 'rechazado', icon: 'ri ri-desafio', caption: 'Desafíos Rechazados' }
        		]
      		});*/
    	

    	let q;
    	if (this.searchText){
      		q = this.searchText
    	}
    
    	this.Resources
        	.getList({
          		q: q,
          		page: this.page, 
          		limit: this.limit,
          		sort: 'updatedAt',
       		})
        	.then(res => {
          		let items = [];
          		if (this.page === 1) {
            		items.push(addNewItem);
          		}

				
					items = items.concat(_.filter(res, function(o) { return o.type == 'propuestataller' }));
				

				let data = {
					count: (res.$total + 1),
					items: items,
					page: this.page,
					limit: this.limit
				};

				def.resolve(data);
			})
        	.catch(err => {
          		throw err;
       		});

    	return def.promise;
  	}
  
  	viewResource_($event, resource){
    	if (!resource){
     		return;
    	}

		this.$state.go(`curador.propuestasTaller`, { uid: resource._id });
	}
}
