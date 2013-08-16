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
composable("components.Introspective_isArray_isArguments", function (require, global, environment) {


  "use strict";


  require("components.Introspective_isFunction_isCallable");


  var
    Trait, // the "Introspective_isArray_isArguments" Trait Module.


    env_introspective = environment.introspective,


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


    createClassSignaturePattern = environment.helpers.createClassSignaturePattern,

    regX = environment.objects.regX,

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


- Simple          -   908 byte
composable("components.Introspective_isArray_isArguments",function(d,b,c){d("components.Introspective_isFunction_isCallable");d=c.introspective;var e=b.Array,j,a=b.Object.prototype.propertyIsEnumerable;try{a.call(null,"length");var l=a,a=function(h,a){return l.call(h,a)}}catch(t){var m=a,a=function(h,a){var b;try{b=m.call(h,a)}catch(c){b=!0}return b}}j=a;var a=c.helpers.createClassSignaturePattern,f=c.objects.regX,n=a("Object"),p=a("Array"),k=a("Arguments"),g=d.getClassSignature;c=d.isFunction;var q=b.isFinite,r=c(e.isArray)&&e.isArray||function(a){return f.compile(p).test(g(a))};if(!(b=c(e.isArguments)&&e.isArguments))b=function(){return f.compile(k).test(g(arguments))}()?function(a){return f.compile(k).test(g(a))}:function(a){return!!a&&f.compile(n).test(g(a))&&"number"==typeof a.length&&q(a.length)&&!j(a,"length")};var s=b;b=function(){this.isArray=r;this.isArguments=s};b.apply(d);return b});


*/
