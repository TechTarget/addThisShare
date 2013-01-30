 // BEGIN: article toolbar

 (function () {




   // make email button use addthis email; http://www.addthis.com/help/sharing-api

   // http://www.addthis.com/forum/viewtopic.php?f=3&t=32513

   // http://www.addthis.com/help/email-templates#.TkSAxWGHh8F

   $('#contentTools-email')

    .on('click', function (e) {



     e.preventDefault();



     var endpointUrl = 'http://api.addthis.com/oexchange/0.8/forward/email/offer?';



     var emailTemplates = {

      'en': 'TechTargetSearchSites',

      'es': 'TechTargetSearchSitesSpanish'

     };



     var endpointConfig = {

      pubid: 'uxtechtarget',

      url: window.location.href,

      title: document.title,

      email_template: emailTemplates[mo.language],

      ct: 1

     };



     // webmail links fix

     window.open(endpointUrl + $.param(endpointConfig), 'EmailAFriend', 'width=540,height=770');

     return false; // <- why the hell is this here?



     /*

     $.colorbox({

      iframe: true,

      opacity: mo.lightboxOpacity,

      height: '770px',

      initialHeight: '770px',

      width: '540px',

      initialWidth: '540px',

      href: endpointUrl + $.param(endpointConfig)

     });

     */

    });



   // addThis button; http://www.addthis.com/help/client-api

   $('body').prepend('<script>var addthis_config = {ui_language: mo.language,data_ga_property: mo.gaAccountID,data_ga_social: true};</script>');



   var addThisButton = $('#socialMedia-addThis');

   if (addThisButton.length) {



    var addThisEl = document.getElementById('socialMedia-addThis').childNodes[0]; // can't use jQuery ie. "addThisButton.find('a')"

    var addThisButtonScript = 'http://s7.addthis.com/js/300/addthis_widget.js';

    varaddThisShareConfig = {};

    varaddThisUiConfig = {

     pubid: 'uxtechtarget',

     async: true,

     domready: true,

     data_track_clickback: true,

     // data_track_addressbar: true,

     // data_track_textcopy: true,

     data_ga_tracker: 'UA-18475716-1'

    };

    //var addThisButtonScriptCall =

    $.ajax({

     url: addThisButtonScript,

     cache: true,

     dataType: 'script'

    })

    .done(function () {

     if (typeof addthis !== 'undefined') {

      addthis.button(addThisEl, addThisUiConfig, addThisShareConfig);

      addthis.init();

      addThisButton.show();

     }

    });



   }



   // google '+1 button'; http://code.google.com/apis/+1button/#jsapi

   var plusoneButton = $('#socialMedia-plusoneButton');

   if (plusoneButton.length) {



    var plusoneButtonEl = document.getElementById('socialMedia-plusoneButton').childNodes[0]; // can't use jQuery ie. "plusoneButton.find('a')"

    var plusoneButtonScript = 'https://apis.google.com/js/plusone.js';

    var plusoneButtonConfig = {

     size: 'medium', // small, medium, standard, tall

     annotation: 'bubble', // none, bubble, inline

     expandTo: 'top' // top, right, bottom, left

    };

    //var plusoneButtonScriptRequest =

    $.ajax({

     url: plusoneButtonScript,

     cache: true,

     dataType: 'script'

    })

    .done(function () {

     if (typeof gapi !== 'undefined') {

      gapi.plusone.render(plusoneButtonEl, plusoneButtonConfig);

     }

    });



   }



   // twitter 'tweet button'; http://dev.twitter.com/pages/tweet_button

   var tweetButton = $('#socialMedia-tweetButton');

   if (tweetButton.length) {



    var tweetButtonScript = 'http://platform.twitter.com/widgets.js';

    //var tweetButtonScriptRequest =

    $.ajax({

     url: tweetButtonScript,

     cache: true,

     dataType: 'script'

    });



   }



   // twitter whatis 'tweet button'

   var tweetButtonWhatIs = $('#socialMedia-tweetButtonWhatIs');

   var tweetButtonWhatIsTitle = document.title;



   if (tweetButtonWhatIsTitle.length > 90) {

    tweetButtonWhatIsTitle = tweetButtonWhatIsTitle.substring(0, 90) + '…';

   }



   if (tweetButtonWhatIs.length) {



    var tweetButtonWhatIsScript = 'http://platform.twitter.com/widgets.js';

    //var tweetButtonWhatIsScriptRequest =

    $.ajax({

     url: tweetButtonWhatIsScript,

     cache: true,

     dataType: 'script'

    });



    // $('#socialMedia-tweetButtonWhatIs a').attr('data-via', 'whatisdotcom');

    $('#socialMedia-tweetButtonWhatIs a').attr({

     'data-via': 'whatisdotcom',

     'data-text': tweetButtonWhatIsTitle

    });

   }



   window.twttr = (function (d, s, id) {



    var t, js, fjs = d.getElementsByTagName(s)[0];



    if (d.getElementById(id)) { return; }



    js = d.createElement(s);

    js.id = id;



    js.src = '//platform.twitter.com/widgets.js';

    fjs.parentNode.insertBefore(js, fjs);



    return window.twttr || (t = { _e: [], ready: function (f) { t._e.push(f); } });



   }(document, 'script', 'twitter-wjs'));



   var trackTwitter = function (intent_event) {

    if (intent_event) {

     _gaq.push(['_trackSocial', 'twitter', 'tweet', window.location.href]);

    }

   };



   //Wrap event bindings - Wait for async js to load

   twttr.ready(function (twttr) {

    twttr.events.bind('tweet', trackTwitter);

   });



/* old fb button



   // facebook 'like button'; http://developers.facebook.com/docs/reference/plugins/like

   var fbLikeButton = $('#socialMedia-facebookLike');

   if (fbLikeButton.length) {



    var fbLikeButtonConfig = {

     href: encodeURIComponent(window.location.href),

     layout: 'button_count', // standard, button_count, box_count

     show_faces: false,

     width: 90,

     action: 'like', // like, recommend

     font: 'arial', // arial, lucida grande, segoe ui, tahoma, trebuchet ms, verdana

     colorscheme: 'light', // light, dark

     ref: ''

    };

    var fbLikeButtonIframe = $('<iframe/>', {

     'src': 'http://www.facebook.com/plugins/like.php?' + $.param(fbLikeButtonConfig),

     'scrolling': 'no',

     'frameborder': 0,

     'allowTransparency': true

    });



    fbLikeButton.append(fbLikeButtonIframe);



   }



end old fb button */



   // facebook like/share combo button

   var fbLikeButton = $('#socialMedia-facebookLike');

   if (fbLikeButton.length) {



    var fbLikeButtonDiv = $('<div/>', {

     'class': 'fb-like',

     'data-href': encodeURIComponent(window.location.href),

     'data-send': 'false',

     'data-layout': 'button_count',

     'data-width': '90',

     'data-show-faces': 'false'

    });



    fbLikeButton.append(fbLikeButtonDiv);

   }



   var fbCurrentUrlArray = window.location.href.split('/');

   var fbChannelUrl = fbCurrentUrlArray[0] + '//' + fbCurrentUrlArray[2] + '/vgn-ext-templating/html/fbChannel.html';



   //fb like button script

   $('body').prepend('<div id="fb-root"></div><script>window.fbAsyncInit = function () {FB.init({xfbml: true, channelURL: "' + fbChannelUrl + '"});};(function (d, s, id) {var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = "//connect.facebook.net/en_US/all.js"; fjs.parentNode.insertBefore(js, fjs);}(document, \'script\', \'facebook-jssdk\'));</script>');



   // linkedIn 'share button'; https://developer.linkedin.com/plugins/share-button

   var linkedInButton = $('#socialMedia-linkedInButton');

   if (linkedInButton.length) {



    var linkedInButtonConfig = $('<script/>', {

     'type': 'IN/Share',

     'data-url': window.location.href,

     'data-counter': 'right' // top, right, ''

    });

    var linkedInButtonScript = 'http://platform.linkedin.com/in.js';

    //var linkedInButtonScriptRequest =

    $.ajax({

     url: linkedInButtonScript,

     dataType: 'script'

    });



    linkedInButton.append(linkedInButtonConfig);



   }



   // linkedin, facebook, google+ & twitter buttons

   $('#socialMedia-linkedin a, #socialMedia-facebook a, #socialMedia-twitter a, #socialMedia-google a').on('click', function (e) {



    e.preventDefault();



    var thisButton = $(this).parent().attr('id');



    // retrieve OR create + store bit.ly url for twitter/facebook/linkedIn

    mo.getShortUrl(mo.pageUrl, function (url) {



     var articleURL = encodeURIComponent(url); // encoded bit.ly url that we get via ajax

     vararticleTitle = encodeURIComponent(mo.articleTitle); // encoded title of the page

     var linkedinButtonUrl = 'http://www.linkedin.com/shareArticle?mini=true&url=' + articleURL + '&title=' + articleTitle; // http://www.linkedin.com/shareArticle?mini=true&url=PERMALINK&title=TITLE&source=BLOGNAME&summary=EXCERPT

     var facebookButtonUrl = 'http://www.facebook.com/share.php?u=' + articleURL + '&t=' + articleTitle; // http://www.facebook.com/share.php?u=PERMALINK&t=TITLE

     var twitterButtonUrl = 'http://twitter.com/home?status=Reading ' + articleTitle + ' ' + articleURL; // http://twitter.com/home?status=TITLE%20-%20PERMALINK

     var googleButtonUrl = 'https://plus.google.com/share?url=' + articleURL; // https://plus.google.com/share?url=PERMALINK



     switch (thisButton) {



     case 'socialMedia-linkedin':

      _gaq.push(['_trackSocial', 'linkedin', 'share']);

      window.open(linkedinButtonUrl);

      break;

     case 'socialMedia-facebook':

      _gaq.push(['_trackSocial', 'facebook', 'share']);

      window.open(facebookButtonUrl);

      break;

     case 'socialMedia-twitter':

      _gaq.push(['_trackSocial', 'twitter', 'tweet']);

      window.open(twitterButtonUrl);

      break;

     case 'socialMedia-google':

      _gaq.push(['_trackSocial', 'google', 'share']);

      window.open(googleButtonUrl);

      break;



     }



    });



   });



   contentTools.show();



  }



 }());

 // END: article toolbar





