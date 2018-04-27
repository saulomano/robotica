'use strict';

import LoginComponent from './login.component';

let routes = function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('app.login', {
      url: '/login?from',
      template: '<app-login></app-login>'
    });
}

export default angular.module('robotica.app.appLogin', [])
                      .config(routes)
                      .component('appLogin', {
                        template: require('./login.html'),
                        controller: LoginComponent
                      })
                      .name;