'use strict';

import HomeComponent from './home.component';
import svg from 'angular1-star-rating';

let routes = function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('social.home', {
      url: '/?seccion',
      template: '<social-home></social-home>',  
      params: {
        seccion: {
            value: null,
            dynamic: true
         }
      }
    });
}

export default angular.module('robotica.social.socialHome', [])
                      .config(routes)
                      .component('socialHome', {
                        template: require('./home.html'),
                        controller: HomeComponent
                      })
                      .name;

angular.module('myApp',['star-rating'])