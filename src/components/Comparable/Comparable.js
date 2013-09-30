

composable("components.Comparable", function (require, global, internalBaseEnvironment) {


  "use strict"; // @TODO - merge the final change into other branches of this type detection module.


  /*
   *  all additional functionality this module needs
   *  is covered already by the [internalBaseEnvironment]
   *  of the "composable :: core"
   */


  var
    Trait, // the "Comparable" Trait Module.


  //environment = require("environment"),


    baseCompareTypes = internalBaseEnvironment.helpers.compareTypes,
    isFunction = internalBaseEnvironment.introspective.isFunction
  ;


  Trait = function (compareTypes) { // Privileged Trait.
    /**
     *  [http://apidock.com/ruby/Comparable]
     *
     *  implementing the privileged "Comparable" Trait Module.
     *
     *  - if "Comparable" Trait gets applied onto an object
     *    (most likely such as XYZ.prototype) it is suggested
     *    to pass a custom [compareTypes] method as well.
     */
  //var UNDEFINED_VALUE;

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
      var isInBetween = compareTypes(typeK, typeM, customValueOf); // -1 || 0 || 1 || undefined;
      if (isInBetween < 0) {
        isInBetween = (compareTypes(this, typeK, customValueOf) > 0) && (compareTypes(this, typeM, customValueOf) < 0);
      } else if (isInBetween > 0) {
        isInBetween = (compareTypes(this, typeM, customValueOf) > 0) && (compareTypes(this, typeK, customValueOf) < 0);
      }/* else if (isInBetween === 0) {
        isInBetween = !!isInBetween;
      } else {
        isInBetween = UNDEFINED_VALUE;
      }*/
      return !!isInBetween; // true || false
    //return isInBetween;   // true || false || undefined
    };
  };


  /**
   *  due to "Comparable" being a privileged Trait that encapsulates [compareTypes]
   *  it is not able to delegate its both methods [compareTo] and [inBetween] as
   *  shared references to objects - each object gets its own set of methods applied
   *  that do not equal amongst each other even though they are equally implemented.
   */


  return Trait;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   323 byte
composable("components.Comparable",function(k,l,f){var g=f.helpers.compareTypes,h=f.introspective.isFunction;return function(a){a=h(a)&&a||g;this.compareTo=function(b,c){return a(this,b,c)};this.inBetween=function(b,c,d){var e=a(b,c,d);0>e?e=0<a(this,b,d)&&0>a(this,c,d):0<e&&(e=0<a(this,c,d)&&0>a(this,b,d));return!!e}}});


*/
