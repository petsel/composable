

composable("components.Comparable", function (require, global, environment) {


  "use strict";


  var
    Trait, // the "Comparable" Trait Module.


    isFunction = environment.introspective.isFunction,

    baseCompareTypes = environment.helpers.compareTypes
  ;


  Trait = function (compareTypes) {
    /**
     *  [http://apidock.com/ruby/Comparable]
     *
     *  implementing the "Comparable" Trait Module.
     *
     *  - if "Comparable" Trait gets applied onto an object
     *    (most likely such as XYZ.prototype) it is suggested
     *    to pass a custom [compareTypes] method as well.
     */
    compareTypes = (isFunction(compareTypes) && compareTypes) || baseCompareTypes;

    this.compareTo = function (type, customValueOf) {
      /**
       *  @param type           - object [this] does compare to.
       *  @param customValueOf  - optional custom [valueOf] method that - during object comparison - will be called for each object right before comparing them to one another.
       */
      return compareTypes(this, type, customValueOf);
    };
    this.inBetween = function (typeK, typeM, customValueOf) {
      /**
       *  @param typeK, typeM   - objects [this] does compare to.
       *  @param customValueOf  - optional custom [valueOf] method that - during object comparison - will be called for each object right before comparing them to one another.
       */
      var isInBetween = compareTypes(typeK, typeM, customValueOf); // -1 || 0 || 1;
      if (isInBetween < 0) {
        isInBetween = (compareTypes(this, typeK, customValueOf) > 0) && (compareTypes(this, typeM, customValueOf) < 0);
      } else if (isInBetween > 0) {
        isInBetween = (compareTypes(this, typeM, customValueOf) > 0) && (compareTypes(this, typeK, customValueOf) < 0);
      }
      return !!isInBetween;
    };
  };


  return Trait;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   323 byte
composable("components.Comparable",function(j,k,f){var g=f.introspective.isFunction,h=f.helpers.compareTypes;return function(a){a=g(a)&&a||h;this.compareTo=function(b,c){return a(this,b,c)};this.inBetween=function(b,c,d){var e=a(b,c,d);0>e?e=0<a(this,b,d)&&0>a(this,c,d):0<e&&(e=0<a(this,c,d)&&0>a(this,b,d));return!!e}}});


*/
