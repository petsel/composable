

composable("components.Enumerable_first_last", function (/*require, global, environment*/) {


  "use strict";


  var
    Trait // the "Enumerable_first_last" Trait Module.
  ;


  Trait = function () {
    /**
     *  implementing the "Enumerable_first_last" Trait Module.
     */
    this.first = function () {

      return this[0];
    };
    this.last = function () {

      return this[this.length - 1];
    };
  };


  return Trait;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   165 byte
composable("components.Enumerable_first_last",function(){return function(){this.first=function(){return this[0]};this.last=function(){return this[this.length-1]}}});


*/
