

describe("»environment_extended_introspective_core« module", function () {


  var
    GLOBAL_OBJECT = ((window && window.window === window) && window) || ((global && global.global === global) && global) || this,

    require = GLOBAL_OBJECT.composable.require,

    environment = require("environment"),
    environment_extended_introspective_core = require("environment_extended_introspective_core")
  ;


  it([
    "should - after extension took place and if still able to be required via »( composable. )require(\"environment\")« -",
    "always remain an \"object\" type distinct from [null]."
  ].join(" "), function () {
    expect(typeof environment).toBe("object");
    expect(environment).not.toBeNull();
    expect(environment).toEqual(environment_extended_introspective_core);
  });


  describe([

    "It does extend the »environment« base module's [introspective] property ..."

  ].join(" "), function () {


    describe("»environment.introspective«", function () {

      it([
        "... that still serves as entry point in order to access helper methods specialized in introspection/reflection.",
        "This module enriches »environment.introspective« by a broad range of additional type detection methods."
      ].join(" "), function () {
        expect(typeof environment.introspective).toBe("object");
        expect(environment.introspective).not.toBeNull();
      });

      var
        env_introspective           = environment.introspective,


        isUndefined                 = env_introspective.isUndefined,
        isDefined                   = env_introspective.isDefined,
        isNull                      = env_introspective.isNull,
        isNotNull                   = env_introspective.isNotNull,

        isUndefinedOrNull           = env_introspective.isUndefinedOrNull,
        isNeitherUndefinedNorNull   = env_introspective.isNeitherUndefinedNorNull,


        isPrimitive = env_introspective.isPrimitive,
        isValue     = env_introspective.isValue,
        isObject    = env_introspective.isObject,

        isNative    = env_introspective.isNative,
        isAlien     = env_introspective.isAlien,


        isBoolean       = env_introspective.isBoolean,
        isBooleanValue  = env_introspective.isBooleanValue,
        isBooleanObject = env_introspective.isBooleanObject,

        isNumber        = env_introspective.isNumber,
        isNumberValue   = env_introspective.isNumberValue,
        isNumberObject  = env_introspective.isNumberObject,

        isString        = env_introspective.isString,
        isStringValue   = env_introspective.isStringValue,
        isStringObject  = env_introspective.isStringObject,


        isArray     = env_introspective.isArray,
        isArguments = env_introspective.isArguments,
        isListLike  = env_introspective.isListLike,


        isObjectObject = env_introspective.isObjectObject,


        isFunction = env_introspective.isFunction,
        isCallable = env_introspective.isCallable,


        isRegExp = env_introspective.isRegExp,


        isDate = env_introspective.isDate,


        isError           = env_introspective.isError,

        isGenericError    = env_introspective.isGenericError,
        isEvalError       = env_introspective.isEvalError,
        isRangeError      = env_introspective.isRangeError,
        isReferenceError  = env_introspective.isReferenceError,
        isSyntaxError     = env_introspective.isSyntaxError,
        isTypeError       = env_introspective.isTypeError,
        isURIError        = env_introspective.isURIError,

        baseValueOf       = env_introspective.baseValueOf,
        getClassSignature = env_introspective.getClassSignature
      ;


      var
        UNDEFINED_VALUE,

        NULL_VALUE = null,
        FALSE_VALUE = false,
        TRUE_VALUE = true,
        EMPTY_STRING_VALUE = "",
        ZERO_NUMBER_VALUE = 0,
        NAN_VALUE = GLOBAL_OBJECT.Number.NaN,

        TEST_OBJECT = {y:"y"},

        Infinity = GLOBAL_OBJECT.Infinity,
        isFinite = GLOBAL_OBJECT.isFinite,

        Function = GLOBAL_OBJECT.Function,
        Object = GLOBAL_OBJECT.Object,
        Array = GLOBAL_OBJECT.Array,
        Math = GLOBAL_OBJECT.Math,

        Boolean = GLOBAL_OBJECT.Boolean,
        Number = GLOBAL_OBJECT.Number,
        String = GLOBAL_OBJECT.String,

        RegExp = GLOBAL_OBJECT.RegExp,
        Date = GLOBAL_OBJECT.Date,
        Error = GLOBAL_OBJECT.Error,

        Node = GLOBAL_OBJECT.Node,
        Element = GLOBAL_OBJECT.Element,
        HTMLElement = GLOBAL_OBJECT.HTMLElement
      ;


      describe("»Detect [[Undefined]] and [[Null]] types and distinguish them.«", function () {

        describe("»environment.introspective.isUndefined«", function () {

          it("is a fundamental type detection method ...", function () {
            expect(typeof isUndefined).toBe("function");
          });
          it([
            "... that should return true only for undefined values."
          ].join(" "), function () {
            expect(isUndefined(UNDEFINED_VALUE)).toBe(true);
            expect(isUndefined()).toBe(true);
            expect(isUndefined(void true)).toBe(true);
            expect(isUndefined(TEST_OBJECT.x)).toBe(true);

            expect(isUndefined(TEST_OBJECT.y)).toBe(false);
            expect(isUndefined(NULL_VALUE)).toBe(false);
            expect(isUndefined(FALSE_VALUE)).toBe(false);
            expect(isUndefined(EMPTY_STRING_VALUE)).toBe(false);
            expect(isUndefined(ZERO_NUMBER_VALUE)).toBe(false);
            expect(isUndefined(NAN_VALUE)).toBe(false);

            expect(function () {return (NULL_VALUE === UNDEFINED_VALUE);}()).toBe(false);   // in order to countercheck
                                                                                            // and prove falseness and
            expect(function () {return (NULL_VALUE == UNDEFINED_VALUE);}()).toBe(true);     // truthiness if comparing
            expect(function () {return (TEST_OBJECT.x == UNDEFINED_VALUE);}()).toBe(true);  // null with undefined and
            expect(function () {return (TEST_OBJECT.x === UNDEFINED_VALUE);}()).toBe(true); // undefined with itself.
          });
        });
        describe("»environment.introspective.isDefined«", function () {

          it("is a fundamental type detection method ...", function () {
            expect(typeof isDefined).toBe("function");
          });
          it([
            "... that should return true for every value that does not equal the [undefined] value."
          ].join(" "), function () {
            expect(isDefined(UNDEFINED_VALUE)).toBe(false);
            expect(isDefined()).toBe(false);
            expect(isDefined(void true)).toBe(false);
            expect(isDefined(TEST_OBJECT.x)).toBe(false);

            expect(isDefined(TEST_OBJECT.y)).toBe(true);
            expect(isDefined(NULL_VALUE)).toBe(true);
            expect(isDefined(FALSE_VALUE)).toBe(true);
            expect(isDefined(EMPTY_STRING_VALUE)).toBe(true);
            expect(isDefined(ZERO_NUMBER_VALUE)).toBe(true);
            expect(isDefined(NAN_VALUE)).toBe(true);
          });
        });

        describe("»environment.introspective.isNull«", function () {

          it("is a fundamental type detection method ...", function () {
            expect(typeof isNull).toBe("function");
          });
          it([
            "... that should return true only for values that do equal the [null] value."
          ].join(" "), function () {
            expect(isNull(NULL_VALUE)).toBe(true);

            expect(isNull(UNDEFINED_VALUE)).toBe(false);
            expect(isNull()).toBe(false);
            expect(isNull(void true)).toBe(false);
            expect(isNull(TEST_OBJECT.x)).toBe(false);

            expect(isNull(TEST_OBJECT.y)).toBe(false);
            expect(isNull(FALSE_VALUE)).toBe(false);
            expect(isNull(EMPTY_STRING_VALUE)).toBe(false);
            expect(isNull(ZERO_NUMBER_VALUE)).toBe(false);
            expect(isNull(NAN_VALUE)).toBe(false);

            expect(function () {return (NULL_VALUE === UNDEFINED_VALUE);}()).toBe(false); // in order to countercheck and
            expect(function () {return (NULL_VALUE == UNDEFINED_VALUE);}()).toBe(true);   // prove falseness and truthiness
                                                                                          // if comparing null with undefined.
          });
        });
        describe("»environment.introspective.isNotNull«", function () {

          it("is a fundamental type detection method ...", function () {
            expect(typeof isNotNull).toBe("function");
          });
          it([
            "... that should return true only for values that do not equal the [null] value."
          ].join(" "), function () {
            expect(isNotNull(NULL_VALUE)).toBe(false);

            expect(isNotNull(UNDEFINED_VALUE)).toBe(true);
            expect(isNotNull()).toBe(true);
            expect(isNotNull(void true)).toBe(true);
            expect(isNotNull(TEST_OBJECT.x)).toBe(true);

            expect(isNotNull(TEST_OBJECT.y)).toBe(true);
            expect(isNotNull(FALSE_VALUE)).toBe(true);
            expect(isNotNull(EMPTY_STRING_VALUE)).toBe(true);
            expect(isNotNull(ZERO_NUMBER_VALUE)).toBe(true);
            expect(isNotNull(NAN_VALUE)).toBe(true);
          });
        });

        describe("»environment.introspective.isUndefinedOrNull«", function () {

          it("is a fundamental type detection method ...", function () {
            expect(typeof isUndefinedOrNull).toBe("function");
          });
          it([
            "... that should return true only for values that do equal either the [undefined] value or the [null] value."
          ].join(" "), function () {
            expect(isUndefinedOrNull(NULL_VALUE)).toBe(true);

            expect(isUndefinedOrNull(UNDEFINED_VALUE)).toBe(true);
            expect(isUndefinedOrNull()).toBe(true);
            expect(isUndefinedOrNull(void true)).toBe(true);
            expect(isUndefinedOrNull(TEST_OBJECT.x)).toBe(true);

            expect(isUndefinedOrNull(TEST_OBJECT.y)).toBe(false);
            expect(isUndefinedOrNull(FALSE_VALUE)).toBe(false);
            expect(isUndefinedOrNull(EMPTY_STRING_VALUE)).toBe(false);
            expect(isUndefinedOrNull(ZERO_NUMBER_VALUE)).toBe(false);
            expect(isUndefinedOrNull(NAN_VALUE)).toBe(false);

  //        expect(function () {return (NULL_VALUE === UNDEFINED_VALUE);}()).toBe(false);   // in order to countercheck
  //                                                                                        // and prove falseness and
  //        expect(function () {return (NULL_VALUE == UNDEFINED_VALUE);}()).toBe(true);     // truthiness if comparing
  //        expect(function () {return (TEST_OBJECT.x == UNDEFINED_VALUE);}()).toBe(true);  // null with undefined and
  //        expect(function () {return (TEST_OBJECT.x === UNDEFINED_VALUE);}()).toBe(true); // undefined with itself.
          });
        });
        describe("»environment.introspective.isNeitherUndefinedNorNull«", function () {

          it("is a fundamental type detection method ...", function () {
            expect(typeof isNeitherUndefinedNorNull).toBe("function");
          });
          it([
            "... that should return true only for values that do neither equal [undefined] nor [null]."
          ].join(" "), function () {
            expect(isNeitherUndefinedNorNull(NULL_VALUE)).toBe(false);

            expect(isNeitherUndefinedNorNull(UNDEFINED_VALUE)).toBe(false);
            expect(isNeitherUndefinedNorNull()).toBe(false);
            expect(isNeitherUndefinedNorNull(void true)).toBe(false);
            expect(isNeitherUndefinedNorNull(TEST_OBJECT.x)).toBe(false);

            expect(isNeitherUndefinedNorNull(TEST_OBJECT.y)).toBe(true);
            expect(isNeitherUndefinedNorNull(FALSE_VALUE)).toBe(true);
            expect(isNeitherUndefinedNorNull(EMPTY_STRING_VALUE)).toBe(true);
            expect(isNeitherUndefinedNorNull(ZERO_NUMBER_VALUE)).toBe(true);
            expect(isNeitherUndefinedNorNull(NAN_VALUE)).toBe(true);
          });
        });
      }); // »Detect [[Undefined]] and [[Null]] types and distinguish them.«


      describe("»Detect ECMAScript primitives, values, objects and distinguish native implementations from non native ones.«", function () {

        describe("»environment.introspective.isPrimitive«", function () {

          it("is a fundamental type detection method ...", function () {
            expect(typeof isPrimitive).toBe("function");
          });
          it([
            "... that should return true only for a value that's type does match one of the three ECMAScript primitives",
            "[boolean], [number] or [string]."
          ].join(" "), function () {
            expect(isPrimitive(UNDEFINED_VALUE)).toBe(false);
            expect(isPrimitive(NULL_VALUE)).toBe(false);


            expect(isPrimitive(FALSE_VALUE)).toBe(true);
            expect(isPrimitive(EMPTY_STRING_VALUE)).toBe(true);
            expect(isPrimitive(ZERO_NUMBER_VALUE)).toBe(true);

            expect(isPrimitive(NAN_VALUE)).toBe(true);


            expect(isPrimitive(TEST_OBJECT)).toBe(false);
            expect(isPrimitive(new Boolean)).toBe(false);
            expect(isPrimitive(new Number)).toBe(false);
            expect(isPrimitive(new String)).toBe(false);

            expect(isPrimitive(Object(FALSE_VALUE))).toBe(false);
            expect(isPrimitive(Object(EMPTY_STRING_VALUE))).toBe(false);
            expect(isPrimitive(Object(ZERO_NUMBER_VALUE))).toBe(false);
          });
        });
        describe("»environment.introspective.isValue«", function () {

          it("is a fundamental type detection method ...", function () {
            expect(typeof isValue).toBe("function");
          });
          it([
            "... that should return true only for a value that's type does match one of the three ECMAScript primitives",
            "[boolean], [number] or [string] or for values that do equal either the [undefined] value or the [null] value."
          ].join(" "), function () {
            expect(isValue(NULL_VALUE)).toBe(true);

            expect(isValue(UNDEFINED_VALUE)).toBe(true);
            expect(isValue()).toBe(true);
            expect(isValue(void true)).toBe(true);
            expect(isValue(TEST_OBJECT.x)).toBe(true);


            expect(isValue(FALSE_VALUE)).toBe(true);
            expect(isValue(EMPTY_STRING_VALUE)).toBe(true);
            expect(isValue(ZERO_NUMBER_VALUE)).toBe(true);

            expect(isValue(NAN_VALUE)).toBe(true);
            expect(isValue(Infinity)).toBe(true);


            expect(isValue(TEST_OBJECT)).toBe(false);
            expect(isValue(new Boolean)).toBe(false);
            expect(isValue(new Number)).toBe(false);
            expect(isValue(new String)).toBe(false);

            expect(isValue(Object(FALSE_VALUE))).toBe(false);
            expect(isValue(Object(EMPTY_STRING_VALUE))).toBe(false);
            expect(isValue(Object(ZERO_NUMBER_VALUE))).toBe(false);
          });
        });

        describe("»environment.introspective.isObject«", function () {

          it("is a fundamental type detection method ...", function () {
            expect(typeof isObject).toBe("function");
          });
          it([
            "... that should return true for every value distinct from [null]",
            "that either is of type \"object\" or of type \"function\"."
          ].join(" "), function () {
            expect(isObject(NULL_VALUE)).toBe(false);

            expect(isObject(UNDEFINED_VALUE)).toBe(false);
            expect(isObject()).toBe(false);
            expect(isObject(void true)).toBe(false);
            expect(isObject(TEST_OBJECT.x)).toBe(false);

            expect(isObject(FALSE_VALUE)).toBe(false);
            expect(isObject(EMPTY_STRING_VALUE)).toBe(false);
            expect(isObject(ZERO_NUMBER_VALUE)).toBe(false);

            expect(isObject(NAN_VALUE)).toBe(false);
            expect(isObject(Infinity)).toBe(false);


            expect(isObject(TEST_OBJECT)).toBe(true);
            expect(isObject(GLOBAL_OBJECT)).toBe(true);

            expect(isObject(new Boolean)).toBe(true);
            expect(isObject(new Number)).toBe(true);
            expect(isObject(new String)).toBe(true);

            expect(isObject(Object(FALSE_VALUE))).toBe(true);
            expect(isObject(Object(EMPTY_STRING_VALUE))).toBe(true);
            expect(isObject(Object(ZERO_NUMBER_VALUE))).toBe(true);

            expect(isObject(isFinite)).toBe(true);
            expect(isObject(Function)).toBe(true);
            expect(isObject(Object)).toBe(true);
            expect(isObject(Array)).toBe(true);
            expect(isObject(Math)).toBe(true);

            if (Node) {expect(isObject(Node)).toBe(true);}
            if (Element) {expect(isObject(Element)).toBe(true);}
            if (HTMLElement) {expect(isObject(HTMLElement)).toBe(true);}
          });
        });

        describe("»environment.introspective.isNative«", function () {

  //     4.3.6 Native Object
  //     A native object is any object supplied by an ECMAScript implementation independent of the host environment.
  //     Standard native objects are defined in this specification. Some native objects are built-in; others may be
  //     constructed during the course of execution of an ECMAScript program.
  //
  //     4.3.7 Built-in Object
  //     A built-in object is any object supplied by an ECMAScript implementation, independent of the host environment,
  //     which is present at the start of the execution of an ECMAScript program. Standard built-in objects are defined
  //     in this specification, and an ECMAScript implementation may specify and define others. Every built-in object is
  //     a native object. A built-in constructor is a built-in object that is also a constructor.
  //
  //     4.3.8 Host Object
  //     A host object is any object supplied by the host environment to complete the execution environment of ECMAScript.
  //     Any object that is not native is a host object.

          it("is a fundamental type detection method ...", function () {
            expect(typeof isNative).toBe("function");
          });
          it([
            "... that should return true for every value distinct from [undefined] and [null]",
            "that's creation process can be tracked down to an ECMAScript conform constructor function."
          ].join(" "), function () {
            expect(isNative(NULL_VALUE)).toBe(false);

            expect(isNative(UNDEFINED_VALUE)).toBe(false);
            expect(isNative()).toBe(false);
            expect(isNative(void true)).toBe(false);
            expect(isNative(TEST_OBJECT.x)).toBe(false);

            expect(isNative(FALSE_VALUE)).toBe(true);
            expect(isNative(EMPTY_STRING_VALUE)).toBe(true);
            expect(isNative(ZERO_NUMBER_VALUE)).toBe(true);

            expect(isNative(NAN_VALUE)).toBe(true);
            expect(isNative(Infinity)).toBe(true);


            expect(isNative(TEST_OBJECT)).toBe(true);

            // due to PhantomJS 1.8 (Mac)
            if (GLOBAL_OBJECT && typeof GLOBAL_OBJECT.constructor == "function") {
              expect(isNative(GLOBAL_OBJECT)).toBe(true);
            } else {
              expect(isNative(GLOBAL_OBJECT)).toBe(false);
            }

            expect(isNative(new Boolean)).toBe(true);
            expect(isNative(new Number)).toBe(true);
            expect(isNative(new String)).toBe(true);

            expect(isNative(Object(FALSE_VALUE))).toBe(true);
            expect(isNative(Object(EMPTY_STRING_VALUE))).toBe(true);
            expect(isNative(Object(ZERO_NUMBER_VALUE))).toBe(true);

            expect(isNative(isFinite)).toBe(true);
            expect(isNative(Function)).toBe(true);
            expect(isNative(Object)).toBe(true);
            expect(isNative(Array)).toBe(true);
            expect(isNative(Math)).toBe(true);

            if (Node) {expect(isNative(Node)).toBe(true);}
            if (Element) {expect(isNative(Element)).toBe(true);}
            if (HTMLElement) {expect(isNative(HTMLElement)).toBe(true);}
          });
        });
        describe("»environment.introspective.isAlien«", function () {

          it("is a fundamental type detection method ...", function () {
            expect(typeof isAlien).toBe("function");
          });
          it([
            "... that should return true for every object that's creation process",
            "can not be tracked down to an ECMAScript conform constructor function."
          ].join(" "), function () {
            expect(isAlien(NULL_VALUE)).toBe(false);
            expect(isAlien(UNDEFINED_VALUE)).toBe(false);

            expect(isAlien()).toBe(false);
            expect(isAlien(void true)).toBe(false);
            expect(isAlien(TEST_OBJECT.x)).toBe(false);

            expect(isAlien(FALSE_VALUE)).toBe(false);
            expect(isAlien(EMPTY_STRING_VALUE)).toBe(false);
            expect(isAlien(ZERO_NUMBER_VALUE)).toBe(false);

            expect(isAlien(NAN_VALUE)).toBe(false);
            expect(isAlien(Infinity)).toBe(false);


            expect(isAlien(TEST_OBJECT)).toBe(false);

            // due to PhantomJS 1.8 (Mac)
            if (GLOBAL_OBJECT && (typeof GLOBAL_OBJECT.constructor == "function")) {
              expect(isAlien(GLOBAL_OBJECT)).toBe(false);
            } else {
              expect(isAlien(GLOBAL_OBJECT)).toBe(true); // prove of concept within PhantomJS 1.8 (Mac)
            }

            expect(isAlien(new Boolean)).toBe(false);
            expect(isAlien(new Number)).toBe(false);
            expect(isAlien(new String)).toBe(false);

            expect(isAlien(Object(FALSE_VALUE))).toBe(false);
            expect(isAlien(Object(EMPTY_STRING_VALUE))).toBe(false);
            expect(isAlien(Object(ZERO_NUMBER_VALUE))).toBe(false);

            expect(isAlien(isFinite)).toBe(false);
            expect(isAlien(Function)).toBe(false);
            expect(isAlien(Object)).toBe(false);
            expect(isAlien(Array)).toBe(false);
            expect(isAlien(Math)).toBe(false);

            if (Node) {expect(isAlien(Node)).toBe(false);}
            if (Element) {expect(isAlien(Element)).toBe(false);}
            if (HTMLElement) {expect(isAlien(HTMLElement)).toBe(false);}
          });
        });
      }); // »Detect ECMAScript primitives, values, objects and distinguish native implementations from non native ones.«


      describe("»Detect boolean types and distinguish values from objects.«", function () {

        describe("»environment.introspective.isBoolean«", function () {

          it("is a fundamental type detection method ...", function () {
            expect(typeof isBoolean).toBe("function");
          });
          it([
            "... that should return true for every argument that is either a boolean object or a boolean value."
          ].join(" "), function () {
            expect(isBoolean(FALSE_VALUE)).toBe(true);
            expect(isBoolean(TRUE_VALUE)).toBe(true);
            expect(isBoolean(new Boolean(NAN_VALUE))).toBe(true);
            expect(isBoolean(new Boolean(TEST_OBJECT.y))).toBe(true);


            expect(isBoolean(NULL_VALUE)).toBe(false);
            expect(isBoolean(UNDEFINED_VALUE)).toBe(false);

            expect(isBoolean()).toBe(false);
            expect(isBoolean(void true)).toBe(false);
            expect(isBoolean(TEST_OBJECT.x)).toBe(false);
            expect(isBoolean(TEST_OBJECT.y)).toBe(false);

            expect(isBoolean(EMPTY_STRING_VALUE)).toBe(false);
            expect(isBoolean(ZERO_NUMBER_VALUE)).toBe(false);
            expect(isBoolean(NAN_VALUE)).toBe(false);
            expect(isBoolean(Infinity)).toBe(false);

            expect(isBoolean(TEST_OBJECT)).toBe(false);
            expect(isBoolean(GLOBAL_OBJECT)).toBe(false);

            expect(isBoolean(new Number)).toBe(false);
            expect(isBoolean(new String)).toBe(false);


            expect(isBoolean(Object(EMPTY_STRING_VALUE))).toBe(false);
            expect(isBoolean(Object(ZERO_NUMBER_VALUE))).toBe(false);

            expect(isBoolean(isFinite)).toBe(false);
            expect(isBoolean(Object)).toBe(false);
            expect(isBoolean(Math)).toBe(false);

            expect(isBoolean(TEST_OBJECT)).toBe(false);
            expect(isBoolean(GLOBAL_OBJECT)).toBe(false);


            expect(isBoolean(Object(FALSE_VALUE))).toBe(true);

            expect(isBoolean(Boolean(new Number))).toBe(true);
            expect(isBoolean(Boolean(new String))).toBe(true);

            expect(isBoolean(Boolean(Object(FALSE_VALUE)))).toBe(true);
            expect(isBoolean(Boolean(Object(EMPTY_STRING_VALUE)))).toBe(true);
            expect(isBoolean(Boolean(Object(ZERO_NUMBER_VALUE)))).toBe(true);
          });
        });
        describe("»environment.introspective.isBooleanValue«", function () {

          it("is a fundamental type detection method ...", function () {
            expect(typeof isBooleanValue).toBe("function");
          });
          it([
            "... that should return true only for arguments that are explicitly boolean values."
          ].join(" "), function () {
            expect(isBooleanValue(FALSE_VALUE)).toBe(true);
            expect(isBooleanValue(TRUE_VALUE)).toBe(true);

            expect(isBooleanValue(new Boolean(NAN_VALUE))).toBe(false);
            expect(isBooleanValue(new Boolean(TEST_OBJECT.y))).toBe(false);


            expect(isBooleanValue(NULL_VALUE)).toBe(false);
            expect(isBooleanValue(UNDEFINED_VALUE)).toBe(false);

            expect(isBooleanValue(EMPTY_STRING_VALUE)).toBe(false);
            expect(isBooleanValue(ZERO_NUMBER_VALUE)).toBe(false);
            expect(isBooleanValue(NAN_VALUE)).toBe(false);
            expect(isBooleanValue(Infinity)).toBe(false);

            expect(isBooleanValue(TEST_OBJECT)).toBe(false);
            expect(isBooleanValue(GLOBAL_OBJECT)).toBe(false);

            expect(isBooleanValue(new Number)).toBe(false);
            expect(isBooleanValue(new String)).toBe(false);

            expect(isBooleanValue(isFinite)).toBe(false);
            expect(isBooleanValue(Object)).toBe(false);
            expect(isBooleanValue(Math)).toBe(false);


            expect(isBooleanValue(Object(FALSE_VALUE))).toBe(false);

            expect(isBooleanValue(Boolean(new Number))).toBe(true);
            expect(isBooleanValue(Boolean(new String))).toBe(true);

            expect(isBooleanValue(Boolean(Object(FALSE_VALUE)))).toBe(true);
            expect(isBooleanValue(Boolean(Object(EMPTY_STRING_VALUE)))).toBe(true);
            expect(isBooleanValue(Boolean(Object(ZERO_NUMBER_VALUE)))).toBe(true);
          });
        });
        describe("»environment.introspective.isBooleanObject«", function () {

          it("is a fundamental type detection method ...", function () {
            expect(typeof isBooleanObject).toBe("function");
          });
          it([
            "... that should return true only for arguments that are explicitly boolean objects."
          ].join(" "), function () {
            expect(isBooleanObject(new Boolean(NAN_VALUE))).toBe(true);
            expect(isBooleanObject(new Boolean(TEST_OBJECT.y))).toBe(true);

            expect(isBooleanObject(FALSE_VALUE)).toBe(false);
            expect(isBooleanObject(TRUE_VALUE)).toBe(false);


            expect(isBooleanObject(NULL_VALUE)).toBe(false);
            expect(isBooleanObject(UNDEFINED_VALUE)).toBe(false);

            expect(isBooleanObject(EMPTY_STRING_VALUE)).toBe(false);
            expect(isBooleanObject(ZERO_NUMBER_VALUE)).toBe(false);
            expect(isBooleanObject(NAN_VALUE)).toBe(false);
            expect(isBooleanObject(Infinity)).toBe(false);

            expect(isBooleanObject(TEST_OBJECT)).toBe(false);
            expect(isBooleanObject(GLOBAL_OBJECT)).toBe(false);

            expect(isBooleanObject(new Number)).toBe(false);
            expect(isBooleanObject(new String)).toBe(false);

            expect(isBooleanObject(isFinite)).toBe(false);
            expect(isBooleanObject(Object)).toBe(false);
            expect(isBooleanObject(Math)).toBe(false);


            expect(isBooleanObject(Object(FALSE_VALUE))).toBe(true);

            expect(isBooleanObject(Boolean(new Number))).toBe(false);
            expect(isBooleanObject(Boolean(new String))).toBe(false);

            expect(isBooleanObject(Boolean(Object(FALSE_VALUE)))).toBe(false);
            expect(isBooleanObject(Boolean(Object(EMPTY_STRING_VALUE)))).toBe(false);
            expect(isBooleanObject(Boolean(Object(ZERO_NUMBER_VALUE)))).toBe(false);
          });
        });
      }); // »Detect boolean types and distinguish values from objects.«


      describe("»Detect number types and distinguish between finite numbers values and objects.«", function () {

        describe("»environment.introspective.isNumber«", function () {

          it("is a fundamental type detection method ...", function () {
            expect(typeof isNumber).toBe("function");
          });
          it([
            "... that should return true for every argument that is either",
            "a finite number value or a number object with a finite value."
          ].join(" "), function () {
            expect(isNumber(ZERO_NUMBER_VALUE)).toBe(true);

            expect(isNumber(NAN_VALUE)).toBe(false);
            expect(isNumber(Infinity)).toBe(false);

            expect(isNumber(new Number(EMPTY_STRING_VALUE))).toBe(true);
            expect(isNumber(new Number(ZERO_NUMBER_VALUE))).toBe(true);

            expect(isNumber(new Number(NAN_VALUE))).toBe(false);
            expect(isNumber(new Number(Infinity))).toBe(false);


            expect(isNumber(FALSE_VALUE)).toBe(false);
            expect(isNumber(NULL_VALUE)).toBe(false);
            expect(isNumber(UNDEFINED_VALUE)).toBe(false);

            expect(isNumber(EMPTY_STRING_VALUE)).toBe(false);
            expect(isNumber(NAN_VALUE)).toBe(false);
            expect(isNumber(Infinity)).toBe(false);

            expect(isNumber(TEST_OBJECT)).toBe(false);
            expect(isNumber(GLOBAL_OBJECT)).toBe(false);


            expect(isNumber(Object(EMPTY_STRING_VALUE))).toBe(false);

            expect(isNumber(Object(ZERO_NUMBER_VALUE))).toBe(true);

            expect(isNumber(Number(new Boolean))).toBe(true);
            expect(isNumber(Number(new String))).toBe(true);

            expect(isNumber(Number(Object(FALSE_VALUE)))).toBe(true);
            expect(isNumber(Number(Object(EMPTY_STRING_VALUE)))).toBe(true);
            expect(isNumber(Number(Object(ZERO_NUMBER_VALUE)))).toBe(true);
          });
        });
        describe("»environment.introspective.isNumberValue«", function () {

          it("is a fundamental type detection method ...", function () {
            expect(typeof isNumberValue).toBe("function");
          });
          it([
            "... that should return true for every argument that explicitly",
            " is a number value regardless if it is finite or not."
          ].join(" "), function () {
            expect(isNumberValue(ZERO_NUMBER_VALUE)).toBe(true);

            expect(isNumberValue(NAN_VALUE)).toBe(true);
            expect(isNumberValue(Infinity)).toBe(true);


            expect(isNumberValue(new Number(EMPTY_STRING_VALUE))).toBe(false);
            expect(isNumberValue(new Number(ZERO_NUMBER_VALUE))).toBe(false);

            expect(isNumberValue(new Number(NAN_VALUE))).toBe(false);
            expect(isNumberValue(new Number(Infinity))).toBe(false);


            expect(isNumberValue(FALSE_VALUE)).toBe(false);
            expect(isNumberValue(NULL_VALUE)).toBe(false);
            expect(isNumberValue(UNDEFINED_VALUE)).toBe(false);

            expect(isNumberValue(EMPTY_STRING_VALUE)).toBe(false);

            expect(isNumberValue(NAN_VALUE)).toBe(true);
            expect(isNumberValue(Infinity)).toBe(true);

            expect(isNumberValue(TEST_OBJECT)).toBe(false);
            expect(isNumberValue(GLOBAL_OBJECT)).toBe(false);


            expect(isNumberValue(Object(EMPTY_STRING_VALUE))).toBe(false);

            expect(isNumberValue(Object(ZERO_NUMBER_VALUE))).toBe(false);

            expect(isNumberValue(Number(new Boolean))).toBe(true);
            expect(isNumberValue(Number(new String))).toBe(true);

            expect(isNumberValue(Number(Object(FALSE_VALUE)))).toBe(true);
            expect(isNumberValue(Number(Object(EMPTY_STRING_VALUE)))).toBe(true);
            expect(isNumberValue(Number(Object(ZERO_NUMBER_VALUE)))).toBe(true);
          });
        });
        describe("»environment.introspective.isNumberObject«", function () {

          it("is a fundamental type detection method ...", function () {
            expect(typeof isNumberObject).toBe("function");
          });
          it([
            "... that should return true for every argument that explicitly",
            " is a number object regardless if its value is finite or not."
          ].join(" "), function () {
            expect(isNumberObject(ZERO_NUMBER_VALUE)).toBe(false);

            expect(isNumberObject(NAN_VALUE)).toBe(false);
            expect(isNumberObject(Infinity)).toBe(false);


            expect(isNumberObject(new Number(EMPTY_STRING_VALUE))).toBe(true);
            expect(isNumberObject(new Number(ZERO_NUMBER_VALUE))).toBe(true);

            expect(isNumberObject(new Number(NAN_VALUE))).toBe(true);
            expect(isNumberObject(new Number(Infinity))).toBe(true);


            expect(isNumberObject(FALSE_VALUE)).toBe(false);
            expect(isNumberObject(NULL_VALUE)).toBe(false);
            expect(isNumberObject(UNDEFINED_VALUE)).toBe(false);

            expect(isNumberObject(EMPTY_STRING_VALUE)).toBe(false);

            expect(isNumberObject(NAN_VALUE)).toBe(false);
            expect(isNumberObject(Infinity)).toBe(false);

            expect(isNumberObject(TEST_OBJECT)).toBe(false);
            expect(isNumberObject(GLOBAL_OBJECT)).toBe(false);


            expect(isNumberObject(Object(EMPTY_STRING_VALUE))).toBe(false);

            expect(isNumberObject(Object(ZERO_NUMBER_VALUE))).toBe(true);
            expect(isNumberObject(Object(NAN_VALUE))).toBe(true);
            expect(isNumberObject(Object(Infinity))).toBe(true);


            expect(isNumberObject(Number(new Boolean))).toBe(false);
            expect(isNumberObject(Number(new String))).toBe(false);

            expect(isNumberObject(Number(Object(FALSE_VALUE)))).toBe(false);
            expect(isNumberObject(Number(Object(EMPTY_STRING_VALUE)))).toBe(false);
            expect(isNumberObject(Number(Object(ZERO_NUMBER_VALUE)))).toBe(false);
          });
        });
      }); // »Detect number types and distinguish between finite numbers values and objects.«


      describe("»Detect string types and distinguish values from objects.«", function () {

        describe("»environment.introspective.isString«", function () {

          it("is a fundamental type detection method ...", function () {
            expect(typeof isString).toBe("function");
          });
          it([
            "... that should return true for every argument that is either a string object or a string value."
          ].join(" "), function () {
            expect(isString(new String())).toBe(true);
            expect(isString(new String(EMPTY_STRING_VALUE))).toBe(true);

            expect(isString(Object(EMPTY_STRING_VALUE))).toBe(true);

            expect(isString(EMPTY_STRING_VALUE)).toBe(true);


            expect(isString(ZERO_NUMBER_VALUE)).toBe(false);
            expect(isString()).toBe(false);

            expect(isString(NAN_VALUE)).toBe(false);
            expect(isString(Infinity)).toBe(false);

            expect(isString(TEST_OBJECT)).toBe(false);
            expect(isString(GLOBAL_OBJECT)).toBe(false);


            expect(isString(String(NAN_VALUE))).toBe(true);
            expect(isString(String(Infinity))).toBe(true);

            expect(isString(String(TEST_OBJECT))).toBe(true);
            expect(isString(String(GLOBAL_OBJECT))).toBe(true);
          });
        });
        describe("»environment.introspective.isStringValue«", function () {

          it("is a fundamental type detection method ...", function () {
            expect(typeof isStringValue).toBe("function");
          });
          it([
            "... that should return true only for arguments that are explicitly string values."
          ].join(" "), function () {
            expect(isStringValue(new String())).toBe(false);
            expect(isStringValue(new String(EMPTY_STRING_VALUE))).toBe(false);

            expect(isStringValue(Object(EMPTY_STRING_VALUE))).toBe(false);

            expect(isStringValue(EMPTY_STRING_VALUE)).toBe(true);


            expect(isStringValue(ZERO_NUMBER_VALUE)).toBe(false);
            expect(isStringValue()).toBe(false);

            expect(isStringValue(NAN_VALUE)).toBe(false);
            expect(isStringValue(Infinity)).toBe(false);

            expect(isStringValue(TEST_OBJECT)).toBe(false);
            expect(isStringValue(GLOBAL_OBJECT)).toBe(false);


            expect(isStringValue(String(NAN_VALUE))).toBe(true);
            expect(isStringValue(String(Infinity))).toBe(true);

            expect(isStringValue(String(TEST_OBJECT))).toBe(true);
            expect(isStringValue(String(GLOBAL_OBJECT))).toBe(true);
          });
        });
        describe("»environment.introspective.isStringObject«", function () {

          it("is a fundamental type detection method ...", function () {
            expect(typeof isStringObject).toBe("function");
          });
          it([
            "... that should return true only for arguments that are explicitly string objects."
          ].join(" "), function () {
            expect(isStringObject(new String())).toBe(true);
            expect(isStringObject(new String(EMPTY_STRING_VALUE))).toBe(true);

            expect(isStringObject(Object(EMPTY_STRING_VALUE))).toBe(true);

            expect(isStringObject(EMPTY_STRING_VALUE)).toBe(false);


            expect(isStringObject(ZERO_NUMBER_VALUE)).toBe(false);
            expect(isStringObject()).toBe(false);

            expect(isStringObject(NAN_VALUE)).toBe(false);
            expect(isStringObject(Infinity)).toBe(false);

            expect(isStringObject(TEST_OBJECT)).toBe(false);
            expect(isStringObject(GLOBAL_OBJECT)).toBe(false);


            expect(isStringObject(String(NAN_VALUE))).toBe(false);
            expect(isStringObject(String(Infinity))).toBe(false);

            expect(isStringObject(String(TEST_OBJECT))).toBe(false);
            expect(isStringObject(String(GLOBAL_OBJECT))).toBe(false);
          });
        });
      }); // »Detect string types and distinguish values from objects.«


      describe("»Detect list types and distinguish between \"list like\"s, true [[Array]]s and true [[Argument]]s.«", function () {

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
        describe("»environment.introspective.isListLike«", function () {

          it("is a fundamental type detection method ...", function () {
            expect(typeof isListLike).toBe("function");
          });
          it([
            "... that should return true for every type that features a [length] property",
            "that's value is a finite number equal to or grater than Zero."
          ].join(" "), function () {
            expect(isListLike(EMPTY_STRING_VALUE)).toBe(true);
            expect(isListLike(str)).toBe(true);
            expect(isListLike(coll)).toBe(true);

            if (nodeList) {expect(isListLike(nodeList)).toBe(true);}
            if (htmlCollection) {expect(isListLike(htmlCollection)).toBe(true);}

            expect(isListLike(arr)).toBe(true);
            expect(isListLike(args)).toBe(true);


            expect(isListLike(UNDEFINED_VALUE)).toBe(false);
            expect(isListLike(NULL_VALUE)).toBe(false);
            expect(isListLike(FALSE_VALUE)).toBe(false);
            expect(isListLike(TRUE_VALUE)).toBe(false);
            expect(isListLike(ZERO_NUMBER_VALUE)).toBe(false);
            expect(isListLike(NAN_VALUE)).toBe(false);
            expect(isListLike(Infinity)).toBe(false);
            expect(isListLike(TEST_OBJECT)).toBe(false);
            expect(isListLike(obj)).toBe(false);
          });
        });
        describe("»environment.introspective.isArray«", function () {

          it("is a fundamental type detection method ...", function () {
            expect(typeof isArray).toBe("function");
          });
          it([
            "... that should return true only for every real [[Array]] type."
          ].join(" "), function () {
            expect(isArray(EMPTY_STRING_VALUE)).toBe(false);
            expect(isArray(str)).toBe(false);
            expect(isArray(coll)).toBe(false);

            if (nodeList) {expect(isArray(nodeList)).toBe(false);}
            if (htmlCollection) {expect(isArray(htmlCollection)).toBe(false);}

            expect(isArray(arr)).toBe(true);

            expect(isArray(args)).toBe(false);

            expect(isArray(UNDEFINED_VALUE)).toBe(false);
            expect(isArray(NULL_VALUE)).toBe(false);
            expect(isArray(FALSE_VALUE)).toBe(false);
            expect(isArray(TRUE_VALUE)).toBe(false);
            expect(isArray(ZERO_NUMBER_VALUE)).toBe(false);
            expect(isArray(NAN_VALUE)).toBe(false);
            expect(isArray(Infinity)).toBe(false);
            expect(isArray(TEST_OBJECT)).toBe(false);
            expect(isArray(obj)).toBe(false);
          });
        });
        describe("»environment.introspective.isArguments«", function () {

          it("is a fundamental type detection method ...", function () {
            expect(typeof isArguments).toBe("function");
          });
          it([
            "... that should return true only for every real [[Argument]] type."
          ].join(" "), function () {
            expect(isArguments(EMPTY_STRING_VALUE)).toBe(false);
            expect(isArguments(str)).toBe(false);
            expect(isArguments(coll)).toBe(false);

            if (nodeList) {expect(isArguments(nodeList)).toBe(false);}
            if (htmlCollection) {expect(isArguments(htmlCollection)).toBe(false);}

            expect(isArguments(arr)).toBe(false);

            expect(isArguments(args)).toBe(true);

            expect(isArguments(UNDEFINED_VALUE)).toBe(false);
            expect(isArguments(NULL_VALUE)).toBe(false);
            expect(isArguments(FALSE_VALUE)).toBe(false);
            expect(isArguments(TRUE_VALUE)).toBe(false);
            expect(isArguments(ZERO_NUMBER_VALUE)).toBe(false);
            expect(isArguments(NAN_VALUE)).toBe(false);
            expect(isArguments(Infinity)).toBe(false);
            expect(isArguments(TEST_OBJECT)).toBe(false);
            expect(isArguments(obj)).toBe(false);
          });
        });

      }); // »Detect list types and distinguish between \"list like\"s, true [[Array]]s and true [[Argument]]s.«


      describe("»Detect all other standard native objects specified by ES3«", function () {

        var
          arr = [],
          coll = {"length": 2, "0": "hallo", "1": "world"},
          args = arguments,

          document = GLOBAL_OBJECT.document,

          nodeList = document && document.getElementsByTagName(""),
          htmlCollection = document && document.forms
        ;
        describe("»environment.introspective.isObjectObject«", function () {

          it("is a fundamental type detection method ...", function () {
            expect(typeof isObjectObject).toBe("function");
          });
          it([
            "... that should return true only for every real [[Object]] type."
          ].join(" "), function () {
            expect(isObjectObject(TEST_OBJECT)).toBe(true);
            expect(isObjectObject(coll)).toBe(true);

            expect(isObjectObject(arr)).toBe(false);
            expect(isObjectObject(args)).toBe(false);

            if (nodeList) {expect(isObjectObject(nodeList)).toBe(false);}
            if (htmlCollection) {expect(isObjectObject(htmlCollection)).toBe(false);}

            if (Node) {expect(isObjectObject(Node)).toBe(false);}
            if (Element) {expect(isObjectObject(Element)).toBe(false);}
            if (HTMLElement) {expect(isObjectObject(HTMLElement)).toBe(false);}

            expect(isObjectObject(isFinite)).toBe(false);
          //expect(isObjectObject(Math)).toBe(false);

            expect(isObjectObject(new Boolean)).toBe(false);
            expect(isObjectObject(new Number)).toBe(false);
            expect(isObjectObject(new String)).toBe(false);
            expect(isObjectObject(new Function)).toBe(false);
            expect(isObjectObject(new RegExp)).toBe(false);
            expect(isObjectObject(new Date)).toBe(false);
            expect(isObjectObject(new Error)).toBe(false);

            expect(isObjectObject(EMPTY_STRING_VALUE)).toBe(false);
            expect(isObjectObject(UNDEFINED_VALUE)).toBe(false);
            expect(isObjectObject(NULL_VALUE)).toBe(false);
            expect(isObjectObject(FALSE_VALUE)).toBe(false);
            expect(isObjectObject(TRUE_VALUE)).toBe(false);
            expect(isObjectObject(ZERO_NUMBER_VALUE)).toBe(false);
            expect(isObjectObject(NAN_VALUE)).toBe(false);
            expect(isObjectObject(Infinity)).toBe(false);
          });
        });

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

            expect(isFunction(isFinite)).toBe(true);


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

            expect(isFunction(new RegExp)).toBe(false);
            expect(isFunction(EMPTY_STRING_VALUE)).toBe(false);
            expect(isFunction(UNDEFINED_VALUE)).toBe(false);
            expect(isFunction(NULL_VALUE)).toBe(false);
            expect(isFunction(FALSE_VALUE)).toBe(false);
            expect(isFunction(TRUE_VALUE)).toBe(false);
            expect(isFunction(ZERO_NUMBER_VALUE)).toBe(false);
            expect(isFunction(NAN_VALUE)).toBe(false);
            expect(isFunction(Infinity)).toBe(false);
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

            expect(isCallable(isFinite)).toBe(true);


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

            expect(isFunction(new RegExp)).toBe(false);
            expect(isCallable(EMPTY_STRING_VALUE)).toBe(false);
            expect(isCallable(UNDEFINED_VALUE)).toBe(false);
            expect(isCallable(NULL_VALUE)).toBe(false);
            expect(isCallable(FALSE_VALUE)).toBe(false);
            expect(isCallable(TRUE_VALUE)).toBe(false);
            expect(isCallable(ZERO_NUMBER_VALUE)).toBe(false);
            expect(isCallable(NAN_VALUE)).toBe(false);
            expect(isCallable(Infinity)).toBe(false);
          });
        });

        describe("»environment.introspective.isRegExp«", function () {

          it("is a fundamental type detection method ...", function () {
            expect(typeof isRegExp).toBe("function");
          });
          it([
            "... that should return true only for Regular Expressions."
          ].join(" "), function () {
            expect(isRegExp(new RegExp)).toBe(true);
            expect(isRegExp(/\s+/)).toBe(true);

            expect(isRegExp(TEST_OBJECT)).toBe(false);
            expect(isRegExp(isFinite)).toBe(false);

            expect(isRegExp(new Boolean)).toBe(false);
            expect(isRegExp(new Number)).toBe(false);
            expect(isRegExp(new String)).toBe(false);
            expect(isRegExp(new Function)).toBe(false);
            expect(isRegExp(new Date)).toBe(false);
            expect(isRegExp(new Error)).toBe(false);

            expect(isRegExp(EMPTY_STRING_VALUE)).toBe(false);
            expect(isRegExp(UNDEFINED_VALUE)).toBe(false);
            expect(isRegExp(NULL_VALUE)).toBe(false);
            expect(isRegExp(FALSE_VALUE)).toBe(false);
            expect(isRegExp(TRUE_VALUE)).toBe(false);
            expect(isRegExp(ZERO_NUMBER_VALUE)).toBe(false);
            expect(isRegExp(NAN_VALUE)).toBe(false);
            expect(isRegExp(Infinity)).toBe(false);
          });
        });

        describe("»environment.introspective.isDate«", function () {

          it("is a fundamental type detection method ...", function () {
            expect(typeof isDate).toBe("function");
          });
          it([
            "... that should return true only for [[Date]] types."
          ].join(" "), function () {
            expect(isDate(new Date)).toBe(true);

            expect(isDate(Date())).toBe(false);
            expect(isDate((new Date).getTime())).toBe(false);


            expect(isDate(TEST_OBJECT)).toBe(false);
            expect(isDate(isFinite)).toBe(false);

            expect(isDate(new Boolean)).toBe(false);
            expect(isDate(new Number)).toBe(false);
            expect(isDate(new String)).toBe(false);
            expect(isDate(new Function)).toBe(false);
            expect(isDate(new RegExp)).toBe(false);
            expect(isDate(new Error)).toBe(false);

            expect(isDate(EMPTY_STRING_VALUE)).toBe(false);
            expect(isDate(UNDEFINED_VALUE)).toBe(false);
            expect(isDate(NULL_VALUE)).toBe(false);
            expect(isDate(FALSE_VALUE)).toBe(false);
            expect(isDate(TRUE_VALUE)).toBe(false);
            expect(isDate(ZERO_NUMBER_VALUE)).toBe(false);
            expect(isDate(NAN_VALUE)).toBe(false);
            expect(isDate(Infinity)).toBe(false);
          });
        });

        describe("»environment.introspective.isError«", function () {

          var
            EvalError       = GLOBAL_OBJECT.EvalError,
            RangeError      = GLOBAL_OBJECT.RangeError,
            ReferenceError  = GLOBAL_OBJECT.ReferenceError,
            SyntaxError     = GLOBAL_OBJECT.SyntaxError,
            TypeError       = GLOBAL_OBJECT.TypeError,
            URIError        = GLOBAL_OBJECT.URIError
          ;
          it("is a fundamental type detection method ...", function () {
            expect(typeof isError).toBe("function");
          });
          it([
            "... that should return true for any Error type."
          ].join(" "), function () {
            expect(isError(new Error)).toBe(true);

            expect(isError(new EvalError)).toBe(true);
            expect(isError(new RangeError)).toBe(true);
            expect(isError(new ReferenceError)).toBe(true);
            expect(isError(new SyntaxError)).toBe(true);
            expect(isError(new TypeError)).toBe(true);
            expect(isError(new URIError)).toBe(true);


            expect(isError(TEST_OBJECT)).toBe(false);
            expect(isError(isFinite)).toBe(false);

            expect(isError(new Boolean)).toBe(false);
            expect(isError(new Number)).toBe(false);
            expect(isError(new String)).toBe(false);
            expect(isError(new Function)).toBe(false);
            expect(isError(new RegExp)).toBe(false);
            expect(isError(new Date)).toBe(false);

            expect(isError(EMPTY_STRING_VALUE)).toBe(false);
            expect(isError(UNDEFINED_VALUE)).toBe(false);
            expect(isError(NULL_VALUE)).toBe(false);
            expect(isError(FALSE_VALUE)).toBe(false);
            expect(isError(TRUE_VALUE)).toBe(false);
            expect(isError(ZERO_NUMBER_VALUE)).toBe(false);
            expect(isError(NAN_VALUE)).toBe(false);
            expect(isError(Infinity)).toBe(false);
          });

          describe("»Distinguish all [[Error]] types.«", function () {

            describe("»environment.introspective.isGenericError«", function () {

              it("is a fundamental type detection method ...", function () {
                expect(typeof isGenericError).toBe("function");
              });
              it([
                "... that should return true only for the generic [[Error]] type."
              ].join(" "), function () {
                expect(isGenericError(new Error)).toBe(true);

                expect(isGenericError(new EvalError)).toBe(false);
                expect(isGenericError(new RangeError)).toBe(false);
                expect(isGenericError(new ReferenceError)).toBe(false);
                expect(isGenericError(new SyntaxError)).toBe(false);
                expect(isGenericError(new TypeError)).toBe(false);
                expect(isGenericError(new URIError)).toBe(false);


                expect(isGenericError(TEST_OBJECT)).toBe(false);
                expect(isGenericError(isFinite)).toBe(false);

                expect(isGenericError(EMPTY_STRING_VALUE)).toBe(false);
                expect(isGenericError(UNDEFINED_VALUE)).toBe(false);
                expect(isGenericError(NULL_VALUE)).toBe(false);
              });
            });
            describe("»environment.introspective.isEvalError«", function () {

              it("is a fundamental type detection method ...", function () {
                expect(typeof isEvalError).toBe("function");
              });
              it([
                "... that should return true only for [[EvalError]] types."
              ].join(" "), function () {
                expect(isEvalError(new Error)).toBe(false);

                expect(isEvalError(new EvalError)).toBe(true);

                expect(isEvalError(new RangeError)).toBe(false);
                expect(isEvalError(new ReferenceError)).toBe(false);
                expect(isEvalError(new SyntaxError)).toBe(false);
                expect(isEvalError(new TypeError)).toBe(false);
                expect(isEvalError(new URIError)).toBe(false);


                expect(isEvalError(TEST_OBJECT)).toBe(false);
                expect(isEvalError(isFinite)).toBe(false);

                expect(isEvalError(EMPTY_STRING_VALUE)).toBe(false);
                expect(isEvalError(UNDEFINED_VALUE)).toBe(false);
                expect(isEvalError(NULL_VALUE)).toBe(false);
              });
            });
            describe("»environment.introspective.isRangeError«", function () {

              it("is a fundamental type detection method ...", function () {
                expect(typeof isRangeError).toBe("function");
              });
              it([
                "... that should return true only for [[RangeError]] types."
              ].join(" "), function () {
                expect(isRangeError(new Error)).toBe(false);
                expect(isRangeError(new EvalError)).toBe(false);

                expect(isRangeError(new RangeError)).toBe(true);

                expect(isRangeError(new ReferenceError)).toBe(false);
                expect(isRangeError(new SyntaxError)).toBe(false);
                expect(isRangeError(new TypeError)).toBe(false);
                expect(isRangeError(new URIError)).toBe(false);


                expect(isRangeError(TEST_OBJECT)).toBe(false);
                expect(isRangeError(isFinite)).toBe(false);

                expect(isRangeError(EMPTY_STRING_VALUE)).toBe(false);
                expect(isRangeError(UNDEFINED_VALUE)).toBe(false);
                expect(isRangeError(NULL_VALUE)).toBe(false);
              });
            });
            describe("»environment.introspective.isReferenceError«", function () {

              it("is a fundamental type detection method ...", function () {
                expect(typeof isReferenceError).toBe("function");
              });
              it([
                "... that should return true only for [[ReferenceError]] types."
              ].join(" "), function () {
                expect(isReferenceError(new Error)).toBe(false);
                expect(isReferenceError(new EvalError)).toBe(false);
                expect(isReferenceError(new RangeError)).toBe(false);

                expect(isReferenceError(new ReferenceError)).toBe(true);

                expect(isReferenceError(new SyntaxError)).toBe(false);
                expect(isReferenceError(new TypeError)).toBe(false);
                expect(isReferenceError(new URIError)).toBe(false);


                expect(isReferenceError(TEST_OBJECT)).toBe(false);
                expect(isReferenceError(isFinite)).toBe(false);

                expect(isReferenceError(EMPTY_STRING_VALUE)).toBe(false);
                expect(isReferenceError(UNDEFINED_VALUE)).toBe(false);
                expect(isReferenceError(NULL_VALUE)).toBe(false);
              });
            });
            describe("»environment.introspective.isSyntaxError«", function () {

              it("is a fundamental type detection method ...", function () {
                expect(typeof isSyntaxError).toBe("function");
              });
              it([
                "... that should return true only for [[SyntaxError]] types."
              ].join(" "), function () {
                expect(isSyntaxError(new Error)).toBe(false);
                expect(isSyntaxError(new EvalError)).toBe(false);
                expect(isSyntaxError(new RangeError)).toBe(false);
                expect(isSyntaxError(new ReferenceError)).toBe(false);

                expect(isSyntaxError(new SyntaxError)).toBe(true);

                expect(isSyntaxError(new TypeError)).toBe(false);
                expect(isSyntaxError(new URIError)).toBe(false);


                expect(isSyntaxError(TEST_OBJECT)).toBe(false);
                expect(isSyntaxError(isFinite)).toBe(false);

                expect(isSyntaxError(EMPTY_STRING_VALUE)).toBe(false);
                expect(isSyntaxError(UNDEFINED_VALUE)).toBe(false);
                expect(isSyntaxError(NULL_VALUE)).toBe(false);
              });
            });
            describe("»environment.introspective.isTypeError«", function () {

              it("is a fundamental type detection method ...", function () {
                expect(typeof isTypeError).toBe("function");
              });
              it([
                "... that should return true only for [[TypeError]] types."
              ].join(" "), function () {
                expect(isTypeError(new Error)).toBe(false);
                expect(isTypeError(new EvalError)).toBe(false);
                expect(isTypeError(new RangeError)).toBe(false);
                expect(isTypeError(new ReferenceError)).toBe(false);
                expect(isTypeError(new SyntaxError)).toBe(false);

                expect(isTypeError(new TypeError)).toBe(true);

                expect(isTypeError(new URIError)).toBe(false);


                expect(isTypeError(TEST_OBJECT)).toBe(false);
                expect(isTypeError(isFinite)).toBe(false);

                expect(isTypeError(EMPTY_STRING_VALUE)).toBe(false);
                expect(isTypeError(UNDEFINED_VALUE)).toBe(false);
                expect(isTypeError(NULL_VALUE)).toBe(false);
              });
            });
            describe("»environment.introspective.isURIError«", function () {

              it("is a fundamental type detection method ...", function () {
                expect(typeof isURIError).toBe("function");
              });
              it([
                "... that should return true only for [[URIError]] types."
              ].join(" "), function () {
                expect(isURIError(new Error)).toBe(false);
                expect(isURIError(new EvalError)).toBe(false);
                expect(isURIError(new RangeError)).toBe(false);
                expect(isURIError(new ReferenceError)).toBe(false);
                expect(isURIError(new SyntaxError)).toBe(false);
                expect(isURIError(new TypeError)).toBe(false);

                expect(isURIError(new URIError)).toBe(true);


                expect(isURIError(TEST_OBJECT)).toBe(false);
                expect(isURIError(isFinite)).toBe(false);

                expect(isURIError(EMPTY_STRING_VALUE)).toBe(false);
                expect(isURIError(UNDEFINED_VALUE)).toBe(false);
                expect(isURIError(NULL_VALUE)).toBe(false);
              });
            });
          }); // »Distinguish all [[Error]] types.«
        });
      }); // »Detect all other standard native objects specified by ES3«


      describe("»Retrieve a types base value and its internally implemented class signature.«", function () {

        describe("»environment.introspective.baseValueOf«", function () {

          it("is a mostly internally used parse method ...", function () {
            expect(typeof baseValueOf).toBe("function");
          });
          it([
            "... that tries to retrieve the base value of any given type -",
            "even excepting [undefined] or [null] as its parameter."
          ].join(" "), function () {
            expect(baseValueOf()).toBeUndefined();
            expect(baseValueOf(null)).toBeNull();

            expect(baseValueOf(new Number)).toBe(ZERO_NUMBER_VALUE);
            expect(baseValueOf(ZERO_NUMBER_VALUE)).toBe(ZERO_NUMBER_VALUE);
            expect(baseValueOf("0")).toBe("0");
            expect(baseValueOf(EMPTY_STRING_VALUE)).toBe(EMPTY_STRING_VALUE);
            expect(baseValueOf(new String)).toBe(EMPTY_STRING_VALUE);

            expect(GLOBAL_OBJECT.isNaN(baseValueOf(NAN_VALUE))).toBe(true);

            expect(baseValueOf({x: "x"}).x).toBe("x");
            expect(baseValueOf({x: "x", valueOf: function () {return this.x;}})).toBe("x");
            expect(baseValueOf({x: "x", valueOf: function () {return this.y;}})).toBeUndefined();
          });
        });

        describe("»environment.introspective.getClassSignature«", function () {
          var
          //getClassSignature = environment.introspective.getClassSignature,
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
            "... that, for the passed argument, retrieves a \"string\" type signature",
            "of its internally implemented [[CLASS]]."
          ].join(" "), function () {
            expect(regX.compile(createClassSignaturePattern("Object")).test(getClassSignature(coll))).toBe(true);
            expect(regX.test(getClassSignature(obj))).toBe(true);
            expect(regX.test(getClassSignature(arr))).toBe(false);

            expect(regX.compile(createClassSignaturePattern("Array")).test(getClassSignature(arr))).toBe(true);
            expect(regX.test(getClassSignature(args))).toBe(false);

            expect(regX.compile(createClassSignaturePattern("Arguments")).test(getClassSignature(args))).toBe(true);
            expect(regX.test(getClassSignature(arr))).toBe(false);

            expect(regX.compile(createClassSignaturePattern("String")).test(getClassSignature(str))).toBe(true);
            expect(regX.test(getClassSignature(coll))).toBe(false);
          });
        });
      }); // »Retrieve a types base value and its internally implemented class signature.«

    });

  });
});
