'use strict';

import path from 'path';
import makeWebpackConfig from './webpack.make';
import webpack from 'webpack-stream';

export default (gulp, plugins, config) => {
	gulp.task('webpack:dev', function() {
    const webpackDevConfig = makeWebpackConfig({ DEV: true });
    return gulp.src(webpackDevConfig.entry.app)
        .pipe(plugins.plumber())
        .pipe(webpack(webpackDevConfig))
				.pipe(gulp.dest('.tmp'))
				.on('end', () => {
					console.log('==============================================');
					console.log('webpack:dev ends');
					console.log('==============================================');
				});
	});

	gulp.task('webpack:dist', function() {
			const webpackDistConfig = makeWebpackConfig({ BUILD: true });
			return gulp.src(webpackDistConfig.entry.app)
					.pipe(webpack(webpackDistConfig))
					.on('error', (err) => {
						this.emit('end'); // Recover from errors
					})
					.pipe(gulp.dest(`${config.dist}/client`));
	});
}