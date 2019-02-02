'use strict';

import DashboardOrientacionPedagogicaComponent from './dashboardorientacionpedagogica.component';

let routes = function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('curador.dashboardorientacionpedagogica', {
      url: '/tablero/dashboardorientacionpedagogica',
      template: '<curador-dashboardorientacionpedagogica></curador-dashboardorientacionpedagogica>',
      authenticate: 'curador',
      params: {
        search: {
          value: '',
          squash: true
        },
        type: {
          value: '',
          squash: true
        }
      },
      reloadOnSearch: false
    });
}

export default angular.module('robotica.curador.curadorDashboardorientacionpedagogica', [])
                      .config(routes)
                      .component('curadorDashboardorientacionpedagogica', {
                        template: require('./dashboardorientacionpedagogica.html'),
                        controller: DashboardOrientacionPedagogicaComponent
                      })
                      .name;