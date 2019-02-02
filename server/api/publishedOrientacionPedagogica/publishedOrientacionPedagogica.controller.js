'use strict';

import Published from './publishedOrientacionPedagogica.model';
import _ from 'lodash';
import zip from 'express-zip';
import config from '../../config/environment';
import path from 'path';

/**
 * Get list of publisheds
 * restriction: ''
 */
export function index(req, res, next) {
	var query = req.querymen;
	let qq = req.query.q;
	var type = req.query.type;
	var area = req.query.area || req.param.area;
	var areaEmergente = req.query.areaEmergente;
	var anio = req.query.anio;
	var troncal = req.query.troncal;
	var complementarias= req.query.complementarias;
	var intensivo = req.query.intensivo;
	var publicaHome = req.query.publicaHome;
	var orden = req.query.orden || req.param.orden;
	let q = {};



console.log(qq);
	if (qq){
  	// convert to regex
		let keywords = _.escapeRegExp(qq);
		let patterns = [
			{ s: /[aáà]/ig, v: '[aáà]' },
			{ s: /[eéè]/ig, v: '[eéè]' },
			{ s: /[iíì]/ig, v: '[iíì]' },
			{ s: /[oóò]/ig, v: '[oóò]' },
			{ s: /[uúù]/ig, v: '[uúù]' },
		];

		_.each(patterns, p => {
			keywords = keywords.replace(p.s, p.v);
		});

		let k = new RegExp(keywords, 'i');

		console.log(k);

	
		q = { $or: [
				{ type: { $regex: k, $options: 'i' } },
				{ objetivo: { $regex: k, $options: 'i' } },
				{ descripcion: { $regex: k, $options: 'i' } },
				{ nivel: { $regex: k, $options: 'i' } },			
				{ 'postBody.content': { $regex: k, $options: 'i' } },
				{ tags: { $regex: k, $options: 'i' } },
			]
		};
	}


	

	if (publicaHome){
		q['publicaHome'] =true;
	}

	if(complementarias ){
		q['complementarias'] =complementarias;
	}

	if(intensivo ){
		q['intensivo'] =intensivo;
	}
	if(troncal ){
		q['troncal'] = troncal;
	}

	if (type){
		q['$and'] = [ { type: type } ];
		if (q['$or']) {
			q['$or'].type = undefined; 
		}
	}

	if(orden ){
		q['orden'] = orden;
	}





	if (area) {
					
		let arrayArea=[];
		
		if(area === 'naturales'){	
			arrayArea.push (
				 'Cs. Naturales' );
				
		}
		if(area === 'matematica'){						
			arrayArea.push (
				'Matemática' );
		}
		if(area === 'lengua'){			
			arrayArea.push (
				'Prácticas del Lenguaje' );
		}

		if(area === 'lengua'){			
			arrayArea.push (
				'Prácticas del Lenguaje' );
		}
		
		
		if(area === 'sociales'){			
			arrayArea.push (
				'Cs. Sociales' );
		}

		if(area === 'plastica'){			
			arrayArea.push (
				'Plástica' );
		}

		if(area === 'danza'){			
			arrayArea.push (
				'Danza' );
		}

		if(area === 'musica'){			
			arrayArea.push (
				'Música' );
		}

		if(area === 'teatro'){			
			arrayArea.push (
				'Teatro' );
		}

		if(area === 'edfisica'){			
			arrayArea.push (
				'Ed. Física' );
		}

		if(area === 'ingles'){			
			arrayArea.push (
				'Inglés' );
		}


		if ( arrayArea.length === 0)
			area.push (
				area );



		if ( arrayArea.length > 0) 
		q['area']= { $in : arrayArea};
	}

	if (areaEmergente) {
			
	let arrayAreaEmergente=[];
	
	if(areaEmergente === 'pensamientoComputacional'){	
		arrayAreaEmergente.push (
			 'Pensamiento Computacional' );
			
	}
	if(areaEmergente === 'programacion'){						
		arrayAreaEmergente.push (
			'Programación' )
	}
	if(areaEmergente === 'robotica'){			
		arrayAreaEmergente.push (
			'Robótica' )
	}

	if ( arrayAreaEmergente.length > 0) 
	q['areaEmergente']= { $in : arrayAreaEmergente};
	}

	if (anio) {		
	let arrayAnio=[];
	

	if(anio === 'quinto'){						
		arrayAnio.push (
			'5to' )
	}
	if(anio === 'sexto'){			
		arrayAnio.push (
			'6to' )
	}

	if ( arrayAnio.length > 0) 
	q['anio']= { $in : arrayAnio};
}


	console.log(q);

	
	Published
		.find(q)
		.count()
		.exec((err, count) => {
			if (err){
				return next(err);
			}
			req.totalItems = count;
			req.result = Published
										.find(q)
										.populate({path: 'orientacionpedagogica'})									
										.populate('owner')
										.populate('files')
										.populate('links')
										.populate('linksRecursos')
										.sort(query.cursor.sort)
										.skip(query.cursor.skip)
										.limit(query.cursor.limit)
										.select(query.cursor.select)
										.exec();


			

			next();
		});
}


/**
 * Creates a new published
 * restriction: 'admin'
 */
export function create(req, res, next) {
  var newPublished = new Published(req.body);
  
	req.result = newPublished.save();
	next();
}


/**
 * Updates a published
 * restriction: 'admin'
 */
export function update(req, res, next) {
	delete req.body._id;

	req.result = Published.update({ _id: req.params.id}, req.body);
	next();
}


/**
 * Get a single published
 * restriction: ''
 */
export function show(req, res, next) {
  var publishedId = req.params.id;

	req.result = Published
								.findById(publishedId)
								.populate('owner')
								.populate('files')
								.populate('links')
								.populate('linksRecursos')
								.populate({
									path: 'orientacionpedagogica'
								  })
								.exec();
	next();
}

