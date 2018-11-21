'use strict';
import angular from 'angular';
import SocialComponent from '../social.component';

export default class VerComponent extends SocialComponent {
  /*@ngInject*/
  constructor($element, $scope, $stateParams, $timeout, Restangular, ngMeta) {
    super({$element});
    let type = $stateParams.type;
    let uid = $stateParams.uid;
    this.loading = true;
    this.ngMeta = ngMeta;
    this.$scope = $scope;
    this.$timeout = $timeout;





    if (type==='kit'){
      this.Resource = Restangular.one('publishedkits', uid);
    }else if (type==='noticia'){
      this.Resource = Restangular.one('publishednoticia', uid);
    }else if (type==='resource'){
      this.Resource = Restangular.one('publisheds', uid);
    }else{
      this.Resource = Restangular.one('publishedOrientacionPedagogica', uid);
    }



    let captions = {
      'kit': 'Kit',
      'noticia' : 'Noticia',
      'orientacionpedagogica': 'OrientacionPedagogica',
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
/*
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
        });*/
      })
      .catch(err => {
        throw err;
      });
	}
	
}
