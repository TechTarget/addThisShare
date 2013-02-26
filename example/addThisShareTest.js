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

