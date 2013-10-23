

composable("components.Resolvable", function (require, global, internalBaseEnvironment) {


  "use strict";


//require("components.Controllable_adviceTypes_before_after_around").call(global.Function.prototype);
  require("composites.Function_modifiers_adviceTypes_before_after_around");


  var
    Trait,


    env_introspective = internalBaseEnvironment.introspective,


    isString        = env_introspective.isString,
    isFunction      = env_introspective.isFunction,


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


- Simple          -   578 byte
composable("components.Resolvable",function(c,m,f){c("composites.Function_modifiers_adviceTypes_before_after_around");c=f.introspective;var e=c.isString,d=c.isFunction,g=function(a,b){e(a)&&d(b)&&(d(this[a])?this[a]=this[a].before(b,this):this[a]=b)},h=function(a,b){e(a)&&d(b)&&(d(this[a])?this[a]=this[a].after(b,this):this[a]=b)},k=function(a,b){e(a)&&d(b)&&(d(this[a])?this[a]=this[a].around(b,this):this[a]=b)},l=function(a,b,c){e(a)&&e(b)&&a!=b&&d(c)&&(this[b]=c)};return function(){this.resolveBefore=g;this.resolveAfter=h;this.resolveAround=k;this.resolveWithAlias=l}});


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
