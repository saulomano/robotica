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
import desafios from './desafios';
import newDesafio from './new';
import desafio from './desafio';
import canalyt from './canalyt';

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
	desafios,
	newDesafio,
	desafio,
	canalyt,
	filters

];

module.exports = angular
					.module('robotica.social', requirements)
					.config(socialConfig)
					.name;
