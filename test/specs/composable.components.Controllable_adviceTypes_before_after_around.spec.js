

describe("»components.Controllable_adviceTypes_before_after_around« module", function () {


  var
    GLOBAL_OBJECT = ((window && window.window === window) && window) || ((global && global.global === global) && global) || this,

    require = GLOBAL_OBJECT.composable.require,

    Controllable_before_after_around = require("components.Controllable_adviceTypes_before_after_around"),


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
      "foo",
      "bar",
      "baz"
    ],
    processFooBarBazList,

    getSecondItemBefore = function (argsArray, joinpoint) {
      var
        args = arguments,

        isArgsArray = (("0" in args) && isArguments(args[0]) && (args[0] === argsArray)),
        isJoinpoint = (("1" in args) && (args[1] === joinpoint)),

        isNoFurtherFields = !("2" in args)
      ;
      precedenceLog = [(isArgsArray && isJoinpoint && isNoFurtherFields) ? "passed" : "failed"];

      return this[1];
    },
    getThirdItemBefore = function (argsArray, joinpoint) {
      var
        args = arguments,

        isArgsArray = (("0" in args) && isArguments(args[0]) && (args[0] === argsArray)),
        isJoinpoint = (("1" in args) && (args[1] === joinpoint)),

        isNoFurtherFields = !("2" in args)
      ;
      precedenceLog = [(isArgsArray && isJoinpoint && isNoFurtherFields) ? "passed" : "failed"];

      return this[2];
    },
    getSecondItemAfter = function (returnValue, argsArray, joinpoint) {
      var
        args = arguments,

        isReturnValue = (("0" in args) && (args[0] === returnValue)),
        isArgsArray = (("1" in args) && isArguments(args[1]) && (args[1] === argsArray)),
        isJoinpoint = (("2" in args) && (args[2] === joinpoint)),

        isNoFurtherFields = !("3" in args)
      ;
      precedenceLog = [(isReturnValue && isArgsArray && isJoinpoint && isNoFurtherFields) ? "passed" : "failed"];

      return this[1];
    },
    getThirdItemAfter = function (returnValue, argsArray, joinpoint) {
      var
        args = arguments,

        isReturnValue = (("0" in args) && (args[0] === returnValue)),
        isArgsArray = (("1" in args) && isArguments(args[1]) && (args[1] === argsArray)),
        isJoinpoint = (("2" in args) && (args[2] === joinpoint)),

        isNoFurtherFields = !("3" in args)
      ;
      precedenceLog = [(isReturnValue && isArgsArray && isJoinpoint && isNoFurtherFields) ? "passed" : "failed"];

      return this[2];
    },


    restoreFunctionPrototype = function () {
      delete functionPrototype.before;
      delete functionPrototype.after; // afterFinally
      delete functionPrototype.around;
      delete functionPrototype.afterReturning;
      delete functionPrototype.afterThrowing;
    }
  ;
  restoreFunctionPrototype();


  Enumerable_first_last_item.call(fooBarBazList);

  Controllable_before_after_around.call(fooBarBazList.first);
  Controllable_before_after_around.call(fooBarBazList.last);
  Controllable_before_after_around.call(fooBarBazList.item);


  it("should - if required via »( composable. )require(\"components.Controllable_adviceTypes_before_after_around\")« - always be a \"function\" type.", function () {
    expect(typeof Controllable_before_after_around).toBe("function");
  });


  describe("This module being a functional Trait", function () {

    it([

      "should - if applied onto a function object e.g. »Controllable_before_after_around.call(anyFunctionObject)«",
      "- always provide its modifier methods [before], [after] and [around]."

    ].join(" "), function () {

      restoreFunctionPrototype();
      expect(functionPrototype.before).toBeUndefined();
      expect(functionPrototype.after).toBeUndefined();
      expect(functionPrototype.around).toBeUndefined();
      expect(getFoo.before).toBeUndefined();
      expect(getBar.after).toBeUndefined();
      expect(getBaz.around).toBeUndefined();

      Controllable_before_after_around.call(getFoo);
      Controllable_before_after_around.call(getBar);
      Controllable_before_after_around.call(getBaz);

      expect(typeof getFoo.before).toBe("function");
      expect(typeof getFoo.after).toBe("function");
      expect(typeof getFoo.around).toBe("function");

      expect(typeof getBar.before).toBe("function");
      expect(typeof getBar.after).toBe("function");
      expect(typeof getBar.around).toBe("function");

      expect(typeof getBaz.before).toBe("function");
      expect(typeof getBaz.after).toBe("function");
      expect(typeof getBaz.around).toBe("function");
    });


    describe("As for [before]", function () {

      it([

        "it accepts up to 3 parameters - firstly the mandatory [adviceHandler] that provides the additional",
        "behavior that is going to be invoked just before the original functionality gets invoked as well.",
        "Secondly the optional but recommended [target] that provides the target object within that's context",
        "all methods get invoked. At last the so far optional [joinpoint] argument that only will be passed to",
        "methods that have become part of a real Aspect Oriented System."

      ].join(" "), function () {

        expect(getFoo.before.length).toBe(3);
        expect(getBar.before.length).toBe(3);
        expect(getBaz.before.length).toBe(3);
      });

      it([

        "should - if used properly - return a function object, that - if invoked - executes the code",
        "of the additionally provided function just before it executes the very same function [before]",
        "did operate on - the return value of the modified function should equal the return value of the",
        "operated function. The additionally provided function is able to access as its first argument",
        "the [arguments] array of the newly created and returned function object. Its second argument",
        "was an optional [joinpoint] object that only is passed from within real aspect oriented systems."

      ].join(" "), function () {

        resetModifierTest();
        expect(typeof writeIntoLog).not.toBe("function");

        writeIntoLog = getBar.before(getFoo);
        expect(typeof writeIntoLog).toBe("function");

        returnValue = writeIntoLog();
        expect(precedenceLog.join("")).toBe(getFoo() + getBar());
        expect(returnValue).toBe(getBar());


        resetModifierTest();
        expect(typeof writeIntoLog).not.toBe("function");

        writeIntoLog = getFoo.before(getBaz);
        expect(typeof writeIntoLog).toBe("function");

        returnValue = writeIntoLog();
        expect(precedenceLog.join("")).toBe(getBaz() + getFoo());
        expect(returnValue).toBe(getFoo());


        processFooBarBazList/* = fooBarBazList.first*/ = fooBarBazList.first.before(getThirdItemBefore, fooBarBazList);
        returnValue/* = fooBarBazList.first();*/ = processFooBarBazList();

        expect(returnValue).toBe(fooBarBazList[0]);
        expect(precedenceLog[0]).toBe("passed");


        processFooBarBazList/* = fooBarBazList.last*/ = fooBarBazList.last.before(getSecondItemBefore, fooBarBazList);
        returnValue/* = fooBarBazList.last();*/ = processFooBarBazList();

        expect(returnValue).toBe(fooBarBazList[2]);
        expect(precedenceLog[0]).toBe("passed");


        processFooBarBazList/* = fooBarBazList.item*/ = fooBarBazList.item.before(getSecondItemBefore, fooBarBazList);
        returnValue/* = fooBarBazList.item(1);*/ = processFooBarBazList(1);

        expect(returnValue).toBe(fooBarBazList[1]);
        expect(precedenceLog[0]).toBe("passed");


        processFooBarBazList/* = fooBarBazList.item*/ = fooBarBazList.item.before(getThirdItemBefore, fooBarBazList);
        returnValue/* = fooBarBazList.item(2);*/ = processFooBarBazList(2);

        expect(returnValue).toBe(fooBarBazList[2]);
        expect(precedenceLog[0]).toBe("passed");
      });
    });


    describe("As for [after]", function () {

      it([

        "it accepts up to 3 parameters - firstly the mandatory [adviceHandler] that provides the additional",
        "behavior that is going to be invoked right after the original functionality was invoked.",
        "Secondly the optional but recommended [target] that provides the target object within that's context",
        "all methods get invoked. At last the so far optional [joinpoint] argument that only will be passed to",
        "methods that have become part of a real Aspect Oriented System."

      ].join(" "), function () {

        expect(getFoo.after.length).toBe(3);
        expect(getBar.after.length).toBe(3);
        expect(getBaz.after.length).toBe(3);
      });

      it([

        "should - if used properly - return a function object, that - if invoked - executes the code",
        "of the additionally provided function right after it has executed the very same function [after]",
        "did operate on - the return value of the modified function should equal the return value of the",
        "operated function. The additionally provided function is able to access as its first argument",
        "the return value of the operated function. Its second argument is the [arguments] array of the",
        "newly created and returned function object. And its third argument was an optional [joinpoint]",
        "object that only is passed from within real aspect oriented systems."

      ].join(" "), function () {

        resetModifierTest();
        expect(typeof writeIntoLog).not.toBe("function");

        writeIntoLog = getBar.after(getFoo);
        expect(typeof writeIntoLog).toBe("function");

        returnValue = writeIntoLog();
        expect(precedenceLog.join("")).toBe(getBar() + getFoo());
        expect(returnValue).toBe(getBar());


        resetModifierTest();
        expect(typeof writeIntoLog).not.toBe("function");

        writeIntoLog = getFoo.after(getBaz);
        expect(typeof writeIntoLog).toBe("function");

        returnValue = writeIntoLog();
        expect(precedenceLog.join("")).toBe(getFoo() + getBaz());
        expect(returnValue).toBe(getFoo());


        processFooBarBazList/* = fooBarBazList.first*/ = fooBarBazList.first.after(getThirdItemAfter, fooBarBazList);
        returnValue/* = fooBarBazList.first();*/ = processFooBarBazList();

        expect(returnValue).toBe(fooBarBazList[0]);
        expect(precedenceLog[0]).toBe("passed");


        processFooBarBazList/* = fooBarBazList.last*/ = fooBarBazList.last.after(getSecondItemAfter, fooBarBazList);
        returnValue/* = fooBarBazList.last();*/ = processFooBarBazList();

        expect(returnValue).toBe(fooBarBazList[2]);
        expect(precedenceLog[0]).toBe("passed");


        processFooBarBazList/* = fooBarBazList.item*/ = fooBarBazList.item.after(getSecondItemAfter, fooBarBazList);
        returnValue/* = fooBarBazList.item(1);*/ = processFooBarBazList(1);

        expect(returnValue).toBe(fooBarBazList[1]);
        expect(precedenceLog[0]).toBe("passed");


        processFooBarBazList/* = fooBarBazList.item*/ = fooBarBazList.item.after(getThirdItemAfter, fooBarBazList);
        returnValue/* = fooBarBazList.item(0);*/ = processFooBarBazList(0);

        expect(returnValue).toBe(fooBarBazList[0]);
        expect(precedenceLog[0]).toBe("passed");
      });
    });


    describe("As for [around]", function () {

      it([

        "it accepts up to 3 parameters - firstly the mandatory [adviceHandler] that provides the additional",
        "behavior that is going to be invoked right after the original functionality was invoked.",
        "Secondly the optional but recommended [target] that provides the target object within that's context",
        "all methods get invoked. At last the so far optional [joinpoint] argument that only will be passed to",
        "methods that have become part of a real Aspect Oriented System."

      ].join(" "), function () {

        expect(getFoo.around.length).toBe(3);
        expect(getBar.around.length).toBe(3);
        expect(getBaz.around.length).toBe(3);
      });

      it([

        "should - if used properly - return a function object, that - if invoked - executes the code",
        "of the additionally provided function. This function acts as interceptor. Thus it is able to",
        "access 1stly the intercepted function, 2ndly itself as intercepting function, 3rdly the [arguments]",
        "array of the intercepted function and finally at 4th position an optional [joinpoint] object",
        "that only gets passed from within real aspect oriented systems. The code provided within the",
        "interceptor's function body then is able of altering the control flow at ones convenience."

      ].join(" "), function () {

        resetModifierTest();
        expect(typeof writeIntoLog).not.toBe("function");

        writeIntoLog = getBaz.around(fooBarInterceptor);
        expect(typeof writeIntoLog).toBe("function");

        returnValue = writeIntoLog();
        expect(precedenceLog.join("")).toBe(getFoo() + getBaz() + getBar());
        expect(returnValue).toBe(true);


        resetModifierTest();
        expect(typeof writeIntoLog).not.toBe("function");

        writeIntoLog = getBar.around(fooBarInterceptor);
        expect(typeof writeIntoLog).toBe("function");

        returnValue = writeIntoLog();
        expect(precedenceLog.join("")).toBe(getFoo() + getBar() + getBar());
        expect(returnValue).toBe(true);


        resetModifierTest();
        expect(typeof writeIntoLog).not.toBe("function");

        writeIntoLog = getFoo.around(fooBarInterceptor);
        expect(typeof writeIntoLog).toBe("function");

        returnValue = writeIntoLog();
        expect(precedenceLog.join("")).toBe(getFoo() + getFoo() + getBar());
        expect(returnValue).toBe(true);
      });
    });
  });
});
