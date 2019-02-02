'use strict';
import KitsDisponiblesComponent from './kitsDisponibles.component';
let routes = function($stateProvider) {
    'ngInject';
    $stateProvider
      .state('social.kitsDisponibles', {
        url: '/kitsDisponibles',
        template: '<kits-disponibles></kits-disponibles>'
      });
  }
  
  export default angular.module('robotica.social.kitsDisponibles', [])
                        .config(routes)
                        .component('kitsDisponibles', {
                            template: require('./kitsDisponibles.html'),
                            controller: KitsDisponiblesComponent
                        })
                        .name;