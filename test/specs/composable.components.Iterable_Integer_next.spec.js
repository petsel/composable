

describe("»components.Iterable_Integer_next« module", function () {


  var
    GLOBAL_OBJECT = ((window && window.window === window) && window) || ((global && global.global === global) && global) || this,

    require = GLOBAL_OBJECT.composable.require,

    Iterable_Integer_next = require("components.Iterable_Integer_next"),


    isSafari = (GLOBAL_OBJECT.navigator && GLOBAL_OBJECT.navigator.userAgent && (GLOBAL_OBJECT.navigator.userAgent.toLowerCase().indexOf("safari") >= 0)),


    Number = GLOBAL_OBJECT.Number
  ;


  it("should - if required via »( composable. )require(\"components.Iterable_Integer_next\")« - always be a \"function\" type.", function () {

    expect(Iterable_Integer_next && (typeof Iterable_Integer_next == "function")).toBe(true);
  });


  describe("This module being a generated Trait", function () {

    describe("should - if applied onto a number object - ", function () {
      it([
        "return that object in its enriched form."

      ].join(" "), function () {

        if (!isSafari) {                                                //  KNOWN ISSUE - client/browser depended: SAFARI SPECIFIC
                                                                        //
          // traits do work on objects only - not on primitives.        //  traits do work on objects only - not on primitives.
          expect(Iterable_Integer_next.call(5)).toBe(5);                //  but every client - except Safari - auto objectifies
          expect(typeof Iterable_Integer_next.call(5)).toBe("number");  //  number values at call time.
                                                                        //
          expect(Iterable_Integer_next.call(5).next).toBeUndefined();   //  thus this test does fail within Safari.
        }                                                               //

        // traits do work on objects only.
        expect(typeof Iterable_Integer_next.call(new Number(5))).toBe("object");
        expect(Iterable_Integer_next.call(new Number(5)).valueOf()).toBe(5);

        expect(typeof Iterable_Integer_next.call(new Number(5)).next).toBe("function");
      });

      describe("as for the applied [next] method", function () {
        it([
          "it should return the objects next integer representation as number value."

        ].join(" "), function () {

          expect(Iterable_Integer_next.call(new Number(5)).next()).toBe(6);

          // no chaining automation since a number value will be returned.
          expect(Iterable_Integer_next.call(new Number(5)).next().next).toBeUndefined();


          expect(Iterable_Integer_next.call(new Number(5.999999999999999)).next()).toBe(6);
          expect(Iterable_Integer_next.call(new Number(5.9999999999999999)).next()).toBe(7);

          expect(Iterable_Integer_next.call(new Number("5.999999999999999")).next()).toBe(6);
          expect(Iterable_Integer_next.call(new Number("5.9999999999999999")).next()).toBe(7);

          expect(Iterable_Integer_next.call(new Number("5,999999999999999")).next()).toBeUndefined();
        });

        it([
          "it should return [undefined] if it has reached the number value boundaries",
          "that JavaScript is capable of to safely handle as integers. This range is ±Math.pow(2, 53)."

        ].join(" "), function () {

          expect(Iterable_Integer_next.call(new Number(Math.pow(2, 53) - 3)).next()).toBe(Math.pow(2, 53) - 2);
          expect(Iterable_Integer_next.call(new Number(Math.pow(2, 53) - 2)).next()).toBe(Math.pow(2, 53) - 1);
          expect(Iterable_Integer_next.call(new Number(Math.pow(2, 53) - 1)).next()).toBe(Math.pow(2, 53));
          expect(Iterable_Integer_next.call(new Number(Math.pow(2, 53))).next()).toBeUndefined();

          expect(Iterable_Integer_next.call(new Number(-1 * Math.pow(2, 53))).next()).toBe((-1 * Math.pow(2, 53)) + 1);
        });
      });
    });


  });
});
