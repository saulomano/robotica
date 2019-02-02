'use strict';
import RecursosComponent from './recursos.component';
let routes = function($stateProvider) {
    'ngInject';
    $stateProvider
      .state('social.recursos', {
        url: '/recursos/:filter?',
        template: '<recursos></recursos>',  
        params: {
            params: {
            value: null,
            dynamic: true
         }
        }
      });
  }
  
  export default angular.module('robotica.social.recursos', [])
                        .config(routes)
                        .component('recursos', {
                            template: require('./recursos.html'),
                            controller: RecursosComponent
                        })
                        .name;