'use strict';

import NoticiaComponent from './noticia.component';

let routes = function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('curador.noticia', {
      url: '/tablero/noticia/:uid/:action?',
      template: '<curador-noticia></curador-noticia>'
    });
}

export default angular.module('robotica.curador.noticia', [])
                      .config(routes)
                      .component('curadornoticia', {
                       template: require('./noticia.html'),
              
                        controller: NoticiaComponent
                      })
                      .name;