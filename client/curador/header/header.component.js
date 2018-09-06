'use strict';
import angular from 'angular';
import $ from 'jquery';

class CuradorHeaderComponent {
  /*@ngInject*/
  constructor($rootScope, $scope, $element, $stateParams, Auth, $state) {
    this.$scope = $scope;
    this.selected = '';
    this.Auth = Auth;
    this.$state = $state;
    this.showingDropdown = false;
    this.$rootScope = $rootScope;
this.site= 'curador';
    this.isDisabled = false;
    this.noCache = true;
    this.selectedItem;
    this.searchText =  $stateParams.search || '';
  
    this.navUser = {
        section: 'usuarios',  caption: 'Usuarios', action:'curador.users'
    };

    this.navNoticias = {
      section: 'noticias',  caption: 'Noticias', action:'curador.dashboardnoticias'
    };


    this.navPropuestaTaller = {
      section: 'propuestataller',  caption: 'Propuesta Taller', action:'curador.dashboarpropuestataller'
    };

    this.navOrientacionPedagogica = {
      section: 'orientacionpedagogica',  caption: 'Orientacion Pedagógica', action:'curador.dashboardorientacionpedagogica'
    };

    this.navKits = {
      section: 'kits',  caption: 'Kits', action:'curador.dashboardkits'
    };


    this.navDesafios = {
      section: 'desafios',  caption: 'Desafios Resueltos', action:'curador.dashboarddesafiosresueltos'
    };

    this.navDesafiosPropuestos = {
      section: 'desafiosPropuestos',  caption: 'Desafios Propuestos', action:'curador.dashboardpropuestadesafio'
    };

    this.navbarItems = [
      { section: 'propuestas', icon: 'ri ri-propuestas', caption: 'Propuestas' },
      { section: 'actividades', icon: 'ri ri-actividades', caption: 'Actividades' },
      { section: 'herramientas', icon: 'ri ri-herramienta', caption: 'Herramientas' },
      { section: 'orientaciones', icon: 'ri ri-orientaciones', caption: 'Orientaciones' },
      { section: 'mediateca', icon: 'ri ri-mediateca', caption: 'Mediateca' },
      { section: 'noticias', icon: 'ri ri-noticias', caption: 'Noticias' },
      { section: 'calendario', icon: 'ri ri-calendario', caption: 'Calendario' }
    ];

    this.getUser();

    $rootScope.$on('$stateChangeSuccess', () => {
      this.searchText =  $stateParams.search || '';
    });
  }


  searchTextChange(searchText){
    this.$rootScope.$emit('filterChange', searchText);
  }
  
  selectedItemChange(item){

  }

  querySearch(searchText){
    return [];
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
  
  itemClicked(item) {
    if (this.selected === item.section){
      return;
    }
    this.selected = item.section;
  }
    //
    // goUserModule() {
    //     // let host = window.location.host;
    //     // let protocol = window.location.protocol;
    //     // window.location.href = `${protocol}//${host}/tablero/users`;
    //     this.$state.go('curador.users');
    // }
}

export default angular.module('robotica.curador.curadorHeader', [])
  .component('curadorHeader', {
    template: require('./header.html'),
    controller: CuradorHeaderComponent
  })
  .name;
