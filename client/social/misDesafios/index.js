'use strict';
import MisDesafiosComponent from './misDesafios.component';
let routes = function($stateProvider) {
    'ngInject';
    $stateProvider
      .state('social.misDesafios', {
        url: '/misDesafios',
        template: '<desafios-user></desafios-user>'
      });
  }
  
  export default angular.module('robotica.social.misDesafios', [])
                        .config(routes)
                        .component('desafiosUser', {
                          template: require('./misDesafios.html'),
                          controller: MisDesafiosComponent
                        })
                        .name;