'use strict';
import angular from 'angular';
import SocialComponent from '../social.component';

export default class VerComponent extends SocialComponent {
  /*@ngInject*/
  constructor($element, $scope, $stateParams, $timeout, Restangular, ngMeta) {
    super({$element});

    let uid = $stateParams.uid;
    this.loading = true;
    this.ngMeta = ngMeta;
    this.$scope = $scope;
    this.$timeout = $timeout;
    this.Resource = Restangular.one('publisheds', uid);

    let captions = {
      'propuesta': 'Propuesta pedagógica',
      'actividad': 'Actividad accesible',
      'herramienta': 'Herramienta',
      'orientacion': 'Orientación',
      'mediateca': 'Mediateca',
    };

    this.Resource
      .get()
      .then(data => {
        data.links = _.map(data.links, p =>{
          p.typeCaption = captions[p.type];
          return p;
        });

        this.resource = data;
        this.loading = false;

        this.ngMeta.setTitle(this.resource.title);
        this.ngMeta.setTag('description', this.resource.summary);
          
        this.Resource
        .getList('relations')
        .then(data => {
          this.resource.relations = _.map(data, p =>{
            p.typeCaption = captions[p.type];
            return p;
          });
          
          this.$timeout(() => {
            this.$scope.$apply();
          });
        })
        .catch(err => {
          throw err;
        });
      })
      .catch(err => {
        throw err;
      });
	}
	
}
