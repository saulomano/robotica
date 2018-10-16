'use strict';

import PropuestasTaller from '../publishedOrientacionPedagogica/publishedOrientacionPedagogica.model';
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
	var search = req.query.search;
	var type = req.query.type;
	
	let q = {};
	
	if (search){
  	// convert to regex
		let keywords = _.escapeRegExp(search);
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
				{ descripcion: { $regex: k, $options: 'i' } },		
				{ 'postBody.content': { $regex: k, $options: 'i' } },	
				{ 'tema.content': { $regex: k, $options: 'i' } },	
				{ 'habilidad.content': { $regex: k, $options: 'i' } },	
				{ 'potencialidades.content': { $regex: k, $options: 'i' } },	

				
			]
		};
	}


	if (type){
		q['$and'] = [ { type: type } ];
		if (q['$or']) {
			q['$or'].type = undefined; 
		}
	}


/*	if (area) {
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
}*/


console.log(q);
PropuestasTaller
		.find(q)
		.count()
		.exec((err, count) => {
			if (err){
				return next(err);
			}
			req.totalItems = count;
			req.result = PropuestasTaller
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


