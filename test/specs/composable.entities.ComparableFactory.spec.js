

describe("»entities.ComparableFactory« module", function () {


  var
    GLOBAL_OBJECT = ((window && window.window === window) && window) || ((global && global.global === global) && global) || this,

    require = GLOBAL_OBJECT.composable.require,

    ComparableFactory = require("entities.ComparableFactory"),


    Comparable_default,
    Comparable_custom,

    comp_1 = {foo: "bar"},
    comp_2 = {foo: "baz"},
    comp_3 = {foo: "biz"},

    comp_4 = {foo: "bar"},
    comp_5 = {foo: "bar"},

    customValueOf = function (type) {
      return type.foo;
    },
    customCompare = function (typeA, typeB) {
      var
        valueA = typeA.foo,
        valueB = typeB.foo
      ;
      return (valueA < valueB) ? -1 : ((valueA > valueB) ? 1 : ((valueA === valueB) ? 0 : void 0));
    }
  ;


  it("should - if required via »( composable. )require(\"entities.ComparableFactory\")« - always be a real \"object\" type.", function () {

    expect(ComparableFactory && (typeof ComparableFactory == "object")).toBe(true);
  });


  describe("This module being a factory", function () {

    it([
      "should feature its sole methods [create]."

    ].join(" "), function () {

      expect(typeof ComparableFactory.create).toBe("function");
    });

    describe("As for [create]", function () {
      it([

        "it optionally accepts a single argument - a function that if it gets passed should supply",
        "customized comparison code that internally will be run on both comparable objects that will",
        "be injected as arguments into this custom compare method."

      ].join(" "), function () {

        expect(ComparableFactory.create.length).toBe(1);
      });

      it([
        "it should - if invoked - return an [Comparable] Trait that itself is a function object."

      ].join(" "), function () {

        Comparable_default = ComparableFactory.create();
        Comparable_custom = ComparableFactory.create(customCompare);

        expect(typeof Comparable_default).toBe("function");
        expect(typeof Comparable_custom).toBe("function");
      });


      describe("As for every object that has applied a Comparable Trait onto it", function () {
        it([

          "it always should feature both compare methods [compareTo] and [inBetween]."

        ].join(" "), function () {

          Comparable_default.call(comp_1);
          Comparable_default.call(comp_2);

          Comparable_custom.call(comp_3);
          Comparable_custom.call(comp_4);
          Comparable_custom.call(comp_5);

          expect(typeof comp_1.compareTo).toBe("function");
          expect(typeof comp_2.compareTo).toBe("function");
          expect(typeof comp_3.compareTo).toBe("function");
          expect(typeof comp_4.compareTo).toBe("function");

          expect(typeof comp_1.inBetween).toBe("function");
          expect(typeof comp_2.inBetween).toBe("function");
          expect(typeof comp_3.inBetween).toBe("function");
          expect(typeof comp_4.inBetween).toBe("function");
        });

        describe("As for [compareTo]", function () {
          it([

            "it accepts two arguments - the mandatory type that is going to be compared to the type this method",
            "operates on and an optional [valueOf] method that, if it is provided, will process both comparable",
            "objects and return theirs values that then get compared to one another by [compareTo]."

          ].join(" "), function () {

            expect(comp_1.compareTo.length).toBe(2);
            expect(comp_2.compareTo.length).toBe(2);
            expect(comp_3.compareTo.length).toBe(2);
            expect(comp_4.compareTo.length).toBe(2);
          });

          describe([

            "As for having created a Comparable Trait without providing",
            "a comparison function but having it applied to objects."

          ].join(" "), function () {
            it([

              "[compareTo] then should return undefined for every comparison",
              "unless an object is compared to itself - then the return value should be 0 (Zero)."

            ].join(" "), function () {

              expect(comp_1.compareTo(comp_2)).toBeUndefined();
              expect(comp_1.compareTo(comp_3)).toBeUndefined();
              expect(comp_1.compareTo(comp_4)).toBeUndefined();
              expect(comp_2.compareTo(comp_3)).toBeUndefined();
              expect(comp_2.compareTo(comp_4)).toBeUndefined();

              expect(comp_3.compareTo(comp_4)).toBe(1); // both feature custom comparison

              expect(comp_1.compareTo(comp_1)).toBe(0);
              expect(comp_2.compareTo(comp_2)).toBe(0);
              expect(comp_3.compareTo(comp_3)).toBe(0);
              expect(comp_4.compareTo(comp_4)).toBe(0);
            });

            it([
              "But with passing the additional \"valueOf\" functionality [compareTo] should return",
              "with each comparison one of its 3 other possible values - either 1, -1, or 0 (Zero)."

            ].join(" "), function () {

              expect(comp_1.compareTo(comp_2, customValueOf)).toBe(-1);
              expect(comp_1.compareTo(comp_3, customValueOf)).toBe(-1);
              expect(comp_2.compareTo(comp_3, customValueOf)).toBe(-1);

              expect(comp_3.compareTo(comp_1, customValueOf)).toBe(1);
              expect(comp_3.compareTo(comp_2, customValueOf)).toBe(1);
              expect(comp_2.compareTo(comp_1, customValueOf)).toBe(1);

              expect(comp_1.compareTo(comp_1, customValueOf)).toBe(0);
              expect(comp_2.compareTo(comp_2, customValueOf)).toBe(0);
              expect(comp_3.compareTo(comp_3, customValueOf)).toBe(0);

              expect(comp_1.compareTo(comp_4, customValueOf)).toBe(0);
              expect(comp_4.compareTo(comp_1, customValueOf)).toBe(0);
            });
          });

          describe([

            "As for having created a Comparable Trait with providing",
            "functional comparison and having it applied to objects."

          ].join(" "), function () {
            it([

              "[compareTo] then should return one of its 3 other possible values",
              "besides and different from [undefined] - either 1, -1, or 0 (Zero)."

            ].join(" "), function () {

              ComparableFactory.create(customCompare).call(comp_2);


              expect(comp_1.compareTo(comp_2)).toBeUndefined();
              expect(comp_1.compareTo(comp_3)).toBeUndefined();
              expect(comp_1.compareTo(comp_4)).toBeUndefined();

              expect(comp_2.compareTo(comp_3)).toBe(-1);
              expect(comp_2.compareTo(comp_4)).toBe(1);

              expect(comp_3.compareTo(comp_2)).toBe(1);
              expect(comp_3.compareTo(comp_4)).toBe(1);

              expect(comp_4.compareTo(comp_2)).toBe(-1);
              expect(comp_4.compareTo(comp_3)).toBe(-1);

              // since it is compared to itself and does not need to have bound a custom compare method to it.
              expect(comp_1.compareTo(comp_1)).toBe(0);

              // since they are compared each to itself, thus not having run the custom compare method on themself.
              expect(comp_2.compareTo(comp_2)).toBe(0);
              expect(comp_3.compareTo(comp_3)).toBe(0);

              // real use of the custom compare method in each case with the method of the left-hand operated object.
              expect(comp_4.compareTo(comp_5)).toBe(0);
              expect(comp_5.compareTo(comp_4)).toBe(0);


              // RESET - otherwise tests beneath will fail
              Comparable_default.call(comp_2);
            });
          });
        });

        describe("As for [inBetween]", function () {
          it([

            "it accepts three arguments - both mandatory first and second types that are going to be compared to the",
            "type this method operates on and 3rdly an optional [valueOf] method that, if it is provided, will process",
            "all three comparable objects and return theirs values that then get compared to one another by [inBetween]."

          ].join(" "), function () {

            expect(comp_1.inBetween.length).toBe(3);
            expect(comp_2.inBetween.length).toBe(3);
            expect(comp_3.inBetween.length).toBe(3);
            expect(comp_4.inBetween.length).toBe(3);
          });

          describe([

            "As for having created a Comparable Trait without providing",
            "a comparison function but having it applied to objects."

          ].join(" "), function () {
            it([

              "[inBetween] then should return false for every comparison."

            ].join(" "), function () {

              expect(comp_1.inBetween(comp_2, comp_3)).toBe(false);
              expect(comp_1.inBetween(comp_2, comp_4)).toBe(false);
              expect(comp_1.inBetween(comp_3, comp_4)).toBe(false);

              expect(comp_2.inBetween(comp_1, comp_3)).toBe(false);
              expect(comp_2.inBetween(comp_1, comp_4)).toBe(false);
              expect(comp_2.inBetween(comp_3, comp_4)).toBe(false);

              expect(comp_3.inBetween(comp_1, comp_2)).toBe(false);
              expect(comp_3.inBetween(comp_1, comp_4)).toBe(false);
              expect(comp_3.inBetween(comp_2, comp_4)).toBe(false);

              expect(comp_4.inBetween(comp_1, comp_2)).toBe(false);
              expect(comp_4.inBetween(comp_1, comp_3)).toBe(false);
              expect(comp_4.inBetween(comp_2, comp_3)).toBe(false);

                                                                    // regardless of
              expect(comp_1.inBetween(comp_1, comp_1)).toBe(false); // - not having a bound custom compare method.
              expect(comp_4.inBetween(comp_4, comp_4)).toBe(false); // - being able of using a custom compare method.
            });

            it([
              "But with passing the additional \"valueOf\" functionality [compareTo]",
              "should return with each comparison [true] or even [false] again."

            ].join(" "), function () {

              expect(comp_1.inBetween(comp_2, comp_3, customValueOf)).toBe(false);
              expect(comp_1.inBetween(comp_2, comp_4, customValueOf)).toBe(false);  // [comp_4] structurally equals [comp_1]
              expect(comp_1.inBetween(comp_3, comp_4, customValueOf)).toBe(false);  //

              expect(comp_2.inBetween(comp_1, comp_3, customValueOf)).toBe(true);
              expect(comp_2.inBetween(comp_1, comp_4, customValueOf)).toBe(false);  // [comp_4] structurally equals [comp_1]
              expect(comp_2.inBetween(comp_3, comp_4, customValueOf)).toBe(true);   //  - "" -

              expect(comp_3.inBetween(comp_1, comp_2, customValueOf)).toBe(false);
              expect(comp_3.inBetween(comp_1, comp_4, customValueOf)).toBe(false);  // [comp_4] structurally equals [comp_1]
              expect(comp_3.inBetween(comp_2, comp_4, customValueOf)).toBe(false);  //  - "" -

              expect(comp_4.inBetween(comp_1, comp_2, customValueOf)).toBe(false);
              expect(comp_4.inBetween(comp_1, comp_3, customValueOf)).toBe(false);
              expect(comp_4.inBetween(comp_2, comp_3, customValueOf)).toBe(false);


              expect(comp_1.inBetween(comp_1, comp_1, customValueOf)).toBe(false);
              expect(comp_4.inBetween(comp_4, comp_4, customValueOf)).toBe(false);
            });
          });

          describe([

            "As for having created a Comparable Trait with providing",
            "functional comparison and having it applied to objects."

          ].join(" "), function () {
            it([

              "[inBetween] then should return either [true] or [false]."

            ].join(" "), function () {

              ComparableFactory.create(customCompare).call(comp_2);
              comp_5 = {foo: "buz"};
              ComparableFactory.create(customCompare).call(comp_5);

              // edge cases
              expect(comp_1.compareTo(comp_3)).toBeUndefined(); // [comp_1] can't be processed 'cause it has no compare method.
              expect(comp_3.compareTo(comp_1)).toBe(1);         // [comp_1] gets processed by [comp_3]'s custom compare method.

              expect(comp_2.inBetween(comp_1, comp_3, customValueOf)).toBe(true); // [comp_1] relies on [customValueOf]
              expect(comp_2.inBetween(comp_1, comp_3)).toBe(true);                // both [comp_1] and [comp_3] are processed
                                                                                  // ... by [comp_2]'s custom compare method.


              expect(comp_2.inBetween(comp_3, comp_4)).toBe(true);  // [comp_4] structurally equals [comp_1]
              expect(comp_2.inBetween(comp_4, comp_3)).toBe(true);  //  - "" -

              expect(comp_2.inBetween(comp_3, comp_5)).toBe(false);

              expect(comp_3.inBetween(comp_1, comp_2)).toBe(false);
              expect(comp_3.inBetween(comp_1, comp_3)).toBe(false);
              expect(comp_3.inBetween(comp_1, comp_4)).toBe(false);  // [comp_4] structurally equals [comp_1]

              expect(comp_3.inBetween(comp_1, comp_5)).toBe(true);
              expect(comp_3.inBetween(comp_5, comp_1)).toBe(true);
              expect(comp_3.inBetween(comp_2, comp_5)).toBe(true);
              expect(comp_3.inBetween(comp_5, comp_2)).toBe(true);
            });
          });
        });
      });
    });
  });
});
