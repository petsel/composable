/**
 *
 *  - implementations do detect array structures.
 *
 *  - none of the implementations is going to throw
 *    any single [[Error]] message.
 *    every method instead fails silently but still
 *    smart enough in case of getting invoked with
 *    invalid arguments.
 *
 *  - list of implemented type detection methods:
 *
 *    [isArray],
 *    [isArguments]
 */
composable("components.Introspective_isArray_isArguments", function (require, global, internalBaseEnvironment) {


  "use strict"; // @TODO - merge the final change into other branches of this type detection module.


  /*
   *  all additional functionality this module needs
   *  is covered already by the [internalBaseEnvironment]
   *  of the "composable :: core"
   */


  var
    Trait, // the "Introspective_isArray_isArguments" Trait Module.


    env_introspective = internalBaseEnvironment.introspective,


    Object  = global.Object,
    Array   = global.Array,

    objectPrototype = Object.prototype,


    propertyIsEnumerable = (function (propertyIsEnumerable) {
      try {
        propertyIsEnumerable.call(null, "length");

        propertyIsEnumerable = (function (is_enumerable) {
          return function (type, key) {

            return is_enumerable.call(type, key);
          };
        }(propertyIsEnumerable));

      } catch (exc) { // [exc]::[Error]

        propertyIsEnumerable = (function (is_enumerable) {
          return function (type, key) {

            var isEnum;
            try {
              isEnum = is_enumerable.call(type, key);
            } catch (exc) {
            //isEnum = false;
              isEnum = true; /* due to [propertyIsEnumerable]'s special internal use within client/js-engine specific [isArgumentsArray] method */
            }
            return isEnum;
          };
        }(propertyIsEnumerable));
      }
      return propertyIsEnumerable;
    }(objectPrototype.propertyIsEnumerable)),


    createClassSignaturePattern = internalBaseEnvironment.helpers.createClassSignaturePattern,

    regX = internalBaseEnvironment.objects.regX,

    PATTERN_CLASS_SIGNATURE_OBJECT    = createClassSignaturePattern("Object"),
    PATTERN_CLASS_SIGNATURE_ARRAY     = createClassSignaturePattern("Array"),
    PATTERN_CLASS_SIGNATURE_ARGUMENTS = createClassSignaturePattern("Arguments"),


    getClassSignature = env_introspective.getClassSignature,

    isFunction        = env_introspective.isFunction,

    isFinite = global.isFinite,


    isArray = (isFunction(Array.isArray) && Array.isArray) || function (type) {
      return regX.compile(PATTERN_CLASS_SIGNATURE_ARRAY).test(getClassSignature(type));
    },


    isArguments = (isFunction(Array.isArguments) && Array.isArguments) || (function () {
      var isArguments;
      if (function () {return regX.compile(PATTERN_CLASS_SIGNATURE_ARGUMENTS).test(getClassSignature(arguments));}()) {

        isArguments = function (type) {
          return regX.compile(PATTERN_CLASS_SIGNATURE_ARGUMENTS).test(getClassSignature(type));
        };
      } else {

        isArguments = function (type) {
        //return (!!type && regX.compile(PATTERN_CLASS_SIGNATURE_OBJECT).test(getClassSignature(type)) && (typeof type.length == "number") && isFinite(type.length) && !propertyIsEnumerable(type, "length") && (typeof type.callee == "function"));
          return (!!type && regX.compile(PATTERN_CLASS_SIGNATURE_OBJECT).test(getClassSignature(type)) && (typeof type.length == "number") && isFinite(type.length) && !propertyIsEnumerable(type, "length"));
        };
      }
      return isArguments;
    }())
  ;


  Trait = function () {
    /**
     *  implementing the "Introspective_isArray_isArguments" Trait Module.
     *
     *  example:
     *
     *  >> var Introspective = require("components.Introspective_isArray_isArguments"); <<
     *  assigns the Trait to [Introspective].
     *
     *  >> Introspective.call(global.Array); <<
     *  enriches the global Array by [Array.isArguments]
     *  and if it was not already natively implemented by [Array.isArray] too.
     *
     *  >> var introspective = {}; <<
     *  >> Introspective.call(introspective); <<
     *  does enrich [introspective] independently of (and parallel to) any
     *  other existing implementations of [isArray] / [isArguments]
     */
    this.isArray      = isArray;
    this.isArguments  = isArguments;
  };
  Trait.apply(env_introspective); // progressively build/enrich "composable"s internal [baseEnvironment] object.


  return Trait;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   905 byte
composable("components.Introspective_isArray_isArguments",function(d,b,c){d=c.introspective;var e=b.Array,l=function(a){try{a.call(null,"length"),a=function(a){return function(b,c){return a.call(b,c)}}(a)}catch(b){a=function(a){return function(b,c){var d;try{d=a.call(b,c)}catch(e){d=!0}return d}}(a)}return a}(b.Object.prototype.propertyIsEnumerable),h=c.helpers.createClassSignaturePattern,f=c.objects.regX,m=h("Object"),n=h("Array"),k=h("Arguments"),g=d.getClassSignature;c=d.isFunction;var p=b.isFinite,q=c(e.isArray)&&e.isArray||function(a){return f.compile(n).test(g(a))},r=c(e.isArguments)&&e.isArguments||function(){return function(){return f.compile(k).test(g(arguments))}()?function(a){return f.compile(k).test(g(a))}:function(a){return!!a&&f.compile(m).test(g(a))&&"number"==typeof a.length&&p(a.length)&&!l(a,"length")}}();b=function(){this.isArray=q;this.isArguments=r};b.apply(d);return b});


*/
