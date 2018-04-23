'use strict';

import VerComponent from './ver.component';

let routes = function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('social.ver', {
      url: '/ver/:uid',
      template: '<social-ver></social-ver>'
    });
}

export default angular.module('robotica.social.socialVer', [])
                      .config(routes)
                      .component('socialVer', {
                        template: require('./ver.html'),
                        controller: VerComponent
                      })
                      .name;