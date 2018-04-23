'use strict';
/*eslint-env node*/
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
var WebpackCdnPlugin = require('webpack-cdn-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const OptimizeCSSClassnamesPlugin = require('optimize-css-classnames-plugin');

var fs = require('fs');
var path = require('path');

// get current version of package
let version = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'))).version;

module.exports = function makeWebpackConfig(options) {
    /**
     * Environment type
     * BUILD is for generating minified builds
     */
    var BUILD = !!options.BUILD;
    var DEV = !!options.DEV;
    var TEST = !!options.TEST;

    let externals = {};
    let cssRule = [
        {
            loader: 'style-loader',
        },
        {
            loader: 'css-loader',
            options: {
                importLoaders: 1,
                url: false
            }
        },
        {
            loader: 'postcss-loader',
            options: {
                plugins: [
                    require('precss'),
                    require('autoprefixer')
                ]
            }
        },
        {
            loader: "sass-loader", // compiles Sass to CSS
        }
    ];

    let htmlLoader = [{
        loader: 'raw-loader'
    }];

    const extractSCSS = new ExtractTextPlugin('[name].[hash].css');

    if (BUILD){
        externals = {
            'angular': "angular",
            'angular-animate': "'ngAnimate'",
            'angular-aria': "'ngAria'",
            'angular-cookies': "'ngCookies'",
            'angular-resource': "'ngResource'",
            'angular-messages': "'ngMessages'",
            'angular-sanitize': "'ngSanitize'",
            'angular-material': "'ngMaterial'",
            'angular-ui-router': "'ui.router'",
            'angular-loading-bar': "'angular-loading-bar'",
            'restangular': "'restangular'",
            'ng-quill': "'ngQuill'",
            'dropzone': 'Dropzone',
            'ngdropzone': "'thatisuday.dropzone'",
            'ng-meta': "'ng-meta'",
            //'md-steppers': "'md-steppers'",
            'jquery': 'jQuery',
            'lodash': '_'
        };

        htmlLoader = [{
            loader: 'html-loader'
        }];

        cssRule = ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                        minimize: true,
                        sourceMap: false,
                        url: false
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        plugins: [
                            require('precss'),
                            require('autoprefixer')
                        ]
                    }
                },
                {
                    loader: "sass-loader", // compiles Sass to CSS
                }
            ]
        });
    }

    /**
     * Config
     * Reference: http://webpack.github.io/docs/configuration.html
     * This is the object where all configuration gets set
     */
    var config = {
        entry: {
            app: './client/robotica.js',
            polyfills: './client/polyfills.js',
            vendor: [
                'angular',
                'angular-animate',
                'angular-aria',
                'angular-cookies',
                'angular-resource',
                'angular-messages',
                'angular-sanitize',
                'angular-material',
                'angular-ui-router',
                'angular-loading-bar',
                'restangular',
                'ng-quill',
                'dropzone',
                'ngdropzone',
                'ng-meta',
                //'md-steppers',
                'jquery',
                'lodash'
            ]
        },
        externals: externals,
        devtool: 'source-map',
        output: {
            // Absolute output directory
            path: BUILD ? path.join(__dirname, '/dist/client/') : path.join(__dirname, '/.tmp/'),
    
            // Output path from the view of the page
            // Uses webpack-dev-server in development
            publicPath: BUILD || DEV || E2E ? '/' : `http://localhost:${8080}/`,
            //publicPath: BUILD ? '/' : 'http://localhost:' + env.port + '/',
    
            // Filename for entry points
            // Only adds hash in build mode
            filename: BUILD ? '[name].[hash].js' : '[name].bundle.js',
    
            // Filename for non-entry points
            // Only adds hash in build mode
            chunkFilename: BUILD ? '[name].[hash].js' : '[name].bundle.js'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                      loader: 'babel-loader',
                      options: {
                        presets: ['babel-preset-env'],
                        plugins: [
                            require('babel-plugin-angularjs-annotate'), 
                            require('babel-plugin-transform-class-properties')
                        ]
                      }
                    }
                },
                {
                    test: /\.html$/,
                    use: htmlLoader
                },
                {
                    test: /\.(scss|css)$/,
                    use: cssRule
                }, {
                    // ASSET LOADER
                    // Reference: https://github.com/webpack/file-loader
                    // Copy png, jpg, jpeg, gif, svg, woff, woff2, ttf, eot files to output
                    // Rename the file using the asset hash
                    // Pass along the updated reference to your code
                    // You can add here any file extension you want to get copied to your output
                    test: /\.(svg|woff|woff2|ttf|eot)([\?]?.*)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                //publicPath: 'assets/'
                            } 
                        }
                    ]
                    
                },
                {
                    test: /\.(png|jpg|jpeg|gif)$/,
                    use: [
                        {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                        }
                    ]
                }
            ]
        }
    };

    config.plugins = [
        /*
         * Plugin: ForkCheckerPlugin
         * Description: Do type checking in a separate process, so webpack don't need to wait.
         *
         * See: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
         */
        // new ForkCheckerPlugin(),

        new CommonsChunkPlugin({
            name: 'vendor',

            // filename: "vendor.js"
            // (Give the chunk a different name)

            minChunks: Infinity
            // (with more entries, this ensures that no other module
            //  goes into the vendor chunk)
        })
    ];
    
    // Skip rendering index.html in test mode
    // Reference: https://github.com/ampedandwired/html-webpack-plugin
    // Render index.html
    if(!TEST) {
        let htmlConfig = {
            template: BUILD ? 'client/_index.prod.html' : 'client/_index.html',
            filename: BUILD ? '../../dist/client/index.html' : '../../client/index.html',
            alwaysWriteToDisk: !BUILD,
            minify: {
                removeComments: true,
                html5: true,
                preserveLineBreaks: true,
                collapseWhitespace: true
            },
            version: version
        }
        config.plugins.push(
          new HtmlWebpackPlugin(htmlConfig),
          new HtmlWebpackHarddiskPlugin(),
          //new WebpackCdnPlugin({
          //  modules: [
          //    {
          //      name: 'vue',
          //      var: 'Vue',
          //      style: 'dist/vue.css'
          //    },
          //    {
          //      name: 'vue-router'
          //    }
          //  ],
          //  publicPath: '/node_modules'
          //})
        );
    }

    // Add build specific plugins
    if(BUILD) {
        config.plugins.push(
            // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
            // Only emit files when there are no errors
            new webpack.NoEmitOnErrorsPlugin(),

            // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
            // Minify all javascript, switch loaders to minimizing mode
            new webpack.optimize.UglifyJsPlugin({
                mangle: true,
                output: {
                    comments: false
                },
                compress: {
                    warnings: false
                }
            }),

            // Reference: https://github.com/webpack/extract-text-webpack-plugin
            // Extract css files
            // Disabled when in test mode or not in build mode
            new ExtractTextPlugin('[name].[hash].min.css', {
                disable: !BUILD || TEST
            }),

            new OptimizeCssAssetsPlugin({
              assetNameRegExp: /\.css$/g,
              cssProcessor: require('cssnano'),
              cssProcessorOptions: { discardComments: {removeAll: true } },
              canPrint: true
            }),
            
            //new OptimizeCSSClassnamesPlugin({
            //    prefix: '_',
            //    ignore: [
            //        'blink-class',
            //        /^e2e-/
            //    ]
            //}),

            // Reference: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
            // Define free global variables
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: '"production"'
                }
            })
        );
    }

    if(DEV) {
        config.plugins.push(
            // Reference: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
            // Define free global variables
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: '"development"'
                }
            })
        );
    }

    config.devServer = {
        contentBase: './client/',
        stats: {
            modules: false,
            cached: false,
            colors: true,
            chunk: false
        }
    };

    config.cache = DEV;

    return config;
};
