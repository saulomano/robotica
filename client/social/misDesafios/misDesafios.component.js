'use strict';
import angular from 'angular';

export default class MisDesafiosComponent {
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
        this.Desafios = this.Restangular.all('desafios');
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

        this.Desafios
            .getList({
                q: q,
                page: this.page,
                limit: this.limit
            })
            .then(res => {
                const items = res;
                let data = {
                    count: (res.length + 1),
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
}
