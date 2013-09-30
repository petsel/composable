

describe("»components.Enumerable_toArray« module", function () {


  var
    GLOBAL_OBJECT = ((window && window.window === window) && window) || ((global && global.global === global) && global) || this,

    require = GLOBAL_OBJECT.composable.require,

    Enumerable_toArray = require("components.Enumerable_toArray"),


    Array = GLOBAL_OBJECT.Array,


    enumerable = {},

    arr = [],
    str = "hallo world",
    obj = {},
    coll = {"length": 2, "0": "hallo", "1": "world"},
    args = (function () {return arguments;}()),

    document = GLOBAL_OBJECT.document,

    nodeList = (document && document.getElementsByTagName("")) || [],
    htmlCollection = (document && document.forms) || []
  ;
  it("should - if required via »( composable. )require(\"components.Enumerable_toArray\")« - always be a \"function\" type.", function () {
    expect(typeof Enumerable_toArray).toBe("function");
  });


  describe("This module being a functional Trait", function () {

    it([

      "should - if applied onto an object e.g. »Enumerable_toArray.call(anyListLikeStructure)«",
      "- always provide its sole methods [toArray]. This explicit delegation does not work for",
      "primitive types like [string]. For the latter e.g. [String.prototype] needs to be targeted."

    ].join(" "), function () {

      Enumerable_toArray.call(enumerable);
      Enumerable_toArray.call(arr);

    //Enumerable_toArray.call(str); // does not work for primitive types like [string].

    //try .. catch is due to Safari 6.0 (Mac) that throws an exception for calling a primitive other browsers behave as expected.
      try {
        Enumerable_toArray.call(str);
      } catch (exc) {
        void 0;
      }

      Enumerable_toArray.call(obj);
      Enumerable_toArray.call(coll);
      Enumerable_toArray.call(args);
      Enumerable_toArray.call(nodeList);
      Enumerable_toArray.call(htmlCollection);

      expect(typeof enumerable.toArray).toBe("function");
      expect(typeof arr.toArray).toBe("function");

      expect(str.toArray).toBeUndefined();

      expect(typeof obj.toArray).toBe("function");
      expect(typeof coll.toArray).toBe("function");
      expect(typeof args.toArray).toBe("function");
      expect(typeof nodeList.toArray).toBe("function");
      expect(typeof htmlCollection.toArray).toBe("function");

      Enumerable_toArray.call(GLOBAL_OBJECT.String.prototype); // [String.prototype] needs to be targeted.

      expect(typeof str.toArray).toBe("function");
    });


    describe("As for [toArray]", function () {

      it([

        "it should return an array that represents the objects list structure."

      ].join(" "), function () {

        expect(enumerable.toArray() instanceof Array).toBe(false);

        expect(arr.toArray() instanceof Array).toBe(true);
        expect(str.toArray() instanceof Array).toBe(true);

        expect(obj.toArray() instanceof Array).toBe(false);

        expect(coll.toArray() instanceof Array).toBe(true);
        expect(args.toArray() instanceof Array).toBe(true);
        expect(nodeList.toArray() instanceof Array).toBe(true);
        expect(htmlCollection.toArray() instanceof Array).toBe(true);


        // require is a function object that has a length property.
        expect(enumerable.toArray.call(require) instanceof Array).toBe(true);

        // globale [Object] is a function object as well.
        expect(enumerable.toArray.call(GLOBAL_OBJECT.Object) instanceof Array).toBe(true);
      });

      it([

        "it should return [undefined] in case the objects list structure could not be detected."

      ].join(" "), function () {

        expect(enumerable.toArray()).toBeUndefined();
        expect(obj.toArray()).toBeUndefined();
      });

      it([

        "it should throw a [RangeError] in case the possible list structures [length] property",
        "has a valid number value lower than Zero."

      ].join(" "), function () {

        coll.length = 0;

        expect(coll.toArray() instanceof Array).toBe(true);
        expect("" + coll.toArray()).toBe("" + []);


        var rangeError;
        coll.length = -1;

        try {
          coll.toArray();
        } catch (exc) {
          rangeError = exc;
        }
        expect(rangeError).not.toBeUndefined();
        expect(rangeError instanceof GLOBAL_OBJECT.RangeError).toBe(true);
      });
    });
  });
});
