

composable("components.Propagable_EventProxy", function (require, global, internalBaseEnvironment) {

  "use strict";

  var
    Mixin,

    env_introspective = internalBaseEnvironment.introspective,

    isObject = env_introspective.isObject,
    isString = env_introspective.isString,

    isEvent = function (type) {
      return (
        isObject(type.currentTarget)
        && isString(type.type)
      );
    }
  ;

  Mixin = function () { // Mixin.
    if (!isEvent(this)) {
      return;
    }
    var isstoppropagation = false; // does internally create own state.

    this.stopPropagation = function () {
      isstoppropagation = true
    };
    this.isStopPropagation = function () {
      return isstoppropagation;
    };
  };

  return Mixin;

});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   263 byte
composable("components.Propagable_EventProxy",function(a,e,b){a=b.introspective;var c=a.isObject,d=a.isString;return function(){if(c(this.currentTarget)&&d(this.type)){var a=!1;this.stopPropagation=function(){a=!0};this.isStopPropagation=function(){return a}}}});


*/
