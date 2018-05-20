'use strict';

import VerdesafioComponent from './verdesafio.component';

let routes = function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('social.verdesafio', {
      url: '/verdesafio/:uid',
      template: '<social-verdesafio></social-verdesafio>'
    });
}

export default angular.module('robotica.social.socialVerdesafio', [])
                      .config(routes)
                      .component('socialVerdesafio', {
                        template: require('./verdesafio.html'),
                        controller: VerdesafioComponent
                      })
                      .name;