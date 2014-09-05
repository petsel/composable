

composable("components.Resolvable_silent", function (require/*, global, internalBaseEnvironment*/) {


  "use strict";


//require("components.Controllable_adviceTypes_before_after_around").call(global.Function.prototype);
//require("composites.Function_modifiers_adviceTypes_before_after_around");


  var
    environment     = require("environment_extended_introspective_core"),
    Resolvable      = require("components.Resolvable"),


    SilentTrait,


    isObjectObject  = environment.introspective.isObjectObject,


    hook = {}
  ;
  Resolvable.call(hook);


  var
    resolveBefore     = hook.resolveBefore,
    resolveAfter      = hook.resolveAfter,
    resolveAround     = hook.resolveAround,

    resolveWithAlias  = hook.resolveWithAlias
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


- Simple          -   505 byte
composable("components.Resolvable_silent",function(b){var a=b("environment_extended_introspective_core");b=b("components.Resolvable");var c=a.introspective.isObjectObject,a={};b.call(a);var d=a.resolveBefore,e=a.resolveAfter,f=a.resolveAround,g=a.resolveWithAlias;return function(a){if(c(a)){var b=this;a.resolveBefore=function(){d.apply(b,arguments)};a.resolveAfter=function(){e.apply(b,arguments)};a.resolveAround=function(){f.apply(b,arguments)};a.resolveWithAlias=function(){g.apply(b,arguments)}}}});


*/



/*

//https://gist.github.com/petsel/5592016
(function(g){var b=function(a){return"function"==typeof a&&"function"==typeof a.call&&"function"==typeof a.apply},h=function(a,e,c,b){return function(){var d=arguments;e.call(c,d,b);return a.apply(c,d)}},k=function(a,e,c,d){return function(){var b,f=arguments;b=a.apply(c,f);e.call(c,b,f,d);return b}},l=function(a,b,c,d){return function(){return b.call(c,a,b,arguments,d)}},d=function(a){return a||void 0!==a&&null!==a?a:null},m=function(a,e,c){return b(this)&&b(a)&&h(this,a,d(e),d(c))||this},n=function(a,e,c){return b(this)&&b(a)&&k(this,a,d(e),d(c))||this},p=function(a,e,c){return b(this)&&b(a)&&l(this,a,d(e),d(c))||this};(function(){this.before=m;this.after=n;this.around=p}).call(g.prototype)})(Function);


var Resolvable=function(){var d=function(a){return"string"==typeof a},c=function(a){return"function"==typeof a},f=function(a,b){d(a)&&c(b)&&(c(this[a])?this[a]=this[a].before(b,this):this[a]=b)},g=function(a,b){d(a)&&c(b)&&(c(this[a])?this[a]=this[a].after(b,this):this[a]=b)},h=function(a,b){d(a)&&c(b)&&(c(this[a])?this[a]=this[a].around(b,this):this[a]=b)},k=function(a,b,e){d(a)&&d(b)&&a!=b&&c(e)&&(this[b]=e)};return function(){this.resolveBefore=f;this.resolveAfter=g;this.resolveAround=h;this.resolveWithAlias=k}}();


var Resolvable_silent = (function (global) {

  var
    Resolvable = global.Resolvable,

    SilentTrait,


    isObjectObject = function (type) {
      return (type && (typeof type == "object"));
    },


    hook = {}
  ;
  Resolvable.call(hook);


  var
    resolveBefore = hook.resolveBefore,
    resolveAfter = hook.resolveAfter,
    resolveAround = hook.resolveAround,

    resolveWithAlias = hook.resolveWithAlias
  ;


  SilentTrait = function (localProxy) { // Privileged Silent Trait using a Local Proxy (or rather a Mixin?)
    if (isObjectObject(localProxy)) {

    //if (localProxy && (typeof localProxy == "object")) {
      var type = this;

      localProxy.resolveBefore = function () {resolveBefore.apply(type, arguments);};
      localProxy.resolveAfter = function () {resolveAfter.apply(type, arguments);};
      localProxy.resolveAround = function () {resolveAround.apply(type, arguments);};
      localProxy.resolveWithAlias = function () {resolveWithAlias.apply(type, arguments);};
    }
  };


  return SilentTrait;


}(window || global || this));



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
