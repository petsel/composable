

composable("components.Introspective_isFunction_isCallable", function (require, global, environment) {


  "use strict";


  var
    Trait, // the "Introspective_isFunction_isCallable" Trait Module.


    Function  = global.Function,

    functionPrototype = Function.prototype,


    getCallability = function (type) {
      var callability;
      try {
        type();
        callability = true;
      //functionPrototype.call.call(type);    // merciless.
      } catch (exc) {
        try {                                 // forgiving.
          functionPrototype.call.call(type);  //
          callability = true;                 //
        } catch (exc) {                       //
          callability = false;
        }
      }
      return callability;
    },
    respondsToFunction = function (type) {  // due to firefox' implementations of [[Node]], [[Element]], [[HTMLElement]], ...
      var validation;                       // ... that all pass the [isFunction] test, even though none of them is callable.
      try {
        functionPrototype.toString.call(type);
        validation = true;
      } catch (exc) {
        validation = false;
      }
      return validation;
    },

  // @TODO - think about how to categorize and how to deal with non callable objects that pretend to be real functions.
    isFunction = function (type) {
      /*
       *  - x-frame-safe and also filters e.g. [[RegExp]] implementation of older mozilla's
       *    as well as e.g. modern browser implementations of [[Element]], [[Node]] and of
       *    related DOM elements that claim to be functional but are not at all callable.
       */
      return ((typeof type == "function") && (typeof type.call == "function") && (typeof type.apply == "function"));
    },
    isFunctional = function (type) {
      /*
       *  - there needs to be a last [respondsToFunction] check due to firefox' DOM Node Element implementations
       *    that all pass the basic [isFunction] check even though none of those implementations is callable.
       */
      return (isFunction(type) && respondsToFunction(type));
    },
    isCallable = function (type) {
      return (isFunctional(type) || getCallability(type));
    }
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
    this.isFunction   = isFunction;
    this.isCallable   = isCallable;
  //this.isFunctional = isFunctional; // see @TODO above.
  };
  Trait.apply(environment.introspective); // progressively build/enrich "composable"s internal [baseEnvironment] object.


  return Trait;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   457 byte
composable("components.Introspective_isFunction_isCallable",function(b,e,f){var g=e.Function.prototype,h=function(a){return"function"==typeof a&&"function"==typeof a.call&&"function"==typeof a.apply},j=function(a){var c;if(c=h(a)){var b;try{g.toString.call(a),b=!0}catch(e){b=!1}c=b}if(!c){var d;try{a(),d=!0}catch(f){try{g.call.call(a),d=!0}catch(j){d=!1}}c=d}return c};b=function(){this.isFunction=h;this.isCallable=j};b.apply(f.introspective);return b});


*/
