

composable("components.Allocable_all_removeItem", function (require, global, internalBaseEnvironment) {


  "use strict"; // @TODO - merge the final change into other branches of this type detection module.


  /*
   *  all additional functionality this module needs
   *  is covered already by the [internalBaseEnvironment]
   *  of the "composable :: core"
   */


  var
    Enumerable_listGetterShorthands = require("components.Enumerable_first_last_item_listGetterShorthands"),


    Mixin, // the "Allocable_all_removeItem" Mixin Module.


    Array = global.Array,
    arrayPrototype = Array.prototype,


    isFunction = internalBaseEnvironment.introspective.isFunction,

    array_from = (isFunction(Array.from) && Array.from) || internalBaseEnvironment.helpers.makeArray,

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


  Mixin = function (list) { // Privileged Mixin.
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

      return array_from(list);
    };
    allocable.all.size = function () {

      return list.length;
    };
    allocable.all.removeItem = function (item) {          // does mutate state of the enclosed [list].

      return removeItem(list, item);
    };
    Enumerable_listGetterShorthands.call(allocable.all);  // applying the [first], [last] and [item] shorthand
  };                                                      // functionality onto this Mixin's list getter method [all].


  /**
   *  due to "Allocable_all_removeItem" being a privileged Mixin that encapsulates
   *  [list] it is not able to delegate its accessor methods [all], [all.size] and
   *  [all.removeItem] as shared references to objects - each object gets its own
   *  set of methods applied that do not equal amongst each other even though they
   *  are equally implemented.
   */


  return Mixin;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   673 byte
composable("components.Allocable_all_removeItem",function(b,c,e){var g=b("components.Enumerable_first_last_item_listGetterShorthands");b=c.Array;c=b.prototype;var f=e.introspective.isFunction,h=f(b.from)&&b.from||e.helpers.makeArray,k=f(c.reject)&&function(a,b){return a.reject(function(a){return a===b})[0]}||function(a,b){var d=a.reduce(function(a,c){return a[c===b?"rejected":"retained"].push(c)&&a},{retained:[],rejected:[]}),c=d.retained,d=d.rejected;for(a.length=0;c.length;)a.push(c.shift());return d[0]};return function(a){this.all=function(){return h(a)};this.all.size=function(){return a.length};this.all.removeItem=function(b){return k(a,b)};g.call(this.all)}});


*/
