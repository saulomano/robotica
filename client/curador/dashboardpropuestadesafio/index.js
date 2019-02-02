'use strict';

import DashboardPropuestaDesafioComponent from './dashboardpropuestadesafio.component';

let routes = function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('curador.dashboardpropuestadesafio', {
      url: '/desafiosPropuestos?search',
      template: '<curador-dashboardpropuestadesafio></curador-dashboardpropuestadesafio>',
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

export default angular.module('robotica.curador.curadorDashboardpropuestadesafio', [])
                      .config(routes)
                      .component('curadorDashboardpropuestadesafio', {
                        template: require('./dashboardpropuestadesafio.html'),
                        controller: DashboardPropuestaDesafioComponent
                      })
                      .name;