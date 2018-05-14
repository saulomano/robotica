'use strict';
import angular from 'angular';

class HeaderComponent {
  /*@ngInject*/
  constructor($element, $state, $stateParams, $rootScope) {
    this.selected = '';
    this.$stateParams = $stateParams;
    this.$state = $state;
    this.$rootScope = $rootScope;

    this.isDisabled = false;
    this.noCache = true;
    this.selectedItem;
    this.searchText =  $stateParams.search || '';

    this.menuNavBar = [
      {
        section: 'institucional',  caption: 'Institucional',
        "nodes": [
          {
            section: 'quienesSomos',  caption: 'Quienes Somos', action:'/quienesSomos.html'
          },
          {
            section: 'ultimasNoticias',  caption: 'Ultimas Noticas', action:'?seccion=ultimasNoticias'
          },
          {
            section: 'calendario',  caption: 'Calendario', action:'?seccion=calendario'
          }
        ]
      },
      {
        section: 'desafios',  caption: 'Desafios',
        "nodes": [
          {
            section: 'desafios',  caption: 'Desafios', action:'social.desafios'
          },
          {
            section: 'subiDesafio',  caption: 'Subi tu desafio', action:'social.new'
          }
        ]
      },
      {
        section: 'comunidad',  caption: 'Comunidad',
        "nodes": [
          {
            section: 'sabiasQue',  caption: 'Sabias que', action:'?seccion=desafios'
          },
          {
            section: 'queHacemos',  caption: 'Que Hacemos', action:'/subiDesafio'
          },
          {
            section: 'novedades',  caption: 'Novedades', action:'/subiDesafio'
          },
          {
            section: 'ingresaTuDesafio',  caption: 'Ingresa tu Desafio', action:'/subiDesafio'
          }
        ]
      },
      {
        section: 'recursos',  caption: 'Recursos',
        "nodes": [
          {
            section: 'documentos',  caption: 'Documentos', action:'?seccion=desafios'
          },
          {
            section: 'mediateca',  caption: 'Mediateca', action:'/subiDesafio'
          },
          {
            section: 'herramientas',  caption: 'Herramientas', action:'/subiDesafio'
          },
          {
            section: 'videos',  caption: 'Videos', action:'/canalyt'
          }
        ]
      },
      {
        section: 'kits',  caption: 'Kits', action:'?seccion=kits'
      }
    ];

    this.arraySectionsName = [];
  
    $rootScope.$on('$stateChangeSuccess', (event, toState, toParams, fromState, fromParams) => {
      this.searchText =  $stateParams.search || '';
      if (!toParams.seccion){
        this.selected = '';
      }
    });
  }

  $onInit(){
    this.selected = this.$stateParams.seccion;
    for (var j = 0; j < this.menuNavBar.length; j++) {
      this.arraySectionsName.push(this.menuNavBar[j].section);
    }
  }
  
  selectedItemChange(item){

  }

  querySearch(searchText){
    return [];
  }

  searchTextChange(searchText){
    this.$rootScope.$emit('filterHomeChange', searchText);
  }

  itemClicked(item) {
    if (!item.nodes) {
        if (this.selected === item.section){
            return;
        }
        this.$state.go('.', { seccion: item.section });
        this.selected = item.section;
    }
  }
}

export default angular.module('robotica.social.socialHeader', [])
  .component('socialHeader', {
    template: require('./header.html'),
    controller: HeaderComponent
  })
  .name;
