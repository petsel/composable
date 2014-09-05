

composable("components.Requiring", function (require, global, internalBaseEnvironment) {


  "use strict";


  var
    Trait,


    env_introspective = internalBaseEnvironment.introspective,

    isFunction = env_introspective.isFunction,
    isString = env_introspective.isString,
    isArray = env_introspective.isArray,
    isArguments = env_introspective.isArguments,


    Array = global.Array,

    array_from = (isFunction(Array.from) && Array.from) || internalBaseEnvironment.helpers.makeArray,

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


- Simple          -   538 byte
composable("components.Requiring",function(b,c,d){b=d.introspective;var e=b.isFunction,f=b.isString,g=b.isArray,h=b.isArguments;c=c.Array;var k=e(c.from)&&c.from||d.helpers.makeArray,m=function l(a){a=h(a)&&k(a)||a;g(a)&&(a=a.reduce(function(a,b){return a.concat(l(b))},[]));return a},n=function(){var b=this,a=[];m(arguments).filter(f).forEach(function(c){e(b[c])||a.push(c)});if(a.length)throw new TypeError(["The",b,"type misses following required methods -",'["'+a.join('", "')+'"]'].join(" "));};return function(){this.requires=n}});


*/
