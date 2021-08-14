const path = require( 'path' );
const glob = require( 'glob' );

/**
 * Plugins
 */
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const OptimizeCssAssetsPlugin = require( 'optimize-css-assets-webpack-plugin' );
const cssnano = require( 'cssnano' );
const UglifyJsPlugin = require( 'uglifyjs-webpack-plugin' );
const CopyPlugin = require('copy-webpack-plugin'); // https://webpack.js.org/plugins/copy-webpack-plugin/

const json5 = require('json5');


// JS Directory path.
const JSDir = path.resolve( __dirname, 'src/js' );
const IMG_DIR = path.resolve( __dirname, 'src/images' );
const FONTS_DIR = path.resolve( __dirname, 'src/fonts' );
const BUILD_DIR = path.resolve( __dirname, 'build' );

const entries = glob.sync( 'src/blocks/**/index.js' );
const blockJSONEntries = glob.sync( 'src/blocks/**/block.json' );
const copyFilePattern = [];

// Add new entries, fileName: filePath
const entry = {};

// Push block files.
if ( entries.length ) {
	
	entries.forEach( file => {
		console.log( file );
		const fileName = file.replace( '/index.js', '' ).replace( 'src/blocks/', '' );
		
		if ( fileName ) {
			entry[ fileName ] = path.resolve( __dirname, file );
		}
	} );
}

const output = {
	path: BUILD_DIR,
	filename: 'blocks/[name]/index.js',
};

// Push block json files.
if ( blockJSONEntries.length ) {
	
	blockJSONEntries.forEach( file => {
		const fileName = file.replace( '/block.json', '' ).replace( 'src/blocks/', '' );
		if ( fileName ) {
			console.log( 'fileName', fileName );
			// entry[ fileName ] = path.resolve( __dirname, file );
			copyFilePattern.push({
				from: path.resolve( __dirname, `src/blocks/${fileName}/block.json` ),
				to: path.resolve( __dirname, `build/blocks/${fileName}/block.json` ),
			})
		}
	} );
}

console.log( 'copyFilePattern', copyFilePattern );

/**
 * Note: argv.mode will return 'development' or 'production'.
 */
const plugins = ( argv ) => [
	
	new MiniCssExtractPlugin( {
		filename: 'blocks/[name].css'
	} ),
	new CopyPlugin({
		// patterns: [
		// 	{
		// 		from: './src/blocks/test-block/block.json',
		// 		to:   './blocks/test-block/block.json',
		// 	}
		// ],
		patterns: copyFilePattern
	}),
];

const rules = [
	{
		test: /\.js$/,
		include: [ JSDir ],
		exclude: /node_modules/,
		use: 'babel-loader'
	},
	{
		test: /\.scss$/,
		exclude: /node_modules/,
		use: [
			MiniCssExtractPlugin.loader,
			'css-loader',
			'postcss-loader',
			'sass-loader'
		]
	},
	{
		test: /\.(png|jpg|svg|jpeg|gif|ico)$/,
		exclude: [ FONTS_DIR, /node_modules/ ],
		use: {
			loader: 'file-loader',
			options: {
				name: '[path][name].[ext]',
				publicPath: '../'
			}
		}
	},
	{
		test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
		exclude: [ IMG_DIR, /node_modules/ ],
		use: {
			loader: 'file-loader',
			options: {
				name: '[path][name].[ext]',
				publicPath: '../'
			}
		}
	},
	{
		test: /\.json5$/i,
		type: 'json',
		parser: {
			parse: json5.parse,
		}
	}
];

const optimization = [
	new OptimizeCssAssetsPlugin( {
		cssProcessor: cssnano
	} ),
	
	new UglifyJsPlugin( {
		cache: false,
		parallel: true,
		sourceMap: false
	} )
];

module.exports = ( env, argv ) => ( {
	entry: entry,
	output: output,
	plugins: plugins( argv ),
	devtool: 'source-map',
	module: {
		'rules': rules
	},
	
	optimization: {
		minimizer: optimization
	}
} );
