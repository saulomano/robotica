'use strict';
import angular from 'angular';
import SocialComponent from '../social.component';
import _ from "lodash";


export default class RecursosComponent extends SocialComponent{
    /*@ngInject*/
    constructor($element, $log, $rootScope, $q,  $stateParams, $state, Auth, Restangular,$mdDialog,$mdMedia,$scope,$mdBottomSheet) {

        super({$element});
        this.$q = $q;
        this.$state = $state;
        this.$rootScope = $rootScope;
        this.page = 0;
        this.limit = 20;
        this.Auth = Auth;
        this.Restangular = Restangular;
        this.user = this.getUser();
        this.$scope = $scope;
        this.$stateParams = $stateParams;
        this.section = $stateParams.type;
        this.searchText = $stateParams.search;
        this.muestraFiltroMobile= false;
      
        this.$mdDialog = $mdDialog;
       
        this.herramienta=false;
        this.materialapoyo=false;
        this.tutorial=false;
        this.ejemplos=false;
        this.experiencia=false;

        this.Video=false;
		this.Audio=false;
		this.Plantilla=false;
		this.Imágen=false;
		this.Texto=false;
		this.Presentación=false;

        $scope.$mdMedia = $mdMedia;

        this.resetWaterfall;
        this.intensivos = true;
        this.complementarias = this.$stateParams.params?  this.$stateParams.params.complementarias || false :false;
      
        this.Publisheds = this.Restangular.all('publisheds');
      
        var tiposOr = [
            {name: 'all'  ,   desc: "Sin Filtro" },
            {name: 'herramienta'  ,   desc: "Herramientas" },
            {name: 'materialapoyo',     desc: "Material de apoyo" },
            {name: 'tutorial'         , desc: "Tutoriales" },
            {name: 'ejemplos'         , desc: "Ejemplos" },
            {name: 'experiencia'         , desc: "Experiencias" }
         ];

        this.recursosFiltro =[].concat(tiposOr);            
         
        this.$scope.$watch(() => { return $mdMedia('xs') }, (mobile) => {
            this.isMobile = mobile === true;    
            this.muestraFiltroMobile=false;  
        });

        this.$scope.$watch( this.subtype, function(){
            console.log(this); 
        });
    }

    getUser(){
        this.Auth
            .getCurrentUser()
            .then(user => {
                this.user = user;
                this.username = user.name;
            });
    }

    fetchDataFilter(e,value){

        e.preventDefault();
        console.log(value);
        if (value=='herramienta'){
            this.herramienta=  !this.herramienta;
            this.materialapoyo= false;
            this.tutorial=false;
            this.ejemplos= false;
            this.experiencia= false;
            this.Video=false;
            this.Audio=false;
            this.Plantilla=false;
            this.Imágen=false;
            this.Texto=false;
            this.Presentación=false;
        }
        if (value=='materialapoyo'){
            this.herramienta=false;
            this.materialapoyo= !this.materialapoyo;
            this.tutorial=false;
            this.ejemplos= false;
            this.experiencia= false;
            this.Video=false;
            this.Audio=false;
            this.Plantilla=false;
            this.Imágen=false;
            this.Texto=false;
            this.Presentación=false;
        }
        if (value=='tutorial'){
            this.herramienta=false;
            this.materialapoyo= false;
            this.tutorial=!this.tutorial;
            this.ejemplos= false;
            this.experiencia= false;
            this.Video=false;
            this.Audio=false;
            this.Plantilla=false;
            this.Imágen=false;
            this.Texto=false;
            this.Presentación=false;
        }
        if (value=='ejemplos') {
            this.herramienta=false;
            this.materialapoyo= false;
            this.tutorial=false;
            this.ejemplos= !this.ejemplos;
            this.experiencia= false;
            this.Video=false;
            this.Audio=false;
            this.Plantilla=false;
            this.Imágen=false;
            this.Texto=false;
            this.Presentación=false;
        }
        if (value=='experiencia') {
            this.herramienta=false;
            this.materialapoyo= false;
            this.tutorial=false;
            this.ejemplos= false;
            this.experiencia= !this.experiencia;
            this.Video=false;
            this.Audio=false;
            this.Plantilla=false;
            this.Imágen=false;
            this.Texto=false;
            this.Presentación=false;
        }
        if (value=='Video'){
            this.Video=!this.Video;
            this.Audio=false;
            this.Plantilla=false;
            this.Imágen=false;
            this.Texto=false;
            this.Presentación=false;
        }
        if (value=='Audio'){
            this.Video=false;
            this.Audio=!this.Audio;
            this.Plantilla=false;
            this.Imágen=false;
            this.Texto=false;
            this.Presentación=false;
        }
        if (value=='Plantilla'){
            this.Video=false;
            this.Audio=false;
            this.Plantilla=!this.Plantilla;
            this.Imágen=false;
            this.Texto=false;
            this.Presentación=false;
        }
        if (value=='Imágen'){
            this.Video=false;
            this.Audio=false;
            this.Plantilla=false;
            this.Imágen=!this.Imágen;
            this.Texto=false;
            this.Presentación=false;
        }
        if (value=='Texto'){
            this.Video=false;
            this.Audio=false;
            this.Plantilla=false;
            this.Imágen=false;
            this.Texto=!this.Texto;
            this.Presentación=false;
        }
        if (value=='Presentación'){
            this.Video=false;
            this.Audio=false;
            this.Plantilla=false;
            this.Imágen=false;
            this.Texto=false;
            this.Presentación=!this.Presentación;
        }
        
        this.page=0;
        this.resetWaterfall= Math.random();
    }

    fetchData(){
        let def = this.$q.defer();
        this.page++;
        let q;
        if (this.searchText){
            q = this.searchText
        }

        if (!(this.herramienta || this.materialapoyo || this.tutorial || this.ejemplos || this.experiencia ||
            this.Video || this.Audio || this.Plantilla || this.Imágen || this.Texto || this.Presentación)){
            let res = {
                count: 0,
                items: null,
                page: this.page,
                limit: this.limit
            };

            def.resolve(res);
        }
        else {

            var subtypeElegido;
            var tipoRecursoElegido;

            if (this.Video)
                tipoRecursoElegido='Video';
            if (this.Audio)
                tipoRecursoElegido='Audio'; 
            if (this.Plantilla)
                tipoRecursoElegido='Plantilla';
            if (this.Imágen)
                tipoRecursoElegido='Imágen';     
            if (this.Texto)
                tipoRecursoElegido='Texto';

            if (this.herramienta)
                subtypeElegido='herramienta';
            if (this.materialapoyo)
                subtypeElegido='materialapoyo'; 
            if (this.tutorial)
                subtypeElegido='tutorial';
            if (this.ejemplos)
                subtypeElegido='ejemplos';     
            if (this.experiencia)
                subtypeElegido='experiencia';

        this.Publisheds
            .getList({
                page: this.page, 
                limit: this.limit,
                type: 'resource',
                subtype:subtypeElegido,               
                tipoRecurso:tipoRecursoElegido
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
        }
        return def.promise;
    }
}
