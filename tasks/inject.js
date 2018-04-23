'use strict';

import path from 'path';
import runSequence from 'run-sequence';
import _ from 'lodash';

export default (gulp, plugins, config) => {

	//
	// inject:scss:ui
	let uiOps = {
		src: path.join(config.root, 'client/ui/scss/_components.scss'),
		files: [`${config.root}/client/ui/components/**/*.scss`],
		relfrom: '/client/ui/components/',
		relto: '../components/',
		dest: path.join(config.root, 'client/ui/scss')
	};

	trask_('inject:scss:ui', gulp, plugins, uiOps);
	
	//
	// inject:scss:app
	let appOps = {
		src: path.join(config.root, 'client/styles/_components.scss'),
		files: [`${config.root}/client/{app,curador,social}/**/*.scss`],
		relfrom: new RegExp('/client/(app|curador|social)/'),
		relto: (match, p1, offset, str) => `../${p1}/`,
		dest: path.join(config.root, 'client/styles/')
	};

	trask_('inject:scss:app', gulp, plugins, appOps);

	//
	// JOIN
	gulp.task('inject:scss', ['inject:scss:ui', 'inject:scss:app']);

	// relase watch
	gulp.task('watch:inject', () => {

		plugins.watch(uiOps.files, plugins.batch((events, done) => {
			fileAddOrDelete_(events, (someNewOrDelete) => {
				if (!someNewOrDelete) 
					return done();

				gulp.start('inject:scss:ui', done);
			});
		}));

		plugins.watch(appOps.files, plugins.batch((events, done) => {

			fileAddOrDelete_(events, (someNewOrDelete) => {
				if (!someNewOrDelete) 
					return done();

				gulp.start('inject:scss:app', done);
			});

		}));
	});
	
	//
	// RELEASE
	gulp.task('inject', (cb) => {
		runSequence(['inject:scss'], cb);
	});
}

//
// helpers
function fileAddOrDelete_(events, cb) {
	let files = [];
	events.on('data', file => {
		files.push(file);
	}).on('end', () => {
		let some = _.some(_.map(files, f => f.event), e => /(add|unlink)/.test(e));
		cb(some);
	});
}

function transform_(ops) {
	return (filepath) => {
		let newPath = filepath
			.replace(ops.relfrom, ops.relto)
			.replace(/_(.*).scss/, (match, p1, offset, string) => p1)
			.replace('.scss', '');
		return `@import '${newPath}';`;
	}
}

function trask_(name, gulp, plugins, ops) {

	gulp.task(name, () => {
		return gulp.src(ops.src)
			.pipe(plugins.inject(
				gulp.src(ops.files, {read: false})
						.pipe(plugins.sort()), 
				{ transform: transform_(ops) }
			))
			.pipe(gulp.dest(ops.dest));
	});
}