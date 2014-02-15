

describe("»composites.Object_is« module", function () {


  var
    GLOBAL_OBJECT = ((window && window.window === window) && window) || ((global && global.global === global) && global) || this,

    require = GLOBAL_OBJECT.composable.require,


    environment = require("environment")
  ;
  require("composites.Object_is");


  it([

    "should provide [environment.introspective.isSameValue] globally as [Object.is]."

  ].join(" "), function () {

    var Object = GLOBAL_OBJECT.Object;

    expect(typeof environment).toBe("object");
    expect(environment).not.toBeNull();

    expect(typeof environment.introspective.isSameValue).toBe("function");
    expect(typeof Object.is).toBe("function");

    expect(Object.is).toEqual(environment.introspective.isSameValue);
  });
});
