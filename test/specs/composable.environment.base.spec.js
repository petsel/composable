

describe("»environment« base module", function () {


  var
    GLOBAL_OBJECT = ((window && window.window === window) && window) || ((global && global.global === global) && global) || this,

    require = GLOBAL_OBJECT.composable.require,

    environment = require("environment")
  ;
  it([
    "should - if required via »( composable. )require(\"environment\")« -",
    "always be an \"object\" type distinct from [null]."
  ].join(" "), function () {
    expect(typeof environment).toBe("object");
    expect(environment).not.toBeNull();
  });
  it([
    "should be the prototypal clone (copy by write) of the base environment",
    "as it always is provided as 3rd parameter within every composable module."
  ].join(" "), function () {

    composable("internal-environment-base-access-test", function (require, global, internalEnvironmentBase) {
      return internalEnvironmentBase;
    });
    var internalEnvironmentBase = require("internal-environment-base-access-test");

    expect(environment).not.toBe(internalEnvironmentBase);
    expect(environment).toEqual(internalEnvironmentBase);

    expect(environment.global).toEqual(internalEnvironmentBase.global);

    expect(environment.objects).toEqual(internalEnvironmentBase.objects);
    expect(environment.methods).toEqual(internalEnvironmentBase.methods);
    expect(environment.helpers).toEqual(internalEnvironmentBase.helpers);
    expect(environment.introspective).toEqual(internalEnvironmentBase.introspective);

//  expect(environment.objects.regX).toEqual(internalEnvironmentBase.objects.regX);
//
//  expect(environment.methods.noop).toEqual(internalEnvironmentBase.methods.noop);
//
//  expect(environment.helpers.compareTypes).toEqual(internalEnvironmentBase.helpers.compareTypes);
//  expect(environment.helpers.createClassSignaturePattern).toEqual(internalEnvironmentBase.helpers.createClassSignaturePattern);
//  expect(environment.helpers.protectBehaviorFromInstantiation).toEqual(internalEnvironmentBase.helpers.protectBehaviorFromInstantiation);
//
//  expect(environment.introspective.isFunction).toEqual(internalEnvironmentBase.introspective.isFunction);
//  expect(environment.introspective.isCallable).toEqual(internalEnvironmentBase.introspective.isCallable);
//  expect(environment.introspective.isArray).toEqual(internalEnvironmentBase.introspective.isArray);
//  expect(environment.introspective.isArguments).toEqual(internalEnvironmentBase.introspective.isArguments);
//  expect(environment.introspective.isString).toEqual(internalEnvironmentBase.introspective.isString);
//  expect(environment.introspective.baseValueOf).toEqual(internalEnvironmentBase.introspective.baseValueOf);
//  expect(environment.introspective.getClassSignature).toEqual(internalEnvironmentBase.introspective.getClassSignature);

  //composable.remove("internal-environment-base-access-test"); // @TODO - nice to have - at least in order to remove modules that where added for testing only.
  });


  describe([

    "Being an entry point for various namespaced methods and objects it should - in its base configuration -",
    "always give access to a fundamental set of objects and methods - which are expected to be ..."

  ].join(" "), function () {


    describe("»environment.global«", function () {
      it("... the [global] object itself.", function () {
        expect(environment.global).toBe(GLOBAL_OBJECT);
      });
    });


    describe("»environment.objects«", function () {
      it([
        "... the entry point for accessing miscellaneous objects that need",
        "to be shared within the »composable« infrastructure/environment - e.g."
      ].join(" "), function () {
        expect(typeof environment.objects).toBe("object");
        expect(environment.objects).not.toBeNull();
      });
      describe("»environment.objects.regX«", function () {
        it([
          "the only one [[RegExp]] object ever needed since every »composable« module",
          "can access and compile it with string based RegExp-patterns each to its own needs."
        ].join(" "), function () {
          expect(environment.objects.regX instanceof GLOBAL_OBJECT.RegExp).toBe(true);
          expect(environment.objects.regX.compile("^\\s+$", "").test("  \t   \n ")).toBe(true);
        });
      });
    });


    describe("»environment.methods«", function () {
      it([
        "... the entry point for accessing miscellaneous methods that need",
        "to be shared within the »composable« infrastructure/environment."
      ].join(" "), function () {
        expect(typeof environment.methods).toBe("object");
        expect(environment.methods).not.toBeNull();
      });
      describe("»environment.methods.noop«", function () {
        it([
          "an empty method that now can be used by every",
          "»composable« module that has a need for it."
        ].join(" "), function () {
          expect(typeof environment.methods.noop).toBe("function");
          expect("" + environment.methods.noop).toBe("" + (function () {}));
        });
      });
    });


    describe("»environment.helpers«", function () {
      it([
        "... the entry point for accessing specialized helper methods",
        "that are useful being shared within the »composable« infrastructure/environment."
      ].join(" "), function () {
        expect(typeof environment.helpers).toBe("object");
        expect(environment.helpers).not.toBeNull();
      });
      describe("»environment.helpers.compareTypes«", function () {
        var
          compareTypes = environment.helpers.compareTypes,

          NaN = GLOBAL_OBJECT.Number.NaN,
          obj = {},
          arr = []
        ;
        it("is a fundamental method that compares two types to each other.", function () {
          expect(typeof compareTypes).toBe("function");
        });


        it([
          "should fall back to common comparison behavior if e.g two values of one and the same type",
          "get compared to each other."
        ].join(" "), function () {
          expect(compareTypes(2, 1)).toBe(1);
          expect(compareTypes(2, 2)).toBe(0);
          expect(compareTypes(1, 1)).toBe(0);
          expect(compareTypes(1, 2)).toBe(-1);
        });


        it([
          "should resolve conflicts of that kind of [false] being the result of any sub task of an entire comparison -",
          "happens e.g. by comparing two incomparable values like [NaN] or by comparing two different types to each other."
        ].join(" "), function () {
          expect(compareTypes("2", 1)).toBe(1);
          expect(compareTypes(2, "2")).toBeUndefined();
          expect(compareTypes("1", 1)).toBeUndefined();
          expect(compareTypes(1, "2")).toBe(-1);

          expect(compareTypes(NaN, NaN)).toBeUndefined();

          expect(compareTypes(obj, {})).toBeUndefined();
          expect(compareTypes(obj, obj)).toBe(0);
          expect(compareTypes(obj, arr)).toBe(1);
          expect(compareTypes(arr, obj)).toBe(-1);
          expect(compareTypes(arr, arr)).toBe(0);
          expect(compareTypes(arr, [])).toBeUndefined();
        });


        it([
          "should accept a 3rd parameter that acts as custom [valueOf] method",
          "for both the 1st and the 2nd parameter."
        ].join(" "), function () {
          expect(compareTypes.length).toBe(3);
        });
        var
          obj_01 = {x: "c", y: 1},
          obj_02 = {x: "b", y: 2},
          obj_03 = {x: "c", y: "1"},

          valueOfX = function (obj) {
            return obj.x;
          },
          valueOfY = function (obj) {
            return obj.y;
          }
        ;
        describe("Its 3rd parameter custom [valueOf] method", function () {
          it([
            "is supposed to return a value that can be compared to another one.",
            "Thus lowering the amount of [undefined] comparison return values."
          ].join(" "), function () {
            expect(compareTypes(obj_01, obj_02)).toBeUndefined();
            expect(compareTypes(obj_02, obj_03)).toBeUndefined();
            expect(compareTypes(obj_01, obj_03)).toBeUndefined();

            expect(compareTypes(obj_02, obj_03, valueOfX)).toBe(-1);
            expect(compareTypes(obj_02, obj_03, valueOfY)).toBe(1);
            expect(compareTypes(obj_01, obj_03, valueOfX)).toBe(0);
          //expect(compareTypes(obj_01, obj_03, valueOfX)).toBe(); // passing no argument is equal to using [toBeUndefined].
            expect(compareTypes(obj_01, obj_03, valueOfY)).toBeUndefined();
          });
        });
      });
      describe("»environment.helpers.createClassSignaturePattern«", function () {
        var
          createClassSignaturePattern = environment.helpers.createClassSignaturePattern,

          expose = GLOBAL_OBJECT.Object.prototype.toString,
          regX = environment.objects.regX,
          args = arguments
        ;
        it([
          "is a method that creates a string that should match the exposure",
          "of an objects internal [[CLASS]] implementation."
        ].join(" "), function () {
          expect(typeof createClassSignaturePattern).toBe("function");

          expect(createClassSignaturePattern("Array")).toBe("^\\[object\\s+Array\\]$");
          expect(createClassSignaturePattern("RegExp")).toBe("^\\[object\\s+RegExp\\]$");
          expect(createClassSignaturePattern("Element")).toBe("^\\[object\\s+Element\\]$");

          expect(regX.compile(createClassSignaturePattern("Arguments")).test(expose.call(args))).toBe(true);
          expect(regX.compile(createClassSignaturePattern("Boolean")).test(expose.call(false))).toBe(true);
          expect(regX.compile(createClassSignaturePattern("Number")).test(expose.call(123))).toBe(true);
          expect(regX.compile(createClassSignaturePattern("String")).test(expose.call(""))).toBe(true);

          expect(regX.compile(createClassSignaturePattern("Node")).test(expose.call(""))).toBe(false);
        });
      });
      describe("»environment.helpers.protectBehaviorFromInstantiation«", function () {
        var
          protectBehaviorFromInstantiation = environment.helpers.protectBehaviorFromInstantiation,

          Trait = function () {
            protectBehaviorFromInstantiation(arguments.callee, this);
            this.test = "test";
          },
          obj = {}
        ;
        it([
          "is a method that - if it gets used from within functional Trait or Mixin implementations - will throw",
          "a type error in case such a behavior container has been invoked by the »new« operator."
        ].join(" "), function () {
          expect(typeof protectBehaviorFromInstantiation).toBe("function");

          expect(function () {
            Trait.call(obj);
            return obj;
          }).not.toThrow();

          expect(function () {
            return (new Trait);
          }).toThrow();
        });
      });
    });


    describe("»environment.introspective«", function () {

      it([
        "... the entry point for accessing helper methods specialized in introspection/reflection",
        "that are useful being shared within the »composable« infrastructure/environment."
      ].join(" "), function () {
        expect(typeof environment.introspective).toBe("object");
        expect(environment.introspective).not.toBeNull();
      });


      var
        isFunction = environment.introspective.isFunction,
        isCallable = environment.introspective.isCallable,

        Function = GLOBAL_OBJECT.Function,
        Object = GLOBAL_OBJECT.Object,
        Array = GLOBAL_OBJECT.Array,
        Math = GLOBAL_OBJECT.Math,

        Node = GLOBAL_OBJECT.Node,
        Element = GLOBAL_OBJECT.Element,
        HTMLElement = GLOBAL_OBJECT.HTMLElement
      ;
      describe("»environment.introspective.isFunction«", function () {

        it("is a fundamental type detection method ...", function () {
          expect(typeof isFunction).toBe("function");
        });
        it([
          "... that should return true only for every real [[Function]] type. That is, it has to be",
          "a \"function\" type and also needs to feature its both call methods [call] and [apply]."
        ].join(" "), function () {
          expect(isFunction(isFunction)).toBe(true);

          expect(isFunction(Function)).toBe(true);
          expect(isFunction(Object)).toBe(true);
          expect(isFunction(Array)).toBe(true);

          expect(isFunction(Math)).toBe(false);
          expect(isFunction(GLOBAL_OBJECT)).toBe(false);

          if (Node && (typeof Node == "function") && (typeof Node.call == "function") && (typeof Node.apply == "function")) {

            expect(isFunction(Node)).toBe(true);
          } else {
            expect(isFunction(Node)).toBe(false);
          }
          if (Element && (typeof Element == "function") && (typeof Element.call == "function") && (typeof Element.apply == "function")) {

            expect(isFunction(Element)).toBe(true);
          } else {
            expect(isFunction(Element)).toBe(false);
          }
          if (HTMLElement && (typeof HTMLElement == "function") && (typeof HTMLElement.call == "function") && (typeof HTMLElement.apply == "function")) {

            expect(isFunction(HTMLElement)).toBe(true);
          } else {
            expect(isFunction(HTMLElement)).toBe(false);
          }
        });
      });
      describe("»environment.introspective.isCallable«", function () {

        it("is a fundamental type detection method ...", function () {
          expect(typeof isCallable).toBe("function");
        });
        it([
          "... that should return true only for every callable type. That is, it only needs to be invokable",
          "via the call operator - »()«. There will be no test at all for if it is a \"function\" type."
        ].join(" "), function () {
          expect(isCallable(isCallable)).toBe(true);

          expect(isCallable(Function)).toBe(true);
          expect(isCallable(Object)).toBe(true);
          expect(isCallable(Array)).toBe(true);

          expect(isCallable(Math)).toBe(false);
          expect(isCallable(GLOBAL_OBJECT)).toBe(false);

          if (Node) {
            expect(isCallable(Node)).toBe(false);
          }
          if (Element) {
            expect(isCallable(Element)).toBe(false);
          }
          if (HTMLElement) {
            expect(isCallable(HTMLElement)).toBe(false);
          }
        });
      });


      var
        arr = [],
        str = "hallo world",
        obj = {},
        coll = {"length": 2, "0": "hallo", "1": "world"},
        args = arguments,

        document = GLOBAL_OBJECT.document,

        nodeList = document && document.getElementsByTagName(""),
        htmlCollection = document && document.forms
      ;
      describe("»environment.introspective.isArray«", function () {
        var
          isArray = environment.introspective.isArray
        ;
        it("is a fundamental type detection method ...", function () {
          expect(typeof isArray).toBe("function");
        });
        it("... that should return true only for every real [[Array]] type.", function () {
          expect(isArray(arr)).toBe(true);

          expect(isArray(str)).toBe(false);
          expect(isArray(obj)).toBe(false);
          expect(isArray(coll)).toBe(false);
          expect(isArray(args)).toBe(false);

          if (nodeList) {
            expect(isArray(nodeList)).toBe(false);
          }
          if (htmlCollection) {
            expect(isArray(htmlCollection)).toBe(false);
          }
        });
      });
      describe("»environment.introspective.isArguments«", function () {
        var
          isArguments = environment.introspective.isArguments
        ;
        it("is a fundamental type detection method ...", function () {
          expect(typeof isArguments).toBe("function");
        });
        it("... that should return true only for every real [[Arguments]] type.", function () {
          expect(isArguments(args)).toBe(true);

          expect(isArguments(str)).toBe(false);
          expect(isArguments(obj)).toBe(false);
          expect(isArguments(coll)).toBe(false);
          expect(isArguments(arr)).toBe(false);

          if (nodeList) {
            expect(isArguments(nodeList)).toBe(false);
          }
          if (htmlCollection) {
            expect(isArguments(htmlCollection)).toBe(false);
          }
        });
      });


      describe("»environment.introspective.isString«", function () {
        var
          isString = environment.introspective.isString
        ;
        it("is a type detection method ...", function () {
          expect(typeof isString).toBe("function");
        });
        it("... that should return true only for every [[String]] type.", function () {
          expect(isString(new GLOBAL_OBJECT.String(""))).toBe(true);
          expect(isString("")).toBe(true);
          expect(isString(0)).toBe(false);
          expect(isString()).toBe(false);
        });
      });


      describe("»environment.introspective.baseValueOf«", function () {
        var
          baseValueOf = environment.introspective.baseValueOf,

          Number = GLOBAL_OBJECT.Number,
          String = GLOBAL_OBJECT.String,

          isNaN = GLOBAL_OBJECT.isNaN
        ;
        it("is a mostly internally used parse method ...", function () {
          expect(typeof baseValueOf).toBe("function");
        });
        it([
          "... that tries to retrieve the base value of any given type -",
          "even excepting [undefined] or [null] as its parameter."
        ].join(" "), function () {
          expect(baseValueOf()).toBeUndefined();
          expect(baseValueOf(null)).toBeNull();

          expect(baseValueOf(new Number)).toBe(0);
          expect(baseValueOf(0)).toBe(0);
          expect(baseValueOf("0")).toBe("0");
          expect(baseValueOf("")).toBe("");
          expect(baseValueOf(new String)).toBe("");

          expect(isNaN(baseValueOf(Number.NaN))).toBe(true);

          expect(baseValueOf({x: "x"}).x).toBe("x");
          expect(baseValueOf({x: "x", valueOf: function () {return this.x;}})).toBe("x");
          expect(baseValueOf({x: "x", valueOf: function () {return this.y;}})).toBeUndefined();
        });
      });


      describe("»environment.introspective.getClassSignature«", function () {
        var
          getClassSignature = environment.introspective.getClassSignature,
          createClassSignaturePattern = environment.helpers.createClassSignaturePattern,

          regX = environment.objects.regX,

          coll = {"length": 2, "0": "hallo", "1": "world"},
          obj = {},
          arr = [],
          args = arguments,
          str = "hallo world"
        ;
        it("is a mostly internally used parse method ...", function () {
          expect(typeof getClassSignature).toBe("function");
        });
        it([
          "... that retrieves a \"string\" type signature of the internally implemented [[CLASS]]",
          "a given instance (or type) was constructed from."
        ].join(" "), function () {
          expect(regX.compile(createClassSignaturePattern("Object")).test(getClassSignature(coll))).toBe(true);
          expect(regX/*.compile(createClassSignaturePattern("Object"))*/.test(getClassSignature(obj))).toBe(true);

          expect(regX.compile(createClassSignaturePattern("Array")).test(getClassSignature(arr))).toBe(true);
          expect(regX.compile(createClassSignaturePattern("Arguments")).test(getClassSignature(args))).toBe(true);

          expect(regX.compile(createClassSignaturePattern("String")).test(getClassSignature(str))).toBe(true);
        });
      });
    });


  });
});
