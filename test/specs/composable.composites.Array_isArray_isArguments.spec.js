

describe("\"/src/composites/Array/Array.isArray-isArguments.js\" is an anonymous module - only its source needs to be referred to.", function () {


  var
    GLOBAL_OBJECT = ((window && window.window === window) && window) || ((global && global.global === global) && global) || this,

    require = GLOBAL_OBJECT.composable.require,

    Array = GLOBAL_OBJECT.Array
  ;

  describe("It is a module that at soon as it accesses »composable« modules at compile time ...", function () {

    it([

      "... does augment [Array] statically by two methods - [isArray], if such a method did not already exist",
      "and [isArgument]; thus providing additional type detection functionality."

    ].join(" "), function () {

      var env_introspective = require("environment").introspective;

      expect(typeof Array.isArray).toBe("function");
    //expect(Array.isArray).toBe(env_introspective.isArray);

      expect(Array.isArgument).toBe(env_introspective.isArgument);
    });
  });
});
