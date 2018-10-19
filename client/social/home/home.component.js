'use strict';

import angular from 'angular';
import SocialComponent from '../social.component';
import _ from 'lodash';

export default class HomeComponent extends SocialComponent {
  /*@ngInject*/
  constructor($element, $q, $http, Restangular, $mdDialog, $stateParams, ngMeta,$state,$location,$interval,$mdMedia) {
    super({$element});
    this.$http = $http;
    this.$q = $q;
    this.Restangular = Restangular;
    this.$mdDialog = $mdDialog;
    this.$stateParams = $stateParams;
    this.Publisheds = this.Restangular.all('publishedOrientacionPedagogica');
    this.Publishedskits = this.Restangular.all('publishedkits');
    this.PublishedsNoticias = this.Restangular.all('publishednoticia');
    this.$state = $state;
    this.page = 0;
    this.limit = 20;
    this.$location=$location;
 
    //this.viewResource = ($event, resource) => { 
    //  this.viewResource_($event, resource);
    //};
this.$interval = $interval;
        ngMeta.setTitle("Home");
    

    this.puntaje = 5;

    this.slides = [      
      {
        titulo: "Robótica Educativa", 
        titulo3:"en la provincia",    
        texto:"Llega el Plan Provincial de Robótica Educativa a las escuelas primarias de la Provincia de Buenos Aires",    
        url: "/assets/img/banner/banner-video2.jpg",
        textoboton:"VER VIDEO",        
        tipo: "video",
        vid: 2
      },
      {
        titulo: "Robótica y plástica",
        //titulo2:"y plástica",      
        texto:"Alumnos marplatenses diseñaron y crearon sus propios robots",       
        url: "/assets/img/banner/slider_1.jpg",
       textoboton:"VER NOTA",
        seccion:"social.noticias" ,
        tipo: "link"
        
      },
      {
        titulo: "Actividades complementarias",
        //titulo2:"complementarias",
        titulo3:"para el aula",
        texto:"Actividades diseñadas para que los docentes puedan desarrollar junto a los alumnos sin contar con la presencia de los talleristas. ",      
        url: "/assets/img/banner/slider_2.jpg",
        textoboton:"VER ACTIVIDADES",
        seccion:"social.actividadescomplementarias",
        tipo: "link"
      },
      {
        titulo: "Talleres", 
        titulo3:"para el aula",
        texto:"Encuentra PROPUESTAS DE TALLERES pensados para que docentes y talleristas aborden la robótica aplicando pensamiento computacional y programación.",    
        url: "/assets/img/banner/slider_3.jpg",
        textoboton:"VER TALLERES",
        seccion:"social.propuestasdetaller",
        tipo: "link"
      },  
      {
        titulo: "Experiencia", 
        titulo3:"de robótica educativa",     
        texto:"",           
        url: "/assets/img/banner/slider_4.jpg",
        textoboton:"VER VIDEO",
        seccion:"social.propuestasdetaller",
        tipo: "video",
        vid: 1
      }
    ]; 

   // this.slides = slides;
    this.currentIndex = 0;
    this.setCurrentSlideIndex = 0;
    this.isCurrentSlideIndex = 0;
    
   //this.loadSlides();

   var self = this;    

   self.runTimeoutExample = function(){
       self.$interval(function(){         
           self.nextSlide();
       }, 5000);
   }
    
   self.runTimeoutExample();


  }

 
  setCurrentSlideIndex(index) {
    this.currentIndex = index;
  }
  
   isCurrentSlideIndex(index) {
    return this.currentIndex === index;
  }
  
   nextSlide() {
    this.currentIndex = (this.currentIndex < this.slides.length - 1) ? ++this.currentIndex : 0;
   // this.loadSlides();
  }
  
  sliderClick(indice){
    this.currentIndex =indice;   
  }
  

