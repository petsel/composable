

describe("»composites.Function_modifiers_adviceTypes_before_after_around« module", function () {


  var
    GLOBAL_OBJECT = ((window && window.window === window) && window) || ((global && global.global === global) && global) || this,

    require = GLOBAL_OBJECT.composable.require,


    functionPrototype = GLOBAL_OBJECT.Function.prototype,


    resetFunctionPrototype = function () {
      delete functionPrototype.before;
      delete functionPrototype.after; // afterReturning
      delete functionPrototype.around;
      delete functionPrototype.afterFinally;
      delete functionPrototype.afterThrowing;
    }
  ;


  describe("It is a module that as soon as it accesses »composable« modules at compile time ...", function () {

    it([

      "... does augment [Function.prototype] by three methods - [before], [after] and [around].",
      "Thus it should be seen of providing kind of an AOP inspired basic pre stage for",
      "modification/modifying of function based control flow."

    ].join(" "), function () {

      resetFunctionPrototype();
      expect(require.before).toBeUndefined();
      expect(require.after).toBeUndefined();
      expect(require.around).toBeUndefined();
      expect(require.afterThrowing).toBeUndefined();
      expect(require.afterFinally).toBeUndefined();

      require("components.Controllable_adviceTypes_before_after_around").call(functionPrototype);

      expect(typeof require.before).toBe("function");
      expect(typeof require.after).toBe("function");
      expect(typeof require.around).toBe("function");

      expect(typeof require.afterThrowing).not.toBe("function");
      expect(typeof require.afterFinally).not.toBe("function");
      expect(require.afterThrowing).toBeUndefined();
      expect(require.afterFinally).toBeUndefined();


      resetFunctionPrototype();
      expect(require.before).toBeUndefined();
      expect(require.after).toBeUndefined();
      expect(require.around).toBeUndefined();
      expect(require.afterThrowing).toBeUndefined();
      expect(require.afterFinally).toBeUndefined();
    });
  });
});
