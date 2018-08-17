'use strict';

import Published from './publishedPropuestTaller.model';
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
	var area = req.query.area;	
	var anio = req.query.anio;
	var publicaHome = req.query.publicaHome;

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
			
				{ titulo: { $regex: k, $options: 'i' } },
				{ descripcion: { $regex: k, $options: 'i' } }				
			]
		};
	}


	if (type){
		q['$and'] = [ { type: type } ];
		if (q['$or']) {
			q['$or'].type = undefined; 
		}
	}


		if (publicaHome) {
			q['publicaHome'] = true;
		}

	if (area) {
			area=JSON.parse(area);		
		let arrayArea=[];
		
		if(area.naturales){	
			arrayArea.push (
				 'Cs. Naturales' );
				
		}
		if(area.matematica){						
			arrayArea.push (
				'Matemática' )
		}
		if(area.lengua){			
			arrayArea.push (
				'Prácticas del Lenguaje' )
		}

		if ( arrayArea.length > 0) 
		q['area']= { $in : arrayArea};
	}

	

	if (anio) {
		anio=JSON.parse(anio);		
	let arrayAnio=[];
	

	if(anio.quinto){						
		arrayAnio.push (
			'5to' )
	}
	if(anio.sexto){			
		arrayAnio.push (
			'6to' )
	}

	if ( arrayAnio.length > 0) 
	q['anio']= { $in : arrayAnio};
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
									//	.populate({path: 'orientacionpedagogica'})									
										.populate('owner')
										.populate('files')
                						.populate('propuestas')
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
        						.populate('propuestas')
								/*.populate({
									path: 'orientacionpedagogica'
								  })*/
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
		;
}

export function relations(req, res, next) {
  var publishedId = req.params.id;
	req.result = Published
								.find({ propuestas: publishedId })
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









