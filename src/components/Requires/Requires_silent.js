

composable("components.Requires_silent", function (require, global, internalBaseEnvironment) {


  "use strict";


  var
    SilentTrait,


    env_introspective = internalBaseEnvironment.introspective,

    isFunction      = env_introspective.isFunction,
    isString        = env_introspective.isString,
    isArray         = env_introspective.isArray,
    isArguments     = env_introspective.isArguments,
    isObjectObject  = env_introspective.isObjectObject,


    Array         = global.Array,

    array_from    = (isFunction(Array.from) && Array.from) || internalBaseEnvironment.helpers.makeArray,

    array_flatten = function flatten (list) {
      return ((isArray(list) && list) || (isArguments(list) && array_from(list))).reduce(function (collector, elm) {

        return collector.concat(flatten(elm));

      }, []) || list;
    },


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
        !(methodName in type) && missingMethodNames.push(methodName);
      });

      if (missingMethodNames.length) {
        throw (new TypeError([

          "The",

          type,

          "type misses following required methods -",

          ("[" + missingMethodNames.join(", ") + "]")

        ].join(" ")));
      }
    }
  ;


  SilentTrait = function (localProxy) { // Privileged Silent Trait using a Local Proxy (or rather a Mixin?)
    if (isObjectObject(localProxy)) {

      //if (localProxy && (typeof localProxy == "object")) {
      var type = this;

      localProxy.requires = function (/*methodName:string[, methodName:string[, ...]] | [methodName:string, methodName:string, ...]*/) {
        requires.apply(type, arguments);
      };
    }
  };


  return SilentTrait;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   606 byte
composable("components.Requires_silent",function(d,c,e){var a=e.introspective;d=a.isFunction;var f=a.isString,g=a.isArray,h=a.isArguments,k=a.isObjectObject;c=c.Array;var l=d(c.from)&&c.from||e.helpers.makeArray,n=function m(b){return(g(b)&&b||h(b)&&l(b)).reduce(function(b,a){return b.concat(m(a))},[])||b},p=function(){var a=this,b=[];n(arguments).filter(f).forEach(function(c){c in a||b.push(c)});if(b.length)throw new TypeError(["The",a,"type misses following required methods -","["+b.join(", ")+"]"].join(" "));};return function(a){if(k(a)){var b=this;a.requires=function(){p.apply(b,arguments)}}}});


*/
