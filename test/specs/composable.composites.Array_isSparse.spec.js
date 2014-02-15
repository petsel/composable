

describe("»composites.Array_isSparse« module", function () {


  var
    GLOBAL_OBJECT = ((window && window.window === window) && window) || ((global && global.global === global) && global) || this,

    require = GLOBAL_OBJECT.composable.require,


    environment = require("environment")
  ;
  require("composites.Array_isSparse");


  it([

    "should provide [environment.introspective.isSparseList] globally as [Array.isSparse]."

  ].join(" "), function () {

    var Array = GLOBAL_OBJECT.Array;

    expect(typeof environment).toBe("object");
    expect(environment).not.toBeNull();

    expect(typeof environment.introspective.isSparseList).toBe("function");
    expect(typeof Array.isSparse).toBe("function");

    expect(Array.isSparse).toEqual(environment.introspective.isSparseList);
  });
});
