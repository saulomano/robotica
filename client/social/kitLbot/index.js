'use strict';

import KitLbotComponent from './kitLbot.component';

let routes = function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('social.kitLbot', {
      url: '/kitLbot',
      template: '<social-kit-lbot></social-kit-lbot>'
    });
}

export default angular.module('robotica.social.socialKitLbot', ['ngMaterial'])
                      .config(routes)
                      .component('socialKitLbot', {
                        template: require('./kitLbot.html'),
                        controller: KitLbotComponent
                      })
                      .name;