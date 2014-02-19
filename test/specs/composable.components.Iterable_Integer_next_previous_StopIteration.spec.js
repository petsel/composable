

describe("»components.Iterable_Integer_next_previous_StopIteration« module", function () {


  var
    GLOBAL_OBJECT = ((window && window.window === window) && window) || ((global && global.global === global) && global) || this,

    require = GLOBAL_OBJECT.composable.require,

    IterableFactory = require("entities.IterableFactory"),
    Iterable_Integer_next_previous_StopIteration = require("components.Iterable_Integer_next_previous_StopIteration"),

    stopIterationException,

    isStopIteration = IterableFactory.isStopIteration,


    isSafari = (GLOBAL_OBJECT.navigator && GLOBAL_OBJECT.navigator.userAgent && (GLOBAL_OBJECT.navigator.userAgent.toLowerCase().indexOf("safari") >= 0)),


    Number = GLOBAL_OBJECT.Number
  ;


  it("should - if required via »( composable. )require(\"components.Iterable_Integer_next_previous_StopIteration\")« - always be a \"function\" type.", function () {

    expect(Iterable_Integer_next_previous_StopIteration && (typeof Iterable_Integer_next_previous_StopIteration == "function")).toBe(true);
  });


  describe("This module being a factory", function () {


    describe("should - if applied onto a number object - ", function () {
      it([
        "return that object in its enriched form."

      ].join(" "), function () {

        if (!isSafari) {                                                                      //  KNOWN ISSUE - client/browser depended: SAFARI SPECIFIC
                                                                                              //
          // traits do work on objects only - not on primitives.                              //  traits do work on objects only - not on primitives.
          expect(Iterable_Integer_next_previous_StopIteration.call(5)).toBe(5);               //  but every client - except Safari - auto objectifies
          expect(typeof Iterable_Integer_next_previous_StopIteration.call(5)).toBe("number"); //  number values at call time.
                                                                                              //
          expect(Iterable_Integer_next_previous_StopIteration.call(5).next).toBeUndefined();  //  thus this test does fail within Safari.
        }                                                                                     //

        // traits do work on objects only.
        expect(typeof Iterable_Integer_next_previous_StopIteration.call(new Number(5))).toBe("object");
        expect(Iterable_Integer_next_previous_StopIteration.call(new Number(5)).valueOf()).toBe(5);

        expect(typeof Iterable_Integer_next_previous_StopIteration.call(new Number(5)).next).toBe("function");
        expect(typeof Iterable_Integer_next_previous_StopIteration.call(new Number(5)).previous).toBe("function");
      });

      describe("as for the applied [next] method", function () {
        it([
          "it should return the objects next integer representation as number value."

        ].join(" "), function () {

          expect(Iterable_Integer_next_previous_StopIteration.call(new Number(5)).next()).toBe(6);

          // no chaining automation since a number value will be returned.
          expect(Iterable_Integer_next_previous_StopIteration.call(new Number(5)).next().next).toBeUndefined();


          expect(Iterable_Integer_next_previous_StopIteration.call(new Number(5.999999999999999)).next()).toBe(6);
          expect(Iterable_Integer_next_previous_StopIteration.call(new Number(5.9999999999999999)).next()).toBe(7);

          expect(Iterable_Integer_next_previous_StopIteration.call(new Number("5.999999999999999")).next()).toBe(6);
          expect(Iterable_Integer_next_previous_StopIteration.call(new Number("5.9999999999999999")).next()).toBe(7);

          stopIterationException = null;
          expect(stopIterationException).toBeNull();
          try {
            Iterable_Integer_next_previous_StopIteration.call(new Number("5,999999999999999")).next();
          } catch (exc) {
            stopIterationException = exc;
          }
          expect(stopIterationException).not.toBeNull();
          expect(isStopIteration(stopIterationException)).toBe(true);
        });

        it([
          "it should throw [StopIteration] if it has reached the number value boundaries",
          "that JavaScript is capable of to safely handle as integers. This range is ±Math.pow(2, 53)."

        ].join(" "), function () {

          expect(Iterable_Integer_next_previous_StopIteration.call(new Number(Math.pow(2, 53) - 3)).next()).toBe(Math.pow(2, 53) - 2);
          expect(Iterable_Integer_next_previous_StopIteration.call(new Number(Math.pow(2, 53) - 2)).next()).toBe(Math.pow(2, 53) - 1);
          expect(Iterable_Integer_next_previous_StopIteration.call(new Number(Math.pow(2, 53) - 1)).next()).toBe(Math.pow(2, 53));

          stopIterationException = null;
          expect(stopIterationException).toBeNull();
          try {
            Iterable_Integer_next_previous_StopIteration.call(new Number(Math.pow(2, 53))).next();
          } catch (exc) {
            stopIterationException = exc;
          }
          expect(stopIterationException).not.toBeNull();
          expect(isStopIteration(stopIterationException)).toBe(true);


          expect(Iterable_Integer_next_previous_StopIteration.call(new Number(-1 * Math.pow(2, 53))).next()).toBe((-1 * Math.pow(2, 53)) + 1);
        });
      });

      describe("as for the applied [previous] method", function () {
        it([
          "it should return the objects previous integer representation as number value."

        ].join(" "), function () {

          expect(Iterable_Integer_next_previous_StopIteration.call(new Number(5)).previous()).toBe(4);

          // no chaining automation since a number value will be returned.
          expect(Iterable_Integer_next_previous_StopIteration.call(new Number(5)).previous().previous).toBeUndefined();


          expect(Iterable_Integer_next_previous_StopIteration.call(new Number(5.999999999999999)).previous()).toBe(4);
          expect(Iterable_Integer_next_previous_StopIteration.call(new Number(5.9999999999999999)).previous()).toBe(5);

          expect(Iterable_Integer_next_previous_StopIteration.call(new Number("5.999999999999999")).previous()).toBe(4);
          expect(Iterable_Integer_next_previous_StopIteration.call(new Number("5.9999999999999999")).previous()).toBe(5);

          stopIterationException = null;
          expect(stopIterationException).toBeNull();
          try {
            Iterable_Integer_next_previous_StopIteration.call(new Number("5,999999999999999")).previous();
          } catch (exc) {
            stopIterationException = exc;
          }
          expect(stopIterationException).not.toBeNull();
          expect(isStopIteration(stopIterationException)).toBe(true);
        });

        it([
          "it should throw [StopIteration] if it has reached the number value boundaries",
          "that JavaScript is capable of to safely handle as integers. This range is ±Math.pow(2, 53)."

        ].join(" "), function () {

          expect(Iterable_Integer_next_previous_StopIteration.call(new Number(-1 * Math.pow(2, 53) + 3)).previous()).toBe(-1 * Math.pow(2, 53) + 2);
          expect(Iterable_Integer_next_previous_StopIteration.call(new Number(-1 * Math.pow(2, 53) + 2)).previous()).toBe(-1 * Math.pow(2, 53) + 1);
          expect(Iterable_Integer_next_previous_StopIteration.call(new Number(-1 * Math.pow(2, 53) + 1)).previous()).toBe(-1 * Math.pow(2, 53));

          stopIterationException = null;
          expect(stopIterationException).toBeNull();
          try {
            Iterable_Integer_next_previous_StopIteration.call(new Number(-1 * Math.pow(2, 53))).previous();
          } catch (exc) {
            stopIterationException = exc;
          }
          expect(stopIterationException).not.toBeNull();
          expect(isStopIteration(stopIterationException)).toBe(true);


          expect(Iterable_Integer_next_previous_StopIteration.call(new Number(Math.pow(2, 53))).previous()).toBe((Math.pow(2, 53)) - 1);
        });
      });
    });


  });
});
