/**
 *
 *  - implementation tries to convert objects
 *    that might be considered to be list alike
 *    or in any way enumerable into real array objects.
 *
 *  - implemented convert/parse method:
 *
 *    [toArray]
 */
composable("components.Enumerable_toArray", function (require, global, environment) {


  "use strict";


//require("components.Introspective_isFunction_isCallable");
  require("components.Introspective_isArray_isArguments");


  var
    Trait, // the "Enumerable_toArray" Trait Module.


    env_introspective = environment.introspective,

    Array   = global.Array,

    arrayPrototype  = Array.prototype,


    array_slice = arrayPrototype.slice,
  //math_max    = global.Math.max,

    isFunction  = env_introspective.isFunction,
    isString    = env_introspective.isString,

    isArguments = env_introspective.isArguments,
    isArray     = env_introspective.isArray,

    isFinite    = global.isFinite,
    isNumberValue = function (type) {

      return ((typeof type == "number") && isFinite(type));
    },
    document = global.document,


    toArray = (function () {
      var
        toArray,

        arr, // [Array] object
        str, // [String] literal/object
        coll = (document && document.forms) || [], // [HTMLCollection] object
        list = (document && isFunction(document.getElementsByTagName) && document.getElementsByTagName("")) || coll // live [NodeList] object
      ;
      try {


        //[HTMLCollection] test in case this script runs within a certain W3C-DOM context. (this test fails silently if there was no DOM at all.)
        arr = array_slice.call(coll); // msie fails.

        //[NodeList] test in case this script runs within a certain W3C-DOM context. (this test fails silently if there was no DOM at all.)
        arr = array_slice.call(list); // msie fails.

        //[Arguments] test.
        arr = array_slice.call(arguments); // every relevant (seen from a point of market share) browser passes.
        str = arr.join("");
        if ((arr.length != 3) || (str != "Array.make")) {
          throw (new Error);
        }

        //[String] test.
        arr = array_slice.call(str); // opera and msie fail (older versions).
        if ((arr.length !== 10) || (arr[5] != ".")) {
          throw (new Error);
        }


        /**
         *  - so far fastest available, most reliable [Enumerable.toArray] implementation.
         *  - doe throw a [RangeError] or returns an [Array] object or an UNDEFINED value.
         *  - supported by all browsers that pass all of the above tests.
         */
        toArray = function () {
          var
            enumerable = this,
            arr,                  //
//          arr = [],             // there might be a debate on it to what [arr] should fall back.
//          arr = enumerable,     //
//          arr = [enumerable],   //
            len = ((enumerable || isString(enumerable)) && enumerable.length)
          ;
//        return ((isNumberValue(len) && array_slice.call(enumerable)) || []); // always returns an [Array] object - at least an empty one.
          if (isNumberValue(len)) {
            arr = [];
            arr.length = len;     // does force >>RangeError: Invalid array length<< if [len] is a valid number value lower than zero.
            arr = array_slice.call(enumerable);
          }
          return arr; // returns an [Array] object or an UNDEFINED value.
        };


      } catch (exc) { // [exc]::[Error]


        /**
         *  - so far most reliable [Enumerable.toArray] implementation.
         *  - doe throw a [RangeError] or returns an [Array] object or an UNDEFINED value.
         *  - fallback for all browsers that do fail on at least one of the above tests.
         */
        toArray = function () {
          var
            enumerable = this,
            elm,
            idx,
            arr = (
              ((isArray(enumerable) || isArguments(enumerable)) && array_slice.call(enumerable))  // [Array]/[Arguments] exit.
              || (isString(enumerable) && enumerable.split(""))                                   // [String] exit.
              || elm                                                                              // UNDEFINED value fallback.
            )
          ;
          if (!arr) {
          //idx = (enumerable && enumerable.length);                       // (((0) && (0).length) === 0) // ((0 && window.undefined) === 0) // true
            idx = ((enumerable !== 0) && enumerable && enumerable.length); // prevent passing zero as an argument.
            if (isNumberValue(idx)) { // detect invalid list/enumerable structures.

              arr = [];
//            arr.length = math_max(0, idx);  // "forgiving".
              arr.length = idx;               // does force >>RangeError: Invalid array length<< if [len] is a valid number value lower than zero.

              if (isFunction(enumerable.item)) {
                while (idx--) {
                  elm = enumerable.item(idx);
                  if (idx in enumerable) {
                    arr[idx] = elm;
                  }
                }
              } else {
                while (idx--) {
                  elm = enumerable[idx];
                  if (idx in enumerable) {
                    arr[idx] = elm;
                  }
                }
              }
            }
          }
          return arr;                   //
//        return (arr || []);           // there might be a debate on it to what [arr] should fall back.
//        return (arr || enumerable);   //
//        return (arr || [enumerable]); //
        };
      }


      //clean up after
      arr = str = coll = list = null;


      return toArray;


    }("Array", ".", "make"))
  ;


  Trait = function () {
    /**
     *  implementing the "Enumerable_toArray" Trait Module.
     */
    this.toArray = toArray;
  };


  return Trait;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   989 byte
composable("components.Enumerable_toArray",function(a,d,h){a("components.Introspective_isArray_isArguments");a=h.introspective;var e=d.Array.prototype.slice,j=a.isFunction,k=a.isString,n=a.isArguments,p=a.isArray,l=d.isFinite,f=d.document,q=function(){var a,b,g,d=f&&f.forms||[],m=f&&j(f.getElementsByTagName)&&f.getElementsByTagName("")||d;try{b=e.call(d);b=e.call(m);b=e.call(arguments);g=b.join("");if(3!=b.length||"Array.make"!=g)throw Error();b=e.call(g);if(10!==b.length||"."!=b[5])throw Error();a=function(){var a,c=(this||k(this))&&this.length;"number"==typeof c&&l(c)&&(a=[],a.length=c,a=e.call(this));return a}}catch(h){a=function(){var a,c,b=(p(this)||n(this))&&e.call(this)||k(this)&&this.split("")||a;if(!b&&(c=0!==this&&this&&this.length,"number"==typeof c&&l(c)))if(b=[],b.length=c,j(this.item))for(;c--;)a=this.item(c),c in this&&(b[c]=a);else for(;c--;)a=this[c],c in this&&(b[c]=a);return b}}b=g=d=m=null;return a}("Array",".","make");return function(){this.toArray=q}});


*/
