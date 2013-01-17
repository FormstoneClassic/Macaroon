/*
 * Macaroon Plugin - Simple cookie access
 * @author Ben Plum
 * @version 1.2.2
 *
 * Copyright © 2012 Ben Plum <mr@benplum.com>
 * Released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
 */
 
if (jQuery) (function($) {
	
	// Default Options
	var options = {
		domain: null,
		expires: 7,
		path: "/"
	};
	
	// Public Methods
	var pub = {};
		
	// Create or update a cooke
	function _create(key, value, options) {
		var date = new Date();
		date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
		var expires = "; expires=" + date.toGMTString();
		var path = "; path=" + options.path
		var domain = (options.domain != null) ? "; domain=" + options.domain : "";
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
		_create(key, "", $.extend({}, options, { expires: -1 }));
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