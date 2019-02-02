'use strict';

import OrientacionPedagogicaComponent from './orientacionpedagogica.component';

let routes = function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('curador.orientacionpedagogica', {
      url: '/tablero/orientacionpedagogica/:uid/:action?',
      template: '<curador-orientacionpedagogica></curador-orientacionpedagogica>'
    });
}

export default angular.module('robotica.curador.orientacionpedagogica', [])
                      .config(routes)
                      .component('curadorOrientacionpedagogica', {
                       template: require('./orientacionpedagogica.html'),
              
                        controller: OrientacionPedagogicaComponent
                      })
                      .name;