'use strict';

import DashboardPropuestaTallerComponent from './dashboarpropuestataller.component';

let routes = function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('curador.propuestasdetaller', {
      url: '/tablero/propuestasdetaller',
      template: '<curador-propuestasdetaller></curador-propuestasdetaller>',
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