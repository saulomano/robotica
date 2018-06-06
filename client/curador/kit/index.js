'use strict';

import KitComponent from './kit.component';

let routes = function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('curador.kit', {
      url: '/tablero/kit/:uid/:action?',
      template: '<curador-kit></curador-kit>'
    });
}

export default angular.module('robotica.curador.kit', [])
                      .config(routes)
                      .component('curadorKit', {
                       template: require('./kit.html'),
              
                        controller: KitComponent
                      })
                      .name;