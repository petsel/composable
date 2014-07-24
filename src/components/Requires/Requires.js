

composable("components.Requires", function (require, global, internalBaseEnvironment) {


  "use strict";


  var
    Trait,


    env_introspective = internalBaseEnvironment.introspective,

    isFunction    = env_introspective.isFunction,
    isString      = env_introspective.isString,
    isArray       = env_introspective.isArray,
    isArguments   = env_introspective.isArguments,


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


  Trait = function () {
    var type = this;

    type.requires = requires;
  };


  return Trait;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   530 byte
composable("components.Requires",function(d,b,e){var c=e.introspective;d=c.isFunction;var f=c.isString,g=c.isArray,h=c.isArguments;b=b.Array;var k=d(b.from)&&b.from||e.helpers.makeArray,m=function l(a){return(g(a)&&a||h(a)&&k(a)).reduce(function(a,b){return a.concat(l(b))},[])||a},n=function(){var b=this,a=[];m(arguments).filter(f).forEach(function(c){c in b||a.push(c)});if(a.length)throw new TypeError(["The",b,"type misses following required methods -","["+a.join(", ")+"]"].join(" "));};return function(){this.requires=n}});


*/
