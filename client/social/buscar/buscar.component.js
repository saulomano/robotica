'use strict';
import angular from 'angular';
import SocialComponent from '../social.component';
import $ from 'jquery';

export default class BuscarComponent extends SocialComponent {
  /*@ngInject*/
  constructor($element, $q, $http, Restangular, $state, $rootScope, $mdDialog, $stateParams, $timeout, $window, ngMeta) {
    super({$element});
    this.$http = $http;
    this.$q = $q;
    this.Api = Restangular;
    this.$mdDialog = $mdDialog;
    this.$stateParams = $stateParams;
    this.$state = $state;
    this.$rootScope = $rootScope;
    this.$timeout = $timeout;
    this.$window = $window;

    this.page = 0;
    this.limit = 20;

    this.sectionName = this.$stateParams.seccion || 'home';
    let sections = {
      'home': {
        caption:  '<h1><span class="font-primary-regular">Un entorno</span><br/> de educación accesible</h1> <p>definir texto</p>',
        image: '/assets/img/banner/index_image.png',
        title: 'Bienvenido',
        description: 'robotica es un entorno definir valro texto',
      },
      'propuestas': {
        caption:  '<h1><span class="font-primary-regular">Propuestas</span><br/>pedagógicas</h1> <p>Dinámicas, flexibles y transversales. Para diseñar tu clase  integrando  nuevas experiencias de aprendizaje.</p>',
        image: '/assets/img/banner/propuesta_image.png',
        title: 'Propuestas pedagógicas',
        description: 'Propuestas pedagógicas Dinámicas, flexibles y transversales. Para diseñar tu clase  integrando  nuevas experiencias de aprendizaje.',
        type: 'propuesta'
      },
      'actividades': {
        caption:  '<h1>_Actividades <br />accesibles</h1> <p>Diseñadas  para  participar , interactuar y aprender  en el aula  inclusiva.</p>',
        image: '/assets/img/banner/actividades_image.png',
        title: 'Actividades accesibles',
        description: 'Actividades accesibles diseñadas  para  participar , interactuar y aprender  en el aula  inclusiva.',
        type: 'actividad'
      },
      'herramientas': {
        caption:  '<h1>Herramientas_</h1> <p>Software para crear actividades, rampas digitales y entornos editables.</p>',
        title: 'Herramientas',
        description: 'Software para crear actividades, rampas digitales y entornos editables.',
        type: 'herramientas'
      },
      'orientaciones': {
        caption:  '<h1>_Orientaciones</h1> <p>Con tutoriales, documentos y sitios de interés  que sirven de apoyo a tus prácticas de enseñanza.</p>',
        image: '/assets/img/banner/orientaciones_image.png',
        title: 'Orientaciones',
        description: 'Orientaciones con tutoriales y documentación que sirven de apoyo para tus prácticas.',
        type: 'orientacion'
      },
      'mediateca': {
        caption: '<h1>Mediateca_</h1> <p>Recursos didácticos para mirar, leer y escuchar.</p>',
        title: 'Mediateca',
        description: 'Recursos didácticos para mirar, leer y escuchar.',
        type: 'mediateca'
      },
      'noticias': {
        caption:  '<h1>Noticias_</h1> <p>Software para crear actividades, rampas digitales y entornos editables.</p>',
        title: 'Noticias',
        description: 'Software para crear actividades, rampas digitales y entornos editables.',
        type: 'noticias'
      },
      'calendario': {
        caption:  '<h1>Calendario_</h1> <p>Software para crear actividades, rampas digitales y entornos editables.</p>',
        title: 'Calendario',
        description: 'Software para crear actividades, rampas digitales y entornos editables.',
        type: 'calendario'
      },
      'sabiasQue': {
        caption:  '<h1>Sabias Que_</h1> <p>Software para crear actividades, rampas digitales y entornos editables.</p>',
        title: 'sabiasQue',
        description: 'Software para crear actividades, rampas digitales y entornos editables.',
        type: 'sabiasQue'
      },
      'loquehacemos': {
        caption:  '<h1>lo que hacemos_</h1> <p>Software para crear actividades, rampas digitales y entornos editables.</p>',
        title: 'loquehacemos',
        description: 'Software para crear actividades, rampas digitales y entornos editables.',
        type: 'loquehacemos'
      },
      'novedades': {
        caption:  '<h1>Novedades_</h1> <p>Software para crear actividades, rampas digitales y entornos editables.</p>',
        title: 'novedades',
        description: 'Software para crear actividades, rampas digitales y entornos editables.',
        type: 'novedades'
      },
      'documentos': {
        caption:  '<h1>Documentos_</h1> <p>Software para crear actividades, rampas digitales y entornos editables.</p>',
        title: 'documentos',
        description: 'Software para crear actividades, rampas digitales y entornos editables.',
        type: 'documentos'
      },
      'kits': {
        caption:  '<h1>Kits_</h1> <p>Software para crear actividades, rampas digitales y entornos editables.</p>',
        title: 'kits',
        description: 'Software para crear actividades, rampas digitales y entornos editables.',
        type: 'kits'
      }
    };
    this.section = sections[this.sectionName];
    ngMeta.setTitle(this.section.title);
    ngMeta.setTag('description', this.section.description);

    this.searchText = $stateParams.search;
    if (this.searchText !== ''){
      ngMeta.setTitle(this.searchText);
      ngMeta.setTag('description', `Resultados de busqueda para ${this.searchText}`);
    }

    this.$rootScope.$on('filterHomeChange', (event, searchText) => {
      if (this.searchText !== searchText) {
        this.page = 0;
        this.searchText = searchText;
        this.$state.go('.', { search: searchText }, {notify: false});
        // set title
        ngMeta.setTitle(this.searchText);
        ngMeta.setTag('description', `Resultados de busqueda para ${this.searchText}`);
      }
    });
	}
  
  $onInit(){
    this.$timeout(() => {
      var element = this.$window.document.getElementById('mainSearch');
      if(element)
        element.focus();
    });
  }

  fetchData(){
    let def = this.$q.defer();

    this.page++;
    let resources = this.Api.all('publisheds');

    let q;
    if (this.searchText){
      q = this.searchText
    }

    resources
        .getList({
          q: q,
          page: this.page, 
          limit: this.limit,
          type: this.section ? this.section.type : undefined,
          sort: 'updatedAt'
        })
        .then(data => {
          let captions = {
            'propuesta': 'Propuesta pedagógica',
            'actividad': 'Actividad accesible',
            'herramientas': 'Herramienta',
            'orientacion': 'Orientación',
            'mediateca': 'Mediateca',
            'noticias': 'Noticias',
            'calendario': 'Calendario',
          };
          let total = data.$total;
          data = _.map(data, p =>{
            p.typeCaption = captions[p.type];
            return p;
          });
          
          let res = {
            count: total,
            items: data,
            page: this.page,
            limit: this.limit
          };
  
          def.resolve(res);
        })

    return def.promise;
  }

}
