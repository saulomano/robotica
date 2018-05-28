'use strict';

import Desafio from './desafio.model';
import Published from '../publisheddesafios/publisheddesafios.model';
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
				{ type: { $regex: k, $options: 'i' } },
				{ status: { $regex: k, $options: 'i' }},
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

	Desafio
		.find(q)
		.count()
		.exec((err, count) => {
			if (err){
				return next(err);
			}
			req.totalItems = count;
			req.result = Desafio
							.find(q)
							.populate('owner')
							.populate('files')
							.populate('desafioResuelto')
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
  var newDesafio = new Desafio(req.body);
  
	req.result = newDesafio.save();
	next();
}


/**
 * Updates a resource
 * restriction: 'curador'
 */
export function update(req, res, next) {
	delete req.body._id;

	req.result = Desafio.update({ _id: req.params.id}, req.body);
	next();
}


/**
 * Get a single resource
 * restriction: 'authenticate'
 */
export function show(req, res, next) {
  var desafioId = req.params.id;

	req.result = Desafio
								.findById(desafioId)
								.populate('owner')
								.populate('files')
								.populate('published')
								.populate('links')
								.populate('desafioResuelto')
								.exec();
	next();
}


/**
 * Deletes a resource
 * restriction: 'authenticate'
 */
export function destroy(req, res, next) {
	req.result =  Desafio.findByIdAndRemove(req.params.id).exec();
	next();
}


/**
 * Publish a resource
 * restriction: 'curador'
 */
export function publish(req, res, next) {
	let desafio = req.body;
	let pid = desafio.published ? desafio.published._id : undefined;
	let published = new Published(desafio);

	// find the resource
	if (pid === undefined){
		published.createdAt = new Date();
		published.updatedAt = new Date();
		published
			.save()
			.then(p => {
				delete desafio._id;
				desafio.published = p._id;
				Desafio
					.update({ _id: req.params.id}, req.body)
					.then(p => {
						req.result = Desafio
							.findById(req.params.id)
							.populate('owner')
							.populate('files')
							.populate('published')
							.populate('links')
							.populate('desafioResuelto')
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
				req.result = Desafio
					.findById(req.params.id)
					.populate('owner')
					.populate('files')
					.populate('published')
					.populate('links')
					.populate('desafioResuelto')
					.exec();

				next();
			});
	}
	
}
