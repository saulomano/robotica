'use strict';

import File from './file.model';
import config from '../config/environment';
import path from 'path';

export default function(req, res, next){
	let filename = req.params.filename;
	let id = path.basename(filename, path.extname(filename));

	File
		.findById(id)
		.then(file => {
			res.sendFile(path.join(config.uploads, file.relative));
		})
		.catch(next);
}