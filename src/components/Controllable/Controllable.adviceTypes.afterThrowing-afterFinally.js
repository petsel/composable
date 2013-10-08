

composable("components.Controllable_adviceTypes_afterThrowing_afterFinally", function (require, global, internalBaseEnvironment) {


  "use strict"; // @TODO - merge the final change into other branches of this type detection module.


  /*
   *  all additional functionality this module needs
   *  is covered already by the [internalBaseEnvironment]
   *  of the "composable :: core"
   */


  var
    Trait, // the "Controllable_adviceTypes_afterThrowing_afterFinally" Trait Module.


    env_introspective = internalBaseEnvironment.introspective,


    isFunction = env_introspective.isFunction,
  //isCallable = env_introspective.isCallable,


    NULL_VALUE = null,
    UNDEFINED_VALUE,


    makeModificationAfterFinally = function (proceed, behavior, target, joinpoint) {    // afterFinally
      return function () {
        var ret, args = arguments;
        try {
          ret = proceed.apply(target, args);
        } finally {
          behavior.call(target, ret, args, joinpoint/*provided by and passed only from within aspect oriented systems*/);
        }
        return ret;
      };
    },
    makeModificationAfterThrowing = function (proceed, behavior, target, joinpoint) {   // afterThrowing
      return function () {
        var args = arguments;
        try {
          proceed.apply(target, args);
        } catch (exc) {
          behavior.call(target, exc, args, joinpoint/*provided by and passed only from within aspect oriented systems*/);
          throw exc;
        }
      };
    },


    getSanitizedTarget = function (target) {
      return (!target && ((target === UNDEFINED_VALUE) || (target === NULL_VALUE))) ? NULL_VALUE : target;
    },


    afterFinally = function (adviceHandler/*:function*/, target/*:object(optional, but recommended to be applied)*/, joinpoint/*:Joinpoint(optional)*/) {
      var proceedBefore = this;
      return ((

      //isCallable(proceedBefore) && isCallable(adviceHandler)
        isFunction(proceedBefore) && isFunction(adviceHandler)
        && makeModificationAfterFinally(proceedBefore, adviceHandler, getSanitizedTarget(target), getSanitizedTarget(joinpoint))

      ) || proceedBefore);
    },
    afterThrowing = function (adviceHandler/*:function*/, target/*:object(optional, but recommended to be applied)*/, joinpoint/*:Joinpoint(optional)*/) {
      var proceedBefore = this;
      return ((

      //isCallable(proceedBefore) && isCallable(adviceHandler)
        isFunction(proceedBefore) && isFunction(adviceHandler)
        && makeModificationAfterThrowing(proceedBefore, adviceHandler, getSanitizedTarget(target), getSanitizedTarget(joinpoint))

      ) || proceedBefore);
    }
  ;


  Trait = function () {
    /**
     *  implementing the "Controllable_adviceTypes_afterThrowing_afterFinally" Trait Module.
     */
    var controllable = this;

    controllable.afterFinally   = afterFinally;
    controllable.afterThrowing  = afterThrowing;
  };


  return Trait;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   592 byte
composable("components.Controllable_adviceTypes_afterThrowing_afterFinally",function(p,q,h){var c=h.introspective.isFunction,k=function(a,d,b,c){return function(){var e,f=arguments;try{e=a.apply(b,f)}finally{d.call(b,e,f,c)}return e}},l=function(a,d,b,c){return function(){var e=arguments;try{a.apply(b,e)}catch(f){throw d.call(b,f,e,c),f;}}},g=function(a){return a||void 0!==a&&null!==a?a:null},m=function(a,d,b){return c(this)&&c(a)&&k(this,a,g(d),g(b))||this},n=function(a,d,b){return c(this)&&c(a)&&l(this,a,g(d),g(b))||this};return function(){this.afterFinally=m;this.afterThrowing=n}});


*/
