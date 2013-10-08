

composable("components.Controllable_adviceTypes_around", function (require, global, internalBaseEnvironment) {


  "use strict"; // @TODO - merge the final change into other branches of this type detection module.


  /*
   *  all additional functionality this module needs
   *  is covered already by the [internalBaseEnvironment]
   *  of the "composable :: core"
   */


  var
    Trait, // the "Controllable_adviceTypes_around" Trait Module.


    env_introspective = internalBaseEnvironment.introspective,


    isFunction = env_introspective.isFunction,
  //isCallable = env_introspective.isCallable,


    NULL_VALUE = null,
    UNDEFINED_VALUE,


    makeModificationAround = function (proceed, behavior, target, joinpoint) {          // around
      return function () {
        return behavior.call(target, proceed, behavior, arguments, joinpoint/*provided by and passed only from within aspect oriented systems*/);
      };
    },


    getSanitizedTarget = function (target) {
      return (!target && ((target === UNDEFINED_VALUE) || (target === NULL_VALUE))) ? NULL_VALUE : target;
    },


    around = function (adviceHandler/*:function*/, target/*:object(optional, but recommended to be applied)*/, joinpoint/*:Joinpoint(optional)*/) {
      var proceedEnclosed = this;
      return ((

      //isCallable(proceedEnclosed) && isCallable(adviceHandler)
        isFunction(proceedEnclosed) && isFunction(adviceHandler)
        && makeModificationAround(proceedEnclosed, adviceHandler, getSanitizedTarget(target), getSanitizedTarget(joinpoint))

      ) || proceedEnclosed);
    }
  ;


  Trait = function () {
    /**
     *  implementing the "Controllable_adviceTypes_around" Trait Module.
     */
    this.around = around;
  };


  return Trait;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   332 byte
composable("components.Controllable_adviceTypes_around",function(h,k,e){var c=e.introspective.isFunction,f=function(d,a,b,c){return function(){return a.call(b,d,a,arguments,c)}},g=function(d,a,b){return c(this)&&c(d)&&f(this,d,a||void 0!==a&&null!==a?a:null,b||void 0!==b&&null!==b?b:null)||this};return function(){this.around=g}});


*/
