'use strict';

import mime from 'mime';
import path from 'path';
mongoose.Promise = require('bluebird');
import mongoose, {Schema} from 'mongoose';

let isDev = process.env.NODE_ENV === 'development';

let icons = {
	// Media
	'image': 'fa-file-image-o',
	'audio': 'fa-file-audio-o',
	'video': 'fa-file-video-o',
	// Documents
	'application/pdf': 'fa-file-pdf-o',
	'application/msword': 'fa-file-word-o',
	'application/vnd.ms-word': 'fa-file-word-o',
	'application/vnd.oasis.opendocument.text': 'fa-file-word-o',
	'application/vnd.openxmlformats-officedocument.wordprocessingml': 'fa-file-word-o',
	'application/vnd.ms-excel': 'fa-file-excel-o',
	'application/vnd.openxmlformats-officedocument.spreadsheetml': 'fa-file-excel-o',
	'application/vnd.oasis.opendocument.spreadsheet': 'fa-file-excel-o',
	'application/vnd.ms-powerpoint': 'fa-file-powerpoint-o',
	'application/vnd.openxmlformats-officedocument.presentationml': 'fa-file-powerpoint-o',
	'application/vnd.oasis.opendocument.presentation': 'fa-file-powerpoint-o',
	'text/plain': 'fa-file-text-o',
	'text/html': 'fa-file-code-o',
	'application/json': 'fa-file-code-o',
	// Archives
	'application/gzip': 'fa-file-archive-o',
	'application/zip': 'fa-file-archive-o',
	// Misc
	'application/octet-stream': 'fa-file-o'
};

let isImage = /^image\//i;
let isAudio = /^audio\//i;
let isVideo = /^video\//i;

function getIcons_(mime){
	
	if (isImage.test(mime)){
		return 'fa fa-file-image-o';
	}
	if (isAudio.test(mime)){
		return 'fa fa-file-audio-o';
	}
	if (isVideo.test(mime)){
		return 'fa fa-file-video-o';
	}

	let i = icons[mime];
	return i !== undefined ? `fa ${i}` : 'fa fa-file-o';
}

var ops = {
	toObject: {
		virtuals: true
	},
	toJSON: {
		virtuals: true
	}
};

var FileSchema = new Schema({
	name: String,
	relative: String,
	description: String,
	url: String,
	size: Number
}, ops);

FileSchema
	.virtual('type')
	.get(function() {
		return mime.getType(path.extname(this.name));
	});

FileSchema
	.virtual('icon')
	.get(function() {
		return getIcons_(this.type);
	});

FileSchema
	.virtual('serialize')
	.get(function() {
		return () => {
			return {
				_id: this._id,
				name: this.name,
				type: this.type,
				icon: this.icon,
				size: this.size,
				url: this.url,
				relative: isDev ? this.relative : undefined
			}
		};
	});

export default mongoose.model('File', FileSchema);