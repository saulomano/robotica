'use strict';

import DashboardDesafiosComponent from './dashboarddesafios.component';

let routes = function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('curador.dashboarddesafios', {
      url: '/dashboarddesafios?search',
      template: '<curador-dashboarddesafios></curador-dashboarddesafios>',
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

export default angular.module('robotica.curador.curadorDashboarddesafios', [])
                      .config(routes)
                      .component('curadorDashboarddesafios', {
                        template: require('./dashboarddesafios.html'),
                        controller: DashboardDesafiosComponent
                      })
                      .name;