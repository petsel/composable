

composable("components.Propagable_EventAdapter", function (require, global, internalBaseEnvironment) {

  "use strict";

  var
    Mixin,

    env_introspective = internalBaseEnvironment.introspective,

    isObject = env_introspective.isObject,
    isString = env_introspective.isString,

    isEventLike = function (type) {   // was: isCurrentTargetEvent
      return (
      //isObject(type.currentTarget)  // - does only work for connected systems that just rely on "components.Observable_SignalsAndSlots" and do augment their events by [currentTarget].

        isObject(type.target)         // - is more general since it does not distinguish standard event objects from augmented ones that feature [currentTarget].
        && isString(type.type)
      );
    }
  ;

  Mixin = function () { // Privileged Mixin.
    if (!isEventLike(this)) {
      return;
    }
    var isstoppropagation = false; // does internally create own mutable state.

    this.stopImmediatePropagation = function () {
      isstoppropagation = true
    };
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


- Simple          -   305 byte
composable("components.Propagable_EventAdapter",function(a,e,b){a=b.introspective;var c=a.isObject,d=a.isString;return function(){if(c(this.target)&&d(this.type)){var a=!1;this.stopImmediatePropagation=function(){a=!0};this.stopPropagation=function(){a=!0};this.isStopPropagation=function(){return a}}}});


*/
