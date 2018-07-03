'use strict';

import $ from 'jquery';

let theme = ($mdThemingProvider) => {
	
	let contrastDefaultColor = 'light';
	let contrastDarkColors = [ '50', '100', '200', '300', '400', 'A100', 'A200', 'A400', 'A700'];
	let contrastLightColors = [ '500','600','700','800','900' ];
  
  /*
	$mdThemingProvider.definePalette('propuestas', {
    '50': 'fee8e7',
    '100': 'fcc7c3',
    '200': 'faa19b',
    '300': 'f77b72',
    '400': 'f65f54',
    '500': 'f44336',
    '600': 'f33d30',
    '700': 'f13429',
    '800': 'ef2c22',
    '900': 'ec1e16',
    'A100': 'ffffff',
    'A200': 'ffe9e9',
    'A400': 'ffb8b6',
    'A700': 'ff9f9c',
    'contrastDefaultColor': contrastDefaultColor,
    'contrastDarkColors': contrastDarkColors,
    'contrastLightColors': contrastLightColors
	});
	
  $mdThemingProvider.definePalette('actividades', {
    '50': 'f0ebf8',
    '100': 'd8cded',
    '200': 'bfabe1',
    '300': 'a589d4',
    '400': '9170cb',
    '500': '7e57c2',
    '600': '764fbc',
    '700': '6b46b4',
    '800': '613cac',
    '900': '4e2c9f',
    'A100': 'eae2ff',
    'A200': 'c5afff',
    'A400': 'a17cff',
    'A700': '8e63ff',
    'contrastDefaultColor': contrastDefaultColor,
    'contrastDarkColors': contrastDarkColors,
    'contrastLightColors': contrastLightColors
	});
	
  $mdThemingProvider.definePalette('herramientas', {
    '50': 'e5f8fb',
    '100': 'beeef4',
    '200': '93e3ed',
    '300': '67d7e5',
    '400': '47cfe0',
    '500': '26c6da',
    '600': '22c0d6',
    '700': '1cb9d0',
    '800': '17b1cb',
    '900': '0da4c2',
    'A100': 'effcff',
    'A200': 'bcf3ff',
    'A400': '89e9ff',
    'A700': '6fe5ff',
    'contrastDefaultColor': contrastDefaultColor,
    'contrastDarkColors': contrastDarkColors,
    'contrastLightColors': contrastLightColors
	});
	
  $mdThemingProvider.definePalette('orientaciones', {
    '50': 'f3f9ed',
    '100': 'e1f0d1',
    '200': 'cee6b2',
    '300': 'badb93',
    '400': 'abd47c',
    '500': '9ccc65',
    '600': '94c75d',
    '700': '8ac053',
    '800': '80b949',
    '900': '6ead37',
    'A100': 'fcfff9',
    'A200': 'e0ffc6',
    'A400': 'c3ff93',
    'A700': 'b5ff7a',
    'contrastDefaultColor': contrastDefaultColor,
    'contrastDarkColors': contrastDarkColors,
    'contrastLightColors': []
	});
	
  $mdThemingProvider.definePalette('mediateca', {
    '50': 'fef5e5',
    '100': 'fde5be',
    '200': 'fcd492',
    '300': 'fbc266',
    '400': 'fab546',
    '500': 'f9a825',
    '600': 'f8a021',
    '700': 'f7971b',
    '800': 'f68d16',
    '900': 'f57d0d',
    'A100': 'ffffff',
    'A200': 'fff5ec',
    'A400': 'ffd8b9',
    'A700': 'ffcaa0',
    'contrastDefaultColor': contrastDefaultColor,
    'contrastDarkColors': contrastDarkColors,
    'contrastLightColors': []
  });
  */
	
  $mdThemingProvider.definePalette('robotica', {
    '50': 'fce7e7',
    '100': 'f7c4c2',
    '200': 'f29c9a',
    '300': 'ed7472',
    '400': 'e95753',
    '500': 'e53935',
    '600': 'e23330',
    '700': 'de2c28',
    '800': 'da2422',
    '900': 'd31716',
    'A100': 'ffffff',
    'A200': 'ffd1d1',
    'A400': 'ff9f9e',
    'A700': 'ff8585',
    'contrastDefaultColor': contrastDefaultColor,
    'contrastDarkColors': contrastDarkColors,
    'contrastLightColors': contrastLightColors
  });

  /*
  $mdThemingProvider.definePalette('dark', {
    '50': 'e4e4e4',
    '100': 'bcbcbc',
    '200': '909090',
    '300': '636363',
    '400': '414141',
    '500': '202020',
    '600': '1c1c1c',
    '700': '181818',
    '800': '131313',
    '900': '0b0b0b',
    'A100': 'e76c6c',
    'A200': 'e04040',
    'A400': 'ec0000',
    'A700': 'd30000',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': [
      '50',
      '100',
      '200',
      'A100'
    ],
    'contrastLightColors': [
      '300',
      '400',
      '500',
      '600',
      '700',
      '800',
      '900',
      'A200',
      'A400',
      'A700'
    ]
  });
  */
};

