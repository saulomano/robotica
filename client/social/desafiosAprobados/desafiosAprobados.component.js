'use strict';
import angular from 'angular';

export default class DesafiosAprobadosComponent {
    /*@ngInject*/
    constructor($element, $rootScope, $q, $stateParams, $state, Auth, Restangular) {
        this.$q = $q;
        this.$state = $state;
        this.$rootScope = $rootScope;
        this.page = 0;
        this.limit = 20;
        this.Auth = Auth;
        this.Restangular = Restangular;
        this.user = this.getUser();
        this.Publisheds = this.Restangular.all('publisheds');
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
                type: 'desafio'
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
