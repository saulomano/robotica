'use strict';
import angular from 'angular';
import SocialComponent from '../social.component';
import _ from "lodash";


export default class ActividadesComplementariasComponent extends SocialComponent{
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
        this.filter = this.$stateParams.filter || 'all';
        this.$mdDialog = $mdDialog;
        this.filterChange;
        this.area;
        this.pensamientoComputacional= false;
        this.programacion=false;
        this.robotica=false;
        $scope.$mdMedia = $mdMedia;
        this.resetWaterfall;
        this.complementarias = true;
        if(this.filter === 'all'){
            this.Publisheds = this.Restangular.all('publishedOrientacionPedagogica');
        }else{
            this.Publisheds = this.Restangular.all('publishedOrientacionPedagogica/findArea/'+this.filter);
        }


       


      
        var tiposOr = [
            {name: 'all'  ,   desc: "Sin Filtro" },
            {name: 'danza'  ,   desc: "Danza" },
            {name: 'fisica',     desc: "Fisica" },
            {name: 'ingles'         , desc: "Ingles" },
            {name: 'lengua'         , desc: "Lengua" },
            {name: 'matematica'         , desc: "Matematica" },
            {name: 'musica'         , desc: "Musica" },
            {name: 'naturales'         , desc: "Cs Naturales" },
            {name: 'plastica'         , desc: "Plastica" },
            {name: 'sociales'         , desc: "Cs Sociales" },
            {name: 'teatro'          , desc: "Teatro" }
         ];


         this.orientacionesFiltro =[].concat(tiposOr);            
         

         this.$scope.$watch(() => { return $mdMedia('xs') }, (mobile) => {
            this.isMobile = mobile === true;    
            this.muestraFiltroMobile=false;  
          });

          this.$scope.$watch( this.area, function(){
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

    applyFilter(type) {
		this.$state.go(this.$state.current, {search: type}, {reload:true});
	}

    itemClicked(item) {      
            if (this.filter === item.name){
                return;
            }
            this.$state.go(this.$state.current, { filter: item.name });
            this.filter = item.name;
      
      }

      fetchDataFilter(e,value){
        e.preventDefault();
        console.log(value);
        if (value=='pensamientoComputacional'){
            this.pensamientoComputacional =  !this.pensamientoComputacional;
            this.programacion=false;
            this.robotica= false;
        }
        if (value=='programacion'){
            this.programacion=  !this.programacion;
            this.pensamientoComputacional =false;
            this.robotica= false;
        }
        if (value=='robotica'){
            this.robotica=  !this.robotica;
            this.programacion=false;
            this.pensamientoComputacional =false;

        }

       


          this.page=0;
        this.resetWaterfall= Math.random();
      }

      /*fetchDataFilter(value){
          this.page=0;
        this.resetWaterfall= Math.random();
      }*/

    fetchData(){
        let def = this.$q.defer();
        this.page++;
        let q;
        if (this.searchText){
            q = this.searchText
        }



        if (!(this.pensamientoComputacional || this.programacion || this.robotica ) ){

            let res = {
                count: 0,
                items: null,
                page: this.page,
                limit: this.limit
            };

            def.resolve(res);;


        }else{


            var areaEmergenteElegida;
           
            if (this.pensamientoComputacional)
             areaEmergenteElegida='pensamientoComputacional';
            if (this.programacion)
             areaEmergenteElegida='programacion'; 
            if (this.robotica)
             areaEmergenteElegida='robotica';     

        this.Publisheds
            .getList({
                page: this.page, 
                limit: this.limit,
                type: 'orientacionpedagogica',
                areaEmergente:areaEmergenteElegida,
                complementarias: this.complementarias
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

    viewOrientacionPedagogica_($event, resource){

        if (!this.$mdDialog)
            return;

        this.$mdDialog.show({
            template: require('../components/modalView/modalView.html'),
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

            this.Resource = Restangular.one('publishedOrientacionPedagogica', resource._id);

            this.closeDialog = function() {
                $mdDialog.hide();
            }

            this.Resource
                .get()
                .then(data => {
                   

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
    }



    //mdButton


    


}
