'use strict';
import angular from 'angular';
import SocialComponent from '../social.component';

export default class InstitucionalComponent extends SocialComponent {
  /*@ngInject*/
  constructor($element, ngMeta) {
    super({$element});

    this.ngMeta =  ngMeta;

    this.coordinador = 'Daniel Giganti';

    this.teamBA = [
      { cargo: 'Gobernadora', name: 'Lic. María Eugenia Vidal' },
      { cargo: 'Vicegobernador ', name: 'Dr. Daniel Salvador' },
      { cargo: 'Director General de Cultura y Educación ', name: 'Lic. Gabriel Sanchez Zinny' },
      { cargo: 'Vicepresidente 1º del Consejo General de Cultura y Educación ', name: 'Lic. Diego Martínez' },
      //{ cargo: 'Jefe de Gabinete de Asesores ', name: 'Don Javier Mezzamico' },
      { cargo: 'Subsecretario de Educación ', name: 'Lic. Sergio Siciliano' },
      { cargo: 'Subsecretaria de Políticas Docentes y Gestión Territorial ', name: 'Dra. Florencia Castro' },
      { cargo: 'Directora de Innovación y Tecnología Educativa ', name: 'Prof. Liliana Vigolo' },
    ];

    this.teamPedagogico = [
      'Gabriela Sanguintetti ',
      'Patricia Valenzuela',
      'Karina Michalek',
      'Stella Valbueno',
      'Gabriela Tobio ',
      'Daniel Giganti',
    ];

    this.teamDesarrollo = [
      'Rodrigo Bonilla (Diseño Interfaz y comunicación)',
      'María Elina Beltrán (Diseño Interfaz y comunicación)',
      'Delmo Carrozzo (Desarrollo y Arquitectura de software)',
      'Julieta Alessio (Diseño identidad y comunicación)',
      'Melgarejo Agustina (Diseño identidad y comunicación)',
      'Federico Etcheverry (Diseño identidad y comunicación)',
      'Julia Inchaurregui (Diseño UI & UX)',
      'Alejandro Palestrini  (Consulting)',
    ];

    ngMeta.setTitle('Institicional');
    ngMeta.setTag('description', 'Una plataforma educativa diseñada para acercar a los docentes y estudiantes de la modalidad Educación Especial otras posibilidades de enseñar y aprender');
	}
	
}
