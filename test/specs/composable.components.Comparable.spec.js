

describe("»components.Comparable« module", function () {


  var
    GLOBAL_OBJECT = ((window && window.window === window) && window) || ((global && global.global === global) && global) || this,

    require = GLOBAL_OBJECT.composable.require,

    Comparable = require("components.Comparable")
  ;
  it([

    "should - if required via »( composable. )require(\"components.Comparable\")« -",
    "always be a \"function\" type."

  ].join(" "), function () {

    expect(typeof Comparable).toBe("function");
  });


  describe("This module being a privileged functional Trait ...", function () {

    var
      x = {"x":"x"},
      y = {"x":"y"},
      z = {"x":"z"},

      a = {"a":"a"},
      b = {"a":"b"},
      c = {"a":"c"},

      compareXProperties = function (a, b) {
        return (
          (((a = a.x) > (b = b.x)) && 1)

          || ((a < b) && -1)
        //|| 0                        // - the ZERO value ist not automatically the fallback ...
          || ((a === b) ? 0 : void 0) // - ... as for the UNDEFINED value, the 4th possible return value,
        );                            //   please countercheck with [http://apidock.com/ruby/Comparable].
      },
      valueOfXProperty = function (type) {
        return type.x;
      },
      string_prototype = GLOBAL_OBJECT.String.prototype,
      number_prototype = GLOBAL_OBJECT.Number.prototype
    ;
    Comparable.call(x, compareXProperties);
    Comparable.call(y, compareXProperties);
    Comparable.call(z, compareXProperties);

    Comparable.call(a, compareXProperties);
    Comparable.call(b, compareXProperties);
    Comparable.call(c, compareXProperties);

    it([

      "... optionally accepts - if going to be applied onto / delegated to an object - a custom compare method",
      "as its sole argument - e.g. »Comparable.call(MyOwnTypeConstructor.prototype, myOwnTypeComparison)« -",
      "thus immediately providing both of its implemented methods [compareTo] and [inBetween] to that object."

    ].join(" "), function () {

      expect(Comparable.length).toBe(1);

      expect(typeof x.compareTo).toBe("function");
      expect(typeof y.compareTo).toBe("function");
      expect(typeof z.compareTo).toBe("function");

      expect(typeof x.inBetween).toBe("function");
      expect(typeof y.inBetween).toBe("function");
      expect(typeof z.inBetween).toBe("function");

      /**
       *  due to "Comparable" being a privileged Trait that encapsulates [compareTypes]
       *  it is not able to delegate its both methods [compareTo] and [inBetween] as
       *  shared references to objects - each object gets its own set of methods applied
       *  that do not equal amongst one another even though they are equally implemented.
       */
    //expect(x.compareTo === y.compareTo).toBe(true); // does fail - see explanation above
    //expect(x.inBetween).toBe(y.inBetween);          // does fail - see explanation above

      expect(""+x.compareTo == ""+y.compareTo).toBe(true);
      expect(""+x.inBetween == ""+y.inBetween).toBe(true);
    });


    describe("As for [compareTo]", function () {

      it([

        "... it should return [undefined] explicitly in case the compare method is missing and both types can not be",
        "compared to one another directly or in case the comparison scheme of such a method does not match the form",
        "of at least one of the types that are compared to one another."

      ].join(" "), function () {

        expect(a.compareTo(b)).toBe(0); // a.x === undefined :: b.x === undefined :: a.x === b.x :: comparison result is 0
        expect(a.compareTo(c)).toBe(0); // a.x === undefined :: c.x === undefined :: a.x === c.x :: comparison result is 0
        expect(b.compareTo(c)).toBe(0); // b.x === undefined :: c.x === undefined :: b.x === c.x :: comparison result is 0

        expect(a.compareTo(x)).toBeUndefined(); // a.x === undefined :: x.x === "x" :: a.x and x.x do not properly compare
        expect(a.compareTo(y)).toBeUndefined(); // a.x === undefined :: y.x === "y" :: a.x and y.x do not properly compare
        expect(a.compareTo(z)).toBeUndefined(); // a.x === undefined :: z.x === "z" :: a.x and z.x do not properly compare


        Comparable.call(x); // no compare method provided
        Comparable.call(y); // no compare method provided
        Comparable.call(z); // no compare method provided

        expect(x.compareTo(y)).toBeUndefined(); // compare method is missing :: x and y do not properly compare
        expect(x.compareTo(z)).toBeUndefined(); // compare method is missing :: x and z do not properly compare
        expect(y.compareTo(z)).toBeUndefined(); // compare method is missing :: y and z do not properly compare


        Comparable.call(x, compareXProperties); // restore initial test state
        Comparable.call(y, compareXProperties); // restore initial test state
        Comparable.call(z, compareXProperties); // restore initial test state
      });

      it([

        "... In any other case it should return -1, 1, 0 or even [undefined] again according to the implementation",
        "of the provided compare method or if the latter was omitted according to the internal fallback comparison."

      ].join(" "), function () {

        expect(x.compareTo(y)).toBe(-1);
        expect(x.compareTo(z)).toBe(-1);
        expect(y.compareTo(z)).toBe(-1);

        expect(x.compareTo(x)).toBe(0);
        expect(y.compareTo(y)).toBe(0);
        expect(z.compareTo(z)).toBe(0);

        expect(z.compareTo(y)).toBe(1);
        expect(z.compareTo(x)).toBe(1);
        expect(y.compareTo(x)).toBe(1);

        expect(x.compareTo(a)).toBeUndefined();
        expect(x.compareTo(b)).toBeUndefined();
        expect(x.compareTo(c)).toBeUndefined();


        Comparable.call(a); // no compare method provided
        Comparable.call(b); // no compare method provided
        Comparable.call(c); // no compare method provided

        expect(a.compareTo(b)).toBeUndefined(); // compare method is missing :: a and b do not properly compare
        expect(a.compareTo(c)).toBeUndefined(); // compare method is missing :: a and c do not properly compare
        expect(b.compareTo(c)).toBeUndefined(); // compare method is missing :: b and c do not properly compare

        expect(a.compareTo(a)).toBe(0); // compare method is missing :: internal fallback comparing a with itself equals 0
        expect(b.compareTo(b)).toBe(0); // compare method is missing :: internal fallback comparing b with itself equals 0
        expect(c.compareTo(c)).toBe(0); // compare method is missing :: internal fallback comparing c with itself equals 0


        Comparable.call(a, compareXProperties); // restore initial test state
        Comparable.call(b, compareXProperties); // restore initial test state
        Comparable.call(c, compareXProperties); // restore initial test state
      });

      describe("... [compareTo] optionally accepts a second argument, ...", function () {

        it([

          "... a custom [valueOf] method that processes both types before comparing theirs",
          "value results to one another."

        ].join(" "), function () {

          expect(x.compareTo.length).toBe(2);

          expect(x.compareTo(y)).toBe(-1);
          expect(x.compareTo(z)).toBe(-1);
          expect(y.compareTo(z)).toBe(-1);

          expect(x.compareTo(y, valueOfXProperty)).toBe(-1);
          expect(x.compareTo(z, valueOfXProperty)).toBe(-1);
          expect(y.compareTo(z, valueOfXProperty)).toBe(-1);


          Comparable.call(x); // no compare method provided
          Comparable.call(y); // no compare method provided
          Comparable.call(z); // no compare method provided

          Comparable.call(a); // no compare method provided
          Comparable.call(b); // no compare method provided
          Comparable.call(c); // no compare method provided

          expect(x.compareTo(y)).toBeUndefined();
          expect(x.compareTo(z)).toBeUndefined();
          expect(y.compareTo(z)).toBeUndefined();

          expect(x.compareTo(y, valueOfXProperty)).toBe(-1);
          expect(x.compareTo(z, valueOfXProperty)).toBe(-1);
          expect(y.compareTo(z, valueOfXProperty)).toBe(-1);

          expect(x.compareTo(x, valueOfXProperty)).toBe(0);
          expect(y.compareTo(y, valueOfXProperty)).toBe(0);
          expect(z.compareTo(z, valueOfXProperty)).toBe(0);

          expect(z.compareTo(y, valueOfXProperty)).toBe(1);
          expect(z.compareTo(x, valueOfXProperty)).toBe(1);
          expect(y.compareTo(x, valueOfXProperty)).toBe(1);

          expect(x.compareTo(a, valueOfXProperty)).toBeUndefined();
          expect(x.compareTo(b, valueOfXProperty)).toBeUndefined();
          expect(x.compareTo(c, valueOfXProperty)).toBeUndefined();


          Comparable.call(x, compareXProperties); // restore initial test state
          Comparable.call(y, compareXProperties); // restore initial test state
          Comparable.call(z, compareXProperties); // restore initial test state

          Comparable.call(a, compareXProperties); // restore initial test state
          Comparable.call(b, compareXProperties); // restore initial test state
          Comparable.call(c, compareXProperties); // restore initial test state


          Comparable.call(string_prototype);

          expect("a".compareTo("a")).toBe(0);
          expect("a".compareTo("b")).toBe(-1);
          expect("b".compareTo("a")).toBe(1);

          expect("A".compareTo("A")).toBe(0);
          expect("A".compareTo("a")).toBe(-1);
          expect("a".compareTo("A")).toBe(1);

          expect("a".compareTo("aa")).toBe(-1);
          expect("_a".compareTo("a")).toBe(-1);


          string_prototype.inBetween = null; // restore initial test state
          string_prototype.compareTo = null; // restore initial test state
          delete string_prototype.inBetween; // restore initial test state
          delete string_prototype.compareTo; // restore initial test state
        });
      });
    });


    describe("As for [inBetween]", function () {

      it([

        "... it should return [true] as soon as the operator type and its arguments can be compared to one another",
        "either directly or by a provided comparison scheme that matches the form of every type and only in case the",
        "operator type fits in between its arguments."

      ].join(" "), function () {

        expect(x.inBetween(y, z)).toBe(false);
        expect(y.inBetween(x, z)).toBe(true);
        expect(z.inBetween(x, y)).toBe(false);
      });

      it([

        "... It should return [false] as long as the above given rules get violated."

      ].join(" "), function () {

        expect(x.inBetween(y, z)).toBe(false);
        expect(y.inBetween(x, z)).toBe(true);
        expect(z.inBetween(x, y)).toBe(false);

        expect(a.inBetween(b, c)).toBe(false); // a.x, b.x and c.x are all undefined :: but compare to one another with 0 :: which results in false
        expect(b.inBetween(a, c)).toBe(false); // a.x, b.x and c.x are all undefined :: but compare to one another with 0 :: which results in false
        expect(c.inBetween(a, b)).toBe(false); // a.x, b.x and c.x are all undefined :: but compare to one another with 0 :: which results in false

        expect(a.inBetween(x, y)).toBe(false); // a.x is undefined, x.x is "x", y.x is "y" :: undefined does not properly compare to "x" and "y" :: false
        expect(a.inBetween(x, z)).toBe(false); // a.x is undefined, x.x is "x", z.x is "z" :: undefined does not properly compare to "x" and "z" :: false
        expect(a.inBetween(y, z)).toBe(false); // a.x is undefined, y.x is "y", z.x is "z" :: undefined does not properly compare to "y" and "z" :: false
      });

      describe("... [inBetween] optionally accepts a second argument, ...", function () {

        it([

          "... a custom [valueOf] method that processes every type before comparing theirs",
          "value results to one another."

        ].join(" "), function () {

          expect(x.inBetween.length).toBe(3);


          expect(x.inBetween(y, z)).toBe(false);
          expect(x.inBetween(z, y)).toBe(false);

          expect(y.inBetween(x, z)).toBe(true);
          expect(y.inBetween(z, x)).toBe(true);

          expect(z.inBetween(x, y)).toBe(false);
          expect(z.inBetween(y, x)).toBe(false);


          Comparable.call(x); // no compare method provided
          Comparable.call(y); // no compare method provided
          Comparable.call(z); // no compare method provided

          expect(x.inBetween(y, z)).toBe(false);
          expect(x.inBetween(z, y)).toBe(false);

          expect(y.inBetween(x, z)).toBe(false);
          expect(y.inBetween(z, x)).toBe(false);

          expect(z.inBetween(x, y)).toBe(false);
          expect(z.inBetween(y, x)).toBe(false);


          expect(x.inBetween(y, z, valueOfXProperty)).toBe(false);
          expect(x.inBetween(z, y, valueOfXProperty)).toBe(false);

          expect(y.inBetween(x, z, valueOfXProperty)).toBe(true);
          expect(y.inBetween(z, x, valueOfXProperty)).toBe(true);

          expect(z.inBetween(x, y, valueOfXProperty)).toBe(false);
          expect(z.inBetween(y, x, valueOfXProperty)).toBe(false);


          Comparable.call(number_prototype);

          expect(1..inBetween(.99999999999999999, 1.0000000000000001)).toBe(false);
          expect(1..inBetween(.9999999999999999, 1.000000000000001)).toBe(true);
          expect(0..inBetween(-0, 0)).toBe(false);
          expect(0..inBetween(-0.00000000000000000000000000000000000001, 0.00000000000000000000000000000000000001)).toBe(true);


          number_prototype.inBetween = null; // restore initial test state
          number_prototype.compareTo = null; // restore initial test state
          delete number_prototype.inBetween; // restore initial test state
          delete number_prototype.compareTo; // restore initial test state
        });
      });
    });
  });
});
