'use strict';

import DashboardPropuestaTallerComponent from './dashboarpropuestataller.component';

let routes = function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('curador.dashboarpropuestataller', {
      url: '/tablero/dashboarpropuestataller',
      template: '<curador-dashboarpropuestataller></curador-dashboarpropuestataller>',
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

export default angular.module('robotica.curador.curadorDashboarpropuestataller', [])
                      .config(routes)
                      .component('curadorDashboarpropuestataller', {
                        template: require('./dashboarpropuestataller.html'),
                        controller: DashboardPropuestaTallerComponent
                      })
                      .name;