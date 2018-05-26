'use strict';
import angular from 'angular';
import CuradorComponent from '../curador.component';
import async from 'async';
import $ from 'jquery';
import _ from 'lodash';

export default class DesafioComponent extends CuradorComponent {
	/*@ngInject*/
	constructor($scope, $element, $stateParams,$q, Auth, Restangular, $log, Util, $timeout, $state, $mdDialog, $mdConstant, ngMeta) {
    	super({$element, Restangular, $log});
		this.$scope = $scope;
		this.currentStep = 'ficha';
		this.loading = true;
		this.Restangular = Restangular;
		this.$stateParams = $stateParams;
		this.uid = this.$stateParams.uid;
		this.Util = Util;
		this.$timeout = $timeout;
		this.init = true;
		this.isDelete = $stateParams.action === 'remove';
		this.$state = $state;
		this.$mdDialog = $mdDialog;
		this.ngMeta = ngMeta;
		this.$q = $q;

		this.simulateQuery = true;
    	this.isDisabled = false;
    	this.noCache = true;

		// list of `state` value/display objects
		this.states = this.loadAll();

		// Global captions to avoid unnecesary temporary captions inside functions
		this.captions = {
			
			'desafio': 'Desafío',
		};

		this.Desafio = this.Restangular.one('desafios', this.uid);
		this.Publisheds = this.Restangular.all('publisheddesafios');

		this.returnDesafios = false;

		// tag separators
		this.tagsKeys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA];
		
		this.desafio = {};
		this.steps = [
			{ name: 'ficha', 		caption: 'Ficha' },
			{ name: 'recurso', 	caption: 'Recurso' },
			{ name: 'vinculo', caption: 'Vínculo' },
			{ name: 'publicar', caption: 'Publicar' },
		];

		this.configureDropzone(Util);
		this.configureFunctions();
		this.getDesafio();
		this.getCategories_();

		this.onDeletePost = ($index) => {
			this.onDeletePost_($index);
		};

