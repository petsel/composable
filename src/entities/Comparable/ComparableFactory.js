

composable("entities.ComparableFactory", function (require, global, internalBaseEnvironment) {


  "use strict";


  var
    Factory, // the "Comparable" Trait Factory Module.


    isFunction = internalBaseEnvironment.introspective.isFunction,

    baseCompareTypes = internalBaseEnvironment.helpers.compareTypes
  ;


  var createComparable = function (compareTypes) {
    /**
     *  implementing the "Comparable" Trait Module Factory.
     *
     *  - if a customized "Comparable" Trait is going to
     *    be created it is suggested to pass a custom
     *    [compareTypes] method as well.
     */
    var Trait = (function (compareTypes) {
      return function () {
        /**
         *  [http://apidock.com/ruby/Comparable]
         *
         *  creation of a customized "Comparable" Trait.
         */
        var comparable = this;

        comparable.compareTo = function (type, customValueOf) {
          /**
           *  @param type           - object [this] does compare to.
           *  @param customValueOf  - optional custom [valueOf] method that - during object comparison - will be called for each object right before comparing them to one another.
           */
          return compareTypes(this, type, customValueOf);
        };
        comparable.inBetween = function (typeK, typeM, customValueOf) {
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

        return comparable;
      };
    }((isFunction(compareTypes) && compareTypes) || baseCompareTypes));

    return Trait;
  };


  Factory = {

    create: createComparable
  };


  return Factory;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   386 byte
composable("entities.ComparableFactory",function(h,k,a){var f=a.introspective.isFunction,g=a.helpers.compareTypes;return{create:function(a){return function(b){return function(){this.compareTo=function(a,c){return b(this,a,c)};this.inBetween=function(a,c,d){var e=b(a,c,d);0>e?e=0<b(this,a,d)&&0>b(this,c,d):0<e&&(e=0<b(this,c,d)&&0>b(this,a,d));return!!e};return this}}(f(a)&&a||g)}}});


*/
