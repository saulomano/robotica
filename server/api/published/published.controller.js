'use strict';

import Published from './published.model';
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
	
	if (type){
		q['$and'] = [ { type: type } ];
		if (q['$or']) {
			q['$or'].type = undefined; 
		}
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
								.populate('links')
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
		.then(p => {
			res.zip(p.files.map(f => {
				return {
					path: path.join(config.uploads, f.relative),
					name: f.name
				}
			}), `${p.title}.zip`);
		});
}

export function relations(req, res, next) {
  var publishedId = req.params.id;

	req.result = Published
								.find({ links: publishedId })
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
