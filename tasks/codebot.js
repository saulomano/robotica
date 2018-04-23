'use strict';

import path from 'path';
import runSequence from 'run-sequence';

export default (gulp, plugins, config) => {
	let clientModules = [
		path.join(config.root, 'templates/client/route')
	];

	let serverModules = [
		path.join(config.root, 'templates/server/api')
	];
	
	task_('codebot:client:admin', 'templates/admin.model.json', clientModules, 'client/');
	task_('codebot:client:app', 'templates/app.model.json', clientModules, 'client/');
	task_('codebot:client:curador', 'templates/curador.model.json', clientModules, 'client/');
	task_('codebot:client:social', 'templates/social.model.json', clientModules, 'client/');
	task_('codebot:server:server', 'templates/server.model.json', serverModules, 'server/');

	gulp.task('codebot:client', ['codebot:client:admin', 'codebot:client:app', 'codebot:client:curador', 'codebot:client:social']);
	gulp.task('codebot:server', ['codebot:server:server']);

	gulp.task('watch:codebot', () => {
		plugins.watch(['templates/admin.model.json'], plugins.batch((events, done) => {
			gulp.start('codebot:client:admin', done);
		}));

		plugins.watch(['templates/app.model.json'], plugins.batch((events, done) => {
			gulp.start('codebot:client:app', done);
		}));

		plugins.watch(['templates/curador.model.json'], plugins.batch((events, done) => {
			gulp.start('codebot:client:curador', done);
		}));

		plugins.watch(['templates/social.model.json'], plugins.batch((events, done) => {
			gulp.start('codebot:client:social', done);
		}));
		
		plugins.watch(['templates/server.model.json'], plugins.batch((events, done) => {
			gulp.start('codebot:server:server', done);
		}));
	});

	function task_(name, model, modules, relOutput) {
		gulp.task(name, () => {
			return gulp.src(path.join(config.root, model))
								 .pipe(plugins.codebot({ modules: modules, output: path.join(config.root, relOutput) }))
								 .pipe(gulp.dest(config.root));
		});
	}

}