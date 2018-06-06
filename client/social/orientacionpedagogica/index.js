'use strict';
import OrientacionPedagogicaComponent from './orientacionpedagogica.component';
let routes = function($stateProvider) {
    'ngInject';
    $stateProvider
      .state('social.orientacionpedagogica', {
        url: '/orientacionpedagogica',
        template: '<orientacionpedagogica></orientacionpedagogica>'
      });
  }
  
  export default angular.module('robotica.social.orientacionpedagogica', [])
                        .config(routes)
                        .component('orientacionpedagogica', {
                            template: require('./orientacionpedagogica.html'),
                            controller: OrientacionPedagogicaComponent
                        })
                        .name;