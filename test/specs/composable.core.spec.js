

describe("»composable« core", function () {


  var GLOBAL_OBJECT = ((window && window.window === window) && window) || ((global && global.global === global) && global) || this;


  it("should be defined globally.", function () {
    expect(GLOBAL_OBJECT.composable).toBeDefined();
    expect(composable).toBeDefined();
  });
  it("should be a function type.", function () {
    expect(typeof composable).toBe("function");
  });
  it("should accept two parameters.", function () {
    expect(composable.length).toBe(2);
  });

  it("should - if invoked without valid parameters e.g. »composable()« - always return [undefined].", function () {
    expect(composable()).toBeUndefined();
    expect(composable(null)).toBeUndefined();
    expect(composable(null, null)).toBeUndefined();
    expect(composable("", "")).toBeUndefined();
    expect(composable("foo", "")).toBeUndefined();
    expect(composable("foo", "bar")).toBeUndefined();
  });

  it([

    "should - if invoked with a valid parameter set e.g.",
    "»composable(\"\", function (require, global, environment) { /* ... */ })«",
    "- always execute the module factory whilst providing access to",
    "the internal [require] function, the [global] object and the internal [environment] object."

  ].join(" "), function () {
    var module = composable("", function (require, global, environment) {

      expect(typeof require).toBe("function");
      expect(require).toBe(composable.require);

      expect(global).toBe(GLOBAL_OBJECT);

      expect(environment && (typeof environment)).toBe("object");
      expect(environment.global).toBe(GLOBAL_OBJECT);

      expect(environment.objects && (typeof environment.objects)).toBe("object");
      expect(environment.objects.regX instanceof global.RegExp).toBe(true);

      expect(environment.methods && (typeof environment.methods)).toBe("object");
      expect(typeof environment.methods.noop).toBe("function");
      expect("" + environment.methods.noop).toBe("" + (function () {}));

      expect(environment.helpers && (typeof environment.helpers)).toBe("object");
      expect(typeof environment.helpers.compareTypes).toBe("function");
      expect(typeof environment.helpers.createClassSignaturePattern).toBe("function");
      expect(typeof environment.helpers.protectBehaviorFromInstantiation).toBe("function");

      expect(environment.introspective && (typeof environment.introspective)).toBe("object");
      expect(typeof environment.introspective.isFunction).toBe("function");
      expect(typeof environment.introspective.isString).toBe("function");
      expect(typeof environment.introspective.baseValueOf).toBe("function");
      expect(typeof environment.introspective.getClassSignature).toBe("function");
    });
    expect(module).toBeUndefined();
  });

  it([

    "should - if invoked with an anonymous but valid module factory e.g.",
    "»composable(\"\", function (require, global, environment) { return {environment_test_01_key: \"environment_test_01_value\"}; })«",
    "- always execute this module factory but return [undefined] instead of the module factories return value."

  ].join(" "), function () {
    var
      hasBeenExecuted = false,

      module = composable("", function (/*require, global, environment*/) {
        hasBeenExecuted = true;
        return {
          environment_test_01_key: "environment_test_01_value"
        };
      })
    ;
    expect(hasBeenExecuted).toBe(true);
    expect(module).toBeUndefined();
  });

  it([

    "should - if invoked with both a valid module name and a valid module factory e.g.",
    "»composable(\"environment_test_01\", function (require, global, environment) { return {environment_test_01_key: \"environment_test_01_value\"}; })«",
    "- always execute this module factory and return its return value."

  ].join(" "), function () {
    var
      hasBeenExecuted = false,

      module = composable("environment_test_01", function (/*require, global, environment*/) {
        hasBeenExecuted = true;
        return {
          environment_test_01_key: "environment_test_01_value"
        };
      })
    ;
    expect(hasBeenExecuted).toBe(true);

    expect(module).not.toBeUndefined();
    expect(module.environment_test_01_key).toBe("environment_test_01_value");

    expect(composable.require("environment_test_01")).not.toBeUndefined();
    expect(composable.require("environment_test_01").environment_test_01_key).toBe("environment_test_01_value");
  });


  describe("[composable.all]", function () {


    var REG_X_MODULE_NAME = (/^(?:components|composites|entities|modification\.[^.\s]+)|(?:environment(_[a-z]+)*\1*)$/);


    it("should be a property of [composable].", function () {
      expect(composable.all).toBeDefined();
    });
    it("should be a function type.", function () {
      expect(typeof composable.all).toBe("function");
    });
    it("should accept no parameter.", function () {
      expect(composable.all.length).toBe(0);
    });


    describe("[composable.all.size]", function () {

      it("should be a property of [composable.all].", function () {
        expect(composable.all.size).toBeDefined();
      });
      it("should be a function type.", function () {
        expect(typeof composable.all.size).toBe("function");
      });
      it("should accept no parameter.", function () {
        expect(composable.all.size.length).toBe(0);
      });

      var
        isFinite = GLOBAL_OBJECT.isFinite,

        size = composable.all.size()
      ;
      it("should - if invoked - return a number value.", function () {
        expect(typeof size).toBe("number");
      });
      it("should - if invoked - return a finite number value that is grater than or equals zero.", function () {
        expect(isFinite(size)).toBe(true);
        expect(size >= 0).toBe(true);
      });
    });


    describe("[composable.all.item]", function () {

      it("should be a property of [composable.all].", function () {
        expect(composable.all.item).toBeDefined();
      });
      it("should be a function type.", function () {
        expect(typeof composable.all.item).toBe("function");
      });
      it("should accept one parameter.", function () {
        expect(composable.all.item.length).toBe(1);
      });

      var moduleName = composable.all.item("2");

      it("should - if invoked with a valid value - return a \"string\" type \"module\" name.", function () {
        expect(typeof moduleName).toBe("string");
      });
      it("should - if invoked with a valid value - return a module name that matches a certain pattern - " + REG_X_MODULE_NAME + ".", function () {
        expect(moduleName).toMatch(REG_X_MODULE_NAME);
      });
      it("should - if invoked with [0] as parameter - always return \"components.Introspective_isFunction_isCallable\".", function () {
        expect(composable.all.item(0)).toBe("components.Introspective_isFunction_isCallable");
      });
      it("should - if invoked with [1] as parameter - always return \"components.Introspective_isArray_isArguments\".", function () {
        expect(composable.all.item(1)).toBe("components.Introspective_isArray_isArguments");
      });
    });


    describe("[composable.all.first]", function () {

      it("should be a property of [composable.all]", function () {
        expect(composable.all.first).toBeDefined();
      });
      it("should be a function type.", function () {
        expect(typeof composable.all.first).toBe("function");
      });
      it("should accept no parameter.", function () {
        expect(composable.all.first.length).toBe(0);
      });

      var moduleName = composable.all.first();

      it("should - if invoked - return a \"string\" type \"module\" name.", function () {
        expect(typeof moduleName).toBe("string");
      });
      it("should - if invoked - return a module name that matches a certain pattern - " + REG_X_MODULE_NAME + ".", function () {
        expect(moduleName).toMatch(REG_X_MODULE_NAME);
      });
      it("should - if invoked - always return the same result as »composable.all.item(0)« does.", function () {
        expect(composable.all.first()).toBe(composable.all.item(0));
      });
    });


    describe("[composable.all.last]", function () {

      it("should be a property of [composable.all].", function () {
        expect(composable.all.last).toBeDefined();
      });
      it("should be a function type.", function () {
        expect(typeof composable.all.last).toBe("function");
      });
      it("should accept no parameter.", function () {
        expect(composable.all.last.length).toBe(0);
      });

      var moduleName = composable.all.last();

      it("should - if invoked - return a \"string\" type \"module\" name.", function () {
        expect(typeof moduleName).toBe("string");
      });
      it("should - if invoked - return a module name that matches a certain pattern - " + REG_X_MODULE_NAME + ".", function () {
        expect(moduleName).toMatch(REG_X_MODULE_NAME);
      });
      it("should - if invoked - always return the same result as »composable.all.item(composable.all.size() - 1)« does.", function () {
        expect(composable.all.last()).toBe(composable.all.item(composable.all.size() - 1));
      });
    });
  });


  describe("[composable.require]", function () {

    it("should be a property of [composable].", function () {
      expect(composable.require).toBeDefined();
    });
    it("should be a function type.", function () {
      expect(typeof composable.require).toBe("function");
    });
    it("should accept one parameter.", function () {
      expect(composable.require.length).toBe(1);
    });

    var
      require = composable.require,

      environment = require("environment"),
      Introspective = require("components.Introspective_isArray_isArguments")
    ;
    it("should - if invoked without a valid module name e.g. »composable.require()« - always return [undefined].", function () {
      expect(require()).toBeUndefined();
      expect(require(null)).toBeUndefined();
      expect(require("foo")).toBeUndefined();
      expect(require(123)).toBeUndefined();
    });

    it([

      "should - if invoked with a valid module name e.g.",
      "»composable.require(\"components.Introspective_isArray_isArguments\")«",
      "- always return a module object either of type \"object\" or of type \"function\"."

    ].join(" "), function () {
      expect(environment && (typeof environment)).toBe("object");
      expect(typeof Introspective).toBe("function");
    });
  });
});
