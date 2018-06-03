'use strict';

import DashboardNoticiasComponent from './dashboardnoticias.component';

let routes = function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('curador.dashboardnoticias', {
      url: '/noticias',
      template: '<curador-dashboardnoticias></curador-dashboardnoticias>',
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

export default angular.module('robotica.curador.curadorDashboardnoticias', [])
                      .config(routes)
                      .component('curadorDashboardnoticias', {
                        template: require('./dashboardnoticias.html'),
                        controller: DashboardNoticiasComponent
                      })
                      .name;