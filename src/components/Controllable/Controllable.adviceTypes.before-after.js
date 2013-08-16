

composable("components.Controllable_adviceTypes_before_after", function (require, global, environment) {


  "use strict";


  require("components.Introspective_isFunction_isCallable");


  var
    Trait, // the "Controllable_adviceTypes_before_after" Trait Module.


    isFunction = environment.introspective.isFunction,


    NULL_VALUE = null,
    UNDEFINED_VALUE,


    makeModificationBefore = function (proceed, behavior, target, joinpoint) {          // before
      return function () {
        var args = arguments;

        behavior.call(target, args, joinpoint);
        return proceed.apply(target, args);
      };
    },
    makeModificationAfterFinally = function (proceed, behavior, target, joinpoint) {    // after
      return function () {
        var ret, args = arguments;
        try {
          ret = proceed.apply(target, args);
        } finally {
          behavior.call(target, args, ret, joinpoint);  // TODO - think about >>behavior.call(target, ret, args, joinpoint);<<
        }
        return ret;
      };
    },


    getSanitizedTarget = function (target) {
      return (!target && ((target === UNDEFINED_VALUE) || (target === NULL_VALUE))) ? NULL_VALUE : target;
    },


    before = function (adviceHandler/*:function*/, target/*:object(should not be optional)*/, joinpoint/*:Joinpoint(optional)*/) {
      var proceedAfter = this;
      return ((

        isFunction(proceedAfter) && isFunction(adviceHandler)
        && makeModificationBefore(proceedAfter, adviceHandler, getSanitizedTarget(target), getSanitizedTarget(joinpoint))

      ) || proceedAfter);
    },
    after/*Finally*/ = function (adviceHandler/*:function*/, target/*:object(should not be optional)*/, joinpoint/*:Joinpoint(optional)*/) {
      var proceedBefore = this;
      return ((

        isFunction(proceedBefore) && isFunction(adviceHandler)
        && makeModificationAfterFinally(proceedBefore, adviceHandler, getSanitizedTarget(target), getSanitizedTarget(joinpoint))

      ) || proceedBefore);
    }
  ;


  Trait = function () {
    /**
     *  implementing the "Controllable_adviceTypes_before_after" Trait Module.
     */
    var controllable = this;

    controllable.before         = before;
    controllable.after          = after/*Finally*/;
  };


  return Trait;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   592 byte
composable("components.Controllable_adviceTypes_before_after",function(k,p,l){k("components.Introspective_isFunction_isCallable");var c=l.introspective.isFunction,e=function(b){return!b&&(void 0===b||null===b)?null:b},m=function(b,f,g){var a;if(a=c(this))if(a=c(b)){var h=this,d=e(f),j=e(g);a=function(){var a=arguments;b.call(d,a,j);return h.apply(d,a)}}return a||this},n=function(b,f,g){var a;if(a=c(this))if(a=c(b)){var h=this,d=e(f),j=e(g);a=function(){var a,c=arguments;try{a=h.apply(d,c)}finally{b.call(d,c,a,j)}return a}}return a||this};return function(){this.before=m;this.after=n}});


*/
