'use strict';
import NoticiasComponent from './noticias.component';
let routes = function($stateProvider) {
    'ngInject';
    $stateProvider
      .state('social.noticias', {
        url: '/noticias',
        template: '<noticias></noticias>'
      });
  }
  
  export default angular.module('robotica.social.noticias', [])
                        .config(routes)
                        .component('noticias', {
                            template: require('./noticias.html'),
                            controller: NoticiasComponent
                        })
                        .name;