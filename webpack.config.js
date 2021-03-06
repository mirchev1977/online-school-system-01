(function(){
	"use strict";

	const path = require('path');
	const HtmlWebpackPlugin = require('html-webpack-plugin');
	const merge = require('webpack-merge');
	const validate = require('webpack-validator');
	const parts = require('./libs/parts');
	const pkg = require('./package.json');


	const PATHS = {
	  app: path.join(__dirname, 'app'),
	  style: [
	    path.join(__dirname, 'node_modules', 'purecss'),
	    path.join(__dirname, 'app', 'main.css')
	  ],
	  images: path.resolve(__dirname, "app/images"),
	  build: path.join(__dirname, 'build')
	};

	const common = {
	  // Entry accepts a path or an object of entries.
	  // We'll be using the latter form given it's
	  // convenient with more complex configurations.
	  entry: {
	  	style: PATHS.style,
	    app: PATHS.app,
	    vendor: Object.keys(pkg.dependencies)
	  },
	  output: {
          path: PATHS.build,
          filename: '[name].js'
        },
	  plugins: [
	    new HtmlWebpackPlugin({
	      title: 'Online School System'
	    })
	  ],
	  module:{
	  	preLoaders: [
	      {
	        test: /\.jsx?$/,
	        loaders: ['jshint'],
	        // define an include so we check just the files we need
	        include: PATHS.app
	      },
	      {
	        test: /\.es6?$/,
	        loaders: ['jshint'],
	        // define an include so we check just the files we need
	        include: PATHS.app
	      }
	    ],
	  	loaders:[
	  		{
	  			test: /\.scss$/,
			  	loaders: ['style', 'css', 'sass'],
			  	include: PATHS.style
	  		},
	  		{
			  test: /\.(jpg|png)$/,
			  loader: 'url?limit=25000',
			  include: PATHS.images
			},
			{
				test: /\.es6$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			},
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			}
	  	]
	  },
	  resolve: {
			extensions: ['', '.js', '.es6', '.jsx']
	   }
	};

	var config;

	// Detect how npm is run and branch based on that
	switch(process.env.npm_lifecycle_event) {
	  case 'build':
	    config = merge(
	    	common, 
	    	{
	    		devtool: 'source-map',
	    		output: {
		          path: PATHS.build,
		          filename: '[name].[chunkhash].js',
		          // This is used for require.ensure. The setup
		          // will work without but this is useful to set.
		          chunkFilename: '[chunkhash].js'
		        }
	    	},
	    	parts.clean(PATHS.build),
	    	parts.setFreeVariable(
		        'process.env.NODE_ENV',
		        'production'
		      ),
	    	parts.extractBundle({
		        name: 'vendor',
		        entries: ['react']
		    }),
	    	parts.minify(),
	    	parts.extractCSS(PATHS.style),
	    	parts.purifyCSS([PATHS.app])
	    	);
	    break;
	    case 'stats':
	    config = merge(
	    	common, 
	    	{
		        devtool: 'source-map',
		        output: {
		          path: PATHS.build,

		          // Tweak this to match your GitHub project name
		          publicPath: '/online-school-system/',

		          filename: '[name].[chunkhash].js',
		          chunkFilename: '[chunkhash].js'
		        }
		     },
	    	parts.clean(PATHS.build),
	    	parts.setFreeVariable(
		        'process.env.NODE_ENV',
		        'production'
		      ),
	    	parts.extractBundle({
		        name: 'vendor',
		        entries: ['react']
		    }),
	    	parts.minify(),
	    	parts.extractCSS(PATHS.style),
	    	parts.purifyCSS([PATHS.app])
	    	);
	    break;
	  default:
	    config = merge(
	      common, 
	    	{
	    		devtool: 'source-map'
	    	},
	      parts.extractCSS(PATHS.style),
	      parts.devServer({
	        // Customize host/port here if needed
	        host: process.env.HOST,
	        port: process.env.PORT || 3000
	      })
	    );
	}

	module.exports = validate(config, {
	  quiet: true
	});
}());