/**
 * Plugin Name: jquery.SmoothScroll
 * Plugin URI: http://2inc.org
 * Description: スムーススクロールでページ内移動するためのプラグイン。指定要素のhashをもとに移動する。
 * Version: 0.5.0
 * Author: Takashi Kitajima
 * Author URI: http://2inc.org
 * Created: July 5, 2012
 * Modified: February 8, 2016
 * License: GPLv2+
 *
 * easing: http://gsgd.co.uk/sandbox/jquery/easing/
 * @param { duration, easing, offset, hash )
 */
;( function( $ ) {
	var methods = {
		init : function( params ) {
			var methods = {
				scrollStop: function() {
					targetBody.stop( true );
				},
				getTargetBody: function() {
					if ( $( 'html' ).scrollTop() > 0 ) {
						targetBody = $( 'html' );
					} else if ( $( 'body' ).scrollTop() > 0 ) {
						targetBody = $( 'body' );
					}
					return targetBody;
				}
			}

			var defaults = {
				duration: 1000,
				easing  : 'easeOutQuint',
				offset  : 0,
				hash    : true
			};
			params = $.extend( defaults, params );

			var targetBody;

			return this.each( function( i, e ) {
				$( e ).on( 'click.SmoothScroll', function() {
					var targetHash = this.hash;
					var offset = $( targetHash ).eq( 0 ).offset();
					if ( !targetHash || offset === null || typeof offset === 'undefined' )
						return;

					var wst = $( window ).scrollTop();
					if ( wst === 0 )
						$( window ).scrollTop( wst + 1 );

					targetBody = methods.getTargetBody();
					if ( typeof targetBody === 'undefined' )
						return;
					targetBody.animate(
						{
							scrollTop: offset.top - params.offset
						},
						params.duration,
						params.easing,
						function() {
							if ( params.hash === true ) {
								history.pushState( '', '', targetHash );
							}
						}
					);

					if ( window.addEventListener )
						window.addEventListener( 'DOMMouseScroll', methods.scrollStop, false );
					window.onmousewheel = document.onmousewheel = methods.scrollStop;
					return false;
				} );
			} );
		},
		off: function() {
			$( this ).unbind( 'click.SmoothScroll' );
		}
	}

	$.fn.SmoothScroll = function( method ) {
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist' );
		}
	};
} )( jQuery );
