<?php
/**
 * Plugin Name: Gutenberg Blocks Starter
 * Description: A WordPress plugin that adds Gutenberg Blocks Starter for Block development.
 * Plugin URI:  https://codeytek.com/
 * Author:      Imran Sayed
 * Author URI:  https://codeytek.com
 * License:     GPL2
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Version:     1.0.0
 * Text Domain: gutenberg-blocks-starter
 *
 * @package Gutenberg Blocks Starter
 */

define( 'GUTENBERG_BLOCK_STARTER_PATH', untrailingslashit( plugin_dir_path( __FILE__ ) ) );
define( 'GUTENBERG_BLOCK_STARTER_URL', untrailingslashit( plugin_dir_url( __FILE__ ) ) );
define( 'GUTENBERG_BLOCK_STARTER_BUILD_URI', untrailingslashit( plugin_dir_url( __FILE__ ) ) . '/assets/build' );
define( 'GUTENBERG_BLOCK_STARTER_BUILD_DIR', untrailingslashit( plugin_dir_path( __FILE__ ) ) . '/assets/build' );
define( 'GUTENBERG_BLOCK_STARTER_TEMPLATE_PATH', untrailingslashit( plugin_dir_path( __FILE__ ) ) . '/templates/' );

require_once GUTENBERG_BLOCK_STARTER_PATH . '/inc/register-blocks.php';
