window.onload = function() {
  var id = 0;

  $("#addMethod").on('click', function() {
    var _id = id;
    var method = $("#method").clone();
    method.attr("id", "method" + _id);
    method.find("#method_name").attr("id", "method_name" + _id);

    method.find("input").on('change', function() {
      $("#method_name" + _id).html($(this)[0].value);
    });

    var _script = $("<input></input>", {type: "text", style:"display:none;", name:"methods["+_id+"].script"});
    _script.appendTo(method);

    var script = CodeMirror(method.find("#script").get(0), {
      value: "function myScript()\n{\nreturn 100;\n}\n",
      mode:  "javascript",
      theme: "mdn-like",
      styleActiveLine: true
    });

    script.on('change', function() {
      _script.attr("value",script.getValue().replace(/(\r\n|\n|\r|\t)/gm," "));
    });

    script.setSize("100%","100%");

    method.find("input")[0].name = "methods[" + _id + "].name";
    method.find("input")[1].name = "methods[" + _id + "].description";
    method.find("select")[0].name = "methods[" + _id + "].type";
    method.appendTo($("#methods"));
    method.show();

    method.find("#addParam").attr("id", "addParam" + _id);
    method.find("#params").attr("id", "params" + _id);

    var idM = 0;
    $("#addParam" + _id).on('click', function() {
      var param = $("#param").clone();
      param.attr("id", "param" + _id);
      param.find("input")[0].name = "methods[" + _id + "].parameters[" + idM + "].name";
      param.find("input")[1].name = "methods[" + _id + "].parameters[" + idM + "].locatedIn";
      param.find("input")[2].name = "methods[" + _id + "].parameters[" + idM + "].description";
      param.find("input")[3].name = "methods[" + _id + "].parameters[" + idM + "].schema";
      param.find("select")[0].name = "methods[" + _id + "].parameters[" + idM + "].required";
      param.appendTo($("#params" + _id));
      param.show();
      idM = idM + 1;
    });
    id = id + 1;
  });

  $("#debug").on('click',function() {
    console.log(JSON.stringify(form2js('form')));
    $("#param").remove();
    $("#method").remove();
    postForm(form2js('form'));
  });
};
