

composable("components.Allocable", function (require, global, environment) {


  "use strict";


//require("components.Introspective_isFunction_isCallable");  // implicitly by "composites.Array_make"
  require("composites.Array_make");


  var
    Enumerable_listWrapper = require("components.Enumerable_first_last_item_listWrapper"),


    Trait, // the "Allocable" Trait Module.


    Array = global.Array,


    isFunction = environment.introspective.isFunction,

    makeArray = (isFunction(Array.make) && Array.make) || environment.helpers.makeArray
  ;


  Trait = function (list) {
    /**
     *  implementing the privileged "Allocable" Trait Module.
     *
     *  - actually it looks like a Trait.
     *    but since - with [list] - it encloses *state*
     *    that does not get mutated by this implementation
     *    it should be referred to as privileged Trait.
     */
    var
      allocable = this
    ;
    allocable.valueOf = allocable.toArray = function () {

      return makeArray(list);
    };
    allocable.toString = function () {

      return ("" + list);
    };
    allocable.size = function () {

      return list.length;
    };
    Enumerable_listWrapper.call(allocable, list);
  };


  return Trait;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   384 byte
composable("components.Allocable",function(a,b,c){a("composites.Array_make");var d=a("components.Enumerable_first_last_item_listWrapper");a=b.Array;b=c.introspective.isFunction;var e=b(a.make)&&a.make||c.helpers.makeArray;return function(a){this.valueOf=this.toArray=function(){return e(a)};this.toString=function(){return""+a};this.size=function(){return a.length};d.call(this,a)}});


*/
