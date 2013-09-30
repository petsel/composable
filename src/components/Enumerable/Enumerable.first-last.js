

composable("components.Enumerable_first_last", function (/*require, global, internalBaseEnvironment*/) {


  "use strict"; // @TODO - merge the final change into other branches of this type detection module.


  var
    Trait, // the "Enumerable_first_last" Trait Module.


  //parse_float = global.parseFloat,
  //math_floor  = global.Math.floor,

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


    first = function () {

      return this[0];
    },
    last = function () {

      return this[this.length - 1];
    //return this[math_floor(parse_float(this.length - 1))]; // in case the [length property was spoofed]
    }
  ;


  Trait = function () {
    /**
     *  implementing the "Enumerable_first_last" Trait Module.
     */
    this.first = first;
    this.last = last;
  };


  return Trait;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   177 byte
composable("components.Enumerable_first_last",function(){var a=function(){return this[0]},b=function(){return this[this.length-1]};return function(){this.first=a;this.last=b}});


*/
