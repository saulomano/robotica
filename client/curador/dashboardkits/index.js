'use strict';

import DashboardKitsComponent from './dashboardkits.component';

let routes = function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('curador.dashboardkits', {
      url: '/tablero/kits',
      template: '<curador-dashboarkits></curador-dashboarkits>',
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

export default angular.module('robotica.curador.curadorDashboarkits', [])
                      .config(routes)
                      .component('curadorDashboarkits', {
                        template: require('./dashboardkits.html'),
                        controller: DashboardKitsComponent
                      })
                      .name;