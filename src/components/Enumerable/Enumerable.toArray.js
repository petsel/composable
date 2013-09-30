/**
 *
 *  - implementation tries to convert objects that
 *    might be considered to be list alike or in
 *    any way enumerable into real array objects.
 *
 *  - implemented convert/parse method:
 *
 *    [toArray]
 */
composable("components.Enumerable_toArray", function (require, global, internalBaseEnvironment) {


  "use strict"; // @TODO - merge the final change into other branches of this type detection module.


  /*
   *  all additional functionality this module needs
   *  is covered already by the [internalBaseEnvironment]
   *  of the "composable :: core"
   */


  var
    Trait, // the "Enumerable_toArray" Trait Module.


    env_introspective = internalBaseEnvironment.introspective,

    Array           = global.Array,
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
         *  - does throw a [RangeError] or returns an [Array] object or an UNDEFINED value.
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


  // progressively build/enrich "composable"s internal [baseEnvironment] object.
  internalBaseEnvironment.helpers.makeArray = function (listAlike) {
    return toArray.call(listAlike);
  };


  return Trait;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   989 byte
composable("components.Enumerable_toArray",function(a,e,g){a=g.introspective;var f=e.Array.prototype.slice,m=a.isFunction,n=a.isString,q=a.isArguments,r=a.isArray,p=e.isFinite,h=e.document,l=function(){var a,d,k,e=h&&h.forms||[],g=h&&m(h.getElementsByTagName)&&h.getElementsByTagName("")||e;try{d=f.call(e);d=f.call(g);d=f.call(arguments);k=d.join("");if(3!=d.length||"Array.make"!=k)throw Error();d=f.call(k);if(10!==d.length||"."!=d[5])throw Error();a=function(){var c,b=(this||n(this))&&this.length;"number"==typeof b&&p(b)&&(c=[],c.length=b,c=f.call(this));return c}}catch(l){a=function(){var c,b,a=(r(this)||q(this))&&f.call(this)||n(this)&&this.split("")||c;if(!a&&(b=0!==this&&this&&this.length,"number"==typeof b&&p(b)))if(a=[],a.length=b,m(this.item))for(;b--;)c=this.item(b),b in this&&(a[b]=c);else for(;b--;)c=this[b],b in this&&(a[b]=c);return a}}d=k=e=g=null;return a}("Array",".","make");g.helpers.makeArray=function(a){return l.call(a)};return function(){this.toArray=l}});


*/
