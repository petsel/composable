

composable("components.Enumerable_initializeArray", function (require, global/*, internalBaseEnvironment*/) {


  "use strict";


  var
    environment = require("environment_extended_introspective_core"),


    Enumerable,


    Array = global.Array,


    parseInt    = global.parseInt,
    isFinite    = global.isFinite,
    isFunction  = environment.introspective.isFunction,
    isUndefined = environment.introspective.isUndefined,


    initialArguments = [],
    defaultValue,
    defaultValueGenerator,

    array_initialize = function (length/*integer*/, defaultValueOrGenerator/*any non function type or a map function*/) {
      var arr; length = parseInt(length, 10);
      if (isFinite(length) && (length >= 0)) {

        initialArguments.length = length;
        arr = Array.apply(arr, initialArguments);

        if (!isUndefined(defaultValueOrGenerator)) {
          if (isFunction(defaultValueOrGenerator)) {

            defaultValueGenerator = defaultValueOrGenerator;
          } else {
            defaultValue = defaultValueOrGenerator;

            defaultValueGenerator = function (/*elm, idx, arr*/) {
              return defaultValue;
            };
          }
          arr = arr.map(defaultValueGenerator);
        }
      }
      return arr; // undefined value or entirely iterable non sparse array.
    }
  ;


  Enumerable = function () {

    this.initializeArray = array_initialize;
  };


  return Enumerable;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   403 byte
composable("components.Enumerable_initializeArray",function(k,d){var f=k("environment_extended_introspective_core"),l=d.Array,m=d.parseInt,n=d.isFinite,p=f.introspective.isFunction,q=f.introspective.isUndefined,g=[],h,e,r=function(a,c){var b;a=m(a,10);n(a)&&0<=a&&(g.length=a,b=l.apply(b,g),q(c)||(p(c)?e=c:(h=c,e=function(){return h}),b=b.map(e)));return b};return function(){this.initializeArray=r}});


*/
