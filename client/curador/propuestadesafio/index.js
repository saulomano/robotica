'use strict';

import PropuestaDesafioComponent from './propuestadesafio.component';

let routes = function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('curador.propuestadesafio', {
      url: '/tablero/propuestadesafio/:uid/:action?',
      template: '<curador-propuestadesafio></curador-propuestadesafio>'
    });
}

export default angular.module('robotica.curador.curadorPropuestaDesafio', [])
                      .config(routes)
                      .component('curadorPropuestaDesafio', {
                        template: require('./propuestadesafio.html'),
                        controller: PropuestaDesafioComponent
                      })
                      .name;