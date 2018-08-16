'use strict';
import PropuestasDeTallerComponent from './propuestasdetaller.component';
let routes = function($stateProvider) {
    'ngInject';
    $stateProvider
      .state('social.propuestasdetaller', {
        url: '/propuestasdetaller/:filter?',
        template: '<propuestasdetaller></propuestasdetaller>',  
        params: {
            params: {
            value: null,
            dynamic: true
         }
        }
      });
  }
  
  export default angular.module('robotica.social.propuestasdetaller', [])
                        .config(routes)
                        .component('propuestasdetaller', {
                            template: require('./propuestasdetaller.html'),
                            controller: PropuestasDeTallerComponent
                        })
                        .name;