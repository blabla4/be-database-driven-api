
function postForm(form) {
  postApi({
    "host": form.host,
    "name": form.name,
    "description": form.description,
    "methods": []
  }, form);
}

function postApi(api, form) {
  $.ajax({
    url: 'http://10.134.15.103/apis',
    data: JSON.stringify(api),
    contentType: 'application/json; charset=utf-8',
    dataType:'json',
    type:'POST',
    async:false,
    success: function(response) {
      form.methods.forEach(function(method) {
        postMehod({
          "name": method.name,
          "description": method.description,
          "type": method.type,
          "parameters": {
            "name": method.parameters.name,
            "locatedIn": method.parameters.locatedIn,
            "description": method.parameters.description,
            "required": method.parameters.required,
            "schema": method.parameters.schema
          },
          "script": method.script
        }, response._id);
      });
    },
    error: function(response, status, err) {

    }
  });
}

function postMehod(method, apiId) {
  $.ajax({
    url: 'http://10.134.15.103/methods',
    data: JSON.stringify(method),
    contentType: 'application/json; charset=utf-8',
    dataType:'json',
    type:'POST',
    async:false,
    success: function(response) {
      $.ajax({
        url: 'http://10.134.15.103/apis/' + apiId,
        type:'GET',
        async:false,
        success: function(response) {
          $.ajax({
            url: 'http://10.134.15.103/apis/' + apiId,
            data: JSON.stringify({"methods": response.methods.push(method)}),
            contentType: 'application/json; charset=utf-8',
            type:'PUT',
            async:false,
            success: function(response) {

            },
            error: function(response, status, err) {

            }
          });
        },
        error: function(response, status, err) {

        }
      });
    },
    error: function(response, status, err) {

    }
  });
}
