'use strict';
import angular from 'angular';
import SocialComponent from '../social.component';

export default class InstitucionalComponent extends SocialComponent {
  /*@ngInject*/
  constructor($element, ngMeta) {
    super({$element});

    this.ngMeta =  ngMeta;

 
  

    ngMeta.setTitle('Institucional');
    ngMeta.setTag('description', 'Una plataforma educativa diseñada para acercar a los docentes y estudiantes de la modalidad Educación Especial otras posibilidades de enseñar y aprender');
	}
	
}
