

composable("components.Allocable", function (require, global, internalBaseEnvironment) {


  "use strict"; // @TODO - merge the final change into other branches of this type detection module.


  /*
   *  all additional functionality this module needs
   *  is covered already by the [internalBaseEnvironment]
   *  of the "composable :: core"
   */


  var
    Enumerable_listWrapper = require("components.Enumerable_first_last_item_listWrapper"),


    Trait, // the "Allocable" Trait Module.


    Array = global.Array,


    isFunction = internalBaseEnvironment.introspective.isFunction,

    array_from = (isFunction(Array.from) && Array.from) || internalBaseEnvironment.helpers.makeArray
  ;


  Trait = function (list) { // Privileged Trait.
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

      return array_from(list);
    };
    allocable.toString = function () {

      return ("" + list);
    };
    allocable.size = function () {

      return list.length;
    };
    Enumerable_listWrapper.call(allocable, list); // applying the [first], [last] and [item]
  };                                              // list getter functionality onto this Trait.


  /**
   *  due to "Allocable" being a privileged Trait that encapsulates [list] it is
   *  not able to delegate its accessor methods [valueOf] / [toArray], [toString]
   *  and [size] as shared references to objects - each object gets its own set
   *  of methods applied that do not equal amongst each other even though they
   *  are equally implemented.
   */


  return Trait;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   357 byte
composable("components.Allocable",function(a,b,c){var d=a("components.Enumerable_first_last_item_listWrapper");a=b.Array;b=c.introspective.isFunction;var e=b(a.from)&&a.from||c.helpers.makeArray;return function(a){this.valueOf=this.toArray=function(){return e(a)};this.toString=function(){return""+a};this.size=function(){return a.length};d.call(this,a)}});


*/
