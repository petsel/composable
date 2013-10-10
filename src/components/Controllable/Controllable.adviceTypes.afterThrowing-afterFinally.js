

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


    makeModificationAfterThrowing = function (proceed, behavior, target, joinpoint) {   // afterThrowing
      return function () {
        var ret, args = arguments;
        try {
          ret = proceed.apply(target, args);
        } catch (exc) {
          behavior.call(target, exc, args, joinpoint/*provided by and passed only from within aspect oriented systems*/);
        //throw exc;
        }
        return ret;
      };
    },
    makeModificationAfterFinally = function (proceed, behavior, target, joinpoint) {    // afterFinally
      return function () {
        var ret, err, args = arguments;
        try {
          ret = proceed.apply(target, args);
        } catch (exc) {
          err = exc;
        } // finally { ... }
        ret = (err || ret);
        behavior.call(target, ret, args, joinpoint/*provided by and passed only from within aspect oriented systems*/);

        return ret;
      };
    },


    getSanitizedTarget = function (target) {
      return (!target && ((target === UNDEFINED_VALUE) || (target === NULL_VALUE))) ? NULL_VALUE : target;
    },


    afterThrowing = function (adviceHandler/*:function*/, target/*:object(optional, but recommended to be applied)*/, joinpoint/*:Joinpoint(optional)*/) {
      var proceedBefore = this;
      return ((

        //isCallable(proceedBefore) && isCallable(adviceHandler)
        isFunction(proceedBefore) && isFunction(adviceHandler)
          && makeModificationAfterThrowing(proceedBefore, adviceHandler, getSanitizedTarget(target), getSanitizedTarget(joinpoint))

        ) || proceedBefore);
    },
    afterFinally = function (adviceHandler/*:function*/, target/*:object(optional, but recommended to be applied)*/, joinpoint/*:Joinpoint(optional)*/) {
      var proceedBefore = this;
      return ((

      //isCallable(proceedBefore) && isCallable(adviceHandler)
        isFunction(proceedBefore) && isFunction(adviceHandler)
        && makeModificationAfterFinally(proceedBefore, adviceHandler, getSanitizedTarget(target), getSanitizedTarget(joinpoint))

      ) || proceedBefore);
    }
  ;


  Trait = function () {
    /**
     *  implementing the "Controllable_adviceTypes_afterThrowing_afterFinally" Trait Module.
     */
    var controllable = this;

    controllable.afterThrowing  = afterThrowing;
    controllable.afterFinally   = afterFinally;
  };


  return Trait;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   609 byte
composable("components.Controllable_adviceTypes_afterThrowing_afterFinally",function(q,r,g){var d=g.introspective.isFunction,l=function(a,f,b,d){return function(){var e,h=arguments;try{e=a.apply(b,h)}catch(c){f.call(b,c,h,d)}return e}},m=function(a,f,b,d){return function(){var e,c,k=arguments;try{e=a.apply(b,k)}catch(g){c=g}e=c||e;f.call(b,e,k,d);return e}},c=function(a){return a||void 0!==a&&null!==a?a:null},n=function(a,f,b){return d(this)&&d(a)&&l(this,a,c(f),c(b))||this},p=function(a,f,b){return d(this)&&d(a)&&m(this,a,c(f),c(b))||this};return function(){this.afterThrowing=n;this.afterFinally=p}});


*/
