'use strict';
import angular from 'angular';
import SocialComponent from '../social.component';

export default class GuiaComponent extends SocialComponent {
  /*@ngInject*/
  constructor($element,ngMeta) {
    super({$element});

    ngMeta.setTitle('Guia');
    ngMeta.setTag('description', '¿Que es Robotica? definir texto');
	}
	
}
