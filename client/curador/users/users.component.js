'use strict';
import angular from 'angular';
import CuradorComponent from '../curador.component';

export default class UsersComponent extends CuradorComponent {
  /*@ngInject*/
  constructor($element, $q, Auth, Restangular) {
    super({$element});
      this.$q = $q;
      this.page = 0;
      this.limit = 20;
      this.Auth = Auth;
      this.Restangular = Restangular;
      this.Users = this.Restangular.all('users');
      this.getUser();
	}

    getUser(){
        this.Auth
            .getCurrentUser()
            .then(user => {
                this.user = user;
                this.username = user.name;
            });
    }

    fetchData(){
        let def = this.$q.defer();

        this.page++;
        // let addNewItem = {
        //     type: 'usuarios',
        //     options: [
        //         { section: 'propuestas', icon: 'ri ri-propuestas', caption: 'Propuestas pedagógica' },
        //         { section: 'actividades', icon: 'ri ri-actividades', caption: 'Actividades' },
        //         { section: 'herramientas', icon: 'ri ri-herramienta', caption: 'Herramientas' },
        //         { section: 'orientaciones', icon: 'ri ri-orientaciones', caption: 'Orientaciones' },
        //         { section: 'mediateca', icon: 'ri ri-mediateca', caption: 'Mediateca' }
        //     ]
        // };

        let q;
        if (this.searchText){
            q = this.searchText
        }

        this.Users
            .getList({
                q: q,
                page: this.page,
                limit: this.limit,
                sort: 'updatedAt'
            })
            .then(res => {
                const items = res;
                // if (this.page === 1) {
                //     items.push(addNewItem);
                // }

                let data = {
                    count: (res.length + 1),
                    items: items,
                    page: this.page,
                    limit: this.limit
                };

                def.resolve(data);
            })
            .catch(err => {
                throw err;
            });

        return def.promise;
    }
}
