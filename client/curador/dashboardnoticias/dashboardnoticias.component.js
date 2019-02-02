'use strict';
import angular from 'angular';
import CuradorComponent from '../curador.component';
import _ from 'lodash';

export default class DashboardNoticiasComponent extends CuradorComponent {
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

    this.Resources = this.Restangular.all('noticias');

    this.viewResource = ($event, resource) => { 
      this.viewResource_($event, resource);
    };
	let captions = {
		'noticias': 'Noticias'
	};
    this.getUser();
    ngMeta.setTitle('Noticias');
    this.searchText = $stateParams.search;

    this.$rootScope.$on('filterChange', (event, searchText) => {
      if (this.searchText !== searchText) {
        this.page = 0;
        this.searchText = searchText;
        this.$state.go('.', { search: searchText }, {notify: false});
      }
    });
  }

  	getUser(){
    	this.Auth
    		.getCurrentUser()
    		.then(user => {
      			this.user = user;
      			this.username = user.name;
    		});
	}
	  
	applyFilter(status) {
		this.$state.go(this.$state.current, {search: status}, {reload:true});
	}


  	fetchData(){
    	let def = this.$q.defer();
    	this.page++;
    	let addNewItem = {
			type: 'addnew',
			options: [				
				{ section: 'noticia', icon: 'ri ri-noticia', caption: 'Noticia' },
			 
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

				
					items = items.concat(_.filter(res, function(o) { return o.type == 'noticia' }));
				

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

		this.$state.go(`curador.noticia`, { uid: resource._id });
	}
}
