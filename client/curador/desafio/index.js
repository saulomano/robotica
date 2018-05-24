'use strict';

import DesafioComponent from './desafio.component';

let routes = function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('curador.desafio', {
      url: '/tablero/desafio/:uid/:action?',
      template: '<curador-desafio></curador-desafio>'
    });
}

export default angular.module('robotica.curador.curadordesafio', [])
                      .config(routes)
                      .component('curadordesafioss', {
                        template: require('./desafio.html'),
                        controller: DesafioComponent
                      })
                      .name;