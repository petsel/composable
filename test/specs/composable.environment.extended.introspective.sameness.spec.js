

describe("»environment_extended_introspective_sameness« module", function () {


  var
    GLOBAL_OBJECT = ((window && window.window === window) && window) || ((global && global.global === global) && global) || this,

    require = GLOBAL_OBJECT.composable.require,

    environment = require("environment"),
    environment_extended_introspective_sameness = require("environment_extended_introspective_sameness"),


    Introspective_type_sameness = require("components.Introspective_type_sameness")
  ;

  it([

    "should - after extension took place and if still able to be required via »( composable. )require(\"environment\")« -",
    "always remain an \"object\" type distinct from [null]."

  ].join(" "), function () {

    expect(typeof environment).toBe("object");
    expect(environment).not.toBeNull();
    expect(environment).toEqual(environment_extended_introspective_sameness);
  });


  describe([

    "It does extend the »environment« base module's [introspective] property ..."

  ].join(" "), function () {

    describe("»environment.introspective«", function () {
      var
        env_introspective   = environment.introspective,

        isSameValue         = env_introspective.isSameValue,

        hook_introspective  = {}
      ;
      Introspective_type_sameness.call(hook_introspective);

      it([

        "... that still serves as entry point in order to access helper methods specialized in introspection/reflection.",
        "This module enriches »environment.introspective« by just one method - [isSameValue] - that only checks for",
        "same values and identical types."

      ].join(" "), function () {

        expect(typeof env_introspective).toBe("object");
        expect(env_introspective).not.toBeNull();

        expect(typeof Introspective_type_sameness).toBe("function");
        expect(typeof hook_introspective).toBe("object");
        expect(hook_introspective).not.toBeNull();

        expect(isSameValue).toEqual(hook_introspective.isSameValue);
      });
    });
  });
});
