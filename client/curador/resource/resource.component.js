'use strict';
import angular from 'angular';
import CuradorComponent from '../curador.component';
import async from 'async';
import $ from 'jquery';
import _ from 'lodash';

export default class ResourceComponent extends CuradorComponent {
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
		this.isEdit = $stateParams.action === 'edit';
		this.$state = $state;
		this.$mdDialog = $mdDialog;
		this.ngMeta = ngMeta;
		this.$q = $q;

		this.simulateQuery = true;
    	this.isDisabled = false;
		this.noCache = true;
		
		this.getResources_();
		

		// list of `state` value/display objects
	//	this.states = this.loadAll();

		// Global captions to avoid unnecesary temporary captions inside functions
		this.captions = {
			'tutorial': 'tutorial',
      'herramienta': 'herramienta',
      'materialapoyo': 'materialapoyo',
      'experiencia': 'experiencia',
      'ejemplos': 'ejemplos'
		};

		this.Resource = this.Restangular.one('resources', this.uid);
		this.Publisheds = this.Restangular.all('resources');

		this.returnDesafios = false;

		// tag separators
		this.tagsKeys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA];
		
		this.resource = {};
		this.steps = [
			{ name: 'ficha', 		caption: 'Ficha' },
			{ name: 'recurso', 	caption: 'Recurso' },
		//	{ name: 'vinculo', caption: 'Vínculo' },
			{ name: 'publicar', caption: 'Publicar' },
		];

		this.configureDropzone(Util);
	


		this.configureFunctions();
		this.getResource();
	
		this.onDeletePost = ($index) => {
			this.onDeletePost_($index);
		};

		this.$scope.$watch(() => { return this.filterText }, (value) => {
			this.refreshUI(true);
		});

		
	
	}

	changeTipoRecurso(){
						

		if (this.resource.tipoRecurso === 'Presentación')
		this.dzOptionsSoftware.acceptedFiles = '.ppt'; 
	

		if (this.resource.tipoRecurso === 'PDF')
		this.dzOptionsSoftware.acceptedFiles = 'application/pdf'; 

		if (this.resource.tipoRecurso === 'Imágen')
		this.dzOptionsSoftware.acceptedFiles = 'image/*'; 

		if (this.resource.tipoRecurso === 'Software')
		this.dzOptionsSoftware.acceptedFiles = '.exe'; 


		this.resource.video='';
		this.resource.audio='';
		this.removeAllFiles();
	
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

   
	getResources_(){
		async.waterfall([
			(cb) => {
				this
					.loadCategories()
					.then(() => cb())
					.catch(cb);
			},
			(cb) => {
				// here init the stuff
			
				this.tipoRecursos = this.getCategory('resource').values;
				cb()
			}
		], err => {
			if (err){
				this.$log.error(err);
			}
		});



		

	}
	

	/**
     * Create filter function for a query string
     */
    createFilterFor(query) {
		var lowercaseQuery = angular.lowercase(query);
		return function filterFn(state) {
		  	return (state.value.indexOf(lowercaseQuery) > -1);
		};
	}

   

	
	

	$onInit(){
	}

	refreshUI(forceApply){
		this.headText = this.captions[this.resource.subtype];
		this.showViculo = ['propuesta', 'actividad', 'orientacion' ].indexOf(this.resource.subtype) > -1;
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
				let filtered = _.fil
				ter(publisheds, p => {
					return p._id !== this.uid;
				});

				this.publisheds = _.map(filtered, p =>{
					p.typeCaption = this.captions[p.subtype];
					return p;
				});

				if (forceApply){
					//this.$scope.$apply();
				}
			});
	}

	

	watchResource(){
		this.saveTimes = 0;

		this.$scope.$watch(() => { return this.resource; }, (value) => {
			this.refreshUI();
			this.saveTimes++;
			if (this.saveTimes <= 1){
				return;
			}
			if (this.saverHandler) {
				clearInterval(this.saverHandler);
			}
			this.saverHandler = setInterval(() => {
				this.saveResource();
				clearInterval(this.saverHandler);
			}, 500);
		}, true);
	}

	configureFunctions(){	
		this.onEnterStep = (step) => {
			this.$timeout(() => {
				this.currentStep = step.name;
				
				if (!this.init && !this.loading){
					this.resource.step = 'publicar';
				}
				
				this.init = false;
				this.$scope.$apply();
			});
		};

		this.save = (button) => {
			this.saveResource(button);
		};

		this.cancel = () => {
			(this.isEdit) ? this.$state.go('curador.dashboard') : this.deleteResource();
		};

		this.finish = ($event) => {	
			if (this.resource.type !== 'desafio') {
				this.publish();
			} else if (this.selectedDistrict && this.selectedSchool) {
                this.publish();
			} else {
                $('#msg').show();
                this.functionShowMsg('Para poder publicar/aprobar este desafio, debe seleccionar un Distrito y un Colegio.');
			}
		};

		this.toRefuse = ($event) => {
			this.resource.status = 'rechazado';
			this.resource
					.put()	
					.then(data => {
						(this.returnDesafios) ? this.$state.go('curador.dashboard', { type: "desafios" }) : this.$state.go('curador.dashboard');
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
      		acceptedFiles : 'image/*, application/pdf,.zip, .rar, .7z',
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
			
			},
			'processing': (file) => {
				console.log(file);
			},
			'queuecomplete': () => {
				//ctrl.dropzoneThumbnail.removeAllFiles();
			}
		};

		this.dzOptionsSoftware = _.cloneDeep(this.dzOptions);
		this.dzOptionsSoftware.init = function(){
			// add dropzone to ctrl
			ctrl.dropzoneSoftware = this;
		};
	//	this.dzOptionsSoftware.acceptedFiles = 'application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf, image/*'; //'*/*';
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
				this.resource.files.push(xhr);
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



	

	getResource(){
		this.Resource
		.get()
		.then(data => {
			this.resource = data;
			console.log(this.resource);
		
			this.ngMeta.setTitle(this.resource.title);
			this.ngMeta.setTag('description', this.resource.descripcion);

		

			if (this.resource.step){
				let idx = _.findIndex(this.steps, { name: this.resource.step });
				this.initStepIndex = idx === -1 ? undefined : idx;
			}

		
		

			this.loading = false;
			this.watchResource()
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
	
	saveResource(button){

		this.onSaveResource();
		if (button) {
			this.resource.status = 'pendiente';
		}
		this.resource
			.put()
			.then(data => {
				this.$log.log('autosaved', data);
				if (button) {
					(this.returnDesafios) ? this.$state.go('curador.propuestadesafio', { type: "desafios" }) : this.$state.go('curador.propuestadesafio');
				}
			})
			.catch(err => {
				throw err;
			});
	}


	onSaveResource()
	{
		if(this.resource.type === 'desafio')
		{
			this.resource.district = (this.selectedDistrict) ? angular.copy(this.selectedDistrict.name) : null;
			this.resource.school = (this.selectedSchool) ? angular.copy(this.selectedSchool.schoolName) : null;
			this.resource.rate = angular.copy(this.rate);
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
		if (this.resource.postBody instanceof Array){
			this.resource.postBody.splice($index, 1);
		}
	}

	textSelection(length){
		if (length > 1){
			return 'seleccionados';
		}
		return 'seleccionado';
	}

	removeAllFiles(){
		this.resource.files.splice(0, this.resource.files.length)
	}

	sumfiles(files){
		return _.sumBy(files, 'size');
	}

	deleteResource(){
		let Published = this.Restangular.one('publisheds', this.uid)
		this.loading = true;
		
		this
			.Resource
			.remove()
			.then( data => {
				if (this.resource.published) {
					Published
					.remove()
					.then( data => {
						(this.returnDesafios) ? this.$state.go('curador.dashboard', { type: "desafios" }) : this.$state.go('curador.dashboard');
					})
					.catch( err => {
						throw err;
					});
				} else {
					(this.returnDesafios) ? this.$state.go('curador.dashboard', { type: "desafios" }) : this.$state.go('curador.dashboard');
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
			this.resource.status = 'aprobado';
			this.saveResource();
			this.releasePublish();
		}, () => {
		});
	}
	
	releasePublish(){
		this.loading = true;
		this.resource
			.post('publish')
			.then(data => {
				this.$log.log('published', data);
				this.loading = false;
				(this.returnDesafios) ? this.$state.go('curador.dashboard', { type: "desafios" }) : this.$state.go('curador.dashboard');
			})
			.catch(err => {
				throw err;
			});
	}


	getResourceType(type){
		return this.captions[type];
	}
}
