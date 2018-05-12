'use strict';

import NewDesafio from './newDesafio.component';

let routes = function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('social.newDesafio', {
      url: '/desafio/new?type',
      template: '<new-desafio></curador-new>',
      authenticate: 'curador'
    });
}

export default angular.module('robotica.social.newDesafio', [])
                      .config(routes)
                      .component('newDesafio', {
                        template: require('./newDesafio.html'),
                        controller: NewDesafio
                      })
                      .name;