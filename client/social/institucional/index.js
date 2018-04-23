'use strict';

import InstitucionalComponent from './institucional.component';

let routes = function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('social.institucional', {
      url: '/institucional',
      template: '<social-institucional></social-institucional>'
    });
}

export default angular.module('robotica.social.socialInstitucional', [])
                      .config(routes)
                      .component('socialInstitucional', {
                        template: require('./institucional.html'),
                        controller: InstitucionalComponent
                      })
                      .name;