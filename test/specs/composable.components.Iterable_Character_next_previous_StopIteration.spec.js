

describe("»components.Iterable_Character_next_previous_StopIteration« module", function () {


  var
    GLOBAL_OBJECT = ((window && window.window === window) && window) || ((global && global.global === global) && global) || this,

    require = GLOBAL_OBJECT.composable.require,

    IterableFactory = require("entities.IterableFactory"),
    Iterable_Character_next_previous_StopIteration = require("components.Iterable_Character_next_previous_StopIteration"),

    stopIterationException,

    isStopIteration = IterableFactory.isStopIteration,


    isSafari = (GLOBAL_OBJECT.navigator && GLOBAL_OBJECT.navigator.userAgent && (GLOBAL_OBJECT.navigator.userAgent.toLowerCase().indexOf("safari") >= 0)),


    String = GLOBAL_OBJECT.String
  ;


  it("should - if required via »( composable. )require(\"components.Iterable_Character_next_previous_StopIteration\")« - always be a \"function\" type.", function () {

    expect(Iterable_Character_next_previous_StopIteration && (typeof Iterable_Character_next_previous_StopIteration == "function")).toBe(true);
  });


  describe("This module being a factory", function () {

    describe("should - if applied onto a string object - ", function () {
      it([
        "return that object in its enriched form."

      ].join(" "), function () {

        if (!isSafari) {                                                                          //  KNOWN ISSUE - client/browser depended: SAFARI SPECIFIC
                                                                                                  //
          // traits do work on objects only - not on primitives.                                  //  traits do work on objects only - not on primitives.
          expect(Iterable_Character_next_previous_StopIteration.call("E")).toBe("E");             //  but every client - except Safari - auto objectifies
          expect(typeof Iterable_Character_next_previous_StopIteration.call("E")).toBe("string"); //  string values at call time.
                                                                                                  //
          expect(Iterable_Character_next_previous_StopIteration.call("E").next).toBeUndefined();  //  thus this test does fail within Safari.
        }                                                                                         //

        // traits do work on objects only.
        expect(typeof Iterable_Character_next_previous_StopIteration.call(new String("E"))).toBe("object");
        expect(Iterable_Character_next_previous_StopIteration.call(new String("E")).valueOf()).toBe("E");

        expect(typeof Iterable_Character_next_previous_StopIteration.call(new String("E")).next).toBe("function");
      });

      describe("as for the applied [next] method", function () {
        it([
          "it should return the objects next character representation as string value."

        ].join(" "), function () {

          expect(Iterable_Character_next_previous_StopIteration.call(new String("E")).next()).toBe("F");
          expect(Iterable_Character_next_previous_StopIteration.call(new String("F")).next()).toBe("G");

          expect(Iterable_Character_next_previous_StopIteration.call(new String("a")).next()).toBe("b");
          expect(Iterable_Character_next_previous_StopIteration.call(new String("b")).next()).toBe("c");

          // no chaining automation since a string value will be returned.
          expect(Iterable_Character_next_previous_StopIteration.call(new String("E")).next().next).toBeUndefined();
        });
      });

      describe("as for the applied [previous] method", function () {
        it([
          "it should return the objects previous character representation as string value."

        ].join(" "), function () {

          expect(Iterable_Character_next_previous_StopIteration.call(new String("E")).previous()).toBe("D");
          expect(Iterable_Character_next_previous_StopIteration.call(new String("F")).previous()).toBe("E");

          expect(Iterable_Character_next_previous_StopIteration.call(new String("a")).previous()).toBe("`");
          expect(Iterable_Character_next_previous_StopIteration.call(new String("b")).previous()).toBe("a");

          // no chaining automation since a string value will be returned.
          expect(Iterable_Character_next_previous_StopIteration.call(new String("E")).previous().previous).toBeUndefined();
        });
      });

      it([
        "it should throw [StopIteration] if character value boundaries are reached or if [next] or [previous]",
        "are invoked for invalid strings e.g. those that feature a length distinct from 1."

      ].join(" "), function () {

        stopIterationException = null;
        expect(stopIterationException).toBeNull();
        try {
          Iterable_Character_next_previous_StopIteration.call(new String("EF")).next()
        } catch (exc) {
          stopIterationException = exc;
        }
        expect(stopIterationException).not.toBeNull();
        expect(isStopIteration(stopIterationException)).toBe(true);

        stopIterationException = null;
        expect(stopIterationException).toBeNull();
        try {
          Iterable_Character_next_previous_StopIteration.call(new String("")).next()
        } catch (exc) {
          stopIterationException = exc;
        }
        expect(stopIterationException).not.toBeNull();
        expect(isStopIteration(stopIterationException)).toBe(true);


        stopIterationException = null;
        expect(stopIterationException).toBeNull();
        try {
          Iterable_Character_next_previous_StopIteration.call(new String("EF")).previous()
        } catch (exc) {
          stopIterationException = exc;
        }
        expect(stopIterationException).not.toBeNull();
        expect(isStopIteration(stopIterationException)).toBe(true);

        stopIterationException = null;
        expect(stopIterationException).toBeNull();
        try {
          Iterable_Character_next_previous_StopIteration.call(new String("")).previous()
        } catch (exc) {
          stopIterationException = exc;
        }
        expect(stopIterationException).not.toBeNull();
        expect(isStopIteration(stopIterationException)).toBe(true);
      });
    });


  });
});
