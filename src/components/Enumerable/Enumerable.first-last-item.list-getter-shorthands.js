

composable("components.Enumerable_first_last_item_listGetterShorthands", function (require, global/*, environment*/) {


  "use strict";


  var
    Trait, // the "Enumerable_first_last_item" Trait Module.

    parse_float = global.parseFloat
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
    this.first = function () {

      return (this()[0]);
    //return ((typeof this == "function") && this()[0]) || this[0];                                       // hybrid / guarded
    };
    this.last = function () {

      var list;
      return ((list = this())[list.length - 1]);
    //return ((typeof this == "function") && (list = this())[list.length - 1]) || this[this.length - 1];  // hybrid / guarded
    };
    this.item = function (idx) {

      return (this()[parse_float(idx, 10)]);
    //idx = parse_float(idx, 10);                                                                         //
    //return ((typeof this == "function") && this()[idx]) || this[idx];                                   // hybrid / guarded
    };
  };


  return Trait;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   269 byte
composable("components.Enumerable_first_last_item_listGetterShorthands",function(d,b){var c=b.parseFloat;return function(){this.first=function(){return this()[0]};this.last=function(){var a;return(a=this())[a.length-1]};this.item=function(a){return this()[c(a,10)]}}});


*/
