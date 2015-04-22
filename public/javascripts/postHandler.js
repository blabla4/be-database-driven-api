var apiId = 0;
var methodsId = [];

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
      apiId = response._id;
      form.methods.forEach(function(method) {
        if(method.name !== undefined && method.name !== "") {
          var params = []
          if(method.parameters !== undefined) {
            method.parameters.forEach(function(param) {
              params.push({
                "name": param.name,
                "locatedIn": param.locatedIn,
                "description": param.description,
                "required": param.required,
                "schema": param.schema
              });
            });
          }
          postMehod({
            "name": method.name,
            "description": method.description,
            "type": method.type,
            "parameters": params,
            "script": method.script
          }, response._id);
        }
      });
      putMethods();
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
      methodsId.push(response._id);
    },
    error: function(response, status, err) {

    }
  });
}

function putMethods() {
  $.ajax({
    url: 'http://10.134.15.103/apis/' + apiId,
    data: JSON.stringify({"methods": methodsId}),
    contentType: 'application/json; charset=utf-8',
    type:'PUT',
    async:false,
    success: function(response) {

    },
    error: function(response, status, err) {

    }
  });
}
