

composable("components.Resolvable_silent", function (require, global, internalBaseEnvironment) {


  "use strict";


//require("components.Controllable_adviceTypes_before_after_around").call(global.Function.prototype);
  require("composites.Function_modifiers_adviceTypes_before_after_around");


  var
    SilentTrait,


    env_introspective = internalBaseEnvironment.introspective,


    isString        = env_introspective.isString,
    isFunction      = env_introspective.isFunction,
    isObjectObject  = env_introspective.isObjectObject,


    resolveBefore = function (methodName, rivalingMethod) {
      if (isString(methodName) && isFunction(rivalingMethod)) {

        var type = this;
        if (isFunction(type[methodName])) {

          type[methodName] = type[methodName].before(rivalingMethod, type);
        } else {
          type[methodName] = rivalingMethod;
        }
      }
    },
    resolveAfter = function (methodName, rivalingMethod) {
      if (isString(methodName) && isFunction(rivalingMethod)) {

        var type = this;
        if (isFunction(type[methodName])) {

          type[methodName] = type[methodName].after(rivalingMethod, type);
        } else {
          type[methodName] = rivalingMethod;
        }
      }
    },
    resolveAround = function (methodName, rivalingMethod) {
      if (isString(methodName) && isFunction(rivalingMethod)) {

        var type = this;
        if (isFunction(type[methodName])) {

          type[methodName] = type[methodName].around(rivalingMethod, type);
        } else {
          type[methodName] = rivalingMethod;
        }
      }
    },

    resolveWithAlias = function (methodName, aliasName, rivalingMethod) {
      if (isString(methodName) && isString(aliasName) && (methodName != aliasName) && isFunction(rivalingMethod)) {

        this[aliasName] = rivalingMethod;
      }
    }
  ;


  SilentTrait = function (localProxy) { // Privileged Silent Trait using a Local Proxy (or rather a Mixin?)
    if (isObjectObject(localProxy)) {

  //if (localProxy && (typeof localProxy == "object")) {
      var type = this;

      localProxy.resolveBefore    = function (/*methodName, rivalingMethod*/) {resolveBefore.apply(type, arguments);};
      localProxy.resolveAfter     = function (/*methodName, rivalingMethod*/) {resolveAfter.apply(type, arguments);};
      localProxy.resolveAround    = function (/*methodName, rivalingMethod*/) {resolveAround.apply(type, arguments);};
      localProxy.resolveWithAlias = function (/*methodName, aliasName, rivalingMethod*/) {resolveWithAlias.apply(type, arguments);};
    }
  };


  return SilentTrait;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   738 byte
composable("components.Resolvable_silent",function(c,n,f){c("composites.Function_modifiers_adviceTypes_before_after_around");c=f.introspective;var e=c.isString,d=c.isFunction,g=c.isObjectObject,h=function(a,b){e(a)&&d(b)&&(d(this[a])?this[a]=this[a].before(b,this):this[a]=b)},k=function(a,b){e(a)&&d(b)&&(d(this[a])?this[a]=this[a].after(b,this):this[a]=b)},l=function(a,b){e(a)&&d(b)&&(d(this[a])?this[a]=this[a].around(b,this):this[a]=b)},m=function(a,b,c){e(a)&&e(b)&&a!=b&&d(c)&&(this[b]=c)};return function(a){if(g(a)){var b=this;a.resolveBefore=function(){h.apply(b,arguments)};a.resolveAfter=function(){k.apply(b,arguments)};a.resolveAround=function(){l.apply(b,arguments)};a.resolveWithAlias=function(){m.apply(b,arguments)}}}});


*/



/*

var Resolvable_silent = (function () {

  "use strict";

  var
    SilentTrait,

    isString    = function (type) {
      return (typeof type == "string");
    },
    isFunction  = function (type) {
      return (typeof type == "function");
    },

    resolveBefore = function (methodName, rivalingMethod) {
      if (isString(methodName) && isFunction(rivalingMethod)) {

        var type = this;
        if (isFunction(type[methodName])) {

          type[methodName] = type[methodName].before(rivalingMethod, type);
        } else {
          type[methodName] = rivalingMethod;
        }
      }
    },
    resolveAfter = function (methodName, rivalingMethod) {
      if (isString(methodName) && isFunction(rivalingMethod)) {

        var type = this;
        if (isFunction(type[methodName])) {

          type[methodName] = type[methodName].after(rivalingMethod, type);
        } else {
          type[methodName] = rivalingMethod;
        }
      }
    },
    resolveAround = function (methodName, rivalingMethod) {
      if (isString(methodName) && isFunction(rivalingMethod)) {

        var type = this;
        if (isFunction(type[methodName])) {

          type[methodName] = type[methodName].around(rivalingMethod, type);
        } else {
          type[methodName] = rivalingMethod;
        }
      }
    },

    resolveWithAlias = function (methodName, aliasName, rivalingMethod) {
      if (isString(methodName) && isString(aliasName) && (methodName != aliasName) && isFunction(rivalingMethod)) {

        this[aliasName] = rivalingMethod;
      }
    }
  ;

  SilentTrait = function (localProxy) { // Privileged Silent Trait using a Local Proxy (or rather a Mixin?)
    if (localProxy && (typeof localProxy == "object")) {

      var type = this;

      localProxy.resolveBefore    = function (/ *methodName, rivalingMethod* /) {resolveBefore.apply(type, arguments);};
      localProxy.resolveAfter     = function (/ *methodName, rivalingMethod* /) {resolveAfter.apply(type, arguments);};
      localProxy.resolveAround    = function (/ *methodName, rivalingMethod* /) {resolveAround.apply(type, arguments);};
      localProxy.resolveWithAlias = function (/ *methodName, aliasName, rivalingMethod* /) {resolveWithAlias.apply(type, arguments);};
    }
  };

  return SilentTrait;

}());

*/



/*

var Resolvable_silent=function(){var d=function(a){return"string"==typeof a},c=function(a){return"function"==typeof a},f=function(a,b){d(a)&&c(b)&&(c(this[a])?this[a]=this[a].before(b,this):this[a]=b)},g=function(a,b){d(a)&&c(b)&&(c(this[a])?this[a]=this[a].after(b,this):this[a]=b)},h=function(a,b){d(a)&&c(b)&&(c(this[a])?this[a]=this[a].around(b,this):this[a]=b)},k=function(a,b,e){d(a)&&d(b)&&a!=b&&c(e)&&(this[b]=e)};return function(a){if(a&&"object"==typeof a){var b=this;a.resolveBefore=function(){f.apply(b,arguments)};a.resolveAfter=function(){g.apply(b,arguments)};a.resolveAround=function(){h.apply(b,arguments)};a.resolveWithAlias=function(){k.apply(b,arguments)}}}}();


var Floatable = function () {

  var resolutionHelper = {};
  Resolvable_silent.call(this, resolutionHelper);

  resolutionHelper.resolveAfter("initialize", function () {
    console.log("make it floatable.");
  });
};
var Ridable = function () {

  var resolutionHelper = {};
  Resolvable_silent.call(this, resolutionHelper);

  resolutionHelper.resolveBefore("initialize", function () {
    console.log("make it ridable.");
  });
};

var Amphicar = function () {

  Floatable.call(this);
  Ridable.call(this);

  this.initialize();
};

var ac = new Amphicar;

*/
