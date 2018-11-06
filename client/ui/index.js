'use strict';

import angular from 'angular';

import navbar from './components/navbar/navbar';
import navbarItem from './components/navbarItem/navbar-item';
import waterfall from './components/waterfall/waterfall';
import card from './components/card/card';
import post from './components/post/post';
import stepper from './components/stepper/stepper';
import cardOrientaciones from './components/cardOrientaciones/cardOrientaciones';
import file1 from './components/pdf/pdf';

let requirements = [
	navbar,
	navbarItem,
	waterfall,
	card,
	post,
	stepper,
	cardOrientaciones,
	file1
];

module.exports = angular
									.module('robotica.ui', requirements)
									.name;
