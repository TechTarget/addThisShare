var addthisEventHandler = function (e) {
  console.log(e);
  var addthisObj = window.addthis;
  var arr = [];
  for (var prop in addthisObj) {

    if (typeof addthisObj[prop] === 'object') {
      arr += 'OBJECT: ' + prop + '\n';
    } if (typeof addthisObj[prop] === 'function') {
      arr += 'FUNCTION: ' + prop + '\n';
    } else {
      arr += 'PROPERTY: ' + prop + '\n';
    }

  }
  console.log(arr);
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

isAddthisLoaded();
