

describe("»components.Introspective_type_sameness« module", function () {


  var
    GLOBAL_OBJECT = ((window && window.window === window) && window) || ((global && global.global === global) && global) || this,

    require = GLOBAL_OBJECT.composable.require,

    Introspective_type_sameness = require("components.Introspective_type_sameness")
  ;
  it("should - if required via »( composable. )require(\"components.Introspective_type_sameness\")« - always be a \"function\" type.", function () {
    expect(typeof Introspective_type_sameness).toBe("function");
  });


  describe("This module being a functional Trait", function () {

    var
      parseInt  = GLOBAL_OBJECT.parseInt,
      Math      = GLOBAL_OBJECT.Math,

      Boolean   = GLOBAL_OBJECT.Boolean,
      Number    = GLOBAL_OBJECT.Number,

      Object    = GLOBAL_OBJECT.Object
    ;
    Introspective_type_sameness.call(Object);

    it([

      "should - if applied onto an object e.g. »Introspective_type_sameness.call(Object)«",
      "- always provide its sole method [isSameValue]."

    ].join(" "), function () {
      expect(typeof Object.isSameValue).toBe("function");
    });

    var
      UNDEFINED_VALUE,
      NULL_VALUE = null,
      EMPTY_STRING = "",
      NOT_A_NUMBER = Number.NaN,
      arr_empty = [],
      obj_empty = {}
    ;
    describe("As for [isSameValue]", function () {

      var isSameValue = Object.isSameValue;

      it([

        "it should return true either for identical types only or only for values that are considered to be \"same\"",
        "according to [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Sameness] and",
        "[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is]."

      ].join(" "), function () {

        expect(isSameValue(UNDEFINED_VALUE, (void 0))).toBe(true);        // same value
        expect(isSameValue(NULL_VALUE, null)).toBe(true);                 // same value
        expect(isSameValue(EMPTY_STRING, "")).toBe(true);                 // same value
        expect(isSameValue(NOT_A_NUMBER, parseInt(",2" ,10))).toBe(true); // same value
        expect(isSameValue(NOT_A_NUMBER, NOT_A_NUMBER)).toBe(true);       // same value
        expect(isSameValue(Math.pow(2, 53), Math.pow(2, 53))).toBe(true); // same value
        expect(isSameValue((new Boolean).valueOf(), false)).toBe(true);   // same value
        expect(isSameValue(0, 0)).toBe(true);                             // same value
        expect(isSameValue(-0, -0)).toBe(true);                           // same value
        expect(isSameValue((-1 * 0), -0)).toBe(true);                     // same value

        expect(isSameValue(0, -0)).toBe(false);                           // NOT same value
        expect(isSameValue((-1 * 0), 0)).toBe(false);                     // NOT same value


        expect(isSameValue(arr_empty, arr_empty)).toBe(true); // identical types
        expect(isSameValue(arr_empty, [])).toBe(false);       // equal types BUT NOT identical

        expect(isSameValue(obj_empty, obj_empty)).toBe(true); // identical types
        expect(isSameValue(obj_empty, {})).toBe(false);       // equal types BUT NOT identical
      });
    });
  });
});
