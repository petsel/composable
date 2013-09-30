

composable("components.Enumerable_first_last_item_listGetterShorthands", function (require, global/*, internalBaseEnvironment*/) {


  "use strict"; // @TODO - merge the final change into other branches of this type detection module.


  var
    Trait, // the "Enumerable_first_last_item" Trait Module that works on getter methods that again return list structures.


    parse_float = global.parseFloat,
    math_floor  = global.Math.floor,

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

      return (this()[0]);
    //return ((typeof this == "function") && this()[0]) || this[0];                                       // hybrid / guarded
    },
    last = function () {

      var list;
      return ((list = this())[list.length - 1]);
    //return ((list = this())[math_floor(parse_float(list.length - 1))]); // in case the [length property was spoofed]

    //return ((typeof this == "function") && (list = this())[list.length - 1]) || this[this.length - 1];  // hybrid / guarded / not spoof proof
    },
    item = function (idx) {

      return (this()[math_floor(parse_float(idx, 10))]);
    //idx = math_floor(parse_float(idx, 10));                                                             //
    //return ((typeof this == "function") && this()[idx]) || this[idx];                                   // hybrid / guarded
    }
  ;


  Trait = function () {
    /**
     *  implementing the "Enumerable_first_last_item" Trait Module.
     *
     *  ... that's accessor methods will work as shorthands on a
     *  list getter (method) they were applied to; thus saving a
     *  direct call to the latter.
     *
     *  example:
     *
     *  >> all()         << is a list getter that returns a list/array.
     *  >> all().first() << will return the first item of a list/array if such a structure does respond to this method.
     *  >> all.first()   << will return the first item of the very same list/array as of calling >> all().first() <<.
     *
     *  >> global.Enumerable_first_last_item_listGetterShorthands.call(all) << does apply all of its implemented methods to [all].
     */
    this.first = first;
    this.last = last;
    this.item = item;
  };


  return Trait;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   299 byte
composable("components.Enumerable_first_last_item_listGetterShorthands",function(h,b){var c=b.parseFloat,d=b.Math.floor,e=function(){return this()[0]},f=function(){var a;return(a=this())[a.length-1]},g=function(a){return this()[d(c(a,10))]};return function(){this.first=e;this.last=f;this.item=g}});


*/
