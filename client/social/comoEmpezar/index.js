'use strict';

import ComoEmpezarComponent from './comoEmpezar.component';

let routes = function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('social.comoEmpezar', {
      url: '/comoEmpezar',
      template: '<social-como-empezar></social-como-empezar>'
    });
}

export default angular.module('robotica.social.socialComoEmpezar', ['ngMaterial'])
                      .config(routes)
                      .component('socialComoEmpezar', {
                        template: require('./comoEmpezar.html'),
                        controller: ComoEmpezarComponent
                      })
                      .name;