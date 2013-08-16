

composable("components.Allocable_all", function (require, global, environment) {


  "use strict";


//require("components.Introspective_isFunction_isCallable");  // implicitly by "composites.Array_make"
  require("composites.Array_make");


  var
    Enumerable_listGetterShorthands = require("components.Enumerable_first_last_item_listGetterShorthands"),


    Trait, // the "Allocable_all" Trait Module.


    Array = global.Array,


    isFunction = environment.introspective.isFunction,

    makeArray = (isFunction(Array.make) && Array.make) || environment.helpers.makeArray
  ;


  Trait = function (list) {
    /**
     *  implementing the privileged "Allocable_all" Trait Module.
     *
     *  - actually it looks like a Trait.
     *    but since - with [list] - it encloses *state*
     *    that does not get mutated by this implementation
     *    it should be referred to as privileged Trait.
     */
    var
      allocable = this
    ;
    allocable.all = function () {

      return makeArray(list);
    };
    allocable.all.size = function () {

      return list.length;
    };
    Enumerable_listGetterShorthands.call(allocable.all);
  };


  return Trait;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   349 byte
composable("components.Allocable_all",function(a,b,c){a("composites.Array_make");var d=a("components.Enumerable_first_last_item_listGetterShorthands");a=b.Array;b=c.introspective.isFunction;var e=b(a.make)&&a.make||c.helpers.makeArray;return function(a){this.all=function(){return e(a)};this.all.size=function(){return a.length};d.call(this.all)}});


*/
