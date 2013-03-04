// inits can be either both on window.load or doc.ready but not mixed
// if mixed, only doc.ready plugin loads
$(document).on('ready', function() {

  $('body *').inlineIpsum({token: '@'});

  $('#micrositeHeader').addThisShare({
     addThisButtons: ['email', 'linkedin', 'facebook', 'twitter']
  });

  $('#micrositeContentColumnFull').addThisShare({
     addThisButtons: ['facebook', 'twitter', 'linkedin', 'email']
  });

  // no buttons
  $('#micrositeFooter').addThisShare({
     addThisButtons: []
  });

  $('#micrositeContent').addThisShare({
    addThisButtons: ['email', 'linkedin', 'facebook', 'twitter', 'googleplus', 'addthis'],
    addThisButtonOrientation: 'vertical',
    addThisButtonSize: 'large',
    addThisButtonFollow: true
  });

});

$(window).on('load', function() {

  // loads in AddThis Service Metaata
  $('#serviceMetaData').on('click', function (e) {

    e.preventDefault();

    // remove click handler
    $(this).off('click').parent('p').remove();

    // get json
    function getServiceApiJson( ) {
      return $.ajax({
        url: 'http://cache.addthiscdn.com/services/v1/sharing.en.jsonp',
        crossDomain: true,
        dataType: 'jsonp',
        jsonp: 'jsonpcallback',
        jsonpCallback: 'callback'
      }).pipe(function (data) {
        return data.data;
      });
    }

    getServiceApiJson().done(function (services) {

      // iterrate through json and build table rows
      for (var i = 0, len = services.length, rows; i < len; i++) {
        rows += '<tr>';
        rows += '<td>' + (i+1) + '</td>';
        rows += '<td>' + services[i].name + '</td>';
        rows += '<td>' + services[i].code + '</td>';
        // rows += '<td><span class="addthis_service_icon icon_' + services[i].code + '"></span></td>';
        rows += '<td><img src="' + services[i].icon + '" height="16" width="16" /></td>';
        rows += '<td><img src="' + services[i].icon32 + '" height="32" width="32" /></td>';
        rows += '<td>' + services[i].endpoint + '</td>';
        rows += '</tr>';
      }

      // add rows & show the table
      $('#serviceMetaDataTable').append(rows).show();

    });

  });

});

var addthisEventHandler = function (e) {
  // console.log(e);
  var addthisObj = window.addthis;
  var addThisObjects = [];
  var addThisFunctions = [];
  var addThisProperties = [];
  for (var prop in addthisObj) {

    if (typeof addthisObj[prop] === 'object') {
      addThisObjects.push(prop);
    } else if (typeof addthisObj[prop] === 'function') {
      addThisFunctions.push(prop);
    } else {
      addThisProperties.push(prop);
    }

  }

  addThisObjects.sort();
  addThisFunctions.sort();
  addThisProperties.sort();

  console.group('OBJECTS:');

  for (var i = 0, len = addThisObjects.length, objName; i < len; i++) {
    objName = addThisObjects[i];
    console.log(objName + '\n' + '-> ' + addthisObj[ objName ]);
  }

  console.groupEnd();

  console.groupCollapsed('FUNCTIONS:');

  for (var j = 0, len2 = addThisFunctions.length, funcName; j < len2; j++) {
    funcName = addThisFunctions[j];
    console.log(funcName + '\n' + '-> ' + addthisObj[ addThisFunctions[j] ]);
  }

  console.groupEnd();

  console.groupCollapsed('PROPERTIES:');

  for (var k = 0, len3 = addThisProperties.length, propName; k < len3; k++) {
    propName = addThisProperties[k];
    console.log(propName + '\n' + '-> ' + addthisObj[ propName ]);
  }

  console.groupEnd();

};

var addthisEventListeners = function () {
  window.addthis.addEventListener('addthis.ready', addthisEventHandler);
  window.addthis.addEventListener('addthis.menu.open', addthisEventHandler);
  window.addthis.addEventListener('addthis.menu.close', addthisEventHandler);
  window.addthis.addEventListener('addthis.menu.share', addthisEventHandler);
  window.addthis.addEventListener('addthis.user.ready', addthisEventHandler);
};

var isAddthisLoaded = function () {
  if (typeof window.addthis === 'undefined') {
    setTimeout(isAddthisLoaded, 200);
  } else {
    addthisEventListeners();
  }
};

// isAddthisLoaded();





