'use strict';
import angular from 'angular';
import canalytComponent from './canalyt.component';



let routes = function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('social.canalyt', {
      url: '/canalyt',
      template: '<social-canalyt style="background: url(/assets/img/banner/fondo-videos-08.jpg);"></social-canalyt>'
    });
}

export default angular.module('robotica.social.canalyt', [])
                      .config(routes)
                      .component('socialCanalyt', {
                        template: require('./canalyt.html'),
                        controller: canalytComponent
                      })
                      .name;