

describe("\"/src/composites/Array/Array.first-last.js\" is an anonymous module - only its source needs to be referred to.", function () {


  var
    GLOBAL_OBJECT = ((window && window.window === window) && window) || ((global && global.global === global) && global) || this,

    array_prototype = GLOBAL_OBJECT.Array.prototype,


    str = "hallo world",
    arr = str.split(str)
  ;

  describe("It is a module that as soon as it accesses »composable« modules at compile time ...", function () {

    it([

      "... does augment [Array.prototype] by two methods - [first] and [last];",
      "thus providing additional enumerable functionality to array instances."

    ].join(" "), function () {

      expect(typeof arr.first).toBe("function");
      expect(typeof arr.last).toBe("function");

      expect(arr.first).toBe(array_prototype.first);
      expect(arr.last).toBe(array_prototype.last);
    });
  });
});
