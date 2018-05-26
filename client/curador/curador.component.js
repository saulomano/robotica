import _ from 'lodash';
import Q from 'q';

export default class CuradorComponent {
  constructor({ $element, $log, Restangular }) {
    $element.addClass('curador__component');

    this.loaded = false;
    this.$log = $log;
    this.Restangular = Restangular;
    this.categories_ = {};
    this.tiposDesafios_ = {};

    this.modoVista= 'curador';
  }

  loadCategories(){
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

  getCategory(type){
    return this.categories_[type];
  }



  loadTiposDesafio(){
    let def = Q.defer();

    this.TipoDesafio = this.Restangular.all('tipoDesafio');

    let all = this.TipoDesafio.getList();
    all.then(tiposDesafio => {
      this.tiposDesafio = tiposDesafio;
      this.tiposDesafios_ = _.keyBy(tiposDesafio, 'type');
      def.resolve();
    })
    .catch(err => {
      def.reject(err);
    });

    return def.promise;
  }

  getTipoDesafio(type){
    return this.tiposDesafios_[type];
  }



}
