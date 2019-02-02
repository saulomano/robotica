'use strict';

import Kit from './kit.model';
import Published from '../publishedkits/publishedkits.model';
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
			{ nombre: { $regex: k, $options: 'i' } },
			{ descripcion: { $regex: k, $options: 'i' } },
			{ contenido: { $regex: k, $options: 'i' } },				
			{ potencialidades: { $regex: k, $options: 'i' } },			
			{ 'armado.content': { $regex: k, $options: 'i' } },	
			]
		};
	}

	Kit
		.find(q)
		.count()
		.exec((err, count) => {
			if (err){
				return next(err);
			}
			req.totalItems = count;
			req.result = Kit
							.find(q)
							.populate('owner')
							.populate('files')
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
  var newKit = new Kit(req.body);
  
	req.result = newKit.save();
	next();
}


/**
 * Updates a resource
 * restriction: 'curador'
 */
export function update(req, res, next) {
	delete req.body._id;

	req.result = Kit.update({ _id: req.params.id}, req.body);
	next();
}


/**
 * Get a single resource
 * restriction: 'authenticate'
 */
export function show(req, res, next) {
  var kitId = req.params.id;

	req.result = Kit
								.findById(kitId)
								.populate('owner')
								.populate('files')
								.populate('published')								
								.exec();
	next();
}


/**
 * Deletes a resource
 * restriction: 'authenticate'
 */
export function destroy(req, res, next) {
	req.result =  Kit.findByIdAndRemove(req.params.id).exec();
	Published.findByIdAndRemove(req.params.id).exec();

	next();
}


/**
 * Publish a resource
 * restriction: 'curador'
 */
export function publish(req, res, next) {
	let kit = req.body;
	let pid = kit.published ? kit.published._id : undefined;
	let published = new Published(kit);



	// find the resource
	if (pid === undefined){
		published.createdAt = new Date();
		published.updatedAt = new Date();
		published
			.save()
			.then(p => {
				delete kit._id;
				kit.published = p._id;
				Kit
					.update({ _id: req.params.id}, req.body)
					.then(p => {
						req.result = Kit
							.findById(req.params.id)
							.populate('owner')
							.populate('files')
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
				req.result = Kit
					.findById(req.params.id)
					.populate('owner')
					.populate('files')
					.populate('published')					
					.exec();

				next();
			});
	}
	
}
