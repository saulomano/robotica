'use strict';

import angular from 'angular';

// componentes
import header from './header/header.component';
import footer from './footer/footer.component';
import resourceCard from './components/resourceCard/resourceCard.component';
import userCard from './components/userCard/userCard.component';
import desafioCard from './components/desafioCard/desafioCard.component';
import resourceView from './components/resourceView/resourceView.component';
import modalView from './components/modalView/modalView.component';
import home from './home';
import buscar from './buscar';
import ver from './ver';
import guia from './guia';
import institucional from './institucional';
import filters from './social.filter';
import misDesafios from './misDesafios';
import desafiosAprobados from './desafiosAprobados';
import newDesafio from './new';
import resolverDesafio from './resolverDesafio';
import canalyt from './canalyt';
import verdesafio from './verdesafio';
import desafioView from './components/desafioView/desafioView.component';
import propuestaDesafioView from './components/propuestadesafioView/propuestadesafioView.component';
import propuestaDesafioCard from './components/propuestaDesafioCard/propuestaDesafioCard.component';
import desafiosParaResolver from './desafiosParaResolver';
import comoEmpezar from './comoEmpezar';
import noticiaCard from './components/noticiaCard/noticiaCard.component';
import noticias from './noticias';
import orientacionpedagogicaCard from './components/orientacionpedagogicaCard/orientacionpedagogicaCard.component';
import kitCard from './components/kitCard/kitCard.component';
import kitView from './components/kitView/kitView.component';

// config to providers
import { socialConfig } from './social.config';

let requirements = [
	header,
	footer,
	resourceCard,
	userCard,
	desafioCard,
	resourceView,
	modalView,
	home,
	buscar,
	ver,
	guia,
	institucional,
	misDesafios,
	desafiosAprobados,
	newDesafio,
	resolverDesafio,
	canalyt,
	filters,
	verdesafio,
	desafioView,
	propuestaDesafioCard,
	propuestaDesafioView,
	desafiosParaResolver,
	comoEmpezar,
	noticiaCard,
	noticias,
	orientacionpedagogicaCard,
	kitCard,
	kitView
];

module.exports = angular
					.module('robotica.social', requirements)
					.config(socialConfig)
					.name;