		this.$scope.$watch(() => { return this.filterText }, (value) => {
			this.refreshUI(true);
		});
	}

	querySearch (query) {
		var results = query ? this.states.filter( this.createFilterFor(query) ) : this.states;
		var deferred;
		if (this.simulateQuery) {
		  	deferred = this.$q.defer();
		  	this.$timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
		  	return deferred.promise;
		} else {
		  	return results;
		}
	}

    querySearchSchool(query) {
        var results = query ? this.selectedDistrict.schools.filter( this.createFilterForSchool(query) ) : this.selectedDistrict.schools;
        var deferred;
        if (this.simulateQuery) {
            deferred = this.$q.defer();
            this.$timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
            return deferred.promise;
        } else {
            return results;
        }
    }

	loadAll() {
		var allStates = 'La Plata, Adolfo Alsina, Alberti, Almirante Brown, Avellaneda, Ayacucho, Azul, Bahía Blanca, Balcarce, Baradero, Arrecifes, Bolívar, Bragado, Brandsen, Campana, Cañuelas, Carlos Casares, Carlos Tejedor, Carmen de Areco, Daireaux, Castelli, Colón, Coronel Dorrego, Coronel Pringles, Coronel Suárez, Chacabuco, Chascomús, Chivilcoy, Dolores, Esteban Echeverría, Exaltación de la Cruz, Florencio Varela, General Alvarado, General Alvear, General Arenales, General Belgrano, General Guido, General La Madrid, General Lavalle, General Madariaga, General Paz, General Pinto, General Pueyrredón, General Rodríguez, General San Martín, Zárate, General Viamonte, General Villegas, Gonzáles Chaves, Guaminí, Juárez, Junín, Laprida, Tigre,	Las Flores, General Las Heras, Leandro N. Alem, Lincoln, Lobería, Lobos, Lomas de Zamora, Luján, Magdalena, Maipú, Salto, Marcos Paz, Mar Chiquita, La Matanza, Mercedes, Merlo, Monte, Moreno, Navarro, Necochea, Nueve de Julio, Olavarría, Patagones, Pehuajó, Pellegrini, Pergamino, Pila, Pilar, Puan, Quilmes, Ramallo, Rauch, Rivadavia, Rojas, Roque Pérez, Saavedra, Saladillo, San Andrés de Giles,	San Antonio de Areco, San Fernando, San Isidro, San Nicolás, San Pedro,	San Vicente, Morón, Suipacha, Tandil, Tapalqué, Tordillo, Tornquist, Trenque Lauquen, Tres Arroyos, Veinticinco de Mayo, Vicente López, Villarino, Lanús, Coronel Rosales, Berisso, Ensenada, San Cayetano, Escobar, Tres de Febrero, Hipólito Yrigoyen, Berazategui, Salliqueló, Capitán Sarmiento, La Costa, Pinamar, Villa Gesell, Monte Hermoso, Tres Lomas, Florentino Ameghino, Presidente Perón, Ezeiza, San Miguel, José C. Paz, Malvinas Argentinas, Punta Indio, Hurlingham, Ituzaingo, Lezama';
  
		return allStates.split(/, +/g).map( function (state) {
		  	return {
				value: state.toLowerCase(),
				display: state
		  	};
		});
	}

	/**
     * Create filter function for a query string
     */
    createFilterFor(query) {
		var lowercaseQuery = angular.lowercase(query);
		return function filterFn(state) {
		  	return (state.value.indexOf(lowercaseQuery) === 0);
		};
	}

    /**
     * Create filter function for a query school string
     */
    createFilterForSchool(query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(state) {
            return (angular.lowercase(state.schoolName).indexOf(lowercaseQuery) === 0);
        };
    }

	onChangeDistrict(newDistrict) {
		if(_.isEmpty(newDistrict.display) == false)	{
			let districtIndex = _.findIndex(this.loadAll(), function (element) {
				return (element.display == newDistrict.display);			
			});

			// If the search district were found...
			if(districtIndex != -1)	{
				this.School = this.Restangular.one('schools/district', newDistrict.display);

				// Let's retrieve the school information
				this.getSchool();
			}
		}
	}

	getSchool(){
		// this.loading = true;
		this.loadingSchools = true;
		this.School.get()
		.then(data => {

			this.district = data;

			let desafioInstance = this;

			let schoolIndex = _.findIndex(this.district.schools, function (element) {
				return (element.schoolName == desafioInstance.desafio.school);						
			});

			if(schoolIndex == -1) {
				schoolIndex = 0;
			}			

			this.selectedDistrict = this.district;
			this.searchDistrictText = angular.copy(this.selectedDistrict.name);

			// this.selectedSchool = angular.copy(this.district.schools[schoolIndex].schoolName);
			// this.searchSchoolText = this.selectedSchool;

			// this.loading = false;
			this.loadingSchools = false;
		})
		.catch(err => {
			this.loading = false;
			console.log("Err", err);
			throw err;
		});
	}

	$onInit(){
	}

	refreshUI(forceApply){
		this.headText = this.captions[this.desafio.type];
		this.showViculo = ['propuesta', 'actividad', 'orientacion' ].indexOf(this.desafio.type) > -1;
		this.getPublisheds(forceApply);
	}

	getPublisheds(forceApply){
		if (!this.showViculo){
			return;
		}
    let q;
    if (this.filterText){
      q = this.filterText
		}

		this.Publisheds
			.getList({
				q: q
			})
			.then(publisheds => {
				let filtered = _.filter(publisheds, p => {
					return p._id !== this.uid;
				});

				this.publisheds = _.map(filtered, p =>{
					p.typeCaption = this.captions[p.type];
					return p;
				});

				if (forceApply){
					//this.$scope.$apply();
				}
			});
	}

	getCategories_(){
		async.waterfall([
			(cb) => {
				this
					.loadCategories()
					.then(() => cb())
					.catch(cb);
			},
			(cb) => {
				// here init the stuff
				let st = this.getCategory('software');
				let at = this.getCategory('area');
				let lt = this.getCategory('nivel');
				let ac = this.getCategory('accessibility');
				let us = this.getCategory('desafio');
				let os = this.getCategory('os');
				let or = this.getCategory('orientacion');
				
				this.softwares = st.values;
				this.areas = at.values;
				this.niveles = lt.values;
				this.accessibilities = ac.values;
				this.usabilities = us.values;
				this.platforms = os.values;
				this.orientaciones = or.values;
				cb()
			}
		], err => {
			if (err){
				this.$log.error(err);
			}
		});
	}

	watchDesafio(){
		this.saveTimes = 0;

		this.$scope.$watch(() => { return this.desafio; }, (value) => {
			this.refreshUI();
			this.saveTimes++;
			if (this.saveTimes <= 1){
				return;
			}
			if (this.saverHandler) {
				clearInterval(this.saverHandler);
			}
			this.saverHandler = setInterval(() => {
				this.saveDesafio();
				clearInterval(this.saverHandler);
			}, 500);
		}, true);
	}

	configureFunctions(){	
		this.onEnterStep = (step) => {
			this.$timeout(() => {
				this.currentStep = step.name;
				
				if (!this.init && !this.loading){
					this.desafio.step = 'publicar';
				}
				
				this.init = false;
				this.$scope.$apply();
			});
		};

		this.save = (button) => {
			this.saveDesafio(button);
		};

		this.finish = ($event) => {
			if (this.desafio.district && this.desafio.school) {
                this.publish()
			} else {
                $('#msg').show();
                this.functionShowMsg('Para poder publicar/aprobar este desafio, debe seleccionar un Distrito y un Colegio.');
			}
		};

		this.toRefuse = ($event) => {
			this.desafio.status = 'rechazado';
			this.desafio
					.put()	
					.then(data => {
						(this.returnDesafios) ? this.$state.go('curador.dashboarddesafiosresueltos', { type: "desafios" }) : this.$state.go('curador.dashboarddesafiosresueltos');
					})
					.catch(err => {
						throw err;
					});
		}
	}

    functionShowMsg(msg) {
    	this.msg = msg;
        this.$timeout(function(){
			$('#msg').hide();
		}, 5000);
	}

	configureDropzone(Util){

		var ctrl = this;
   	 	this.dzOptions = {
			dictDefaultMessage: '<div class="dz-clickable"></div>',
      		url : '/upload?relative=' + this.uid,
			paramName : 'Imágen',
			maxFiles: 1,
			clickable: '.dz-tumbnail-clickable',
			maxFilesize : 1024,
			timeout: 18000000,
      		acceptedFiles : 'image/*, application/pdf',
      		addRemoveLinks : false,
			headers: Util.getHeaders(),
			init: function(){
				// add dropzone to ctrl
				ctrl.dropzoneThumbnail = this;
			}
		};

		this.dzCallbacks = {
			'addedfile' : (file) => {
				console.log(file);
			},
			'removedfile' : (file) => {
				console.log(file);
			},
			'success' : (file, xhr) => {
				console.log(xhr);
				this.desafio.thumbnail = xhr.url;
			},
			'processing': (file) => {
				console.log(file);
			},
			'queuecomplete': () => {
				ctrl.dropzoneThumbnail.removeAllFiles();
			}
		};

		this.dzOptionsSoftware = _.cloneDeep(this.dzOptions);
		this.dzOptionsSoftware.init = function(){
			// add dropzone to ctrl
			ctrl.dropzoneSoftware = this;
		};
		this.dzOptionsSoftware.acceptedFiles = 'application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf, image/*'; //'*/*';
		this.dzOptionsSoftware.maxFiles = Infinity;
		this.dzOptionsSoftware.dictDefaultMessage = '<div class="dz-clickable"></div>';
		this.dzOptionsSoftware.clickable = '.dz-software-clickable';

		this.dzCallbacksSoftware = {
			'addedfile' : (file) => {
				console.log(file);
			},
			'removedfile' : (file) => {
				console.log(file);
			},
			'success' : (file, xhr) => {
				this.desafio.files.push(xhr);
			},
			'error' : (err) => {
				this.$log.error(err);
			},
			'processing': () => {
				console.log('processing');
			},
			'queuecomplete': () => {
				console.log('queuecomplete');
				//ctrl.dropzoneSoftware.removeAllFiles();
			}
		};
	}

	getDesafio(){
		this.Desafio
		.get()
		.then(data => {
			this.desafio = data;
			console.log(this.desafio);
			this.returnDesafios = (this.desafio.type == 'desafio') ? true : false;

			this.ngMeta.setTitle(this.desafio.title);
			this.ngMeta.setTag('description', this.desafio.summary);

			if (typeof this.desafio.area == 'string'){
				this.desafio.area = [];
			}

			if (typeof this.desafio.nivel == 'string'){
				this.desafio.nivel = [];
			}

			if (this.desafio.step){
				let idx = _.findIndex(this.steps, { name: this.desafio.step });
				this.initStepIndex = idx === -1 ? undefined : idx;
			}

			if (this.desafio.type === 'mediateca'){
				this.steps = [
					{ name: 'ficha', 		caption: 'Ficha' },
					{ name: 'recurso', 	caption: 'Recurso' },
					//{ name: 'vinculo', caption: 'Vínculo' },
					{ name: 'publicar', caption: 'Publicar' },
				];
			}

			//===============================================
			// Exclusive 'Desafios' validations
			//===============================================
			
			if(this.desafio.type === 'desafio' && this.desafio.district)
			{
				// Create angular 'Desafios' variables
				this.selectedDistrict = {};
				this.selectedSchool = this.desafio.school || '';

				this.searchDistrictText = this.desafio.district || '';
				// this.searchSchoolText = '';

				this.rate = this.desafio.rate || 0;

				this.School = this.Restangular.one('schools/district', this.searchDistrictText);

				this.getSchool();
			}

			//===============================================


			_.each(this.desafio.links, l =>{
				l.typeCaption = this.captions[l.type];
			});

			this.loading = false;
			this.watchDesafio()
		})
		.catch(err => {
			throw err;
		});
	}

	$onDestroy() {
		if (this.saverHandler) {
			clearInterval(this.saverHandler);
		}
	}
	
	saveDesafio(button){

		onSaveDesafio();
		if (button) {
			this.desafio.status = 'pendiente';
		}
		this.desafio
			.put()
			.then(data => {
				this.$log.log('autosaved', data);
				if (button) {
					(this.returnDesafios) ? this.$state.go('curador.dashboarddesafiosresueltos', { type: "desafios" }) : this.$state.go('curador.dashboarddesafiosresueltos');
				}
			})
			.catch(err => {
				throw err;
			});
	}


	onSaveDesafios()
	{
		if(this.desafio.type === 'desafio')
		{
			this.desafio.district = (this.selectedDistrict) ? angular.copy(this.selectedDistrict.name) : null;
			this.desafio.school = (this.selectedSchool) ? angular.copy(this.selectedSchool.schoolName) : null;
			this.desafio.rate = angular.copy(this.rate);
		}
	}

	
	canNext(step){
    return true;
  }
	
	editTumbnail(){
		
	}

	exists(item, list){
		if (list == undefined){
			return false;
		}
		return list.indexOf(item) > -1;
	}

	toggle(item, list){
		if (list == undefined){
			return;
		}
		var idx = list.indexOf(item);
    if (idx > -1) {
      list.splice(idx, 1);
    }
    else {
      list.push(item);
    }
	}

	existsObject(item, list){
		return _.some(list, l => {
			if (typeof l === 'string'){
				return l == item._id;
			}
			return l._id == item._id;
		});
	}

	toggleObject(item, list){
    var idx = _.findIndex(list, l => {
			if (typeof l === 'string'){
				return l == item._id;
			}
			return l._id == item._id;
		});
		
    if (idx > -1) {
      list.splice(idx, 1);
    }
    else {
      list.push(item);
    }
	}

	onDeletePost_($index){
		if (this.desafio.postBody instanceof Array){
			this.desafio.postBody.splice($index, 1);
		}
	}

	textSelection(length){
		if (length > 1){
			return 'seleccionados';
		}
		return 'seleccionado';
	}

	removeAllFiles(){
		this.desafio.files.splice(0, this.desafio.files.length)
	}

	sumfiles(files){
		return _.sumBy(files, 'size');
	}

	deleteDesafio(){
		let Published = this.Restangular.one('publisheds', this.uid)
		this.loading = true;
		
		this
			.Desafio
			.remove()
			.then( data => {
				if (this.desafio.published) {
					Published
					.remove()
					.then( data => {
						(this.returnDesafios) ? this.$state.go('curador.dashboarddesafiosresueltos', { type: "desafios" }) : this.$state.go('curador.dashboarddesafiosresueltos');
					})
					.catch( err => {
						throw err;
					});
				} else {
					(this.returnDesafios) ? this.$state.go('curador.dashboarddesafiosresueltos', { type: "desafios" }) : this.$state.go('curador.dashboarddesafiosresueltos');
				}
			})
			.catch( err => {
				throw err;
			});
	}
	
	publish(ev){
		// Appending dialog to document.body to cover sidenav in docs app
		var confirm = this.$mdDialog.confirm()
					.title('¿Está seguro que desea hacer publico este recurso?')
					.ariaLabel('Publicación del Recurso')
					.targetEvent(ev)
					.ok('Publicar')
					.cancel('Cancelar');

		this.$mdDialog.show(confirm).then(() => {
			this.desafio.status = 'aprobado';
			this.saveDesafio();
			this.releasePublish();
		}, () => {
		});
	}
	
	releasePublish(){
		this.loading = true;
		this.desafio
			.post('publish')
			.then(data => {
				this.$log.log('published', data);
				this.loading = false;
				(this.returnDesafios) ? this.$state.go('curador.dashboarddesafiosresueltos', { type: "desafios" }) : this.$state.go('curador.dashboarddesafiosresueltos');
			})
			.catch(err => {
				throw err;
			});
	}


	getDesafioType(type){
		return this.captions[type];
	}
}
