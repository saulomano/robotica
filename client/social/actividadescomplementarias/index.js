'use strict';
import ActividadesComplementariasComponent from './actividadescomplementarias.component';
let routes = function($stateProvider) {
    'ngInject';
    $stateProvider
      .state('social.actividadescomplementarias', {
        url: '/actividadescomplementarias/:filter?',
        template: '<actividadescomplementarias></actividadescomplementariasa>',  
        params: {
            filter: {
              value: null,
              dynamic: true
           },params: {
            value: null,
            dynamic: true
         }
        }
      });
  }
  
  export default angular.module('robotica.social.actividadescomplementarias', [])
                        .config(routes)
                        .component('actividadescomplementarias', {
                            template: require('./actividadescomplementarias.html'),
                            controller: ActividadesComplementariasComponent
                        })
                        .name;