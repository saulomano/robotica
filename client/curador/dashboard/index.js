'use strict';

import DashboardComponent from './dashboard.component';

let routes = function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('curador.dashboard', {
      url: '/tablero?search',
      template: '<curador-dashboard></curador-dashboard>',
      authenticate: 'curador',
      params: {
        search: {
          value: '',
          squash: true
        }
      },
      reloadOnSearch: false
    });
}

export default angular.module('robotica.curador.curadorDashboard', [])
                      .config(routes)
                      .component('curadorDashboard', {
                        template: require('./dashboard.html'),
                        controller: DashboardComponent
                      })
                      .name;