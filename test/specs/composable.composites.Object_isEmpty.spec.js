

describe("»composites.Object_isEmpty« module", function () {


  var
    GLOBAL_OBJECT = ((window && window.window === window) && window) || ((global && global.global === global) && global) || this,

    require = GLOBAL_OBJECT.composable.require,


    environment = require("environment")
  ;
  require("composites.Object_isEmpty");


  it([

    "should provide both [environment.introspective.isEmptyType] globally as [Object.isEmpty] and",
    "[environment.introspective.isUninhabitedStructure] globally as [Object.isUninhabited]."

  ].join(" "), function () {

    var Object = GLOBAL_OBJECT.Object;

    expect(typeof environment).toBe("object");
    expect(environment).not.toBeNull();

    expect(typeof environment.introspective.isEmptyType).toBe("function");
    expect(typeof environment.introspective.isUninhabitedStructure).toBe("function");
    expect(typeof Object.isEmpty).toBe("function");
    expect(typeof Object.isUninhabited).toBe("function");

    expect(Object.isEmpty).toEqual(environment.introspective.isEmptyType);
    expect(Object.isUninhabited).toEqual(environment.introspective.isUninhabitedStructure);
  });
});
