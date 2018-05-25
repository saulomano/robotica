'use strict';

import DashboardDesafiosResueltosComponent from './dashboarddesafiosresueltos.component';

let routes = function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('curador.dashboarddesafiosresueltos', {
      url: '/dashboarddesafiosresueltos?search',
      template: '<curador-dashboarddesafiosresueltos></curador-dashboarddesafiosresueltos>',
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

export default angular.module('robotica.curador.curadorDashboarddesafiosresueltos', [])
                      .config(routes)
                      .component('curadorDashboarddesafiosresueltos', {
                        template: require('./dashboarddesafiosresueltos.html'),
                        controller: DashboardDesafiosResueltosComponent
                      })
                      .name;