  selectButtonSlider(event,item){

    if (item.tipo === "video"){
        this.openVideo(event,item);
    }else{
      this.$state.go(item.seccion,{reload:true});
    }


  }
 /* fetchData(){
    let def = this.$q.defer();

    this.page++;
    let resources = this.Api.all('publisheds');
    resources
        .getList({
          page: this.page, 
          limit: this.limit,
          type: this.section ? this.section.type : undefined
        })
        .then(data => {
          let captions = {
            'propuesta': 'Propuesta pedagógica',
            'actividad': 'Actividad accesible',
            'herramientas': 'Herramienta',
            'orientacion': 'Orientación',
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
  }*/

  ircomoempezar(valor){


    this.$location.url("/comoEmpezar?tab="+valor);

  }


  fetchData(){
    let def = this.$q.defer();
    this.page++;
    let q;
    if (this.searchText){
        q = this.searchText
    }

    this.Publisheds
        .getList({
            page: 1, 
            limit: 3,
            type: 'orientacionpedagogica',
            publicaHome: true          
        })
        .then(data => {
            let total = data.$total;
      
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

fetchDataNoticia(){
  let def = this.$q.defer();
        this.page++;
        let q;
        if (this.searchText){
            q = this.searchText
        }

        this.PublishedsNoticias
            .getList({
                page: 1, 
                limit: 3,
                type: 'noticia',
                publicaHome: true
            })
            .then(data => {
                let total = data.$total;
          
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

fetchDataKit(){
  let def = this.$q.defer();
  this.page++;
  let q;
  if (this.searchText){
      q = this.searchText
  }

  this.Publishedskits
      .getList({
          page: 1, 
          limit: 3,
          type: 'kit'
      })
      .then(data => {
          let total = data.$total;
    
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


openVideo($event, resource){

  if (!this.$mdDialog)
      return;

  this.$mdDialog.show({
      template: require('../components/modalVideo/modalVideo.html'),
      parent: angular.element(document.body),
      targetEvent: $event,
      clickOutsideToClose: true,
      fullscreen: true, // Only for -xs, -sm breakpoints.
      locals: {
          resource: resource
      },
      controller: DialogController,
      controllerAs: '$ctrl'
  })
      .then((data) => {
          console.log(data);
      }, () => {

      })
      .catch(function(res) {
          if (!(res === 'cancel' || res === 'escape key press')) {
              throw res;
          }
      });

  function DialogController($scope, $mdDialog, resource, Restangular, $timeout,$mdMedia) {
      'ngInject';
      this.loading = true;
      this.resource = resource;
      this.$scope =$scope;

      this.width=0;
		this.height=0;
      this.isMobile=false;


    this.$scope.$watch(() => { return $mdMedia('xs') }, (mobile) => {
      this.isMobile = mobile === true;

    });

   
		

	
  }
}


/*viewOrientacionPedagogica_($event, resource){

    if (!this.$mdDialog)
        return;

		this.$mdDialog.show({
      template: require('../components/orientacionpedagogicaView/orientacionpedagogicaView.html'),
      parent: angular.element(document.body),
      targetEvent: $event,
			clickOutsideToClose: true,
      fullscreen: true, // Only for -xs, -sm breakpoints.
      locals: {
        resource: resource
      },
      controller: DialogController,
      controllerAs: '$ctrl'
    })
    .then((data) => {
      console.log(data);
    }, () => {
      
    })
    .catch(function(res) {
      if (!(res === 'cancel' || res === 'escape key press')) {
        throw res;
      }
    });

    function DialogController($scope, $mdDialog, resource, Restangular, $timeout) {
      'ngInject';
      this.loading = true;

      this.Resource = Restangular.one('publisheds', resource._id);
      
      this.closeDialog = function() {
        $mdDialog.hide();
      }

      this.Resource
        .get()
        .then(data => {

          let captions = {
            'propuesta': 'Propuesta pedagógica',
            'actividad': 'Actividad accesible',
            'herramientas': 'Herramienta',
            'orientacion': 'Orientación',
            'mediateca': 'Mediateca',
            'noticias': 'Noticias',
            'calendario': 'Calendario'
          };

          data.links = _.map(data.links, p =>{
            p.typeCaption = captions[p.type];
            return p;
          });

          this.resource = data;
          this.loading = false;
          $timeout(() => {
            $scope.$apply();
          });
        })
        .catch(err => {
          throw err;
        });
    }
  }*/
}
