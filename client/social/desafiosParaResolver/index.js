'use strict';
import DesafiosParaResolverComponent from './desafiosParaResolver.component';
let routes = function($stateProvider) {
    'ngInject';
    $stateProvider
      .state('social.desafiosParaResolver', {
        url: '/desafiosParaResolver',
        template: '<desafios-aprobados></desafios-aprobados>'
      });
  }
  
  export default angular.module('robotica.social.desafiosParaResolver', [])
                        .config(routes)
                        .component('desafiosParaResolver', {
                            template: require('./desafiosParaResolver.html'),
                            controller: DesafiosParaResolverComponent
                        })
                        .name;