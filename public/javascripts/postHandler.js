var apiId = 0;
var apiMethods = [];

function postForm(form) {
  console.log(form);

  postApi({
    "host": form.host,
    "name": form.name,
    "description": form.description,
    "methods": []
  });

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
    });
  });
}

function postApi(api) {
  $.ajax({
    url: 'http://10.134.15.103/apis',
    data: JSON.stringify(api),
    contentType: 'application/json; charset=utf-8',
    dataType:'json',
    type:'POST',
    async:false,
    success: function(response) {
      console.log("POST API : "  + response);
      apiId = response._id;
    },
    error: function(response, status, err) {
      console.log(response);
    }
  });
}

function postMehod(method) {
  $.ajax({
    url: 'http://10.134.15.103/methods',
    data: JSON.stringify(method),
    contentType: 'application/json; charset=utf-8',
    dataType:'json',
    type:'POST',
    async:false,
    success: function(response) {
      console.log("POST MEHTOD : " + response);
      getApi();
      putMethods(apiMethods.push(response._id));
    },
    error: function(response, status, err) {
      console.log(response);
    }
  });
}

function putMethods(methods) {
  $.ajax({
    url: 'http://10.134.15.103/apis/' + apiId,
    data: JSON.stringify({"methods":methods}),
    contentType: 'application/json; charset=utf-8',
    type:'PUT',
    async:false,
    success: function(response) {
      console.log("PUT METHOD : " + response);
    },
    error: function(response, status, err) {
      console.log(response);
    }
  });
}

function getApi() {
  $.ajax({
    url: 'http://10.134.15.103/apis/' + apiId,
    type:'GET',
    async:false,
    success: function(response) {
      apiMethods = response.methods;
    },
    error: function(response, status, err) {
      console.log(response);
    }
  });
}
