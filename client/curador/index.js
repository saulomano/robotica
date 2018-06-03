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
	noticia
];

module.exports = angular
									.module('robotica.curador', requirements)
									.config(curadorConfig)
									.name;
