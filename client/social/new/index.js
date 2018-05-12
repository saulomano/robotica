'use strict';

import NewComponent from './new.component';

let routes = function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('social.new', {
      url: '/desafio/new?type',
      template: '<desafio-new></desafio-new>',
      authenticate: 'user'
    });
}

export default angular.module('robotica.social.desafioNew', [])
                      .config(routes)
                      .component('desafioNew', {
                        template: require('./new.html'),
                        controller: NewComponent
                      })
                      .name;