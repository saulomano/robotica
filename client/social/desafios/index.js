'use strict';
import DesafiosComponent from './desafios.component';
let routes = function($stateProvider) {
    'ngInject';
    $stateProvider
      .state('social.desafios', {
        url: '/desafios',
        template: '<desafios-user></desafios-user>'
      });
  }
  
  export default angular.module('robotica.social.desafios', [])
                        .config(routes)
                        .component('desafiosUser', {
                          template: require('./desafios.html'),
                          controller: DesafiosComponent
                        })
                        .name;