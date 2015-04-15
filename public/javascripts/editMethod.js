$(function() {
  $('#methodForm').submit(function(event) {
    var methodData = JSON.stringify(form2js('methodForm', '.', true));
    $.ajax({
      url: 'http://localhost:3000/methods',
      data: methodData,
      contentType: 'application/json; charset=utf-8',
      dataType:'json',
      type:'POST',
      async:false,
      success: function(response) {
        $.ajax({
          url: 'http://localhost:3000/apis/' + JSON.parse(methodData).api,
          data: JSON.stringify({"methods":[(response._id).toString()]}),
          contentType: 'application/json; charset=utf-8',
          type:'PUT',
          async:false,
          success: function(response) {
            window.location.replace('http://localhost:3000/edit');
          },
          error: function(response, status, err) {
            window.location.replace('http://localhost:3000/edit/method');
          }
        });
      },
      error: function(response, status, err) {
        window.location.replace('http://localhost:3000/edit/method');
      }
    });
  });
});
