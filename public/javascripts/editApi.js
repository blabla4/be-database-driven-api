$(function() {
  $('#apiForm').submit(function(event) {
    var apiData = JSON.stringify(form2js('apiForm', '.', true));
    $.ajax({
      url: 'http://localhost:3000/apis',
      data: apiData,
      contentType: 'application/json; charset=utf-8',
      dataType:'json',
      type:'POST',
      async:false,
      success: function(response) {
        alert(JSON.stringify(response));
        window.location.replace("http://localhost:3000/edit");
      },
      error: function(response, status, err) {
        alert(response);
        window.location.replace("http://localhost:3000/edit/method");
      }
    });
  });
});
