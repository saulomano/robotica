'use strict';

import canalytComponent from './canalyt.component';



let routes = function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('social.canalyt', {
      url: '/canalyt',
      template: '<social-canalyt></social-canalyt>'
    });
}

export default angular.module('robotica.social.canalyt', [])
                      .config(routes)
                      .component('socialCanalyt', {
                        template: require('./canalyt.html'),
                        controller: canalytComponent
                      })
                      .name;