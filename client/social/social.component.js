import _ from 'lodash';
import Q from 'q';
export default class SocialComponent {
    constructor({ $element, $log, Restangular }) {
        $element.addClass('social__component');

        this.loaded = false;
        this.$log = $log;
        this.Restangular = Restangular;
        this.categories_ = {};
        this.modoVista= 'social';
    }

    loadCategories() {
        let def = Q.defer();

        this.Category = this.Restangular.all('categories');

        let all = this.Category.getList();
        all.then(categories => {
            this.categories = categories;
            this.categories_ = _.keyBy(categories, 'type');
            def.resolve();
        })
        .catch(err => {
            def.reject(err);
        });

        return def.promise;
    }

    getCategory(type) {
        return this.categories_[type];
    }


    iconFromResourceType(resource){

        if (resource.tipoRecurso === 'Presentación')
            return  'icon-presentacion'; 
        if (resource.tipoRecurso === 'Video')
            return  'icon-video-line'; 
        if (resource.tipoRecurso === 'PDF')
            return  'icon-pdf'; 
        if (resource.tipoRecurso === 'Software')
        return  'icon-programa';
        if (resource.tipoRecurso === 'Imágen')
        return  'icon-imagen';
        if (resource.tipoRecurso === 'Audio')
        return  'icon-audio';
    
      }
    

}
