'use strict';

import GuiaComponent from './guia.component';

let routes = function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('social.guia', {
      url: '/guia',
      template: '<social-guia></social-guia>'
    });
}

export default angular.module('robotica.social.socialGuia', [])
                      .config(routes)
                      .component('socialGuia', {
                        template: require('./guia.html'),
                        controller: GuiaComponent
                      })
                      .name;