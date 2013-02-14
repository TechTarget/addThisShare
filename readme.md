AddThis Sharing microsite component

***

This component is a wrapper plugin for the AddThis social sharing tool

* http://support.addthis.com/customer/portal/articles/381262-api-and-sdk-overview

***

Todo:

* move away from window scroll event; too performance intensive
* js rendering: http://support.addthis.com/customer/portal/articles/381263-addthis-client-api-#rendering-js
* for 'follow' functionality, height of button containing box not determined until scrolling starts (since buttons created async) fo possible race condition where user scrolls before box is loaded will result in incorrect detemrination of box height
* for 'follow' functionality, allow user to pass in selector as alternate bounding
* socialShare-addThis should not display until all the buttons are loaded

***

Sharing is caring!