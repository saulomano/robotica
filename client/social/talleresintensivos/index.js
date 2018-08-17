'use strict';
import TalleresIntensivosComponent from './talleresintensivos.component';
let routes = function($stateProvider) {
    'ngInject';
    $stateProvider
      .state('social.talleresintensivos', {
        url: '/talleresintensivos/:filter?',
        template: '<talleresintensivos></talleresintensivos>',  
        params: {
            params: {
            value: null,
            dynamic: true
         }
        }
      });
  }
  
  export default angular.module('robotica.social.talleresintensivos', [])
                        .config(routes)
                        .component('talleresintensivos', {
                            template: require('./talleresintensivos.html'),
                            controller: TalleresIntensivosComponent
                        })
                        .name;