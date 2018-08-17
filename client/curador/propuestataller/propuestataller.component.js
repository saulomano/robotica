'use strict';
import angular from 'angular';
import CuradorComponent from '../curador.component';
import async from 'async';
import _ from 'lodash';

export default class PropuestaTallerComponent extends CuradorComponent {
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
		this.deleteDesafioBoolean=== 'remove';
		this.simulateQuery = true;
    	this.isDisabled = false;
    	this.noCache = true;

        this.captions = {
            'orientacionpedagogica': 'Orientacion Pedagogica'
            
        };
		
		// this.Resource = this.Restangular.one('resources', this.uid);
		this.Propuestataller = this.Restangular.one('propuestasTaller', this.uid);
		this.PublishedsOrientaciones = this.Restangular.all('publishedOrientacionPedagogica');

		this.returnDesafios = false;

		// tag separators
		this.tagsKeys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA];
		
		this.resource = {};
		this.steps = [
			{ name: 'ficha', 		caption: 'Ficha' },
			//{ name: 'recurso', 	caption: 'Recurso' },
			{ name: 'vinculo', caption: 'Vínculo' },
			{ name: 'publicar', caption: 'Publicar' },
		];
		let captions = {
			'propuestataller': 'propuesta Taller'
		};
		this.configureDropzone(Util);
		this.configureFunctions();
		this.getResource();
		this.getCategories_();
		this.loadTiposDesafio();
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

	

	/**
     * Create filter function for a query string
     */
    createFilterFor(query) {
		var lowercaseQuery = angular.lowercase(query);
		return function filterFn(state) {
		  	return (state.value.indexOf(lowercaseQuery) === 0);
		};
	}



	

	$onInit(){
	}

	refreshUI(forceApply){
		this.headText = 'Propuesta taller';
	//	this.showViculo = ['propuestataller' ].indexOf(this.PublishedsOrientaciones.route) > -1;
		this.getPublisheds(forceApply);
	}

	getPublisheds(forceApply){



	/*	if (!this.showViculo){
			return;
		}*/


		let area={};       
        let anio={}; 



for (var i in this.resource.area) {
	if (this.resource.area[i]==='Prácticas del Lenguaje'){
		area.lengua=true;
	}else if(this.resource.area[i]==='Matemática'){
		area.matematica=true;
	}else if(this.resource.area[i]==='Cs. Naturales'){
		area.naturales=true;
	}

	
  }


  for (var i in this.resource.anio) {
	if (this.resource.anio[i]==='5to'){
		anio.quinto=true;
	}else if(this.resource.anio[i]==='6to'){
		anio.sexto=true;
	}
	
	
  }

    let q;
    if (this.filterText){
      q = this.filterText
		}

		this.PublishedsOrientaciones
			.getList({
				q: q,
				complementarias:false,
				troncal:false,
				area:area,
				anio:anio
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
			
				let at = this.getCategory('area');
				let ant = this.getCategory('anio');
				this.areas = at.values;
								
				this.anio =ant.values;
				cb()
			}
		], err => {
			if (err){
				this.$log.error(err);
			}
		});



		

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
				this.resource.thumbnail = xhr.url;
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
			(this.isEdit) ? this.$state.go('curador.dashboardpropuestataller') : this.deleteResource();
		};

		this.finish = ($event) => {
			
                this.publish();
			
		}

		this.toRefuse = ($event) => {
			this.resource.status = 'rechazado';
			this.resource
					.put()	
					.then(data => {
						(this.returnDesafios) ? this.$state.go('curador.propuestataller', { type: "propuestataller" }) : this.$state.go('curador.propuestataller');
					})
					.catch(err => {
						throw err;
					});
		}
	}

	

	getResource(){
		this.Propuestataller
		.get()
		.then(data => {
			this.resource = data;
			console.log(this.resource);
			this.returnDesafios = (this.resource.type == 'propuestataller') ? true : false;

			this.ngMeta.setTitle(this.resource.titulo);
			this.ngMeta.setTag('description', this.resource.summary);

			if (typeof this.resource.area == 'string'){
				this.resource.area = [];
			}

			if (typeof this.resource.anio == 'string'){
				this.resource.anio = [];
			}

			if (this.resource.step){
				let idx = _.findIndex(this.steps, { name: this.resource.step });
				this.initStepIndex = idx === -1 ? undefined : idx;
			}

			


			_.each(this.resource.links, l =>{
				l.typeCaption = this.captions[l.type];
			});

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

		
		if (button) {
			this.resource.status = 'pendiente';
		}
		this.resource
			.put()
			.then(data => {
				this.$log.log('autosaved', data);
				if (button) {
					(this.returnDesafios) ? this.$state.go('curador.dashboarpropuestataller', { type: "propuestataller" }) : this.$state.go('curador.dashboarpropuestataller');
				}
			})
			.catch(err => {
				throw err;
			});
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
		let Published = this.Restangular.one('publishedPropuestTaller', this.uid)
		this.loading = true;
		
		this
			.Propuestataller
			.remove()
			.then( data => {
				if (this.resource.published) {
					Published
					.remove()
					.then( data => {
						(this.returnDesafios) ? this.$state.go('curador.dashboarpropuestataller', { type: "propuestataller" }) : this.$state.go('curador.dashboarpropuestataller');
					})
					.catch( err => {
						throw err;
					});
				} else {
					(this.returnDesafios) ? this.$state.go('curador.dashboarpropuestataller', { type: "propuestataller" }) : this.$state.go('curador.dashboarpropuestataller');
				}
			})
			.catch( err => {
				throw err;
			});
	}
	
	publish(ev){
		// Appending dialog to document.body to cover sidenav in docs app
		var confirm = this.$mdDialog.confirm()
					.title('¿Está seguro que desea hacer publico este taller?')
					.ariaLabel('Publicación de la propuesta')
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
				this.$log.log('publishedPropuestaTaller', data);
				this.loading = false;
				(this.returnDesafios) ? this.$state.go('curador.dashboarpropuestataller', { type: "propuestataller" }) : this.$state.go('curador.dashboarpropuestataller');
			})
			.catch(err => {
				throw err;
			});
	}


	getResourceType(type){
		return this.captions[type];
	}



	

}