/**
 * Download files
 * restriction: ''
 */
export function download(req, res, next) {
  var publishedId = req.params.id;

	Published
		.findById(publishedId)
		.populate('files')
		.exec()
		.then(p => {
			res.zip(p.files.map(f => {
				return {
					path: path.join(config.uploads, f.relative),
					name: f.name
				}
			}), `${p.objetivo.replace(' ', '_').slice(0,20)}.zip`);
		});
}

export function relations(req, res, next) {
  var publishedId = req.params.id;

	req.result = Published
								.find({ links: publishedId })
								.exec();
	next();
}

/**
 * Deletes a published
 * restriction: ''
 */
export function destroy(req, res, next) {
	req.result =  Published.findByIdAndRemove(req.params.id).exec();
	req.statusCode = 204;
	next();
}

export function findArea(req, res, next) {
	var query = req.querymen;
	let qq = req.query.q;	

	var areaParam = req.params.area;


	console.log (areaParam);
	let q = {};
	if (areaParam){
  	// convert to regex
		let keywords = _.escapeRegExp(areaParam);
		let patterns = [
			{ s: /[aáà]/ig, v: '[aáà]' },
			{ s: /[eéè]/ig, v: '[eéè]' },
			{ s: /[iíì]/ig, v: '[iíì]' },
			{ s: /[oóò]/ig, v: '[oóò]' },
			{ s: /[uúù]/ig, v: '[uúù]' },
		];

		_.each(patterns, p => {
			keywords = keywords.replace(p.s, p.v);
		});

		let k = new RegExp(keywords, 'i');

		q = { $or: [			
				{ area: { $regex: k, $options: 'i' } }
				
			]
		};
	}
	
	

	Published
		.find(q)
		.count()
		.exec((err, count) => {
			if (err){
				return next(err);
			}
			req.totalItems = count;
			req.result = Published
										.find(q)
										.sort(query.cursor.sort)
										.skip(query.cursor.skip)
										.limit(query.cursor.limit)
										.select(query.cursor.select)
										.exec();
			next();
		});
}



export function buscarPorOrden(req, res, next) {
	var query = req.querymen;
	let qq = req.query.q;
	var type = req.query.type;
	var area =  req.params.area;
	var areaEmergente = req.query.areaEmergente;
	var anio = req.query.anio;
	var troncal = req.query.troncal;
	var complementarias= req.query.complementarias;
	var intensivo = req.query.intensivo;
	var publicaHome = req.query.publicaHome;
	var orden =  req.params.orden;
	let q = {};


	
	if (qq){
  	// convert to regex
		let keywords = _.escapeRegExp(qq);
		let patterns = [
			{ s: /[aáà]/ig, v: '[aáà]' },
			{ s: /[eéè]/ig, v: '[eéè]' },
			{ s: /[iíì]/ig, v: '[iíì]' },
			{ s: /[oóò]/ig, v: '[oóò]' },
			{ s: /[uúù]/ig, v: '[uúù]' },
		];

		_.each(patterns, p => {
			keywords = keywords.replace(p.s, p.v);
		});

		let k = new RegExp(keywords, 'i');

		q = { $or: [
				{ type: { $regex: k, $options: 'i' } },
				{ objetivo: { $regex: k, $options: 'i' } },
				{ descripcion: { $regex: k, $options: 'i' } },
				{ nivel: { $regex: k, $options: 'i' } },
			
				{ 'postBody.content': { $regex: k, $options: 'i' } },
				{ tags: { $regex: k, $options: 'i' } },
			]
		};
	}


	if (publicaHome){
		q['publicaHome'] =true;
	}

	if(complementarias ){
		q['complementarias'] =complementarias;
	}

	if(intensivo ){
		q['intensivo'] =intensivo;
	}
	if(troncal ){
		q['troncal'] = troncal;
	}

	if (type){
		q['$and'] = [ { type: type } ];
		if (q['$or']) {
			q['$or'].type = undefined; 
		}
	}

	if(orden ){
		q['orden'] = orden;
	}


	if (area) {
					
		let arrayArea=[];		
	
		arrayArea.push (
				area );
		if ( arrayArea.length > 0) 
		q['area']= { $in : arrayArea};
	}

	if (areaEmergente) {
			
	let arrayAreaEmergente=[];
	
	if(areaEmergente === 'pensamientoComputacional'){	
		arrayAreaEmergente.push (
			 'Pensamiento Computacional' );
			
	}
	if(areaEmergente === 'programacion'){						
		arrayAreaEmergente.push (
			'Programación' )
	}
	if(areaEmergente === 'robotica'){			
		arrayAreaEmergente.push (
			'Robótica' )
	}

	if ( arrayAreaEmergente.length > 0) 
	q['areaEmergente']= { $in : arrayAreaEmergente};
	}

	if (anio) {	
	let arrayAnio=[];			
		
	if (Array.isArray(anio)){
		arrayAnio=anio;
	}else{
		arrayAnio.push (
			anio );
	}
	

			
			if ( arrayAnio.length > 0) 
	q['anio']= { $in : arrayAnio};
	}
	

	



	console.log(q);

	
	Published
		.find(q)
		.count()
		.exec((err, count) => {
			if (err){
				return next(err);
			}
			req.totalItems = count;
			req.result = Published
										.find(q)
										.populate({path: 'orientacionpedagogica'})									
										.populate('owner')
										.populate('files')
										.populate('links')
										.populate('linksRecursos')
										.sort(query.cursor.sort)
										.skip(query.cursor.skip)
										.limit(query.cursor.limit)
										.select(query.cursor.select)
										.exec();


			

			next();
		});
}




