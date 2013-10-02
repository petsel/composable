

composable("components.Allocable_all", function (require, global, internalBaseEnvironment) {


  "use strict"; // @TODO - merge the final change into other branches of this type detection module.


  /*
   *  all additional functionality this module needs
   *  is covered already by the [internalBaseEnvironment]
   *  of the "composable :: core"
   */


  var
    Enumerable_listGetterShorthands = require("components.Enumerable_first_last_item_listGetterShorthands"),


    Trait, // the "Allocable_all" Trait Module.


    Array = global.Array,


    isFunction = internalBaseEnvironment.introspective.isFunction,

    array_from = (isFunction(Array.from) && Array.from) || internalBaseEnvironment.helpers.makeArray
  ;


  Trait = function (list) { // Privileged Trait.
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

      return array_from(list);
    };
    allocable.all.size = function () {

      return list.length;
    };
    Enumerable_listGetterShorthands.call(allocable.all);  // applying the [first], [last] and [item] shorthand
  };                                                      // functionality onto this Trait's list getter method [all].


  /**
   *  due to "Allocable_all" being a privileged Trait that encapsulates [list] it
   *  is not able to delegate its accessor methods [all] and [all.size] as shared
   *  references to objects - each object gets its own set of methods applied that
   *  do not equal amongst each other even though they are equally implemented.
   */


  return Trait;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   322 byte
composable("components.Allocable_all",function(a,b,c){var d=a("components.Enumerable_first_last_item_listGetterShorthands");a=b.Array;b=c.introspective.isFunction;var e=b(a.from)&&a.from||c.helpers.makeArray;return function(a){this.all=function(){return e(a)};this.all.size=function(){return a.length};d.call(this.all)}});


*/
