'use strict';
import angular from 'angular';
import SocialComponent from '../social.component';
import _ from 'lodash';

export default class DesafiosParaResolverComponent extends SocialComponent{
    /*@ngInject*/
    constructor($element, $log, $rootScope, $q, $stateParams, $state, Auth, Restangular) {

        super({$element});
        this.$q = $q;
        this.$state = $state;
        this.$rootScope = $rootScope;
        this.page = 0;
        this.limit = 20;
        this.Auth = Auth;
        this.Restangular = Restangular;
        this.user = this.getUser();
        this.Publisheds = this.Restangular.all('publishedpropuesta');
        this.section = $stateParams.type;
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

    applyFilter(type) {
		this.$state.go(this.$state.current, {search: type}, {reload:true});
	}

    fetchData(){
        let def = this.$q.defer();
        this.page++;
        let q;
        if (this.searchText){
            q = this.searchText
        }

        this.Publisheds
            .getList({
                page: this.page, 
                limit: this.limit,
                type: 'desafiopropuesto'
            })
            .then(data => {
                let total = data.$total;
          
                let res = {
                    count: total,
                    items: data,
                    page: this.page,
                    limit: this.limit
                };
    
                def.resolve(res);
            })

        return def.promise;
    }
}
