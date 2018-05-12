'use strict';

import DesafioComponent from './desafio.component';

let routes = function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('social.desafio', {
      url: 'desafio/:uid/:action?',
      template: '<social-desafio></social-desafio>'
    });
}

export default angular.module('robotica.social.socialDesafio', [])
                      .config(routes)
                      .component('socialDesafio', {
                        template: require('./desafio.html'),
                        controller: ResourceComponent
                      })
                      .name;