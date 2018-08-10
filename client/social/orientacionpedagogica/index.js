'use strict';
import OrientacionPedagogicaComponent from './orientacionpedagogica.component';
let routes = function($stateProvider) {
    'ngInject';
    $stateProvider
      .state('social.orientacionpedagogica', {
        url: '/orientacionpedagogica/:filter?',
        template: '<orientacionpedagogica></orientacionpedagogica>',  
        params: {
            filter: {
              value: null,
              dynamic: true
           },params: {
            value: null,
            dynamic: true
         }
        }
      });
  }
  
  export default angular.module('robotica.social.orientacionpedagogica', [])
                        .config(routes)
                        .component('orientacionpedagogica', {
                            template: require('./orientacionpedagogica.html'),
                            controller: OrientacionPedagogicaComponent
                        })
                        .name;