

composable("components.Introspective_isFunction_isCallable", function (require, global, internalBaseEnvironment) {


  "use strict"; // @TODO - merge the final change into other branches of this type detection module.


  var
    Trait, // the "Introspective_isFunction_isCallable" Trait Module.


  //Function  = global.Function,
  //
  //functionPrototype = Function.prototype,
  //expose_type_signature = functionPrototype.toString, // see @COMMEND beneath.

    testCallability = function (type) {
      var callability = true;
      try {
        type();
      //functionPrototype.call.call(type);      // merciless.
      } catch (exc) {
        callability = false;
      }
      return callability;
    }/*,
    respondsAsFunctionType = function (type) {  // due to firefox' implementations of [[Node]], [[Element]], [[HTMLElement]], ...
      var validation = true;                    // ... that all pass the [isFunction] test, even though none of them is callable.
      try {
        expose_type_signature.call(type);
      } catch (exc) {
        validation = false;
      }
      return validation;
    }*/,

  // @COMMEND - was @TODO - think about how to categorize and how to deal with non callable objects that pretend to be real functions.
  //
  // also check back with the so far three iterations of the jsperf test [http://jsperf.com/iscallable-isfunction-isfunctiontype/3]

    isCallable = function (type) {
      return (type ? testCallability(type) : !!type);
    },
    isFunction = function (type) {
      /*
       *  - x-frame-safe and also filters e.g. [[RegExp]] implementations of ancient mozilla's
       *    as well as e.g. some modern browser implementations of [[Element]], [[Node]] and
       *    related DOM Element Classes that claim to be functions but are not callable at all.
       *
       *  - NOTE: all firefox and chrome based implementations of [[Element]], [[Node]] and
       *          related DOM Element Classes do pass this otherwise very reliable [isFunction]
       *          check even though none of those implementations can be called/invoked.
       */
      return ((typeof type == "function") && (typeof type.call == "function") && (typeof type.apply == "function"));
    }

//  isFunctionType = function (type) {
//    /*
//     *  - there needs to be a last [respondsAsFunctionType] check due to firefox' DOM Node Element implementations
//     *    that all pass the basic [isFunction] check even though none of those implementations is callable.
//     */
//    return (isFunction(type) && respondsAsFunctionType(type));
//  },
//  isFunctionType = function (type) {
//    /*
//     *  - chrome implementations of [[Element]], [[Node]] and related DOM nodes still pass
//     *    the [respondsAsFunctionType] filter of the commented version above - there needs
//     *    to be a more radical solution that combines [isFunction] and [isCallable].
//     */
//    return (isFunction(type) && testCallability(type));
//  },
//  isCallable = function (type) {
//    return (isFunctionType(type) || testCallability(type));
//  }
  ;


  Trait = function () {
    /**
     *  implementing the "Introspective_isFunction_isCallable" Trait Module.
     *
     *  example:
     *
     *  >> var Introspective = require("components.Introspective_isFunction_isCallable"); <<
     *  assigns the Trait to [Introspective].
     *
     *  >> Introspective.call(global.Object); <<
     *  enriches the global Object by both [Object.isFunction] and  [Object.isCallable].
     *
     *  >> var introspective = {}; <<
     *  >> Introspective.call(introspective); <<
     *  does enrich [introspective] independently of (and parallel to) any
     *  other existing implementations of [isFunction] / [isCallable].
     */
    this.isCallable     = isCallable;
    this.isFunction     = isFunction;
  //this.isFunctionType = isFunctionType; // see @COMMEND above.
  };
  Trait.apply(internalBaseEnvironment.introspective); // progressively build/enrich "composable"s internal [baseEnvironment] object.


  return Trait;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   339 byte
composable("components.Introspective_isFunction_isCallable",function(b,f,c){var d=function(a){if(a){var b=!0;try{a()}catch(c){b=!1}a=b}else a=!!a;return a},e=function(a){return"function"==typeof a&&"function"==typeof a.call&&"function"==typeof a.apply};b=function(){this.isCallable=d;this.isFunction=e};b.apply(c.introspective);return b});


*/
