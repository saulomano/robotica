'use strict';
import angular from 'angular';
import $ from 'jquery';

class HeaderComponent {
  /*@ngInject*/
  constructor($element, $state, $stateParams, $rootScope, Auth) {
    this.selected = '';
    this.$stateParams = $stateParams;
    this.$state = $state;
    this.$rootScope = $rootScope;

    this.Auth = Auth;
    this.isDisabled = false;
    this.noCache = true;
    this.selectedItem;
    this.searchText =  $stateParams.search || '';

    this.menuNavBar = [
      {
        section: 'institucional',  caption: 'Institucional',
        "nodes": [
          {
            section: 'quienesSomos',  caption: 'Quienes Somos', action:'social.institucional'
          },
          {
            section: 'noticias',  caption: 'Ultimas Noticas', action:'?seccion=noticias'
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
            section: 'desafiosParaResolver',  caption: 'Desafios para resolver', action:'social.desafiosParaResolver'
          },
          {
            section: 'subiDesafio',  caption: 'Subi tu desafio', action:'social.new'
          },
          {
            section: 'desafios',  caption: 'Mis desafios', action:'social.misDesafios'
          },
          {
            section: 'desafiosAprobados', caption: 'Desafios', action:'social.desafiosAprobados'
          }
        ]
      },
      {
        section: 'comunidad',  caption: 'Comunidad',
        "nodes": [
          {
            section: 'sabiasQue',  caption: 'Sabias que', action:'?seccion=sabiasQue'
          },
          {
            section: 'loquehacemos',  caption: 'Que Hacemos', action:'?seccion=loquehacemos'
          },
          {               
            section: 'novedades',  caption: 'Novedades', action:'?seccion=novedades'
          }
        ]
      },
      {
        section: 'recursos',  caption: 'Recursos',
        "nodes": [
          {
            section: 'documentos',  caption: 'Documentos', action:'?seccion=documentos'
          },
          {
            section: 'mediateca',  caption: 'Mediateca', action:'?seccion=mediateca'
          },
          {
            section: 'herramientas',  caption: 'Herramientas', action:'?seccion=herramientas'
          },
          {
            section: 'videos',  caption: 'Videos', action:'social.canalyt'
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

    
    this.getUser();
    this.handleClickOnWindow();
  }

  handleClickOnWindow() {
    $(window).click(() => {
      
    });
  }

  getUser(){
    this.Auth
      .getCurrentUser()
      .then(user => {
        this.user = user;
      })
      .catch(err => {
        throw err;
      });
  }

  toggleProfile($event){
    this.showingDropdown = !this.showingDropdown;
    $event.stopPropagation();
  }

  logout(){
    this.Auth.logout();
    this.$state.go('app.login');
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
