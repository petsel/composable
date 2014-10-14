

composable("components.Excluding", function (require, global/*, internalBaseEnvironment*/) {


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


    excludes = function (/*methodName:string[, methodName:string[, ...]] | [methodName:string, methodName:string, ...]*/) {
      var
        type = this,

        excludedMethodsMap = null,

        deleteMethod = function (type, methodName) {
          (excludedMethodsMap || (excludedMethodsMap = {}));

          excludedMethodsMap[methodName] = type[methodName];
          delete type[methodName];
        }
      ;

      array_flatten(
        arguments
      ).filter(
        isString
      ).forEach(function (methodName) {
        isFunction(type[methodName]) && deleteMethod(type, methodName);
      });

      return excludedMethodsMap;
    }
  ;


  Trait = function () {
    var type = this;

    type.excludes = excludes;
  };


  return Trait;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   502 byte
composable("components.Excluding",function(f,g){var c=f("environment_extended_introspective_core"),b=c.introspective,e=b.isFunction,h=b.isString,k=b.isArray,l=b.isArguments,b=g.Array,m=e(b.from)&&b.from||c.helpers.makeArray,p=function n(a){a=l(a)&&m(a)||a;k(a)&&(a=a.reduce(function(a,b){return a.concat(n(b))},[]));return a},q=function(){var b=this,a=null;p(arguments).filter(h).forEach(function(d){if(e(b[d])){var c=b;a||(a={});a[d]=c[d];delete c[d]}});return a};return function(){this.excludes=q}});


*/
