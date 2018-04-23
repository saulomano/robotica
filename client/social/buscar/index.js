'use strict';

import BuscarComponent from './buscar.component';

let routes = function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('social.buscar', {
      url: '/buscar/:search',
      template: '<social-buscar></social-buscar>',
      params: {
        search: {
          value: '',
          squash: true
        }
      },
      reloadOnSearch: false
    });
}

export default angular.module('robotica.social.socialBuscar', [])
                      .config(routes)
                      .component('socialBuscar', {
                        template: require('./buscar.html'),
                        controller: BuscarComponent
                      })
                      .name;