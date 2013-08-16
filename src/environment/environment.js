

composable("environment", function (require, global, internalEnvironmentBase) {


  "use strict";


//var
//  env_helpers       = internalEnvironmentBase.helpers,
//  env_introspective = internalEnvironmentBase.introspective,
//  env_methods       = internalEnvironmentBase.methods,
//  env_objects       = internalEnvironmentBase.objects
//;
//
//
//return {
//  /**
//   *  create and return a copy of the "composable"s internal [environment] base.
//   *
//   *  this will be the foundation for all other prospective references that are
//   *  encouraged to get added to or merged into this requestable "composable"
//   *  conform module in case such references appear to be helpful and also
//   *  in any kind are possible to get mapped to this basic structure.
//   *
//   *  thus the [composable]s internal [environment] base remains unchanged
//   *  whereas a mutable copy of it gets exposed to the [composable]s index.
//   */
//  "helpers"       : {
//
//    "compareTypes"      : env_helpers.compareTypes,
//    "makeArray"         : env_helpers.makeArray
//  },
//  "introspective" : {
//
//    "baseValueOf"       : env_introspective.baseValueOf,
//    "getClassSignature" : env_introspective.getClassSignature,
//    "isArguments"       : env_introspective.isArguments,
//    "isArray"           : env_introspective.isArray,
//    "isCallable"        : env_introspective.isCallable,
//    "isFunction"        : env_introspective.isFunction,
//    "isString"          : env_introspective.isString
//  },
//  "methods"       : {
//
//    "noop"              : env_methods.noop
//  },
//  "objects"       : {
//
//    "global"            : env_objects.global,
//    "regX"              : env_objects.regX
//  }
//};


  var createPrototypalCopy = function (blueprint) {

    var GreenBody = function () {};
    GreenBody.prototype = blueprint;
    return (new GreenBody);
  };


  return createPrototypalCopy(internalEnvironmentBase);


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -    85 byte  - prototypal copy
composable("environment",function(a,c,b){a=function(){};a.prototype=b;return new a});


*/
