'use strict';
import angular from 'angular';
import SocialComponent from '../social.component';
import _ from 'lodash';
import async from 'async';

export default class NewComponent extends SocialComponent{
    /*@ngInject*/
    constructor($element, $state, $stateParams, $timeout, Auth, Restangular, $log) {
        super({$element, $log});
        this.$timeout = $timeout;
        this.$state = $state;
        this.Restangular = Restangular;
        this.Auth = Auth;
        this.$log = $log;
        let types = /^(subidesafio|resolvedesafio)$/ig;
        this.section = _.toLower($stateParams.type);
        this.desafioAResolver = this.Restangular.one('propuestadesafio', $stateParams.desafioresolver);
       
        if (!types.test(this.section)){
            this.error = `Argumento invalido ${this.section}`;
        }
    }
  
    $onInit(){
        if (this.error){
            this.$timeout(() => {
                this.$state.go('social.misDesafios');
            }, 2000);
            return;
        }
        // create the object
        this.createDesafio(this.section,this.desafioAResolver);
    }

    createDesafio(section, desafioAResolver) {
        let dbtypes = {
            'resolvedesafio': 'desafio',
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
                    files: [],
                    step: 'ficha',
                    desafioResuelto : desafioAResolver
                };
                let desafio = this.Restangular.all('desafios');


                desafio
                    .post(data)
                    .then(data => {
                        this.$state.go(`social.resolverDesafio`, { uid: data._id });
                    })
                    .catch((err) => {
                        this.$log.error(err)
                        return this.$state.go(`social.misDesafios`);
                    });
            })
            .catch((err) => {
                this.$log.error(err)
                return this.$state.go(`social.misDesafios`);
            });
    }
}