'use strict';
import angular from 'angular';
import SocialComponent from '../social.component';

export default class KitTbotComponent extends SocialComponent {
  /*@ngInject*/
  constructor($element, ngMeta, $location) {
    super({$element});

    this.ngMeta =  ngMeta;


    //this.tabSelect = $location.search()['tab']|| 1;


    

    /*this.teamBA = [
      { cargo: 'Gobernadora', name: 'Lic. María Eugenia Vidal' },
      { cargo: 'Vicegobernador ', name: 'Dr. Daniel Salvador' },
      { cargo: 'Director General de Cultura y Educación ', name: 'Lic. Gabriel Sanchez Zinny' },
      { cargo: 'Vicepresidente 1º del Consejo General de Cultura y Educación ', name: 'Lic. Diego Martínez' },
      //{ cargo: 'Jefe de Gabinete de Asesores ', name: 'Don Javier Mezzamico' },
      { cargo: 'Subsecretario de Educación ', name: 'Lic. Sergio Siciliano' },
      { cargo: 'Subsecretaria de Políticas Docentes y Gestión Territorial ', name: 'Dra. Florencia Castro' },
      { cargo: 'Directora de Innovación y Tecnología Educativa ', name: 'Prof. Liliana Vigolo' },
    ];*/

    

   

   // ngMeta.setTitle('Cómo Empezar');
    //ngMeta.setTag('description', 'Una plataforma educativa diseñada para acercar a los docentes y estudiantes de la modalidad Educación Especial otras posibilidades de enseñar y aprender');
	}
	
}
