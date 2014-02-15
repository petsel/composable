

describe("»environment_extended_introspective_emptiness« module", function () {


  var
    GLOBAL_OBJECT = ((window && window.window === window) && window) || ((global && global.global === global) && global) || this,

    require = GLOBAL_OBJECT.composable.require,

    environment = require("environment"),
    environment_extended_introspective_emptiness = require("environment_extended_introspective_emptiness"),


    Introspective_type_emptiness = require("components.Introspective_type_emptiness")
  ;

  it([

    "should - after extension took place and if still able to be required via »( composable. )require(\"environment\")« -",
    "always remain an \"object\" type distinct from [null]."

  ].join(" "), function () {

    expect(typeof environment).toBe("object");
    expect(environment).not.toBeNull();
    expect(environment).toEqual(environment_extended_introspective_emptiness);
  });


  describe([

    "It does extend the »environment« base module's [introspective] property ..."

  ].join(" "), function () {

    describe("»environment.introspective«", function () {
      var
        env_introspective       = environment.introspective,

        isEmptyValue            = env_introspective.isEmptyValue,
        isEmptyType             = env_introspective.isEmptyType,
        isSparseList            = env_introspective.isSparseList,
        isUninhabitedStructure  = env_introspective.isUninhabitedStructure,

        hook_introspective = {}
      ;
      Introspective_type_emptiness.call(hook_introspective);

      it([

        "... that still serves as entry point in order to access helper methods specialized in introspection/reflection.",
        "This module enriches »environment.introspective« by methods that check for empty values, empty types and empty",
        "structures - those are ... [isEmptyValue], [isEmptyType], [isSparseList], [isUninhabitedStructure]."

      ].join(" "), function () {

        expect(typeof env_introspective).toBe("object");
        expect(env_introspective).not.toBeNull();

        expect(typeof Introspective_type_emptiness).toBe("function");
        expect(typeof hook_introspective).toBe("object");
        expect(hook_introspective).not.toBeNull();

        expect(isEmptyValue).toEqual(hook_introspective.isEmptyValue);
        expect(isEmptyType).toEqual(hook_introspective.isEmptyType);
        expect(isSparseList).toEqual(hook_introspective.isSparseList);
        expect(isUninhabitedStructure).toEqual(hook_introspective.isUninhabitedStructure);
      });
    });
  });
});
