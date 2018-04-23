'use strict';
import angular from 'angular';
import $ from 'jquery';

class FooterComponent {
  /*@ngInject*/
  constructor($element) {
    this.version = $('meta[name=version]').attr("content");;
  }
}

export default angular.module('robotica.social.socialFooter', [])
  .component('socialFooter', {
    template: require('./footer.html'),
    controller: FooterComponent
  })
  .name;
