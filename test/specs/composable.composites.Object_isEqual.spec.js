

describe("»composites.Object_isEqual« module", function () {


  var
    GLOBAL_OBJECT = ((window && window.window === window) && window) || ((global && global.global === global) && global) || this,

    require = GLOBAL_OBJECT.composable.require,


    environment = require("environment")
  ;
  require("composites.Object_isEqual");


  it([

    "should provide [environment.introspective.isEqualType] globally as [Object.isEqual]."

  ].join(" "), function () {

    var Object = GLOBAL_OBJECT.Object;

    expect(typeof environment).toBe("object");
    expect(environment).not.toBeNull();

    expect(typeof environment.introspective.isEqualType).toBe("function");
    expect(typeof Object.isEqual).toBe("function");

    expect(Object.isEqual).toEqual(environment.introspective.isEqualType);
  });
});
