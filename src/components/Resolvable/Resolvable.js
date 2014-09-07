

composable("components.Resolvable", function (require/*, global, internalBaseEnvironment*/) {


  "use strict";


//require("components.Controllable_adviceTypes_before_after_around").call(global.Function.prototype);
  require("composites.Function_modifiers_adviceTypes_before_after_around");


  var
    environment   = require("environment_extended_introspective_core"),


    Trait,


    env_introspective = environment.introspective,


    isFunction    = env_introspective.isFunction,
    isString      = env_introspective.isString,


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


  Trait = function () {
    var type = this;

    type.resolveBefore    = resolveBefore;
    type.resolveAfter     = resolveAfter;
    type.resolveAround    = resolveAround;
    type.resolveWithAlias = resolveWithAlias;
  };


  return Trait;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   617 byte
composable("components.Resolvable",function(c){c("composites.Function_modifiers_adviceTypes_before_after_around");c=c("environment_extended_introspective_core").introspective;var d=c.isFunction,e=c.isString,f=function(a,b){e(a)&&d(b)&&(d(this[a])?this[a]=this[a].before(b,this):this[a]=b)},g=function(a,b){e(a)&&d(b)&&(d(this[a])?this[a]=this[a].after(b,this):this[a]=b)},h=function(a,b){e(a)&&d(b)&&(d(this[a])?this[a]=this[a].around(b,this):this[a]=b)},k=function(a,b,c){e(a)&&e(b)&&a!=b&&d(c)&&(this[b]=c)};return function(){this.resolveBefore=f;this.resolveAfter=g;this.resolveAround=h;this.resolveWithAlias=k}});


*/



/*

var Resolvable = (function () {

  "use strict";

  var
    Trait,

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

  Trait = function () {
    var type = this;

    type.resolveBefore    = resolveBefore;
    type.resolveAfter     = resolveAfter;
    type.resolveAround    = resolveAround;
    type.resolveWithAlias = resolveWithAlias;
  };

  return Trait;

}());

*/


/*

//https://gist.github.com/petsel/5592016
(function(g){var b=function(a){return"function"==typeof a&&"function"==typeof a.call&&"function"==typeof a.apply},h=function(a,e,c,b){return function(){var d=arguments;e.call(c,d,b);return a.apply(c,d)}},k=function(a,e,c,d){return function(){var b,f=arguments;b=a.apply(c,f);e.call(c,b,f,d);return b}},l=function(a,b,c,d){return function(){return b.call(c,a,b,arguments,d)}},d=function(a){return a||void 0!==a&&null!==a?a:null},m=function(a,e,c){return b(this)&&b(a)&&h(this,a,d(e),d(c))||this},n=function(a,e,c){return b(this)&&b(a)&&k(this,a,d(e),d(c))||this},p=function(a,e,c){return b(this)&&b(a)&&l(this,a,d(e),d(c))||this};(function(){this.before=m;this.after=n;this.around=p}).call(g.prototype)})(Function);


var Resolvable=function(){var d=function(a){return"string"==typeof a},c=function(a){return"function"==typeof a},f=function(a,b){d(a)&&c(b)&&(c(this[a])?this[a]=this[a].before(b,this):this[a]=b)},g=function(a,b){d(a)&&c(b)&&(c(this[a])?this[a]=this[a].after(b,this):this[a]=b)},h=function(a,b){d(a)&&c(b)&&(c(this[a])?this[a]=this[a].around(b,this):this[a]=b)},k=function(a,b,e){d(a)&&d(b)&&a!=b&&c(e)&&(this[b]=e)};return function(){this.resolveBefore=f;this.resolveAfter=g;this.resolveAround=h;this.resolveWithAlias=k}}();

var obj = {};
Resolvable.call(obj);
obj;        // Object {resolveBefore: function, resolveAfter: function, resolveAround: function}
obj.resolveBefore("foo", function(){console.log("foo")});
obj;        // Object {resolveBefore: function, resolveAfter: function, resolveAround: function, foo: function}
obj.foo;    // function (){console.log("foo")}
obj.foo();  // "foo"
obj.resolveBefore("foo", function(){console.log("bar")});
obj.foo;    // function (){var d=arguments;e.call(c,d,b);return a.apply(c,d)}
obj.foo();  // "bar" "foo"
obj.resolveAfter("foo", function(){console.log("baz")});
obj.foo;    // function (){var b,f=arguments;b=a.apply(c,f);e.call(c,b,f,d);return b}
obj.foo()   // "bar" "foo" "baz"

*/


/*

//https://gist.github.com/petsel/5592016
(function(g){var b=function(a){return"function"==typeof a&&"function"==typeof a.call&&"function"==typeof a.apply},h=function(a,e,c,b){return function(){var d=arguments;e.call(c,d,b);return a.apply(c,d)}},k=function(a,e,c,d){return function(){var b,f=arguments;b=a.apply(c,f);e.call(c,b,f,d);return b}},l=function(a,b,c,d){return function(){return b.call(c,a,b,arguments,d)}},d=function(a){return a||void 0!==a&&null!==a?a:null},m=function(a,e,c){return b(this)&&b(a)&&h(this,a,d(e),d(c))||this},n=function(a,e,c){return b(this)&&b(a)&&k(this,a,d(e),d(c))||this},p=function(a,e,c){return b(this)&&b(a)&&l(this,a,d(e),d(c))||this};(function(){this.before=m;this.after=n;this.around=p}).call(g.prototype)})(Function);


var Resolvable=function(){var d=function(a){return"string"==typeof a},c=function(a){return"function"==typeof a},f=function(a,b){d(a)&&c(b)&&(c(this[a])?this[a]=this[a].before(b,this):this[a]=b)},g=function(a,b){d(a)&&c(b)&&(c(this[a])?this[a]=this[a].after(b,this):this[a]=b)},h=function(a,b){d(a)&&c(b)&&(c(this[a])?this[a]=this[a].around(b,this):this[a]=b)},k=function(a,b,e){d(a)&&d(b)&&a!=b&&c(e)&&(this[b]=e)};return function(){this.resolveBefore=f;this.resolveAfter=g;this.resolveAround=h;this.resolveWithAlias=k}}();


var Floatable = function () {

//Resolvable.call(this);

  this.resolveAfter("initialize", function () {
    console.log("make it floatable.");
  });
};
var Ridable = function () {

//Resolvable.call(this);

  this.resolveBefore("initialize", function () {
    console.log("make it ridable.");
  });
};

var Amphicar = function () {

  Resolvable.call(this);

  Floatable.call(this);
  Ridable.call(this);

  this.initialize();
};

var ac = new Amphicar;

*/
