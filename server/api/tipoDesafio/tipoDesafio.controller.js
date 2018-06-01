'use strict';

import TipoDesafio from './tipoDesafio.model';


/**
 * Get list of categories
 * restriction: 'authenticate'
 */
export function index(req, res, next) {
	var query = req.querymen;
	
	TipoDesafio
		.find({})
		.count()
		.exec((err, count) => {
			if (err){
				return next(err);
			}
			req.totalItems = count;
			req.result = TipoDesafio
										.find(query.query)
										.skip(query.cursor.skip)
										.limit(query.cursor.limit)
										.sort(query.sort)
										.select(query.select)
										.exec();
			next();
		});
}



export function create(req, res, next) {
  var newTipoDesafio = new TipoDesafio(req.body);
  
	req.result = newTipoDesafio.save();
	next();
}


export function update(req, res, next) {
	delete req.body._id;

	req.result = TipoDesafio.update({ _id: req.params.id}, req.body);
	next();
}



export function show(req, res, next) {
  var tipoDesafioId = req.params.id;

	req.result = TipoDesafio.findById(tipoDesafioId).exec();
	next();
}

export function getByType(req, res, next) {
  var tipoDesafioType = req.params.type;

	req.result = TipoDesafio.findOne({type: tipoDesafioType}).exec();
	next();
}