'use strict';

import angular from 'angular';

import header from './header/header.component';
import dashboard from './dashboard';
import newResource from './new';
import resource from './resource';
import users from './users';
import propuestadesafio from './propuestadesafio';
import dashboardpropuestadesafio from './dashboardpropuestadesafio';
import dashboarddesafiosresueltos from './dashboarddesafiosresueltos';
import desafio from './desafio';
import dashboardnoticias from './dashboardnoticias';
import noticia from './noticia';
import dashboardorientacionpedagogica from './dashboardorientacionpedagogica';
import orientacionpedagogica from './orientacionpedagogica';
import dashboardkits from './dashboardkits'
import kit from './kit'
import dashboarpropuestataller from './dashboarpropuestataller'
import propuestataller from './propuestataller'



// config to providers
import { curadorConfig } from './curador.config';

let requirements = [
	header,
	dashboard,
	newResource,
	resource,
	users,
	propuestadesafio,
	dashboardpropuestadesafio,
	dashboarddesafiosresueltos,
	desafio,
	dashboardnoticias,
	noticia,
	dashboardorientacionpedagogica,
	orientacionpedagogica,
	dashboardkits,
	kit,
	dashboarpropuestataller,
	propuestataller
];

module.exports = angular
									.module('robotica.curador', requirements)
									.config(curadorConfig)
									.name;
