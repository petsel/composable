

composable("components.Enumerable_first_last_item_listWrapper", function (require, global/*, environment*/) {


  "use strict";


  var
    Trait, // the "Enumerable_first_last_item_listWrapper" Trait Module.

    parse_float = global.parseFloat
  ;


  Trait = function (list) {
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
    };
    this.item = function (idx) {

      return list[parse_float(idx, 10)];
    };
  };


  return Trait;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   237 byte
composable("components.Enumerable_first_last_item_listWrapper",function(d,b){var c=b.parseFloat;return function(a){this.first=function(){return a[0]};this.last=function(){return a[a.length-1]};this.item=function(b){return a[c(b,10)]}}});


*/
