import _ from 'lodash';

// tasks
import inject from './inject';
import webpack from './webpack';
import server from './server';
import codebot from './codebot';
import icons from './icons';
import bump from './bump';

export default (gulp, plugins, config) => {
	let tasks = [inject, webpack, server, codebot, icons, bump];

	_.each(tasks, t => {
		t(gulp, plugins, config);
	});
};