export function roboticaConfig($urlRouterProvider, $locationProvider, $mdThemingProvider, RestangularProvider, ngMetaProvider) {
  'ngInject';
  
  $locationProvider.html5Mode(true);

  $urlRouterProvider.when('/admin/users/', ['$match', '$stateParams', '$state', function ($match, $stateParams, $state) {
    $state.go('admin.users');
  }]);
  $urlRouterProvider.otherwise('/');

  //RestangularProvider.setFullResponse(true);
  RestangularProvider.setBaseUrl('/api');
  RestangularProvider.setResponseExtractor(function(data, operation, what, url, response) {
    if (operation !== 'getList'){
      return data;  
    }
    
    let skip = response.headers('x-result-skip');
    let limit = response.headers('x-result-limit');
    let total = response.headers('x-result-total');

    data.$skip = parseInt(skip);
    data.$limit = parseInt(limit); 
    data.$total = parseInt(total);

    return data;
  });

  RestangularProvider.setRestangularFields({
    id: "_id",
  });
  
  // create theming
  theme($mdThemingProvider);

  /*
  $mdThemingProvider.theme('rdPropuestas')
  	.primaryPalette('propuestas');
  $mdThemingProvider.theme('rdActividades')
		.primaryPalette('actividades');
	$mdThemingProvider.theme('rdHerramientas')
		.primaryPalette('herramientas');
	$mdThemingProvider.theme('rdOrientaciones')
		.primaryPalette('orientaciones');
	$mdThemingProvider.theme('rdMediateca')
    .primaryPalette('mediateca');
  $mdThemingProvider.theme('rdDark')
		.primaryPalette('dark');
  */

  $mdThemingProvider.theme('default')
    .primaryPalette('robotica');

  // SEO

	ngMetaProvider.useTitleSuffix(true);
  ngMetaProvider.setDefaultTitle('');
  ngMetaProvider.setDefaultTitleSuffix(' | Robotica');
  ngMetaProvider.setDefaultTag('author', 'Dirección de Innovacion y Tecnologia Educativa - Buenos Aires');
  ngMetaProvider.setDefaultTag('description', 'Plataforma de contenidos digitales con fines educativos para que todos podamos participar y acceder.');
}

export function roboticaRun($cookies, $rootScope, $state, amMoment, ngMeta, $window, $mdDateLocaleProvider){
  'ngInject';

  $rootScope.$on("$stateChangeSuccess", function (event, currentRoute, previousRoute) {
    $window.scrollTo(0, 0);
  });

  $mdDateLocaleProvider.formatDate = function(date) {
    return moment(date).format('DD/MM/YYYY');
  };
  
  amMoment.changeLocale('es');

  ngMeta.init();

  // expose $state
  $rootScope.$state = $state;

  // add the token to jQuery
  $.ajaxSetup({
    beforeSend: function(xhr, settings) {
      xhr.setRequestHeader("Authorization", `Bearer ${$cookies.get('token')}`);
      xhr.setRequestHeader("X-CSRFToken", $cookies.get("XSRF-TOKEN"));
    }
  });


  
}