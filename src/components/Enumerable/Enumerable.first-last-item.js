

composable("components.Enumerable_first_last_item", function (require, global/*, environment*/) {


  "use strict";


  var
    Trait, // the "Enumerable_first_last_item" Trait Module.

    parse_float = global.parseFloat
  ;


  Trait = function () {
    /**
     *  implementing the "Enumerable_first_last_item" Trait Module.
     */
    this.first = function () {

      return this[0];
    };
    this.last = function () {

      return this[this.length - 1];
    };
    this.item = function (idx) {

      return this[parse_float(idx, 10)];
    };
  };


  return Trait;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   236 byte
composable("components.Enumerable_first_last_item",function(c,a){var b=a.parseFloat;return function(){this.first=function(){return this[0]};this.last=function(){return this[this.length-1]};this.item=function(a){return this[b(a,10)]}}});


*/
