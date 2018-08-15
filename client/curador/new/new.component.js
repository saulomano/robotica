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

    let types = /^(noticia|orientacionpedagogica|kit|herramientas|documentos|mediateca|desafios|loquehacemos|novedades|kits|desafiopropuesto|propuestataller)$/ig;
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
    if (this.section==='desafiopropuesto'){      
      this.createPropuestaDesafio(this.section);
    }else if (this.section==='noticia'){
      this.createNoticia(this.section);
    }else if (this.section==='orientacionpedagogica'){
      this.createOrientacionPedagogica(this.section);
    }else if (this.section==='kit'){
      this.createKit(this.section);
    }else if (this.section==='propuestataller'){
      this.createPropuestaTaller(this.section);
    }else{
    this.createResource(this.section);
    }
  }

  createResource(section) {

    let dbtypes = {
      'noticia': 'noticia',
      'orientacionpedagogica': 'orientacionpedagogica',
      'calendario': 'calendario',
      'herramientas': 'herramienta',
      'documentos': 'documentos',
      'mediateca': 'mediateca',
      'loquehacemos': 'loquehacemos',
      'novedades': 'novedades',
      'desafiopropuesto': 'desafiopropuesto'
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


  createPropuestaDesafio(section) {

   
    this.Auth
    .getCurrentUser()
    .then(user => {
      let data = {
        type: 'desafiopropuesto',
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


      let resource = this.Restangular.all('PropuestaDesafio');
      resource
        .post(data)
        .then(data => {
          this.$state.go(`curador.propuestadesafio`, { uid: data._id });

        })
        .catch((err) => {
          this.$log.error(err)
          return this.$state.go(`curador.dashboardpropuestadesafio`);
        });
    })
    .catch((err) => {
      this.$log.error(err)
      return this.$state.go(`curador.propuestadesafio`);
    });
  }


  createNoticia(section) {

   
    this.Auth
    .getCurrentUser()
    .then(user => {
      let data = {
        type: 'noticia',
        title: '',
        summary: '',
        thumbnail: '',
        nivel: [],       
        category: '',
        postBody: [],
        tags: [],
        owner: user._id,    
        links: [],
        files: [],
        video : '',
      };


      let resource = this.Restangular.all('noticias');
      resource
        .post(data)
        .then(data => {
          this.$state.go(`curador.noticia`, { uid: data._id });

        })
        .catch((err) => {
          this.$log.error(err)
          return this.$state.go(`curador.dashboardnoticia`);
        });
    })
    .catch((err) => {
      this.$log.error(err)
      return this.$state.go(`curador.noticia`);
    });
  }

  createOrientacionPedagogica(section){

    this.Auth
    .getCurrentUser()
    .then(user => {
      let data = {
        type: 'orientacionpedagogica',
        title: '',
        summary: '',
        thumbnail: '',
        nivel: [],       
        category: '',
        postBody: [],
        tags: [],
        owner: user._id,    
        links: [],
        files: [],
        video : '',
      };


      let resource = this.Restangular.all('orientacionpedagogica');
      resource
        .post(data)
        .then(data => {
          this.$state.go(`curador.orientacionpedagogica`, { uid: data._id });

        })
        .catch((err) => {
          this.$log.error(err)
          return this.$state.go(`curador.dashboardorientacionpedagogica`);
        });
    })
    .catch((err) => {
      this.$log.error(err)
      return this.$state.go(`curador.orientacionpedagogica`);
    });

  }

  createKit(section){

    this.Auth
    .getCurrentUser()
    .then(user => {
      let data = {
        type: 'kit',
        nombre: '',
        descripcion: '',
        thumbnail: '',
        contenido: [], 
        armado: [],
        potencialidades: [],
        owner: user._id,  
        files: [],        
      };


      let resource = this.Restangular.all('kit');
      resource
        .post(data)
        .then(data => {
          this.$state.go(`curador.kit`, { uid: data._id });

        })
        .catch((err) => {
          this.$log.error(err)
          return this.$state.go(`curador.dashboardkit`);
        });
    })
    .catch((err) => {
      this.$log.error(err)
      return this.$state.go(`curador.kit`);
    });

  }


  createPropuestaTaller(section){

    this.Auth
    .getCurrentUser()
    .then(user => {
      let data = {
        type: 'propuestataller',
        titulo: '',
        descripcion: '',
        thumbnail: '',      
        
        owner: user._id,            
      };


      let resource = this.Restangular.all('propuestasTaller');
      resource
        .post(data)
        .then(data => {
          this.$state.go(`curador.propuestataller`, { uid: data._id });

        })
        .catch((err) => {
          this.$log.error(err)
          return this.$state.go(`curador.propuestataller`);
        });
    })
    .catch((err) => {
      this.$log.error(err)
      return this.$state.go(`curador.propuestataller`);
    });

  }
  


}