(function () {



    var addthis_config = {'data_track_addressbar':true};



    var html =

      '<div class="addthis_toolbox addthis_floating_style addthis_32x32_style">' +

      '<a class="addthis_button_email"></a>' +

      '<a class="addthis_button_linkedin"></a>' +

      '<a class="addthis_button_facebook"></a>' +

      '<a class="addthis_button_twitter"></a>' +

      '</div>';



    $('#micrositeContent').prepend(html);



    if (typeof addthis === 'undefined') {



      $.ajax({

        url: '//s7.addthis.com/js/300/addthis_widget.js#pubid=uxtechtarget',

        cache: true,

        dataType: 'script'

      })

      .done(function () {

        if (typeof addthis !== 'undefined') {

          addthis.init();

        }



        var toolbox = $('.addthis_toolbox');

        var toolboxHeight;

        var col = $('#micrositeContentColumnLeft');

        var colHeight = col.outerHeight();

        var colTop = col.offset().top;

        var colOffset = colHeight + colTop;

        var winScroll;



        // quick kludge to prevent toolbar from scrolling past main content

        // this really need to be rewritten into something non-stupid

        $(window).on('scroll', function(){

          toolboxHeight = toolbox.outerHeight();

          winScroll = $(this).scrollTop();

          var getPos = function() {



            var obj = {

              'top': Math.max(10,colTop-winScroll),

              'position': 'fixed'

            };



            var adjust = colOffset - toolboxHeight;

            if (winScroll > adjust) {

              obj.position = 'absolute';

              obj.top = adjust;

            }



            return obj;

          };

          toolbox.css(getPos());

        });



      });



    }



// }



}());





