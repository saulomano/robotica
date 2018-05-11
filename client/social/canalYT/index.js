'use strict';

import canalYTComponent from './canalYT.component';

let routes = function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('social.canalYT', {
      url: '/canalYT',
      template: '<social-canalYT></social-canalYT>'
    });
}

export default angular.module('robotica.social.canalYT', [])
                      .config(routes)
                      .component('canalYT', {
                        template: require('./canalYT.html'),
                        controller: canalYTComponent
                      })
                      .name;