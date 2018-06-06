'use strict';
import angular from 'angular';
import SocialComponent from '../social.component';
import _ from "lodash";


export default class OrientacionPedagogicaComponent extends SocialComponent{
    /*@ngInject*/
    constructor($element, $log, $rootScope, $q,  $stateParams, $state, Auth, Restangular,$mdDialog) {

        super({$element});
        this.$q = $q;
        this.$state = $state;
        this.$rootScope = $rootScope;
        this.page = 0;
        this.limit = 20;
        this.Auth = Auth;
        this.Restangular = Restangular;
        this.user = this.getUser();
        this.Publisheds = this.Restangular.all('publishedOrientacionPedagogica');
        this.section = $stateParams.type;
        this.searchText = $stateParams.search;
        this.$mdDialog = $mdDialog;
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
                type: 'orientacionpedagogica'
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

    viewOrientacionPedagogica_($event, resource){
        this.$mdDialog.show({
            template: require('../components/modalView/modalView.html'),
            parent: angular.element(document.body),
            targetEvent: $event,
            clickOutsideToClose: true,
            fullscreen: true, // Only for -xs, -sm breakpoints.
            locals: {
                resource: resource
            },
            controller: DialogController,
            controllerAs: '$ctrl'
        })
            .then((data) => {
                console.log(data);
            }, () => {

            })
            .catch(function(res) {
                if (!(res === 'cancel' || res === 'escape key press')) {
                    throw res;
                }
            });

        function DialogController($scope, $mdDialog, resource, Restangular, $timeout) {
            'ngInject';
            this.loading = true;

            this.Resource = Restangular.one('publishedOrientacionPedagogica', resource._id);

            this.closeDialog = function() {
                $mdDialog.hide();
            }

            this.Resource
                .get()
                .then(data => {
                   

                    this.resource = data;
                    this.loading = false;
                    $timeout(() => {
                        $scope.$apply();
                    });
                })
                .catch(err => {
                    throw err;
                });
        }
    }
}
