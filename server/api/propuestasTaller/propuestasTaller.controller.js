'use strict';

import PropuestaTaller from './propuestasTaller.model';
import Published from '../propuestasTaller/propuestasTaller.model';
import async from 'async';
import _ from 'lodash';

/**
 * Get list of resources
 * restriction: 'authenticate'
 */
export function index(req, res, next) {
	var query = req.querymen;
	let qq = req.query.q;
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
				
				{ title: { $regex: k, $options: 'i' } },				
				{ area: { $regex: k, $options: 'i' } },				
			]
		};
	}

	PropuestaTaller
		.find(q)
		.count()
		.exec((err, count) => {
			if (err){
				return next(err);
			}
			req.totalItems = count;
			req.result = PropuestaTaller
							.find(q)
							.populate('owner')						
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
 * Creates a new resource
 * restriction: 'curador'
 */
export function create(req, res, next) {
  var newPropuestaTaller = new OrientPropuestaTalleracionPedagogica(req.body);
  
	req.result = newPropuestaTaller.save();
	next();
}


/**
 * Updates a resource
 * restriction: 'curador'
 */
export function update(req, res, next) {
	delete req.body._id;

	req.result = PropuestaTaller.update({ _id: req.params.id}, req.body);
	next();
}


/**
 * Get a single resource
 * restriction: 'authenticate'
 */
export function show(req, res, next) {
  var propuestaTallerId = req.params.id;

	req.result = PropuestaTaller
								.findById(propuestaTallerId)
								.populate('owner')
								.populate('propuestas')
								.populate('published')        					
								.exec();
	next();
}


/**
 * Deletes a resource
 * restriction: 'authenticate'
 */
export function destroy(req, res, next) {
	Published.findByIdAndRemove(req.params.id).exec();
	req.result =  PropuestaTaller.findByIdAndRemove(req.params.id).exec();



	next();
}


/**
 * Publish a resource
 * restriction: 'curador'
 */
export function publish(req, res, next) {
	let propuestaTaller = req.body;
	let pid = propuestaTaller.published ? propuestaTaller.published._id : undefined;
	let published = new Published(propuestaTaller);


	// find the resource
	if (pid === undefined){
		published.createdAt = new Date();
		published.updatedAt = new Date();
		published
			.save()
			.then(p => {
				delete propuestaTaller._id;
				propuestaTaller.published = p._id;
				PropuestaTaller
					.update({ _id: req.params.id}, req.body)
					.then(p => {
						req.result = PropuestaTaller
							.findById(req.params.id)
							.populate('owner')
							.populate('propuestas')
							.populate('published')
                           
							.exec();
		
						next();
					});
			});
	} else {
		delete published._id;
		published.updatedAt = new Date();
		Published
			.update({ _id: pid}, published)
			.then(p => {
				req.result = PropuestaTaller
					.findById(req.params.id)
					.populate('owner')
					.populate('propuestas')
					.populate('published')
                   
					.exec();

				next();
			});
	}
	
}
