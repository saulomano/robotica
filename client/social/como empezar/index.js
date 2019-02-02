'use strict';

import ComoempezarComponent from './comoEmpezar.component';

let routes = function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('social.comoEmpezar', {
      url: '/comoEmpezar',
      template: '<social-comoEmpezar></social-comoEmpezar>'
    });
}

export default angular.module('robotica.social.socialComoempezar', [])
                      .config(routes)
                      .component('socialComoempezar', {
                        template: require('./comoEmpezar.html'),
                        controller: ComoempezarComponent
                      })
                      .name;