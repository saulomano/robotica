'use strict';

import path from 'path';
import async from 'async';
import _ from 'lodash';
import fs from 'fs-extra';
import File from './file.model';
import config from '../config/environment';

export default function(req, res, next){
	if (!req.files){
		return res.status(400).send('No files were uploaded.');
	}

	//return res.json(req.files);
	let relative = req.query.relative || '';

	// security reason olny characters
	let charOnly = new RegExp('^[^\\/?%*:|"<>]+$');
	if (!charOnly.test(relative)){
		relative = '';
	}
	
	async.map(
		_.values(req.files),
		(file, cb) => {
			async.waterfall([
				// create the dbfile to get the _id
				(icb) => {
					var dbFile = new File({ name: file.name, size: file.data.length });

					dbFile.save()
						.then((dbf) => {
							icb(null, dbf);
						})
						.catch(icb);
				},

				// move the file with the _id name to uploads
				(dbf, icb) => {
					let ext = _.lowerCase(path.extname(file.name));
					let fname = `${dbf._id}.${ext}`;
					let rname = path.join(relative, fname);
					let fullname = path.join(config.uploads, rname);
					if (!fs.existsSync(path.dirname(fullname))){
						fs.mkdirpSync(path.dirname(fullname));
					}

					// move the file
					file.mv(fullname, (er) => {
						if (er){
							return icb(er);
						}
						let url = `/file/${fname}`;
						dbf.url = url;
						dbf.relative = rname;
						icb(null, dbf);
					});
				},
				// upgrade the file
				(dbf, icb) => {
					dbf.save()
						 .then((dbf) => {
							 icb(null, dbf);
						 })
						 .catch(icb);
				}
			],
			(werr, dbfile) => {
				if (werr){
					return cb(werr);
				}

				cb(null, dbfile);
			})
		},
		(err, results) => {
			if (err){
				return next(err);
			}
			results = _.map(results, r => r.serialize());
			
			if (results.length === 1){
				return res.send(results[0]);
			}
			res.send(results);
		}
	);

}