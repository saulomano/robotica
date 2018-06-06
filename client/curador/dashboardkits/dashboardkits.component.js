'use strict';
import angular from 'angular';
import CuradorComponent from '../curador.component';
import _ from 'lodash';

export default class DashboardKitsComponent extends CuradorComponent {
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

    this.Resources = this.Restangular.all('kit');

    this.viewResource = ($event, resource) => { 
      this.viewResource_($event, resource);
    };
	let captions = {
		'kit': 'Kit'
	};
    this.getUser();
    ngMeta.setTitle('Kits');
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
				{ section: 'kit', icon: 'ri ri-kit', caption: 'Kit' },
			 
			]
    	};
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

				
					items = items.concat(_.filter(res, function(o) { return o.type == 'kit' }));
				

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

		this.$state.go(`curador.kit`, { uid: resource._id });
	}
}
