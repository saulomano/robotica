'use strict';

import Province from './province.model';


/**
 * Get list of provinces (Untested!)
 * restriction: 'authenticate'
 */
export function index(req, res, next) {
	var query = req.querymen;
	
	Province
		.find({})
		.count()
		.exec((err, count) => {
			if (err){
				return next(err);
			}
			req.totalItems = count;
			req.result = Province
										.find(query.query)
										.skip(query.cursor.skip)
										.limit(query.cursor.limit)
										.sort(query.sort)
										.select(query.select)
										.exec();
			next();
		});
}


/**
 * Creates a new province (Untested!)
 * restriction: 'admin'
 */
export function create(req, res, next) {
  var newProvince = new Province(req.body);
  
	req.result = newProvince.save();
	next();
}


/**
 * Updates a province (Untested!)
 * restriction: 'admin'
 */
export function update(req, res, next) {
	delete req.body._id;

	req.result = Province.update({ _id: req.params.id}, req.body);
	next();
}


/**
 * Get a single province (Untested!)
 * restriction: 'authenticate'
 */
export function show(req, res, next) {
  var provinceName = req.params.name;

	req.result = Province.findById(provinceName).exec();
	next();
}

export function getByName(req, res, next) {
  var provinceName = req.params.name;

	req.result = Province.findOne({type: provinceName}).exec();
	next();
}