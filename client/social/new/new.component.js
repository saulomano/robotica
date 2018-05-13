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
        let types = /^(subidesafio)$/ig;
        this.section = _.toLower($stateParams.type);

        if (!types.test(this.section)){
            this.error = `Argumento invalido ${this.section}`;
        }
    }
  
    $onInit(){
        if (this.error){
            this.$timeout(() => {
                this.$state.go('social.desafios');
            }, 2000);
            return;
        }
        // create the object
        this.createResource(this.section);
    }

    createResource(section) {
        let dbtypes = {
            'subidesafio': 'desafio',
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
                let resource = this.Restangular.all('desafios');
                resource
                    .post(data)
                    .then(data => {
                        this.$state.go(`social.desafio`, { uid: data._id });
                    })
                    .catch((err) => {
                        this.$log.error(err)
                        return this.$state.go(`social.desafios`);
                    });
            })
            .catch((err) => {
                this.$log.error(err)
                return this.$state.go(`social.desafios`);
            });
    }
}