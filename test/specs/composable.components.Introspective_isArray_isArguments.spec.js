

describe("»components.Introspective_isArray_isArguments« module", function () {


  var
    GLOBAL_OBJECT = ((window && window.window === window) && window) || ((global && global.global === global) && global) || this,

    require = GLOBAL_OBJECT.composable.require,

    Introspective_isArray_isArguments = require("components.Introspective_isArray_isArguments")
  ;
  it("should - if required via »( composable. )require(\"components.Introspective_isArray_isArguments\")« - always be a \"function\" type.", function () {
    expect(typeof Introspective_isArray_isArguments).toBe("function");
  });


  describe("This module being a functional Trait", function () {

    var Array = GLOBAL_OBJECT.Array;
    Introspective_isArray_isArguments.call(Array);

    it([

      "should - if applied onto an object e.g. »Introspective_isArray_isArguments.call(Array)«",
      "- always provide both of its implemented methods [isArray] and [isArguments]."

    ].join(" "), function () {
      expect(typeof Array.isArray).toBe("function");
      expect(typeof Array.isArguments).toBe("function");
    });

    var
      arr = [],
      str = "hallo world",
      obj = {},
      coll = {"length": 2, "0": "hallo", "1": "world"},
      args = (function () {return arguments;}()),

      document = GLOBAL_OBJECT.document,

      nodeList = document && document.getElementsByTagName(""),
      htmlCollection = document && document.forms
    ;
    describe("As for [isArray]", function () {

      var isArray = Array.isArray;

      it("it should return true only for every real [[Array]] type.", function () {

        expect(isArray(arr)).toBe(true);

        expect(isArray(str)).toBe(false);
        expect(isArray(obj)).toBe(false);
        expect(isArray(coll)).toBe(false);
        expect(isArray(args)).toBe(false);

        if (nodeList) {
          expect(isArray(nodeList)).toBe(false);
        }
        if (htmlCollection) {
          expect(isArray(htmlCollection)).toBe(false);
        }
      });
    });
    describe("As for [isArguments]", function () {

      var isArguments = Array.isArguments;

      it("it should return true only for every real [[Arguments]] type.", function () {

        expect(isArguments(args)).toBe(true);

        expect(isArguments(str)).toBe(false);
        expect(isArguments(obj)).toBe(false);
        expect(isArguments(coll)).toBe(false);
        expect(isArguments(arr)).toBe(false);

        if (nodeList) {
          expect(isArguments(nodeList)).toBe(false);
        }
        if (htmlCollection) {
          expect(isArguments(htmlCollection)).toBe(false);
        }
      });
    });
  });
});
