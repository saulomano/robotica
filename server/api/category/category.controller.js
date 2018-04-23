'use strict';

import Category from './category.model';


/**
 * Get list of categories
 * restriction: 'authenticate'
 */
export function index(req, res, next) {
	var query = req.querymen;
	
	Category
		.find({})
		.count()
		.exec((err, count) => {
			if (err){
				return next(err);
			}
			req.totalItems = count;
			req.result = Category
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
 * Creates a new category
 * restriction: 'admin'
 */
export function create(req, res, next) {
  var newCategory = new Category(req.body);
  
	req.result = newCategory.save();
	next();
}


/**
 * Updates a category
 * restriction: 'admin'
 */
export function update(req, res, next) {
	delete req.body._id;

	req.result = Category.update({ _id: req.params.id}, req.body);
	next();
}


/**
 * Get a single category
 * restriction: 'authenticate'
 */
export function show(req, res, next) {
  var categoryId = req.params.id;

	req.result = Category.findById(categoryId).exec();
	next();
}

export function getByType(req, res, next) {
  var categoryType = req.params.type;

	req.result = Category.findOne({type: categoryType}).exec();
	next();
}