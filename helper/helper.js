var hue = require('hue-module');
var Color = require("color");

var helper = {
  get_ir_code: function(value) {
    return getKeyByValue(remote, value);
  },

  set_hue_color: function(host, key, light, color) {
    hue.load(host, key);
    hue.light(parseInt(light), function(light){
        var c = Color(color);
        hue.change(light.set({"on": true, "rgb":[c.red(),c.green(),c.blue()]}));
    });
  },

  set_hue_power: function(host, key, light, state) {
    hue.load(host, key);
    hue.light(parseInt(light), function(light){
      switch(state) {
        case "on":
          hue.change(light.set({"on":true}));
          break;
        case "off":
          hue.change(light.set({"on":false}));
          break;
      }
    });
  }

};

var getKeyByValue = function(dict, value) {
  for( var prop in dict ) {
    if( dict.hasOwnProperty( prop ) ) {
       if( dict[ prop ] === value )
         return prop;
    }
  }
};

var remote = {
  "16": "1",
  "2064": "2",
  "1040": "3",
  "3088": "4",
  "528": "5",
  "2576": "6",
  "1552": "7",
  "3600": "8",
  "272": "9",
  "2320": "0",
  "1168": "V+",
  "3216": "V-",
  "144": "P+",
  "2192": "P-",
  "752": "UP",
  "3280": "RIGHT",
  "2800": "DOWN",
  "720": "LEFT",
  "2672": "OK",
  "656": "MUTE",
  "21225": "RED",
  "13033": "GREEN",
  "29417": "YELLOW",
  "4841": "BLUE"
};

module.exports = helper;
