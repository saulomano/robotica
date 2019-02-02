'use strict';

import NewComponent from './new.component';

let routes = function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('social.new', {
      url: '/desafio/new',
      params: {
        desafioresolver: null, type: null
     },
     template: '<desafio-new></desafio-new>'
    });
}

export default angular.module('robotica.social.desafioNew', [])
                      .config(routes)
                      .component('desafioNew', {
                        template: require('./new.html'),
                        controller: NewComponent
                      })
                      .name;