'use strict';
import angular from 'angular';
import CuradorComponent from '../curador.component';
import _ from 'lodash';
import async from 'async';

export default class NewComponent extends CuradorComponent {
  /*@ngInject*/
  constructor($element, $state, $stateParams, $timeout, Auth, Restangular, $log) {
    super({$element, $log});
    this.$timeout = $timeout;
    this.$state = $state;
    this.Restangular = Restangular;
    this.Auth = Auth;

    let types = /^(noticias|calendario|herramientas|documentos|mediateca|desafios|loquehacemos|novedades|kits)$/ig;
    this.section = _.toLower($stateParams.type);

    if (!types.test(this.section)){
      this.error = `Argumento invalido ${this.section}`;
    }
  }
  
  $onInit(){
    if (this.error){
      this.$timeout(() => {
        this.$state.go('curador.dashboard');
      }, 2000);
      return;
    }
    // create the object
    this.createResource(this.section);
  }

  createResource(section) {

    let dbtypes = {
      'noticias': 'noticias',
      'calendario': 'calendario',
      'herramientas': 'herramienta',
      'documentos': 'documentos',
      'mediateca': 'mediateca',
      'desafios': 'desafio',
      'loquehacemos': 'loquehacemos',
      'novedades': 'novedades',

    };
    
    let type = dbtypes[section];
    
    this.Auth
    .getCurrentUser()
    .then(user => {
      let data = {
        type: type,
        title: '',
        summary: '',
        thumbnail: '',
        nivel: [],
        area: [],
        category: '',
        postBody: [],
        tags: [],
        owner: user._id,
        collaborators: [],
        links: [],
        files: []
      };
      let resource = this.Restangular.all('resources');
      resource
        .post(data)
        .then(data => {
          this.$state.go(`curador.recurso`, { uid: data._id });
        })
        .catch((err) => {
          this.$log.error(err)
          return this.$state.go(`curador.dashboard`);
        });
    })
    .catch((err) => {
      this.$log.error(err)
      return this.$state.go(`curador.dashboard`);
    });
  }
}
