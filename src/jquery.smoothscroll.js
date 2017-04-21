/**
 * Name: jquery.smoothscroll
 * Author: Takashi Kitajima (inc2734)
 * Author URI: https://2inc.org
 * License: MIT
 *
 * easing: http://gsgd.co.uk/sandbox/jquery/easing/
 * @param { duration, easing, offset, hash)
 */

'use strict';

import $ from 'jquery';
import SmoothScroll from './_smooth-scroll.js';

;(function($) {
  const methods = {
    init: function(params) {
      const _SmoothScroll = new SmoothScroll(this, params);
      _SmoothScroll.on();
      return this;
    },

    off: function() {
      const _SmoothScroll = new SmoothScroll(this);
      _SmoothScroll.off();
      return this;
    }
  }

  $.fn.SmoothScroll = function(method) {
    if (methods[method]) {
      return methods[ method ].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || ! method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' +  method + ' does not exist');
    }
  };
})(jQuery);
