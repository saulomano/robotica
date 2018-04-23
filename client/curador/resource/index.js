'use strict';

import ResourceComponent from './resource.component';

let routes = function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('curador.recurso', {
      url: '/tablero/recurso/:uid/:action?',
      template: '<curador-resource></curador-resource>'
    });
}

export default angular.module('robotica.curador.curadorResource', [])
                      .config(routes)
                      .component('curadorResource', {
                        template: require('./resource.html'),
                        controller: ResourceComponent
                      })
                      .name;