'use strict';
import angular from 'angular';
import $ from 'jquery';

class HeaderComponent {
  /*@ngInject*/
  constructor($element, $state, $stateParams, $rootScope, Auth,$scope,$mdMedia) {
    this.selected = '';
    this.$stateParams = $stateParams;
    this.$state = $state;
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.Auth = Auth;
    this.isDisabled = false;
    this.noCache = true;
    this.selectedItem;
    this.searchText =  $stateParams.search || '';
    $scope.$mdMedia = $mdMedia;

    this.menuNavBar = [
      {
        section: 'comoEmpezar',  caption: 'Fundamentación', action:'social.comoEmpezar'
      },
      {
        section: 'enelaula',  caption: 'En el Aula',
        "nodes": [
          {
            section: 'propuestasdetaller',  caption: 'Propuestas de Talleres', action:'social.propuestasdetaller', param: 'true'
          },         

        
          {
            section: 'orientacionpedagogica',  caption: 'Talleres Intensivos', action:'social.talleresintensivos'
          },
          {
            section: 'actividadescomplementarias',  caption: 'Actividades Complementarias', action:'social.actividadescomplementarias'
          },
          
        ]
      }
,


    
      {
        section: 'kits',  caption: 'Kits', action:'social.kitsDisponibles'
      },
      {
        section: 'noticias',  caption: 'Noticias', action:'social.noticias'
      },
      {
        section: 'institucional',  caption: 'Institucional', action:'social.institucional'
        
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




    this.$scope.$watch(() => { return $mdMedia('xs') || $mdMedia('sm'); }, (mobile) => {
      this.isMobile = mobile === true;      
    });

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
