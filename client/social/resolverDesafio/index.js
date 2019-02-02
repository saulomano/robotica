'use strict';

import ResolverDesafioComponent from './resolverDesafio.component';

let routes = function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('social.resolverDesafio', {
      url: '/resolverDesafio/:uid/:action?',
      template: '<resolver-desafio></resolver-desafio>'
    });
}

export default angular.module('robotica.social.resolverDesafio', [])
                      .config(routes)
                      .component('resolverDesafio', {
                        template: require('./resolverDesafio.html'),
                        controller: ResolverDesafioComponent
                      })
                      .name;