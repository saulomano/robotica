'use strict';

import PropuestaDesafio from './propuestadesafio.model';
import Published from '../publishedpropuesta/publishedpropuesta.model';
import async from 'async';
import _ from 'lodash';

/**
 * Get list of desafio
 * restriction: 'user'
 */
export function index(req, res, next) {
	console.log('index() req: ', req);
	const userId = req.user._id;
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
				{ type: { $regex: k, $options: 'i' } },
				{ title: { $regex: k, $options: 'i' } },
				{ summary: { $regex: k, $options: 'i' } },
				{ nivel: { $regex: k, $options: 'i' } },
				{ area: { $regex: k, $options: 'i' } },
				{ accessibility: { $regex: k, $options: 'i' } },
				{ usability: { $regex: k, $options: 'i' } },
				{ platform: { $regex: k, $options: 'i' } },
				{ category: { $regex: k, $options: 'i' } },
				{ 'postBody.content': { $regex: k, $options: 'i' } },
				{ tags: { $regex: k, $options: 'i' } },
			]
		};
	}

	PropuestaDesafio
		.find({owner: userId})
		.count()
		.exec((err, count) => {
			if (err){
				return next(err);
			}
			req.totalItems = count;
			req.result = PropuestaDesafio
							.find({owner: userId})
							.populate('owner')
							.populate('files')
							.populate('tipoDesafio')
							.sort(query.cursor.sort)
							.skip(query.cursor.skip)
							.limit(query.cursor.limit)
							.select(query.cursor.select)
							.exec();
			next();
		});
}


/**
 * Creates a new desafio
 * restriction: 'user'
 */
export function create(req, res, next) {
  var newPropuestaDesafio = new PropuestaDesafio(req.body);
  
	req.result = newPropuestaDesafio.save();
	next();
}


/**
 * Updates a desafio
 * restriction: 'user'
 */
export function update(req, res, next) {
	delete req.body._id;

	req.result = PropuestaDesafio.update({ _id: req.params.id}, req.body);
	next();
}


/**
 * Get a single desafio
 * restriction: 'user'
 */
export function show(req, res, next) {
  var resourceId = req.params.id;

	req.result = PropuestaDesafio
								.findById(resourceId)
								.populate('owner')
								.populate('files')								
								.populate('links')
								.exec();
	next();
}


/**
 * Deletes a resource
 * restriction: 'user'
 */
export function destroy(req, res, next) {
	req.result =  PropuestaDesafio.findByIdAndRemove(req.params.id).exec();
	next();
}


/**
 * Publish a resource
 * restriction: 'user'
 */
export function publish(req, res, next) {
	let resource = req.body;
	let pid = resource.published ? resource.published._id : undefined;
	let published = new Published(resource);

	// find the resource
	if (pid === undefined){
		published.createdAt = new Date();
		published.updatedAt = new Date();
		published.propuesta = resource;

		published
			.save()
			.then(p => {
				delete resource._id;
				resource.published = p._id;
				
				let propdes= PropuestaDesafio
				.findById(req.params.id);

				PropuestaDesafio
					.update({ _id: req.params.id}, req.body)
					.then(p => {
						req.result = propdes
							.populate('owner')
							.populate('files')
							.populate('published')
							.populate('links')
							.exec();		
						next();
								
					}
			//		p.propuesta = req.result;
				);


				
			});
	} else {
		delete published._id;
		published.updatedAt = new Date();
		Published
			.update({ _id: pid}, published)
			.then(p => {

				
				req.result = PropuestaDesafio
					.findById(req.params.id)
					.populate('owner')
					.populate('files')
					.populate('published')
					.populate('links')
					.exec();




				next();
			});
	}
	
}
