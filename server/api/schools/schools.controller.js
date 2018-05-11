'use strict';

import School from './schools.model';


/**
 * Get list of provinces (Untested!)
 * restriction: 'authenticate'
 */
export function index(req, res, next) {
	var query = req.querymen;
	
	School
		.find({})
		.count()
		.exec((err, count) => {
			if (err){
				return next(err);
			}
			req.totalItems = count;
			req.result = School
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
  var newSchool = new School(req.body);
  
	req.result = newSchool.save();
	next();
}


/**
 * Updates a province (Untested!)
 * restriction: 'admin'
 */
export function update(req, res, next) {
	delete req.body._id;

	req.result = School.update({ _id: req.params.id}, req.body);
	next();
}


/**
 * Get a single district
 * restriction: 'none'
 */
export function show(req, res, next) {
  var districtName = req.params.name;
	
	req.result = School.findOne({name: districtName}).exec();
	next();
}

export function getAvailableDistricts(req, res, next) {
	req.result = School.find({}).exec((err, data) => {
		if(err)
		{
			return next(err);
		}

		next();
	});
}