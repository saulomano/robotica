'use strict';

import KitTbotComponent from './kitTbot.component';

let routes = function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('social.kitTbot', {
      url: '/kitTbot',
      template: '<social-kit-tbot></social-kit-tbot>'
    });
}

export default angular.module('robotica.social.socialKitTbot', ['ngMaterial'])
                      .config(routes)
                      .component('socialKitTbot', {
                        template: require('./kitTbot.html'),
                        controller: KitTbotComponent
                      })
                      .name;