$('.micrositeSocialMedia-email').bind('click', function (e) {    e.preventDefault();

    _gaq.push(['_trackEvent','Social','Email',micrositeTrackingName]);

            // PUBLIC: url of the current page

            var endpointUrl = 'http://api.addthis.com/oexchange/0.8/forward/email/offer?';

            var endpointParams = {

              pubid: 'ra-4f0c7ed813520536',

              url: window.location.href,

              title: document.title,

              email_template: 'TechTargetMicrosites',

              ct: 1

            };

            $.colorbox({

              iframe: true,

              opacity: '0.75',

              height: '775px',

              initialHeight: '775px',

              width: '525px',

              initialWidth: '525px',

              href: endpointUrl + $.param(endpointParams)

            });

          });





      // linkedIn 'share button'; https://developer.linkedin.com/plugins/share-button

      var linkedInButton = $('.micrositeSocialMedia-linkedInButton');

      if (linkedInButton.length) {

        var linkedInButtonInlineScript = '<script type="IN/Share" data-counter="right"></script>';

        var linkedInButtonScript = 'http://platform.linkedin.com/in.js';

        linkedInButton.append(linkedInButtonInlineScript);

        $.getScript(linkedInButtonScript);

      }



      // twitter 'tweet button'; http://dev.twitter.com/pages/tweet_button

      var tweetButton = $('.micrositeSocialMedia-tweetButton');

      if (tweetButton.length) {

        var tweetButtonScript = 'http://platform.twitter.com/widgets.js';

        $.getScript(tweetButtonScript);

      }



      // facebook 'like' button; http://developers.facebook.com/docs/reference/plugins/like

      var fbLikeButton = $('.micrositeSocialMedia-facebookLike');

      if (fbLikeButton.length) {

        var fbLikeButtonIframe = '<iframe src="http://www.facebook.com/plugins/like.php?layout=button_count&amp;show_faces=false&amp;action=like&amp;font=arial&amp;colorscheme=light&amp;width=90&amp;height=22&amp;href=' + encodeURI(mo.pageUrl) + '&amp;ref=tbdByPaul" scrolling="no" frameborder="0" allowTransparency="true"></iframe>';

        $(fbLikeButtonIframe).appendTo('.micrositeSocialMedia-facebookLike');

      }



      // linkedin, facebook & twitter buttons

      $('.micrositeSocialMedia-linkedin a, .micrositeSocialMedia-facebook a, .micrositeSocialMedia-twitter a').click(function (e) {



        e.preventDefault();



        var thisButton = $(this).parent().attr('class');



        // retreive OR create + store bit.ly url for twitter/facebook/linkedIn

        mo.getShortUrl(mo.pageUrl, function () {



          var articleURL = encodeURIComponent($('body').data(mo.pageUrl)), // encoded bit.ly url that we get via ajax

            articleTitle = encodeURIComponent(mo.articleTitle), // encoded title of the page

            linkedinButtonUrl = 'http://www.linkedin.com/shareArticle?mini=true&url=' + articleURL + '&title=' + articleTitle, // http://www.linkedin.com/shareArticle?mini=true&url=PERMALINK&title=TITLE&source=BLOGNAME&summary=EXCERPT

            facebookButtonUrl = 'http://www.facebook.com/share.php?u=' + articleURL + '&t=' + articleTitle, // http://www.facebook.com/share.php?u=PERMALINK&t=TITLE

            twitterButtonUrl = 'http://twitter.com/home?status=Currently reading ' + articleURL; // http://twitter.com/home?status=TITLE%20-%20PERMALINK



            switch (thisButton) {



              case 'micrositeSocialMedia-linkedin':

              _gaq.push(['_trackEvent','Social','LinkedIn',micrositeTrackingName]);

              window.open(linkedinButtonUrl);

              break;

              case 'micrositeSocialMedia-facebook':

              _gaq.push(['_trackEvent','Social','Facebook',micrositeTrackingName]);

              window.open(facebookButtonUrl);

              break;

              case 'micrositeSocialMedia-twitter':

              _gaq.push(['_trackEvent','Social','Twitter',micrositeTrackingName]);

              window.open(twitterButtonUrl);

              break;



            }



          });



});

});

// end doc.ready

