

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
      var type = this;

      array_flatten(
        arguments
      ).filter(
        isString
      ).forEach(function (methodName) {
        isFunction(type[methodName]) && (delete type[methodName]);
      });
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


- Simple          -   454 byte
composable("components.Excluding",function(e,f){var c=e("environment_extended_introspective_core"),b=c.introspective,d=b.isFunction,g=b.isString,h=b.isArray,k=b.isArguments,b=f.Array,l=d(b.from)&&b.from||c.helpers.makeArray,n=function m(a){a=k(a)&&l(a)||a;h(a)&&(a=a.reduce(function(a,b){return a.concat(m(b))},[]));return a},p=function(){var b=this;n(arguments).filter(g).forEach(function(a){d(b[a])&&delete b[a]})};return function(){this.excludes=p}});


*/
