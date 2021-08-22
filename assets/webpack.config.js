const path = require( 'path' );
const glob = require( 'glob' );

/**
 * Plugins
 */
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin'); // https://webpack.js.org/plugins/copy-webpack-plugin/
const DependencyExtractionWebpackPlugin = require( '@wordpress/dependency-extraction-webpack-plugin' );


// JS Directory path.
const JSDir = path.resolve( __dirname, 'src/blocks' );
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
			copyFilePattern.push({
				from: path.resolve( __dirname, `src/blocks/${fileName}/block.json` ),
				to: path.resolve( __dirname, `build/blocks/${fileName}/block.json` ),
			})
		}
	} );
}

/**
 * Note: argv.mode will return 'development' or 'production'.
 */
const plugins = ( argv ) => [
	
	new MiniCssExtractPlugin( {
		filename: 'blocks/[name]/index.css'
	} ),
	new CopyPlugin({
		patterns: copyFilePattern
	}),
	new DependencyExtractionWebpackPlugin( {
		injectPolyfill: true,
		combineAssets: false,
	} ),
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
	}
];

// For webpack@5 we use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`).
const optimization = [
	`...`,
	new CssMinimizerPlugin(),
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
