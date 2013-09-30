

composable("environment", function (require, global, internalBaseEnvironment) {


  "use strict";


//var
//  env_objects       = internalBaseEnvironment.objects,
//  env_methods       = internalBaseEnvironment.methods,
//  env_helpers       = internalBaseEnvironment.helpers,
//  env_introspective = internalBaseEnvironment.introspective
//;
//return {
//
//  /**
//   *  create and return a copy of the "composable"s internal base [environment].
//   *
//   *  this will be the foundation for all other prospective references that are
//   *  encouraged to get added to or merged into this requestable "composable"
//   *  conform module in case such references appear to be helpful and also
//   *  in any kind are possible to get mapped to this basic structure.
//   *
//   *  thus the [composable]s internal base [environment] remains unchanged
//   *  whereas a mutable copy of it gets exposed to the [composable]s index.
//   */
//
//  global  :             global,
//
//  objects : {
//    regX                : env_objects.regX
//  },
//  methods : {
//    noop                : env_methods.noop
//  },
//  helpers : {
//    makeArray                       : env_helpers.makeArray,
//    compareTypes                    : env_helpers.compareTypes,
//    createClassSignaturePattern     : env_helpers.createClassSignaturePattern,
//    protectBehaviorFromInstantiation: env_helpers.protectBehaviorFromInstantiation
//  },
//  introspective : {
//    isFunction          : env_introspective.isFunction,
//    isCallable          : env_introspective.isCallable,
//    isArray             : env_introspective.isArray,
//    isArguments         : env_introspective.isArguments,
//    isString            : env_introspective.isString,
//    baseValueOf         : env_introspective.baseValueOf,
//    getClassSignature   : env_introspective.getClassSignature
//  }
//};


  var createPrototypalCopy = function (blueprint) {

    var GreenBody = function () {};
    GreenBody.prototype = blueprint;
    return (new GreenBody);
  };


  return createPrototypalCopy(internalBaseEnvironment);


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   112 byte
composable("environment",function(c,d,a){return function(a){var b=function(){};b.prototype=a;return new b}(a)});


*/
