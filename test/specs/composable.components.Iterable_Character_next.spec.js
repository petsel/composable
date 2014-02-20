

describe("»components.Iterable_Character_next« module", function () {


  var
    GLOBAL_OBJECT = ((window && window.window === window) && window) || ((global && global.global === global) && global) || this,

    require = GLOBAL_OBJECT.composable.require,

    Iterable_Character_next = require("components.Iterable_Character_next"),


    isSafari = (GLOBAL_OBJECT.navigator && GLOBAL_OBJECT.navigator.userAgent && (GLOBAL_OBJECT.navigator.userAgent.toLowerCase().indexOf("safari") >= 0)),


    String = GLOBAL_OBJECT.String
  ;


  it("should - if required via »( composable. )require(\"components.Iterable_Character_next\")« - always be a \"function\" type.", function () {

    expect(Iterable_Character_next && (typeof Iterable_Character_next == "function")).toBe(true);
  });


  describe("This module being a generated Trait", function () {

    describe("should - if applied onto a string object - ", function () {
      it([
        "return that object in its enriched form."

      ].join(" "), function () {

        if (!isSafari) {                                                    //  KNOWN ISSUE - client/browser depended: SAFARI SPECIFIC
                                                                            //
          // traits do work on objects only - not on primitives.            //  traits do work on objects only - not on primitives.
          expect(Iterable_Character_next.call("E")).toBe("E");              //  but every client - except Safari - auto objectifies
          expect(typeof Iterable_Character_next.call("E")).toBe("string");  //  string values at call time.
                                                                            //
          expect(Iterable_Character_next.call("E").next).toBeUndefined();   //  thus this test does fail within Safari.
        }                                                                   //

        // traits do work on objects only.
        expect(typeof Iterable_Character_next.call(new String("E"))).toBe("object");
        expect(Iterable_Character_next.call(new String("E")).valueOf()).toBe("E");

        expect(typeof Iterable_Character_next.call(new String("E")).next).toBe("function");
      });

      describe("as for the applied [next] method", function () {
        it([
          "it should return the objects next character representation as string value."

        ].join(" "), function () {

          expect(Iterable_Character_next.call(new String("E")).next()).toBe("F");
          expect(Iterable_Character_next.call(new String("F")).next()).toBe("G");

          expect(Iterable_Character_next.call(new String("a")).next()).toBe("b");
          expect(Iterable_Character_next.call(new String("b")).next()).toBe("c");

          // no chaining automation since a string value will be returned.
          expect(Iterable_Character_next.call(new String("E")).next().next).toBeUndefined();


          expect(Iterable_Character_next.call(new String("EF")).next()).toBeUndefined();
          expect(Iterable_Character_next.call(new String("")).next()).toBeUndefined();
        });
      });
    });


  });
});
