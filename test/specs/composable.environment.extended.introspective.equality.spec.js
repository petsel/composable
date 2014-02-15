

describe("»environment_extended_introspective_equality« module", function () {


  var
    GLOBAL_OBJECT = ((window && window.window === window) && window) || ((global && global.global === global) && global) || this,

    require = GLOBAL_OBJECT.composable.require,

    environment = require("environment"),
    environment_extended_introspective_equality = require("environment_extended_introspective_equality"),


    Introspective_type_equality = require("components.Introspective_type_equality")
  ;

  it([

    "should - after extension took place and if still able to be required via »( composable. )require(\"environment\")« -",
    "always remain an \"object\" type distinct from [null]."

  ].join(" "), function () {

    expect(typeof environment).toBe("object");
    expect(environment).not.toBeNull();
    expect(environment).toEqual(environment_extended_introspective_equality);
  });


  describe([

    "It does extend the »environment« base module's [introspective] property ..."

  ].join(" "), function () {

    describe("»environment.introspective«", function () {
      var
        env_introspective   = environment.introspective,

        isEqualType         = env_introspective.isEqualType,

        hook_introspective  = {}
      ;
      Introspective_type_equality.call(hook_introspective);

      it([

        "... that still serves as entry point in order to access helper methods specialized in introspection/reflection.",
        "This module enriches »environment.introspective« by just one method - [isEqualType] - that checks for types that",
        "are equal in structure - even if they feature cyclic references - as well as for identical types and for same values."

      ].join(" "), function () {

        expect(typeof env_introspective).toBe("object");
        expect(env_introspective).not.toBeNull();

        expect(typeof Introspective_type_equality).toBe("function");
        expect(typeof hook_introspective).toBe("object");
        expect(hook_introspective).not.toBeNull();

        expect(isEqualType).toEqual(hook_introspective.isEqualType);
      });
    });
  });
});
