'use strict';

import UsersComponent from './users.component';

let routes = function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('admin.users', {
      url: '/admin/users',
      template: '<admin-users></admin-users>'
    });
}

export default angular.module('robotica.admin.adminUsers', [])
                      .config(routes)
                      .component('adminUsers', {
                        template: require('./users.html'),
                        controller: UsersComponent
                      })
                      .name;