/*

Holder - 1.9 - client side image placeholders
(c) 2012-2013 Ivan Malopinsky / http://imsky.co

Provided under the Apache 2.0 License: http://www.apache.org/licenses/LICENSE-2.0
Commercial use requires attribution.

*/
var Holder=Holder||{};(function(app,win){var preempted=false,fallback=false,canvas=document.createElement("canvas");document.getElementsByClassName||(document.getElementsByClassName=function(e){var t=document,n,r,i,s=[];if(t.querySelectorAll)return t.querySelectorAll("."+e);if(t.evaluate){r=".//*[contains(concat(' ', @class, ' '), ' "+e+" ')]",n=t.evaluate(r,t,null,0,null);while(i=n.iterateNext())s.push(i)}else{n=t.getElementsByTagName("*"),r=new RegExp("(^|\\s)"+e+"(\\s|$)");for(i=0;i<n.length;i++)r.test(n[i].className)&&s.push(n[i])}return s});window.getComputedStyle||(window.getComputedStyle=function(e,t){return this.el=e,this.getPropertyValue=function(t){var n=/(\-([a-z]){1})/g;return t=="float"&&(t="styleFloat"),n.test(t)&&(t=t.replace(n,function(){return arguments[2].toUpperCase()})),e.currentStyle[t]?e.currentStyle[t]:null},this});function contentLoaded(n,t){var l="complete",s="readystatechange",u=!1,h=u,c=!0,i=n.document,a=i.documentElement,e=i.addEventListener?"addEventListener":"attachEvent",v=i.addEventListener?"removeEventListener":"detachEvent",f=i.addEventListener?"":"on",r=function(e){(e.type!=s||i.readyState==l)&&((e.type=="load"?n:i)[v](f+e.type,r,u),!h&&(h=!0)&&t.call(n,null))},o=function(){try{a.doScroll("left")}catch(n){setTimeout(o,50);return}r("poll")};if(i.readyState==l)t.call(n,"lazy");else{if(i.createEventObject&&a.doScroll){try{c=!n.frameElement}catch(y){}c&&o()}i[e](f+"DOMContentLoaded",r,u),i[e](f+s,r,u),n[e](f+"load",r,u)}}function selector(a){a=a.match(/^(\W)?(.*)/);var b=document["getElement"+(a[1]?a[1]=="#"?"ById":"sByClassName":"sByTagName")](a[2]);var ret=[];b!=null&&(b.length?ret=b:b.length==0?ret=b:ret=[b]);return ret}function extend(a,b){var c={};for(var d in a)c[d]=a[d];for(var e in b)c[e]=b[e];return c}if(!Object.prototype.hasOwnProperty)Object.prototype.hasOwnProperty=function(prop){var proto=this.__proto__||this.constructor.prototype;return prop in this&&(!(prop in proto)||proto[prop]!==this[prop])};function text_size(width,height,template){var dimension_arr=[height,width].sort();var maxFactor=Math.round(dimension_arr[1]/16),minFactor=Math.round(dimension_arr[0]/16);var text_height=Math.max(template.size,maxFactor);return{height:text_height}}function draw(ctx,dimensions,template,ratio){var ts=text_size(dimensions.width,dimensions.height,template);var text_height=ts.height;var width=dimensions.width*ratio,height=dimensions.height*ratio;var font=template.font?template.font:"sans-serif";canvas.width=width;canvas.height=height;ctx.textAlign="center";ctx.textBaseline="middle";ctx.fillStyle=template.background;ctx.fillRect(0,0,width,height);ctx.fillStyle=template.foreground;ctx.font="bold "+text_height+"px "+font;var text=template.text?template.text:dimensions.width+"x"+dimensions.height;if(ctx.measureText(text).width/width>1){text_height=template.size/(ctx.measureText(text).width/width)}ctx.font="bold "+text_height*ratio+"px "+font;ctx.fillText(text,width/2,height/2,width);return canvas.toDataURL("image/png")}function render(mode,el,holder,src){var dimensions=holder.dimensions,theme=holder.theme,text=holder.text?decodeURIComponent(holder.text):holder.text;var dimensions_caption=dimensions.width+"x"+dimensions.height;theme=text?extend(theme,{text:text}):theme;theme=holder.font?extend(theme,{font:holder.font}):theme;var ratio=1;if(window.devicePixelRatio&&window.devicePixelRatio>1){ratio=window.devicePixelRatio}if(mode=="image"){el.setAttribute("data-src",src);el.setAttribute("alt",text?text:theme.text?theme.text+" ["+dimensions_caption+"]":dimensions_caption);if(fallback||!holder.auto){el.style.width=dimensions.width+"px";el.style.height=dimensions.height+"px"}if(fallback){el.style.backgroundColor=theme.background}else{el.setAttribute("src",draw(ctx,dimensions,theme,ratio))}}else{if(!fallback){el.style.backgroundImage="url("+draw(ctx,dimensions,theme,ratio)+")";el.style.backgroundSize=dimensions.width+"px "+dimensions.height+"px"}}}function fluid(el,holder,src){var dimensions=holder.dimensions,theme=holder.theme,text=holder.text;var dimensions_caption=dimensions.width+"x"+dimensions.height;theme=text?extend(theme,{text:text}):theme;var fluid=document.createElement("div");if(el.fluidRef){fluid=el.fluidRef}fluid.style.backgroundColor=theme.background;fluid.style.color=theme.foreground;fluid.className=el.className+" holderjs-fluid";fluid.style.width=holder.dimensions.width+(holder.dimensions.width.indexOf("%")>0?"":"px");fluid.style.height=holder.dimensions.height+(holder.dimensions.height.indexOf("%")>0?"":"px");fluid.id=el.id;el.style.width=0;el.style.height=0;if(!el.fluidRef){if(theme.text){fluid.appendChild(document.createTextNode(theme.text))}else{fluid.appendChild(document.createTextNode(dimensions_caption));fluid_images.push(fluid);setTimeout(fluid_update,0)}}el.fluidRef=fluid;el.parentNode.insertBefore(fluid,el.nextSibling);if(window.jQuery){jQuery(function($){$(el).on("load",function(){el.style.width=fluid.style.width;el.style.height=fluid.style.height;$(el).show();$(fluid).remove()})})}}function fluid_update(){for(i in fluid_images){if(!fluid_images.hasOwnProperty(i))continue;var el=fluid_images[i],label=el.firstChild;el.style.lineHeight=el.offsetHeight+"px";label.data=el.offsetWidth+"x"+el.offsetHeight}}function parse_flags(flags,options){var ret={theme:settings.themes.gray},render=false;for(sl=flags.length,j=0;j<sl;j++){var flag=flags[j];if(app.flags.dimensions.match(flag)){render=true;ret.dimensions=app.flags.dimensions.output(flag)}else if(app.flags.fluid.match(flag)){render=true;ret.dimensions=app.flags.fluid.output(flag);ret.fluid=true}else if(app.flags.colors.match(flag)){ret.theme=app.flags.colors.output(flag)}else if(options.themes[flag]){ret.theme=options.themes[flag]}else if(app.flags.text.match(flag)){ret.text=app.flags.text.output(flag)}else if(app.flags.font.match(flag)){ret.font=app.flags.font.output(flag)}else if(app.flags.auto.match(flag)){ret.auto=true}}return render?ret:false}if(!canvas.getContext){fallback=true}else{if(canvas.toDataURL("image/png").indexOf("data:image/png")<0){fallback=true}else{var ctx=canvas.getContext("2d")}}var fluid_images=[];var settings={domain:"holder.js",images:"img",bgnodes:".holderjs",themes:{gray:{background:"#eee",foreground:"#aaa",size:12},social:{background:"#3a5a97",foreground:"#fff",size:12},industrial:{background:"#434A52",foreground:"#C2F200",size:12}},stylesheet:".holderjs-fluid {font-size:16px;font-weight:bold;text-align:center;font-family:sans-serif;margin:0}"};app.flags={dimensions:{regex:/^(\d+)x(\d+)$/,output:function(val){var exec=this.regex.exec(val);return{width:+exec[1],height:+exec[2]}}},fluid:{regex:/^([0-9%]+)x([0-9%]+)$/,output:function(val){var exec=this.regex.exec(val);return{width:exec[1],height:exec[2]}}},colors:{regex:/#([0-9a-f]{3,})\:#([0-9a-f]{3,})/i,output:function(val){var exec=this.regex.exec(val);return{size:settings.themes.gray.size,foreground:"#"+exec[2],background:"#"+exec[1]}}},text:{regex:/text\:(.*)/,output:function(val){return this.regex.exec(val)[1]}},font:{regex:/font\:(.*)/,output:function(val){return this.regex.exec(val)[1]}},auto:{regex:/^auto$/}};for(var flag in app.flags){if(!app.flags.hasOwnProperty(flag))continue;app.flags[flag].match=function(val){return val.match(this.regex)}}app.add_theme=function(name,theme){name!=null&&theme!=null&&(settings.themes[name]=theme);return app};app.add_image=function(src,el){var node=selector(el);if(node.length){for(var i=0,l=node.length;i<l;i++){var img=document.createElement("img");img.setAttribute("data-src",src);node[i].appendChild(img)}}return app};app.run=function(o){var options=extend(settings,o),images=[];if(options.images instanceof window.NodeList){imageNodes=options.images}else if(options.images instanceof window.Node){imageNodes=[options.images]}else{imageNodes=selector(options.images)}if(options.elements instanceof window.NodeList){bgnodes=options.bgnodes}else if(options.bgnodes instanceof window.Node){bgnodes=[options.bgnodes]}else{bgnodes=selector(options.bgnodes)}preempted=true;for(i=0,l=imageNodes.length;i<l;i++)images.push(imageNodes[i]);var holdercss=document.getElementById("holderjs-style");if(!holdercss){holdercss=document.createElement("style");holdercss.setAttribute("id","holderjs-style");holdercss.type="text/css";document.getElementsByTagName("head")[0].appendChild(holdercss)}if(!options.nocss){if(holdercss.styleSheet){holdercss.styleSheet+=options.stylesheet}else{holdercss.textContent+=options.stylesheet}}var cssregex=new RegExp(options.domain+'/(.*?)"?\\)');for(var l=bgnodes.length,i=0;i<l;i++){var src=window.getComputedStyle(bgnodes[i],null).getPropertyValue("background-image");var flags=src.match(cssregex);if(flags){var holder=parse_flags(flags[1].split("/"),options);if(holder){render("background",bgnodes[i],holder,src)}}}for(var l=images.length,i=0;i<l;i++){var attr_src=images[i].getAttribute("src"),attr_datasrc=images[i].getAttribute("data-src");var src=null;if(attr_datasrc==null&&!!attr_src&&attr_src.indexOf(options.domain)>=0){src=attr_src}else if(!!attr_datasrc&&attr_datasrc.indexOf(options.domain)>=0){src=attr_datasrc}if(src){var holder=parse_flags(src.substr(src.lastIndexOf(options.domain)+options.domain.length+1).split("/"),options);if(holder){if(holder.fluid){fluid(images[i],holder,src)}else{render("image",images[i],holder,src)}}}}return app};contentLoaded(win,function(){if(window.addEventListener){window.addEventListener("resize",fluid_update,false);window.addEventListener("orientationchange",fluid_update,false)}else{window.attachEvent("onresize",fluid_update)}preempted||app.run()});if(typeof define==="function"&&define.amd){define("Holder",[],function(){return app})}})(Holder,window);


var Lorem;(function(){Lorem=function(){this.type=null;this.query=null;this.data=null;};Lorem.IMAGE=1;Lorem.TEXT=2;Lorem.TYPE={PARAGRAPH:1,SENTENCE:2,WORD:3};Lorem.WORDS=["lorem","ipsum","dolor","sit","amet,","consectetur","adipiscing","elit","ut","aliquam,","purus","sit","amet","luctus","venenatis,","lectus","magna","fringilla","urna,","porttitor","rhoncus","dolor","purus","non","enim","praesent","elementum","facilisis","leo,","vel","fringilla","est","ullamcorper","eget","nulla","facilisi","etiam","dignissim","diam","quis","enim","lobortis","scelerisque","fermentum","dui","faucibus","in","ornare","quam","viverra","orci","sagittis","eu","volutpat","odio","facilisis","mauris","sit","amet","massa","vitae","tortor","condimentum","lacinia","quis","vel","eros","donec","ac","odio","tempor","orci","dapibus","ultrices","in","iaculis","nunc","sed","augue","lacus,","viverra","vitae","congue","eu,","consequat","ac","felis","donec","et","odio","pellentesque","diam","volutpat","commodo","sed","egestas","egestas","fringilla","phasellus","faucibus","scelerisque","eleifend","donec","pretium","vulputate","sapien","nec","sagittis","aliquam","malesuada","bibendum","arcu","vitae","elementum","curabitur","vitae","nunc","sed","velit","dignissim","sodales","ut","eu","sem","integer","vitae","justo","eget","magna","fermentum","iaculis","eu","non","diam","phasellus","vestibulum","lorem","sed","risus","ultricies","tristique","nulla","aliquet","enim","tortor,","at","auctor","urna","nunc","id","cursus","metus","aliquam","eleifend","mi","in","nulla","posuere","sollicitudin","aliquam","ultrices","sagittis","orci,","a","scelerisque","purus","semper","eget","duis","at","tellus","at","urna","condimentum","mattis","pellentesque","id","nibh","tortor,","id","aliquet","lectus","proin","nibh","nisl,","condimentum","id","venenatis","a,","condimentum","vitae","sapien","pellentesque","habitant","morbi","tristique","senectus","et","netus","et","malesuada","fames","ac","turpis","egestas","sed","tempus,","urna","et","pharetra","pharetra,","massa","massa","ultricies","mi,","quis","hendrerit","dolor","magna","eget","est","lorem","ipsum","dolor","sit","amet,","consectetur","adipiscing","elit","pellentesque","habitant","morbi","tristique","senectus","et","netus","et","malesuada","fames","ac","turpis","egestas","integer","eget","aliquet","nibh","praesent","tristique","magna","sit","amet","purus","gravida","quis","blandit","turpis","cursus","in","hac","habitasse","platea","dictumst","quisque","sagittis,","purus","sit","amet","volutpat","consequat,","mauris","nunc","congue","nisi,","vitae","suscipit","tellus","mauris","a","diam","maecenas","sed","enim","ut","sem","viverra","aliquet","eget","sit","amet","tellus","cras","adipiscing","enim","eu","turpis","egestas","pretium","aenean","pharetra,","magna","ac","placerat","vestibulum,","lectus","mauris","ultrices","eros,","in","cursus","turpis","massa","tincidunt","dui","ut","ornare","lectus","sit","amet","est","placerat","in","egestas","erat","imperdiet","sed","euismod","nisi","porta","lorem","mollis","aliquam","ut","porttitor","leo","a","diam","sollicitudin","tempor","id","eu","nisl","nunc","mi","ipsum,","faucibus","vitae","aliquet","nec,","ullamcorper","sit","amet","risus","nullam","eget","felis","eget","nunc","lobortis","mattis","aliquam","faucibus","purus","in","massa","tempor","nec","feugiat","nisl","pretium","fusce","id","velit","ut","tortor","pretium","viverra","suspendisse","potenti","nullam","ac","tortor","vitae","purus","faucibus","ornare","suspendisse","sed","nisi","lacus,","sed","viverra","tellus","in","hac","habitasse","platea","dictumst","vestibulum","rhoncus","est","pellentesque","elit","ullamcorper","dignissim","cras","tincidunt","lobortis","feugiat","vivamus","at","augue","eget","arcu","dictum","varius","duis","at","consectetur","lorem","donec","massa","sapien,","faucibus","et","molestie","ac,","feugiat","sed","lectus","vestibulum","mattis","ullamcorper","velit","sed","ullamcorper","morbi","tincidunt","ornare","massa,","eget","egestas","purus","viverra","accumsan","in","nisl","nisi,","scelerisque","eu","ultrices","vitae,","auctor","eu","augue","ut","lectus","arcu,","bibendum","at","varius","vel,","pharetra","vel","turpis","nunc","eget","lorem","dolor,","sed","viverra","ipsum","nunc","aliquet","bibendum","enim,","facilisis","gravida","neque","convallis","a","cras","semper","auctor","neque,","vitae","tempus","quam","pellentesque","nec","nam","aliquam","sem","et","tortor","consequat","id","porta","nibh","venenatis","cras","sed","felis","eget","velit","aliquet","sagittis","id","consectetur","purus","ut","faucibus","pulvinar","elementum","integer","enim","neque,","volutpat","ac","tincidunt","vitae,","semper","quis","lectus","nulla","at","volutpat","diam","ut","venenatis","tellus","in","metus","vulputate","eu","scelerisque","felis","imperdiet","proin","fermentum","leo","vel","orci","porta","non","pulvinar","neque","laoreet","suspendisse","interdum","consectetur","libero,","id","faucibus","nisl","tincidunt","eget","nullam","non","nisi","est,","sit","amet","facilisis","magna","etiam","tempor,","orci","eu","lobortis","elementum,","nibh","tellus","molestie","nunc,","non","blandit","massa","enim","nec","dui","nunc","mattis","enim","ut","tellus","elementum","sagittis","vitae","et","leo","duis","ut","diam","quam","nulla","porttitor","massa","id","neque","aliquam","vestibulum","morbi","blandit","cursus","risus,","at","ultrices","mi","tempus","imperdiet","nulla","malesuada","pellentesque","elit","eget","gravida","cum","sociis","natoque","penatibus","et","magnis","dis","parturient","montes,","nascetur","ridiculus","mus","mauris","vitae","ultricies","leo","integer","malesuada","nunc","vel","risus","commodo","viverra","maecenas","accumsan,","lacus","vel","facilisis","volutpat,","est","velit","egestas","dui,","id","ornare","arcu","odio","ut","sem","nulla","pharetra","diam","sit","amet","nisl","suscipit","adipiscing","bibendum","est","ultricies","integer","quis","auctor","elit","sed","vulputate","mi","sit","amet","mauris","commodo","quis","imperdiet","massa","tincidunt","nunc","pulvinar","sapien","et","ligula","ullamcorper","malesuada","proin","libero","nunc,","consequat","interdum","varius","sit","amet,","mattis","vulputate","enim","nulla","aliquet","porttitor","lacus,","luctus","accumsan","tortor","posuere","ac","ut","consequat","semper","viverra","nam","libero","justo,","laoreet","sit","amet","cursus","sit","amet,","dictum","sit","amet","justo","donec","enim","diam,","vulputate","ut","pharetra","sit","amet,","aliquam","id","diam","maecenas","ultricies","mi","eget","mauris","pharetra","et","ultrices","neque","ornare","aenean","euismod","elementum","nisi,","quis","eleifend","quam","adipiscing","vitae","proin","sagittis,","nisl","rhoncus","mattis","rhoncus,","urna","neque","viverra","justo,","nec","ultrices","dui","sapien","eget","mi","proin","sed","libero","enim,","sed","faucibus","turpis","in","eu","mi","bibendum","neque","egestas","congue","quisque","egestas","diam","in","arcu","cursus","euismod","quis","viverra","nibh","cras","pulvinar","mattis","nunc,","sed","blandit","libero","volutpat","sed","cras","ornare","arcu","dui","vivamus","arcu","felis,","bibendum","ut","tristique","et,","egestas","quis","ipsum","suspendisse","ultrices","gravida","dictum","fusce","ut","placerat","orci","nulla","pellentesque","dignissim","enim,","sit","amet","venenatis","urna","cursus","eget","nunc","scelerisque","viverra","mauris,","in","aliquam","sem","fringilla","ut","morbi","tincidunt","augue","interdum","velit","euismod","in","pellentesque","massa","placerat","duis","ultricies","lacus","sed","turpis","tincidunt","id","aliquet","risus","feugiat","in","ante","metus,","dictum","at","tempor","commodo,","ullamcorper","a","lacus","vestibulum","sed","arcu","non","odio","euismod","lacinia","at","quis","risus","sed","vulputate","odio","ut","enim","blandit","volutpat","maecenas","volutpat","blandit","aliquam","etiam","erat","velit,","scelerisque","in","dictum","non,","consectetur","a","erat","nam","at","lectus","urna","duis","convallis","convallis","tellus,","id","interdum","velit","laoreet","id","donec","ultrices","tincidunt","arcu,","non","sodales","neque","sodales","ut","etiam","sit","amet","nisl","purus,","in","mollis","nunc","sed","id","semper","risus","in","hendrerit","gravida","rutrum","quisque","non","tellus","orci,","ac","auctor","augue","mauris","augue","neque,","gravida","in","fermentum","et,","sollicitudin","ac","orci","phasellus","egestas","tellus","rutrum","tellus","pellentesque","eu","tincidunt","tortor","aliquam","nulla","facilisi","cras","fermentum,","odio","eu","feugiat","pretium,","nibh","ipsum","consequat","nisl,","vel","pretium","lectus","quam","id","leo","in","vitae","turpis","massa","sed","elementum","tempus","egestas","sed","sed","risus","pretium","quam","vulputate","dignissim","suspendisse","in","est","ante","in","nibh","mauris,","cursus","mattis","molestie","a,","iaculis","at","erat","pellentesque","adipiscing","commodo","elit,","at","imperdiet","dui","accumsan","sit","amet","nulla","facilisi","morbi","tempus","iaculis","urna,","id","volutpat","lacus","laoreet","non","curabitur","gravida","arcu","ac","tortor","dignissim","convallis","aenean","et","tortor","at","risus","viverra","adipiscing","at","in","tellus","integer","feugiat","scelerisque","varius","morbi","enim","nunc,","faucibus","a","pellentesque","sit","amet,","porttitor","eget","dolor","morbi","non","arcu","risus,","quis","varius","quam","quisque","id","diam","vel","quam","elementum","pulvinar","etiam","non","quam","lacus","suspendisse","faucibus","interdum","posuere","lorem","ipsum","dolor","sit","amet,","consectetur","adipiscing","elit","duis","tristique","sollicitudin","nibh","sit","amet","commodo","nulla","facilisi","nullam","vehicula","ipsum","a","arcu","cursus","vitae","congue","mauris","rhoncus","aenean","vel","elit","scelerisque","mauris","pellentesque","pulvinar","pellentesque","habitant","morbi","tristique","senectus","et","netus","et","malesuada","fames","ac","turpis","egestas","maecenas","pharetra","convallis","posuere","morbi","leo","urna,","molestie","at","elementum","eu,","facilisis","sed","odio","morbi","quis","commodo","odio","aenean","sed","adipiscing","diam","donec","adipiscing","tristique","risus","nec","feugiat","in","fermentum","posuere","urna","nec","tincidunt","praesent","semper","feugiat","nibh","sed","pulvinar","proin","gravida","hendrerit","lectus","a","molestie"];Lorem.prototype.randomInt=function(min,max){return Math.floor(Math.random()*(max-min+1))+min;};Lorem.prototype.createText=function(count,type){switch(type){case Lorem.TYPE.PARAGRAPH:var paragraphs=new Array;for(var i=0;i<count;i++){var paragraphLength=this.randomInt(10,20);var paragraph=this.createText(paragraphLength,Lorem.TYPE.SENTENCE);paragraphs.push(paragraph);}return paragraphs.join("\n");break;case Lorem.TYPE.SENTENCE:var sentences=new Array;for(var i=0;i<count;i++){var sentenceLength=this.randomInt(5,10);var words=this.createText(sentenceLength,Lorem.TYPE.WORD).split(" ");words[0]=words[0].substr(0,1).toUpperCase()+words[0].substr(1);var sentence=words.join(" ");sentences.push(sentence);}return(sentences.join(". ")+".").replace(/(\.\,|\,\.)/g,".");break;case Lorem.TYPE.WORD:var wordIndex=this.randomInt(0,Lorem.WORDS.length-count-1);return Lorem.WORDS.slice(wordIndex,wordIndex+count).join(" ").replace(/\.|\,/g,"");break;}};Lorem.prototype.createLorem=function(element){var lorem=new Array;var count=parseInt(this.query);if(/\d+p/.test(this.query)){var type=Lorem.TYPE.PARAGRAPH;}else{if(/\d+s/.test(this.query)){var type=Lorem.TYPE.SENTENCE;}else{if(/\d+w/.test(this.query)){var type=Lorem.TYPE.WORD;}}}lorem.push(this.createText(count,type));lorem=lorem.join(" ");if(element){if(this.type==Lorem.TEXT){element.innerHTML+=lorem;}else{if(this.type==Lorem.IMAGE){var path="";var options=this.query.split(" ");if(options[0]=="gray"){path+="/g";options[0]="";}if(element.getAttribute("width")){path+="/"+element.getAttribute("width");}if(element.getAttribute("height")){path+="/"+element.getAttribute("height");}path+="/"+options.join(" ").replace(/(^\s+|\s+$)/,"");element.src="http://lorempixum.com"+path.replace(/\/\//,"/");}}}if(element==null){return lorem;}};if(typeof jQuery!="undefined"){(function($){$.fn.lorem=function(){$(this).each(function(){var lorem=new Lorem;lorem.type=$(this).is("img")?Lorem.IMAGE:Lorem.TEXT;lorem.query=$(this).data("lorem");lorem.createLorem(this);});};$(document).ready(function(){$("[data-lorem]").lorem();});})(jQuery);}})();
/*!
 * jQuery replaceText - v1.1 - 11/21/2009
 * http://benalman.com/projects/jquery-replacetext-plugin/
 *
 * Copyright (c) 2009 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($){$.fn.replaceText=function(search,replace,text_only){return this.each(function(){var node=this.firstChild,val,new_val,remove=[];if(node){do{if(node.nodeType===3){val=node.nodeValue;new_val=val.replace(search,replace);if(new_val!==val){if(!text_only&&/</.test(new_val)){$(node).before(new_val);remove.push(node);}else{node.nodeValue=new_val;}}}}while(node=node.nextSibling);}remove.length&&$(remove).remove();});};})(jQuery);(function($,window,document,undefined){var IpsumWriter={_lorem:new Lorem(),_buffer:"",_addBuffer:function(item){this._buffer+=(typeof item==="string")?item:item[0].outerHTML;},_getWords:function(count){return this._lorem.createText(count,Lorem.TYPE.WORD);},_getSentences:function(count){return this._lorem.createText(count,Lorem.TYPE.SENTENCE);},_getParagraphs:function(count){return this._lorem.createText(count,Lorem.TYPE.PARAGRAPH);},_tagBuilder:function(tag,text,attributes){attributes=$.extend({},{text:text},attributes);return $(tag,attributes);},p:function(paragraphCount,sentenceCount,attributes){paragraphCount=paragraphCount||1;sentenceCount=sentenceCount||5;var tag="<p></p>";for(var i=0;i<paragraphCount;i++){this._addBuffer(this._tagBuilder(tag,this._getSentences(sentenceCount),attributes));}return this;},_image:function(width,height,text,bgColor,fgColor,attributes){height=height||width;bgColor=bgColor||"eee";var dim=width+"x"+height+"/";fgColor=(typeof fgColor!="undefined")?fgColor+"/":"";bgColor=(typeof fgColor!="undefined")?bgColor+"/":"";text=(typeof text!="undefined")?"&text="+text:"";var tag="<image/>";var imgUrl="http://placehold.it/"+dim+fgColor+bgColor+text;attributes=$.extend({},{"src":imgUrl},attributes);return this._tagBuilder(tag,"",attributes);},image:function(width,height,text,bgColor,fgColor,attributes){this._addBuffer(this._image(width,height,text,bgColor,fgColor,attributes));return this;},_h:function(level,wordCount,attributes){wordCount=wordCount||2;var tag="<h"+level+"></h"+level+">";this._addBuffer(this._tagBuilder(tag,this._getWords(wordCount),attributes));return this;},_listItem:function(tag,wordCount,hasLink,attributes){wordCount=wordCount||2;var lorem=new Lorem();hasLink=hasLink||false;var li=this._tagBuilder(tag,this._getWords(wordCount),attributes);if(hasLink){li.wrapInner("<a href='#'></a>");}return li;},_list:function(outerTag,innerTag,count,wordCount,hasLinks,outerAttributes,innerAttributes){wordCount=wordCount||2;count=count||5;var outerElem=this._tagBuilder(outerTag,"",outerAttributes);for(var i=0;i<count;i++){outerElem.append(this._listItem(innerTag,wordCount,hasLinks,innerAttributes));}this._addBuffer(outerElem);},write:function(){return this._buffer;},words:function(wordCount){wordCount=wordCount||2;this._addBuffer(this._getWords(wordCount));return this;},sentences:function(sentencesCount){sentencesCount=sentencesCount||5;this._addBuffer(this._getSentences(sentencesCount));return this;},paragraphs:function(count){this._addBuffer(this._getParagraphs(count));return this;},dl:function(listCount,wordCount,hasLinks,olAttributes,liAttributes){this._list("<dl></dl>","<dd></dd>",listCount,wordCount,hasLinks,olAttributes,liAttributes);return this;},ol:function(listCount,wordCount,hasLinks,olAttributes,liAttributes){this._list("<ol></ol>","<li></li>",listCount,wordCount,hasLinks,olAttributes,liAttributes);return this;},ul:function(listCount,wordCount,hasLinks,ulAttributes,liAttributes){this._list("<ul></ul>","<li></li>",listCount,wordCount,hasLinks,ulAttributes,liAttributes);return this;},h1:function(wordCount,attributes){this._h(1,wordCount,attributes);return this;},h2:function(wordCount,attributes){this._h(2,wordCount,attributes);return this;},h3:function(wordCount,attributes){this._h(3,wordCount,attributes);return this;},h4:function(wordCount,attributes){this._h(4,wordCount,attributes);return this;},h5:function(wordCount,attributes){this._h(5,wordCount,attributes);return this;},h6:function(wordCount,attributes){this._h(6,wordCount,attributes);return this;},blogPost:function(){this.h1(3).p(2,25).h2().p(3,15).h3(2).p();return this;}};var Ipsum;var settings;var inline=function(str){Ipsum=Object.create(settings.extension);var command=str.replace(settings.token+settings.locator+".","").concat(".write()");var result;try{result=eval(command);}catch(e){result=$("<em></em>",{text:"Go home Ipsum you're drunk",style:"color: transparent;text-shadow: 0px 0px 2px #FF33FF;",title:e.message})[0].outerHTML;}return result;};$.fn.inlineIpsum=function(options){if(options&&options.extension){options.extension=$.extend({},$.fn.inlineIpsum.options.extension,options.extension);}settings=$.extend({},$.fn.inlineIpsum.options,options);return this.replaceText(new RegExp(settings.token+settings.locator+".Ipsum(\\..*?\\))*","gi"),inline);};$.fn.inlineIpsum.options={extension:IpsumWriter,locator:"Html",token:"@"};})(jQuery,window,document);