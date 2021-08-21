<?php
/**
 * Register Blocks.
 *
 * @package Gutenberg Blocks Starter.
 *
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/writing-your-first-block-type/
 */
function create_block_starter_block_block_init() {

	// automatically load dependencies and version
//	$asset_file = include( GUTENBERG_BLOCK_STARTER_BUILD_DIR . '/assets.php');
//	echo '<pre/>';
//	print_r($asset_file);

//	wp_register_script(
//		'gutenberg-starter-block',
//		GUTENBERG_BLOCK_STARTER_BUILD_DIR . '/blocks/starter-block/index.js',
//		$asset_file['blocks/starter-block/index.js']['dependencies'],
//		$asset_file['blocks/starter-block/index.js']['version']
//	);

	register_block_type_from_metadata( GUTENBERG_BLOCK_STARTER_BUILD_DIR . '/blocks/starter-block' );
}
add_action( 'init', 'create_block_starter_block_block_init' );
