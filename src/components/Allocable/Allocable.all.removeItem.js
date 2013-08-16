

composable("components.Allocable_all_removeItem", function (require, global, environment) {


  "use strict";


//require("components.Introspective_isFunction_isCallable");  // implicitly by "composites.Array_make"
  require("composites.Array_make");


  var
    Enumerable_listGetterShorthands = require("components.Enumerable_first_last_item_listGetterShorthands"),


    Mixin, // the "Allocable_all_removeItem" Mixin Module.


    Array = global.Array,

    arrayPrototype = Array.prototype,


    isFunction = environment.introspective.isFunction,

    makeArray = (isFunction(Array.make) && Array.make) || environment.helpers.makeArray,

    removeItem = (isFunction(arrayPrototype.reject) && function (list, item) {

      return list.reject(function (elm) {
        return (elm === item);
      })[0]; // }).first();

    }) || function (list, item) {

      var
        collector = list.reduce(function (collector, elm) {
          return (collector[(elm === item) ? "rejected" : "retained"].push(elm) && collector);
        }, {retained:[], rejected:[]}),

        retained = collector.retained,
        rejected = collector.rejected
      ;
      list.length = 0;
      while (retained.length) {
        list.push(retained.shift());
      }
      return rejected[0]; // rejected.first();
    }
  ;


  Mixin = function (list) {
    /**
     *  implementing the privileged "Allocable_all_removeItem" Mixin Module.
     *
     *  - actually it looks like a Trait.
     *    but since - with [list] - it encloses *state*
     *    that is going to be mutated by this implementation
     *    it should be referred to as privileged Mixin.
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
    allocable.all.removeItem = function (item) {

      return removeItem(list, item);
    };
    Enumerable_listGetterShorthands.call(allocable.all);
  };


  return Mixin;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   700 byte
composable("components.Allocable_all_removeItem",function(b,c,e){b("composites.Array_make");var g=b("components.Enumerable_first_last_item_listGetterShorthands");b=c.Array;c=b.prototype;var f=e.introspective.isFunction,h=f(b.make)&&b.make||e.helpers.makeArray,j=f(c.reject)&&function(a,b){return a.reject(function(a){return a===b})[0]}||function(a,b){var d=a.reduce(function(a,c){return a[c===b?"rejected":"retained"].push(c)&&a},{retained:[],rejected:[]}),c=d.retained,d=d.rejected;for(a.length=0;c.length;)a.push(c.shift());return d[0]};return function(a){this.all=function(){return h(a)};this.all.size=function(){return a.length};this.all.removeItem=function(b){return j(a,b)};g.call(this.all)}});


*/
