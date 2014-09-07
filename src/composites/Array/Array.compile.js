

composable(/*"composites.Array_compile"*/"", function (require, global/*, internalBaseEnvironment*/) {


  "use strict";


  var
    environment       = require("environment_extended_introspective_core"),
    array_initialize  = require("components.Enumerable_initializeArray"),


    array_prototype = global.Array.prototype,


    isFunction  = environment.introspective.isFunction,
    isArray     = environment.introspective.isArray,


    compileArray = function (length/*integer*/, defaultValueOrGenerator/*any non function type or a map function*/) {
      var
        thisArr = this,
        arr
      ;
    //if (isArray(thisArr) && (arr = array_initialize(length, defaultValueOrGenerator))) {
      if (isArray(thisArr) && (arr = array_initialize.apply(arr, arguments))) {

        thisArr.length = arr.length;

      //arr.forEach(function (entry, idx/*, arr*/) {
      //  thisArr[idx] = entry;
      //});
        thisArr.map(function (entry, idx/*, thisArr*/) {
          return arr[idx];
        });
      }
      return thisArr;
    }
  ;


  (!isFunction(array_prototype.compile) || (array_prototype.compile.length !== 2)) && (array_prototype.compile = compileArray);


//return Array;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   381 byte
composable("",function(d,e){var a=d("environment_extended_introspective_core"),f=d("components.Enumerable_initializeArray"),b=e.Array.prototype,g=a.introspective.isFunction,h=a.introspective.isArray,a=function(a,b){var c;h(this)&&(c=f.apply(c,arguments))&&(this.length=c.length,this.map(function(a,b){return c[b]}));return this};g(b.compile)&&2===b.compile.length||(b.compile=a)});


*/
