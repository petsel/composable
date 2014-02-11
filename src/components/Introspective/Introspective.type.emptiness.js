

composable("components.Introspective_type_emptiness", function (require, global/*, internalBaseEnvironment*/) {


  "use strict";


  var
    environment = require("environment"),


    Trait,


    env_introspective = environment.introspective,

    isObjectObject    = env_introspective.isObjectObject,
    isFunction        = env_introspective.isFunction,
    isRegExp          = env_introspective.isRegExp,
    isString          = env_introspective.isString,
    isRealList        = env_introspective.isRealList,
    isNumberValue     = env_introspective.isNumberValue,

    isFinite          = global.isFinite,


  //regX = environment.objects.regX

    regXEmptyFunction       = (/^function\s+[^(]*\([^)]*\)\s*\{\s*\}$/),
    stringifiedEmptyRegExp  = ("" + global.RegExp()),


    array_from  = environment.helpers.makeArray,

    object_keys = global.Object.keys,


    __isListLike = function (type) {    // unguarded use of [type] - but safe for its only internal use.
      // derived but shortened from "/src/components/Introspective/Introspective.typeDetection.core.js" line:237
      return (isNumberValue(type = type.length) && isFinite(type) && (type >= 0)); // saves some unnecessary look ups.
    },
    __isListType = function (type) {    // unguarded use of [type] as well.
      // derived but shortened from "/src/components/Introspective/Introspective.typeDetection.core.js" line:241
      return (__isListLike(type) && (typeof type != "function") && type.hasOwnProperty("length") && !type.propertyIsEnumerable("length")); // saves some unnecessary look ups.
    },


    __isSparseType = function (type) {  // unguarded use of [type] - but safe for its only internal use.
      return array_from(type).every(function (/*type, idx, arr*/) {

        return false;   // - the default return value for [every] on sparse arrays is [true].
      });               // - the default return value for [some] on sparse arrays is [false].
    },
    isSparseList = function (type) {    // guarded use of [type] for this method will be exposed to public via the [Trait] module.
      return (

        isRealList(type)
        && array_from(type).every(function (/*type, idx, arr*/) {

          return false; // - the default return value for [every] on sparse arrays is [true].
        })              // - the default return value for [some] on sparse arrays is [false].
      );
    },


    isEmptyValue = function (type) {
    //return ((type ===  void 0) || (type === null) || (type === "") || ((typeof type == "number") && (type !== type)));
    //return (isUndefinedOrNull(type) || (type === "") || ((typeof type == "number") && (type != type)));
      return ((type == null) || (type === "") || ((typeof type == "number") && (type != type)));
    },
    isEmptyType = function (type) {
      var isempty = isEmptyValue(type);

      if (!isempty) {
        if (isFunction(type)) {

          isempty = regXEmptyFunction.test("" + type);        // >>isEmptyFunction(type)<<

        }/* else if (isString(type)) {

          isempty = (type.valueOf() === "");                  // >>isEmptyString(type)<<

        }*/ else if (__isListType(type)) {

          isempty = __isSparseType(type);                     // >>isEmptyList(type)<< // [[Array]], [[Arguments]], [[String]], [[NodeList]], [[HTMLCollection]]

        } else if (isObjectObject(type)) {

          isempty = (object_keys(type).length === 0);         // >>isEmptyObject(type)<< // means "no own properties at all"

        } else if (isRegExp(type)) {

          isempty = (("" + type) == stringifiedEmptyRegExp);  // >>isEmptyRegExp(type)<<
        }
      }
      return isempty;
    },


    recursively_isUninhabited = function (type, typeList) {           // recursive approach AWARE of cyclic references
      var isempty = isEmptyValue(type);

      if (!isempty) {
        if (isFunction(type)) {

          isempty = regXEmptyFunction.test("" + type);                // >>isEmptyFunction(type)<<

        } else if (isString(type)) {

          isempty = (type.valueOf() === "");                          // >>isEmptyString(type)<<

        } else if (__isListType(type)) {
          if (typeList.indexOf(type) == -1) {
            typeList.push(type);

            isempty = array_from(type).every(function (type/*, idx, arr*/) {

              return recursively_isUninhabited(type, typeList);       // >>isUninhabitedStructure(type)<<
            });
          } else {
            isempty = true;
          }
        } else if (isObjectObject(type)) {
          if (typeList.indexOf(type) == -1) {
            typeList.push(type);

            isempty = object_keys(type).every(function (key/*, idx, arr*/) {

              return recursively_isUninhabited(type[key], typeList);  // >>isUninhabitedStructure(type)<<
            });
          } else {
            isempty = true;
          }
        } else if (isRegExp(type)) {

          isempty = (("" + type) == stringifiedEmptyRegExp);          // >>isEmptyRegExp(type)<<
        }
      }
      return isempty;
    },
    isUninhabitedStructure = function (type) {
      return recursively_isUninhabited(type, []);
    }
  ;


  Trait = function () {

    this.isEmptyValue           = isEmptyValue;
    this.isEmptyType            = isEmptyType;

  //this.isDeadStructure        = isDeadStructure;
  //this.isDeadStandingStructure= isDeadStandingStructure;
  //this.isDefunctStructure     = isDefunctStructure;

  //this.isAbandonedStructure   = isAbandonedStructure;
    this.isUninhabitedStructure = isUninhabitedStructure;

    this.isSparseList           = isSparseList;
  };


  return Trait;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          - 1.151 byte
composable("components.Introspective_type_emptiness",function(t,e){var k=t("environment"),d=k.introspective,l=d.isObjectObject,m=d.isFunction,n=d.isRegExp,u=d.isString,v=d.isRealList,w=d.isNumberValue,x=e.isFinite,p=/^function\s+[^(]*\([^)]*\)\s*\{\s*\}$/,q=""+e.RegExp(),f=k.helpers.makeArray,r=e.Object.keys,s=function(a){var b=a;return w(b=b.length)&&x(b)&&0<=b&&"function"!=typeof a&&a.hasOwnProperty("length")&&!a.propertyIsEnumerable("length")},y=function(a){return f(a).every(function(){return!1})},z=function(a){return v(a)&&f(a).every(function(){return!1})},g=function(a){return null==a||""===a||"number"==typeof a&&a!=a},A=function(a){var b=g(a);b||(m(a)?b=p.test(""+a):s(a)?b=y(a):l(a)?b=0===r(a).length:n(a)&&(b=""+a==q));return b},h=function(a,b){var c=g(a);c||(m(a)?c=p.test(""+a):u(a)?c=""===a.valueOf():s(a)?-1==b.indexOf(a)?(b.push(a),c=f(a).every(function(a){return h(a,b)})):c=!0:l(a)?-1==b.indexOf(a)?(b.push(a),c=r(a).every(function(c){return h(a[c],b)})):c=!0:n(a)&&(c=""+a==q));return c},B=function(a){return h(a,[])};return function(){this.isEmptyValue=g;this.isEmptyType=A;this.isUninhabitedStructure=B;this.isSparseList=z}});


*/



//Object.isUninhabited({x:function(){},y:RegExp(),z:[,,,{x:function(){},y:RegExp(),z:[,,,{x:function(){},y:RegExp(),z:[,,,,,,,void 0,,"",,]},,,,void 0,,"",,]},,,,void 0,,"",,]})
//true;
//
//Object.isUninhabited({x:function(){},y:RegExp(),z:[,,,{x:function(){},y:RegExp(),z:[,,,{x:function(){},y:RegExp(),z:[,,," ",,,,void 0,,"",,]},,,,void 0,,"",,]},,,,void 0,,"",,]})
//false
//
//
//window.obj = {
//  x:"",
//  y:{
//    z:"",
//    a:window.obj,
//    b:[],
//    c:{
//      x:"",
//      y:{
//        z:"",
//        a:window.obj,
//        b:[,,,,"",,new Function,[,,,,"",,new Function,Number.NaN,window.obj,,,""]],   // true
//      //b:[,,,,"",,new Function,[,,,,"",,new Function,Number.NaN,window.obj,,," "]],  // false
//        c:{
//          x:"",
//          y:[],
//          z:RegExp()
//        }
//      }
//    }
//  }
//};
//
//
//window.obj = {x:{x:{x:"",y:[,[,,,],,[,{x:"",y:[,[,,,],,[,new RegExp,,new Function,"",,Number.NaN,"",,""]],z:{x:""}},,]],z:{x:window.obj}}}};                // true
//window.obj = {x:{x:{x:"",y:[,[,,,],,[,{x:"",y:[,[,,,],,[,new RegExp,,new Function,"",,Number.NaN,"",window.obj,""]],z:{x:""}},,]],z:{x:window.obj}}}};      // true
//window.obj = {x:{x:{x:"",y:[,[,,,],,[,{x:"",y:[,[,,,],,[,new RegExp,,new Function,"",,Number.NaN,"",window.obj,""]],z:{x:""}},,]],z:{x:window.obj,y:0}}}};  // false
//
//

