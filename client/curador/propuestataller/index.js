'use strict';

import PropuestaTallerComponent from './propuestataller.component';

let routes = function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('curador.propuestataller', {
      url: '/tablero/propuestataller/:uid/:action?',
      template: '<curador-propuestataller></curador-propuestataller>'
    });
}

export default angular.module('robotica.curador.propuestataller', [])
                      .config(routes)
                      .component('curadorPropuestataller', {
                       template: require('./propuestataller.html'),
              
                        controller: PropuestaTallerComponent
                      })
                      .name;