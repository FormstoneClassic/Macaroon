/*
 * Macaroon Plugin - Simple cookie access
 * @author Ben Plum
 * @version 1.2.4
 *
 * Copyright © 2013 Ben Plum <mr@benplum.com>
 * Released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
 */
 
if (jQuery) (function($) {
	
	// Default Options
	var options = {
		domain: null,
		expires: (7 * 24 * 60 * 60 * 1000), // 7 days
		path: null
	};
	
	// Public Methods
	var pub = {};
		
	// Create or update a cooke
	function _create(key, value, options) {
		var date = new Date();
		date.setTime(date.getTime() + options.expires);
		var expires = "; expires=" + date.toGMTString();
		var path = (options.path) ? "; path=" + options.path : "";
		var domain = (options.domain) ? "; domain=" + options.domain : "";
		document.cookie = key + "=" + value + expires + domain + path;
	}
	
	// Read a cookie
	function _read(key) {
		var keyString = key + "=";
		var cookieArray = document.cookie.split(';');
		for(var i = 0; i < cookieArray.length; i++) {
			var cookie = cookieArray[i];
			while (cookie.charAt(0) == ' ') {
				cookie = cookie.substring(1, cookie.length);
			}
			if (cookie.indexOf(keyString) == 0) return cookie.substring(keyString.length, cookie.length);
		}
		return null;
	}
	
	// Erase a cookie
	function _erase(key) {
		_create(key, "FALSE", $.extend({}, options, { expires: -(7 * 24 * 60 * 60 * 1000) }));
	}
	
	// Define Plugin 
	$.macaroon = function(key, value, opts) {
		// Set defaults
		if (typeof key == "object") {
			options = jQuery.extend(options, key);
			return null;
		} else {
			// Override defaults
			opts = jQuery.extend(options, opts);
		}
		
		// Delegate intent
		if (typeof key != "undefined") {
			if (typeof value != "undefined") {
				if (value == null) {
					_erase(key);
				} else {
					_create(key, value, opts);
				}
			} else {
				return _read(key);
			}
		}
	};
})(jQuery);