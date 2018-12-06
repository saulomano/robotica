'use strict';

import KitEbotComponent from './kitEbot.component';

let routes = function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('social.kitEbot', {
      url: '/kitEbot',
      template: '<social-kit-ebot></social-kit-ebot>'
    });
}

export default angular.module('robotica.social.socialKitEbot', ['ngMaterial'])
                      .config(routes)
                      .component('socialKitEbot', {
                        template: require('./kitEbot.html'),
                        controller: KitEbotComponent
                      })
                      .name;