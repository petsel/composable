

composable("components.Requiring", function (require, global/*, internalBaseEnvironment*/) {


  "use strict";


  var
    environment   = require("environment_extended_introspective_core"),


    Trait,


    env_introspective = environment.introspective,


    isFunction    = env_introspective.isFunction,
    isString      = env_introspective.isString,
    isArray       = env_introspective.isArray,
    isArguments   = env_introspective.isArguments,


    Array         = global.Array,

    array_from    = (isFunction(Array.from) && Array.from) || environment.helpers.makeArray,

    array_flatten = function flatten (list) {
      list = (isArguments(list) && array_from(list)) || list;

      if (isArray(list)) {
        list = list.reduce(function (collector, elm) {

          return collector.concat(flatten(elm));

        }, []);
      }
      return list;
    },
//  stay conservative as above - "smart" shortcut code from beneath will break:
//
//  array_flatten = function flatten(list) {
//    return ((isArray(list) && list) || (isArguments(list) && array_from(list))).reduce(function (collector, elm) {
//
//      return collector.concat(flatten(elm));
//
//    }, []) || list;
//  },


    requires = function (/*methodName:string[, methodName:string[, ...]] | [methodName:string, methodName:string, ...]*/) {
      var
        type = this,

        missingMethodNames = []
      ;

      array_flatten(
        arguments
      ).filter(
        isString
      ).forEach(function (methodName) {
        isFunction(type[methodName]) || missingMethodNames.push(methodName);
      });

      if (missingMethodNames.length) {
        throw (new TypeError([

          "The",

          type,

          "type misses following required methods -",

          ("[\"" + missingMethodNames.join("\", \"") + "\"]")

        ].join(" ")));
      }
    }
  ;


  Trait = function () {
    var type = this;

    type.requires = requires;
  };


  return Trait;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   579 byte
composable("components.Requiring",function(e,f){var c=e("environment_extended_introspective_core"),b=c.introspective,d=b.isFunction,g=b.isString,h=b.isArray,k=b.isArguments,b=f.Array,l=d(b.from)&&b.from||c.helpers.makeArray,n=function m(a){a=k(a)&&l(a)||a;h(a)&&(a=a.reduce(function(a,b){return a.concat(m(b))},[]));return a},p=function(){var b=this,a=[];n(arguments).filter(g).forEach(function(c){d(b[c])||a.push(c)});if(a.length)throw new TypeError(["The",b,"type misses following required methods -",'["'+a.join('", "')+'"]'].join(" "));};return function(){this.requires=p}});


*/
