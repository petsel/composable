

composable("components.Controllable_adviceTypes_around", function (require, global, environment) {


  "use strict";


  require("components.Introspective_isFunction_isCallable");


  var
    Trait, // the "Controllable_adviceTypes_around" Trait Module.


    env_introspective = environment.introspective,


    isFunction = env_introspective.isFunction,
    isCallable = env_introspective.isCallable,


    NULL_VALUE = null,
    UNDEFINED_VALUE,


    makeModificationAround = function (proceed, behavior, target, joinpoint) {          // around
      return function () {

      //return behavior.call(target, arguments, proceed, behavior, target, joinpoint);
        return behavior.call(target, proceed, behavior, arguments, target, joinpoint);  // TODO - think about >>behavior.call(target, target, proceed, behavior, arguments, joinpoint);<<
      };
    },


    getSanitizedTarget = function (target) {
      return (!target && ((target === UNDEFINED_VALUE) || (target === NULL_VALUE))) ? NULL_VALUE : target;
    },


    around = function (adviceHandler/*:function*/, target/*:object(should not be optional)*/, joinpoint/*:Joinpoint(optional)*/) {
      var proceedEnclosed = this;
      return ((

        isCallable(proceedEnclosed) && isFunction(adviceHandler)
        && makeModificationAround(proceedEnclosed, adviceHandler, getSanitizedTarget(target), getSanitizedTarget(joinpoint))

      ) || proceedEnclosed);
    }
  ;


  Trait = function () {
    /**
     *  implementing the "Controllable_adviceTypes_around" Trait Module.
     */
    this.around         = around;
  };


  return Trait;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   407 byte
composable("components.Controllable_adviceTypes_around",function(a,k,e){a("components.Introspective_isFunction_isCallable");a=e.introspective;var h=a.isFunction,j=a.isCallable,f=function(a,b,c){var d;if(d=j(this))if(d=h(a)){var e=this,g=!b&&(void 0===b||null===b)?null:b,f=!c&&(void 0===c||null===c)?null:c;d=function(){return a.call(g,e,a,arguments,g,f)}}return d||this};return function(){this.around=f}});


*/
