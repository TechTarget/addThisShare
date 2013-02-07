/*!
* AddThis Share v1.0.2 (http://okize.github.com/)
* Copyright (c) 2013 | Licensed under the MIT license - http://www.opensource.org/licenses/mit-license.php
*/

// use AMD or browser globals to create a jQuery plugin.
;(function (factory) {

  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else {
    factory(jQuery);
  }

}(function ($) {

  'use strict';

  // defaults
  var pluginName = 'addThisShare';
  var defaults = {
    addThisApiVersion: '300', // 300, 250, 200, 150
    addThisButtons: ['email', 'linkedin', 'facebook', 'twitter'], // email, linkedin, facebook, twitter, googleplus, addthis
    addThisCss: true, // set to false to disable addthis styles
    addThisButtonSize: 'small', // small, medium, large,
    addThisButtonOrientation: 'horizontal', // horizontal, vertical
    addThisButtonFollow: false, // enable to allow the buttons to 'follow' while scrolling
    addThisButtonFollowBoundary: '', // pass selector to override default bounds to follow functionality
    googleAnalyticsId: false // include GA Account Id for tracking
  };

  // plugin constructor
  var Share = function (element, options) {
    this.el = element;
    this.options = $.extend({}, defaults, options);
    this.init();
  };

  Share.prototype = {

    init: function() {

      this.$el = $(this.el); // featured Share component dom container
      this.addThisButtonsContainer = {}; // will hold reference to jq object of buttons parent div
      this.addThisScript = '//s7.addthis.com/js/' + this.options.addThisApiVersion + '/addthis_widget.js'; // url of addthis script
      this.addThisConfiguration = {
        pubid: 'ra-4f0c7ed813520536', // change this to whatever profile should be used
        url: window.location.pathname,
        ui_use_css: this.options.addThisCss,
        domready: true,
        async: true,
        data_track_clickback: false,
        data_track_addressbar: false,
        data_ga_tracker: window.SITE_gaAccountID || false,
        data_ga_social: true
      };

      // window.addthis_share = {
      //   templates : {
      //     twitter : "{{title}} {{url}} (via @[Your Twitter Username])"
      //   }
      // };

      var self = this;

      // callback fired after script loaded so should be safe to display
      this.loadAddthisScript( function () {
        if (self.isAddthisLoaded() === true && typeof window.addthis_config === 'undefined') {
          window.addthis_config = self.addThisConfiguration;
        }
        self.$el.append( self.buildAddthisHtml( self.options.addThisButtons ) );
        if (self.options.addThisButtonFollow) {
          self.initializeFollow();
        }
      });

    },

    isAddthisLoaded: function () {

      // check for global addthis object
      if (typeof window.addthis === 'undefined') {
        return false;
      } else {
        return true;
      }

    },

    loadAddthisScript: function (callback) {

      // load addthis script (cache:true prevents it from being loaded multiple times)
      $.ajax({
        url: this.addThisScript,
        cache: true,
        dataType: 'script'
      }).done(function () {
        if (typeof callback !== 'undefined') {
          callback.call();
        }
      });

    },


    buildAddthisHtml: function (buttons) {

      // all possible services: http://www.addthis.com/services/list
      var services = {
          email: {
            className: 'addthis_button_email',
            title: 'Email A Friend'
          },
          linkedin: {
            className: 'addthis_button_linkedin',
            title: 'Share on LinkedIn'
          },
          facebook: {
            className: 'addthis_button_facebook',
            title: 'Share on Facebook'
          },
          twitter: {
            className: 'addthis_button_twitter',
            title: 'Share on Twitter'
          },
          googleplus: {
            className: 'addthis_button_google_plusone_share',
            title: 'Share on Google+'
          },
          addthis: {
            className: 'addthis_button_compact',
            title: "Share with AddThis Services"
          }
      };

      // class names for various icon sizes from addthis
      var iconSizes = {
        small: 'addthis_default_style',
        medium: 'addthis_20x20_style',
        large: 'addthis_32x32_style'
      };

      // class names for different button orientations
      var buttonOrientation = {
        horizontal: 'addThisHorizontal',
        vertical: 'addThisVertical'
      };

      // creates the html for the buttons that addthis consumes and returns as icons
      var addThisButtonHtml = function (buttons) {
        var html = '';
        for (var i = 0, len = buttons.length; i < len; i++) {
          if (buttons[i] in services) {
            html += '<a class="' + services[ buttons[i] ].className + '" title="' + services[ buttons[i] ].title + '" href="#"></a>';
          }
        }
        return html;
      };

      // div that holds the buttons for addthis services
      var addThisButtonsContainer = $('<div>', {
        'class': 'socialShare-addThis ' + buttonOrientation[this.options.addThisButtonOrientation] + ' ' + iconSizes[this.options.addThisButtonSize],
        html: addThisButtonHtml( buttons )
      });

      this.addThisButtonsContainer = addThisButtonsContainer;

      return addThisButtonsContainer;

    },

    initializeFollow: function () {

      // the jq object of the button container
      var el = this.addThisButtonsContainer,
          elOffest = el.offset().top,
          elPadding = parseInt( el.css('top'), 0),
          elHeight,
          adjust,
          bounds,
          boundsHeight = this.$el.height(),
          win = $(window),
          winScroll;

      // @todo, fix this hot mess
      win.on('scroll', function () {

        var getPos = function() {

          // this is frustrating
          if (typeof elHeight === 'undefined') {
            elHeight = el.height();
          }

          winScroll = win.scrollTop();

          adjust = Math.max(elPadding, winScroll - (elOffest - (2*elPadding)));
          bounds = boundsHeight - elHeight;

          var obj = {
            'top': (adjust < bounds) ? adjust : bounds
          };

          return obj;

        };

        el.css(getPos());

      });


    }

  };

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[pluginName] = function ( options ) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName,
          new Share( this, options ));
      }
    });
  };

}));