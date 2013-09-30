

composable("components.Enumerable_first_last_item_listWrapper", function (require, global/*, internalBaseEnvironment*/) {


  "use strict"; // @TODO - merge the final change into other branches of this type detection module.


  var
    Trait, // the "Enumerable_first_last_item_listWrapper" Trait Module.


    parse_float = global.parseFloat,
    math_floor  = global.Math.floor

//  parseFloat("1.999999999999999" , 10); // 1.999999999999999
//  parseFloat( 1.999999999999999  , 10); // 1.999999999999999
//  parseInt  ("1.999999999999999" , 10); // 1
//  parseInt  ( 1.999999999999999  , 10); // 1
//
//  parseFloat("1.9999999999999999", 10); // 2
//  parseFloat( 1.9999999999999999 , 10); // 2
//  parseInt  ("1.9999999999999999", 10); // 1  // inconsistency ...
//  parseInt  ( 1.9999999999999999 , 10); // 2  // ... witin [parseInt]
//
//  Math.floor(parseFloat("1.999999999999999" , 10)); // 1
//  Math.floor(parseFloat( 1.999999999999999  , 10)); // 1
//  Math.floor(parseFloat("1.9999999999999999", 10)); // 2  // no inconsistency anymore ...
//  Math.floor(parseFloat( 1.9999999999999999 , 10)); // 2  // ... where it had been before.
  ;


  Trait = function (list) { // Privileged Trait.
    /**
     *  implementing the privileged "Enumerable_first_last_item_listWrapper" Trait Module.
     *
     *  - actually it looks like a Trait.
     *    but since - with [list] - it encloses *state*
     *    that does not get mutated by this implementation
     *    it should be referred to as privileged Trait.
     */
    this.first = function () {

      return list[0];
    };
    this.last = function () {

      return list[list.length - 1];
    //return this[math_floor(parse_float(list.length - 1))]; // in case the [length property was spoofed]
    };
    this.item = function (idx) {

      return list[math_floor(parse_float(idx, 10))];
    };
  };


  /**
   *  due to "Enumerable_first_last_item_listWrapper" being a privileged Trait that
   *  encapsulates [list] it is not able to delegate its accessor methods [first],
   *  [last] and [item] as shared references to objects - each object gets its own
   *  set of methods applied that do not equal amongst each other even though they
   *  are equally implemented.
   */


  return Trait;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   255 byte
composable("components.Enumerable_first_last_item_listWrapper",function(e,a){var c=a.parseFloat,d=a.Math.floor;return function(b){this.first=function(){return b[0]};this.last=function(){return b[b.length-1]};this.item=function(a){return b[d(c(a,10))]}}});


*/
