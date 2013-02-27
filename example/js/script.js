// inits can be either both on window.load or doc.ready but not mixed
// if mixed, only doc.ready plugin loads
$(window).on('load', function() {

  $('#micrositeContent').addThisShare({
    addThisButtons: ['email', 'linkedin', 'facebook', 'twitter', 'addthis'],
    addThisButtonOrientation: 'vertical',
    addThisButtonSize: 'large',
    addThisButtonFollow: true
  });

});

$(document).on('ready', function() {

  $('#micrositeHeader').addThisShare();

  // no buttons
  $('#micrositeFooter').addThisShare({
     addThisButtons: []
  });

  $('#micrositeContentColumnFull').addThisShare();

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
        rows += '<td><span class="addthis_service_icon icon_' + services[i].code + '"></span></td>';
        // rows += '<td><img src="' + services[i].icon + '" height="16" width="16" /></td>';
        rows += '<td><img src="' + services[i].icon32 + '" height="32" width="32" /></td>';
        rows += '<td>' + services[i].endpoint + '</td>';
        rows += '</tr>';
      }

      // add rows & show the table
      $('#serviceMetaDataTable').append(rows).show();

    });

  });

});