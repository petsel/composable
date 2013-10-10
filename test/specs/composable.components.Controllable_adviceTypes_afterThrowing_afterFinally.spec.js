

describe("»components.Controllable_adviceTypes_afterThrowing_afterFinally« module", function () {


  var
    GLOBAL_OBJECT = ((window && window.window === window) && window) || ((global && global.global === global) && global) || this,

    require = GLOBAL_OBJECT.composable.require,

    Controllable_afterThrowing_afterFinally = require("components.Controllable_adviceTypes_afterThrowing_afterFinally"),


    Enumerable_first_last_item = require("components.Enumerable_first_last_item"),
    env_introspective = require("environment").introspective,

    isFunction  = env_introspective.isFunction,
    isArguments = env_introspective.isArguments,

    functionPrototype = Function.prototype,


    precedenceLog = [],

    getFoo = function () {
      precedenceLog.push("foo");
      return "foo";
    },
    getBar = function () {
      precedenceLog.push("bar");
      return "bar";
    },
    getBaz = function () {
      precedenceLog.push("baz");
      return "baz";
    },
    fooBarInterceptor = function (proceed, interceptor, argsArray, joinpoint) {
      var
        args = arguments,

        isProceed = (("0" in args) && isFunction(args[0]) && (args[0] === proceed)),
        isInterceptor = (("1" in args) && isFunction(args[1]) && (args[1] === args.callee) && (args[1] === fooBarInterceptor) && (args[1] === interceptor)),
        isArgsArray = (("2" in args) && isArguments(args[2]) && (args[2] === argsArray)),
        isJoinpoint = (("3" in args) && (args[3] === joinpoint)),

        isNoFurtherFields = !("4" in args)
      ;
      getFoo();
      proceed();
      getBar();

      return (isProceed && isInterceptor && isArgsArray && isJoinpoint && isNoFurtherFields);
    },
    writeIntoLog,
    returnValue,


    resetModifierTest = function () {
      precedenceLog.length = 0;
      writeIntoLog = null;
      returnValue = "";
    },


    throwException = function () {
      throw (new TypeError(throwExceptionMessage));
    },
    throwExceptionMessage = "type inferences between function objects",


    fooBarBazList = [
      getFoo(),
      getBar(),
      getBaz()
    ],


    proveAfterThrowing = function (excObject, argsArray, joinpoint) {
      var
        args = arguments,

        isException = (("0" in args) && (args[0] === excObject) && (excObject.message == throwExceptionMessage)),
        isArgsArray = (("1" in args) && isArguments(args[1]) && (args[1] === argsArray)),
        isJoinpoint = (("2" in args) && (args[2] === joinpoint)),

        isNoFurtherFields = !("3" in args)
      ;
      precedenceLog = [(isException && isArgsArray && isJoinpoint && isNoFurtherFields) ? "passed" : "failed"];

      return excObject;
    },
    proveAfterReturningFooBarBaz = function (retValue, argsArray, joinpoint) {
      var
        args = arguments,

        isRetValue = (("0" in args) && (args[0] === retValue) && (fooBarBazList.indexOf(retValue) >= 0)),
        isArgsArray = (("1" in args) && isArguments(args[1]) && (args[1] === argsArray)),
        isJoinpoint = (("2" in args) && (args[2] === joinpoint)),

        isNoFurtherFields = !("3" in args)
      ;
      precedenceLog = [(isRetValue && isArgsArray && isJoinpoint && isNoFurtherFields) ? "passed" : "failed"];

      return precedenceLog[0];
    },


    resetFunctionPrototype = function () {
      delete functionPrototype.before;
      delete functionPrototype.after; // afterReturning
      delete functionPrototype.around;
      delete functionPrototype.afterFinally;
      delete functionPrototype.afterThrowing;
    }
  ;
  resetFunctionPrototype();


  Enumerable_first_last_item.call(fooBarBazList);

  Controllable_afterThrowing_afterFinally.call(fooBarBazList.first);
  Controllable_afterThrowing_afterFinally.call(fooBarBazList.last);
  Controllable_afterThrowing_afterFinally.call(fooBarBazList.item);

  Controllable_afterThrowing_afterFinally.call(throwException);


  it("should - if required via »( composable. )require(\"components.Controllable_adviceTypes_afterThrowing_afterFinally\")« - always be a \"function\" type.", function () {
    expect(typeof Controllable_afterThrowing_afterFinally).toBe("function");
  });


  describe("This module being a functional Trait", function () {

    it([

      "should - if applied onto a function object e.g. »Controllable_afterThrowing_afterFinally.call(anyFunctionObject)«",
      "- always provide its modifier methods [afterThrowing] and [afterFinally]."

    ].join(" "), function () {

      resetFunctionPrototype();
      expect(functionPrototype.afterThrowing).toBeUndefined();
      expect(functionPrototype.afterFinally).toBeUndefined();
      expect(getBar.afterThrowing).toBeUndefined();
      expect(getFoo.afterFinally).toBeUndefined();

      Controllable_afterThrowing_afterFinally.call(getFoo);
      Controllable_afterThrowing_afterFinally.call(getBar);
      Controllable_afterThrowing_afterFinally.call(getBaz);

      expect(typeof getFoo.afterThrowing).toBe("function");
      expect(typeof getFoo.afterFinally).toBe("function");

      expect(typeof getBar.afterThrowing).toBe("function");
      expect(typeof getBar.afterFinally).toBe("function");

      expect(typeof getBaz.afterThrowing).toBe("function");
      expect(typeof getBaz.afterFinally).toBe("function");
    });


    describe("As for [afterThrowing]", function () {

      it([

        "it accepts up to 3 parameters - firstly the mandatory [adviceHandler] that provides the additional",
        "behavior that is going to be invoked right after the original functionality was invoked.",
        "Secondly the optional but recommended [target] that provides the target object within that's context",
        "all methods get invoked. At last a [joinpoint] argument that only is of relevance in case [afterThrowing]",
        "is used from within a real Aspect Oriented System."

      ].join(" "), function () {

        expect(getFoo.afterThrowing.length).toBe(3);
        expect(getBar.afterThrowing.length).toBe(3);
        expect(getBaz.afterThrowing.length).toBe(3);
      });

      it([

        "should - if used properly - return a function object, that - if invoked - executes the code",
        "of the additionally provided function right after it has executed the very same function [afterThrowing]",
        "did operate on - the return value of the modified function should equal the return value of the",
        "operated function. The additionally provided function will be invoked only in case of invoking",
        "the original/operated function did raise an exception. Then the additionally provided function",
        "is able to access as its first argument the exception object. Its second argument is the [arguments]",
        "array of the newly created and returned function object. And its third argument was an optional [joinpoint]",
        "object that only is passed from within real aspect oriented systems."

      ].join(" "), function () {

        resetModifierTest();
        expect(typeof writeIntoLog).not.toBe("function");

        writeIntoLog = getBar.afterThrowing(getFoo);
        expect(typeof writeIntoLog).toBe("function");

        returnValue = writeIntoLog();
        expect(precedenceLog.join("")).toBe(getBar()/* + getFoo()*/); // no exception - no writing into [precedenceLog]
        expect(returnValue).toBe(getBar());


        resetModifierTest();
        expect(typeof writeIntoLog).not.toBe("function");

        writeIntoLog = getFoo.afterThrowing(getBaz);
        expect(typeof writeIntoLog).toBe("function");

        returnValue = writeIntoLog();
        expect(precedenceLog.join("")).toBe(getFoo()/* + getBaz()*/); // no exception - no writing into [precedenceLog]
        expect(returnValue).toBe(getFoo());


        resetModifierTest();
        returnValue = (throwException.afterThrowing(proveAfterThrowing)).call();
        expect(returnValue).toBeUndefined();      // exception thrown - the return value could not be assigned.
        expect(precedenceLog[0]).toBe("passed");  // exception thrown - all arguments have been passed properly.
      });
    });


    describe("As for [afterFinally]", function () {

      it([

        "it accepts up to 3 parameters - firstly the mandatory [adviceHandler] that provides the additional",
        "behavior that is going to be invoked right after the original functionality was invoked.",
        "Secondly the optional but recommended [target] that provides the target object within that's context",
        "all methods get invoked. At last a [joinpoint] argument that only is of relevance in case [afterFinally]",
        "is used from within a real Aspect Oriented System."

      ].join(" "), function () {

        expect(getFoo.afterFinally.length).toBe(3);
        expect(getBar.afterFinally.length).toBe(3);
        expect(getBaz.afterFinally.length).toBe(3);
      });

      it([

        "should - if used properly - return a function object, that - if invoked - executes the code",
        "of the additionally provided function right after it has executed the very same function [afterFinally]",
        "did operate on - the return value of the modified function should equal the return value of the",
        "operated function. The additionally provided function always will be invoked, regardless of invoking",
        "the original/operated function did raise an exception or not. Depending on the outcome of the",
        "[try ... catch] clause the additionally provided function is able to access as its first argument",
        "either the return value of the operated function or the raised exception. Its second argument",
        "is the [arguments] array of the newly created and returned function object. And its third argument",
        "was an optional [joinpoint] object that only is passed from within real aspect oriented systems."

      ].join(" "), function () {

        resetModifierTest();
        expect(typeof writeIntoLog).not.toBe("function");

        writeIntoLog = getBar.afterFinally(getFoo);
        expect(typeof writeIntoLog).toBe("function");

        returnValue = writeIntoLog();
        expect(precedenceLog.join("")).toBe(getBar() + getFoo()); // always write into [precedenceLog] regardless of exception or not.
        expect(returnValue).toBe(getBar());


        resetModifierTest();
        expect(typeof writeIntoLog).not.toBe("function");

        writeIntoLog = getFoo.afterFinally(getBaz);
        expect(typeof writeIntoLog).toBe("function");

        returnValue = writeIntoLog();
        expect(precedenceLog.join("")).toBe(getFoo() + getBaz()); // always write into [precedenceLog] regardless of exception or not.
        expect(returnValue).toBe(getFoo());


        resetModifierTest();
        returnValue = (throwException.afterFinally(proveAfterThrowing)).call();
        expect(returnValue).not.toBeUndefined();                  // - exception thrown - the return value could not be assigned ...
        expect(returnValue.message).toBe(throwExceptionMessage);  //   ... the exception will be provided instead.
        expect(precedenceLog[0]).toBe("passed");                  // - exception thrown - all arguments have been passed properly.


        resetModifierTest();
        returnValue = (getBaz.afterFinally(proveAfterReturningFooBarBaz)).call();
        expect(returnValue).toBe(getBaz());       // no exception ...
        expect(precedenceLog[0]).toBe("passed");  // ... but always has to invoke the additionally provided function.


        resetModifierTest();
        returnValue = (getFoo.afterFinally(proveAfterReturningFooBarBaz)).call();
        expect(returnValue).toBe(getFoo());       // no exception ...
        expect(precedenceLog[0]).toBe("passed");  // ... but always has to invoke the additionally provided function.


        resetModifierTest();
        returnValue = (getBar.afterFinally(proveAfterReturningFooBarBaz)).call();
        expect(returnValue).toBe(getBar());       // no exception ...
        expect(precedenceLog[0]).toBe("passed");  // ... but always has to invoke the additionally provided function.
      });
    });
  });
});
