'use strict';
import DesafiosAprobadosComponent from './desafiosAprobados.component';
let routes = function($stateProvider) {
    'ngInject';
    $stateProvider
      .state('social.desafiosAprobados', {
        url: '/desafiosAprobados',
        template: '<desafios-aprobados></desafios-aprobados>'
      });
  }
  
  export default angular.module('robotica.social.desafiosAprobados', [])
                        .config(routes)
                        .component('desafiosAprobados', {
                            template: require('./desafiosAprobados.html'),
                            controller: DesafiosAprobadosComponent
                        })
                        .name;