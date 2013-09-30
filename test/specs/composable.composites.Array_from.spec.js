

describe("\"/src/composites/Array/Array.from.js\" is an anonymous module - only its source needs to be referred to.", function () {


  var
    GLOBAL_OBJECT = ((window && window.window === window) && window) || ((global && global.global === global) && global) || this,

  //require = GLOBAL_OBJECT.composable.require,

    Array = GLOBAL_OBJECT.Array
  ;

  describe("It is a module that at soon as it accesses »composable« modules at compile time ...", function () {

    it([

      "... does augment [Array] statically by a sole method - [from], if such a method did not already exist;",
      "thus providing additional enumerable functionality."

    ].join(" "), function () {

      expect(typeof Array.from).toBe("function");
    //expect(Array.from).toBe(require("environment").helpers.makeArray);
    });
  });
});
