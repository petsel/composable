

describe("»components.Introspective_type_emptiness« module", function () {


  var
    GLOBAL_OBJECT = ((window && window.window === window) && window) || ((global && global.global === global) && global) || this,

    require = GLOBAL_OBJECT.composable.require,

    Introspective_type_emptiness = require("components.Introspective_type_emptiness")
  ;
  it("should - if required via »( composable. )require(\"components.Introspective_type_emptiness\")« - always be a \"function\" type.", function () {
    expect(typeof Introspective_type_emptiness).toBe("function");
  });


  describe("This module being a functional Trait", function () {

    var Object = GLOBAL_OBJECT.Object;
    Introspective_type_emptiness.call(Object);

    it([

      "should - if applied onto an object e.g. »Introspective_type_emptiness.call(Object)«",
      "- always provide all of its implemented methods [isEmptyValue], [isEmptyType],",
      "[isSparseList] and [isUninhabitedStructure]."

    ].join(" "), function () {
      expect(typeof Object.isEmptyValue).toBe("function");
      expect(typeof Object.isEmptyType).toBe("function");
      expect(typeof Object.isSparseList).toBe("function");
      expect(typeof Object.isUninhabitedStructure).toBe("function");
    });

    var
      UNDEFINED_VALUE,
      NULL_VALUE = null,
      EMPTY_STRING = "",
      NOT_A_NUMBER = Number.NaN,

      args_empty = (function () {return arguments;}()),
      arr_empty = [],
      str_ws = " ",
      obj_empty = {},
      coll_empty = {"length": 2},
      noop = (function () {}),

      obj_01 = {x:{x:{x:"",y:[,[,,,],,[,{x:"",y:[,[,,,],,[,new RegExp,,new Function,"",,Number.NaN,"",,""]],z:{x:""}},,]],z:{x:""}}}},                // true   - non cyclic
      obj_02 = {x:{x:{x:"",y:[,[,,,],,[,{x:"",y:[,[,,,],,[,new RegExp,,new Function,"",,Number.NaN,"",,""]],z:{x:""}},,]],z:{x:obj_02}}}},            // true   - cyclic
      obj_03 = {x:{x:{x:"",y:[,[,,,],,[,{x:"",y:[,[,,,],,[,new RegExp,,new Function,"",,Number.NaN,"",obj_03,""]],z:{x:""}},,]],z:{x:obj_03}}}},      // true   - cyclic
      obj_04 = {x:{x:{x:"",y:[,[,,,],,[,{x:"",y:[,[,,,],,[,new RegExp,,new Function,"",,Number.NaN,"",obj_04,""]],z:{x:""}},,]],z:{x:obj_04,y:0}}}},  // false  - cyclic

      document = GLOBAL_OBJECT.document,

      nodeList = document && document.getElementsByTagName(""),
      htmlCollection = document && document.forms
    ;
    describe("As for [isEmptyValue]", function () {

      var isEmptyValue = Object.isEmptyValue;

      it([

        "it should return true only for every real empty value - that are [undefined] and [null] value,",
        "an empty string value \"\" and the number value [NaN]."

      ].join(" "), function () {

        expect(isEmptyValue(UNDEFINED_VALUE)).toBe(true);
        expect(isEmptyValue(NULL_VALUE)).toBe(true);
        expect(isEmptyValue(EMPTY_STRING)).toBe(true);
        expect(isEmptyValue(NOT_A_NUMBER)).toBe(true);

        expect(isEmptyValue(str_ws)).toBe(false);
        expect(isEmptyValue(args_empty)).toBe(false);
        expect(isEmptyValue(arr_empty)).toBe(false);
        expect(isEmptyValue(obj_empty)).toBe(false);
        expect(isEmptyValue(coll_empty)).toBe(false);
        expect(isEmptyValue(noop)).toBe(false);


        expect(isEmptyValue(obj_01)).toBe(false);
        expect(isEmptyValue(obj_02)).toBe(false);
        expect(isEmptyValue(obj_03)).toBe(false);
        expect(isEmptyValue(obj_04)).toBe(false);
      });
    });
    describe("As for [isEmptyType]", function () {

      var isEmptyType = Object.isEmptyType;

      it([

        "it should return true not only for empty values but also for every empty type - that are",
        "[new Function], [new Object], [new Array], [new RegExp] and [new String]."

      ].join(" "), function () {

        expect(isEmptyType(UNDEFINED_VALUE)).toBe(true);
        expect(isEmptyType(NULL_VALUE)).toBe(true);
        expect(isEmptyType(EMPTY_STRING)).toBe(true);
        expect(isEmptyType(NOT_A_NUMBER)).toBe(true);

        expect(isEmptyType(str_ws)).toBe(false);

        expect(isEmptyType(args_empty)).toBe(true);
        expect(isEmptyType(arr_empty)).toBe(true);
        expect(isEmptyType(obj_empty)).toBe(true);

        expect(isEmptyType(coll_empty)).toBe(false);

        expect(isEmptyType(noop)).toBe(true);


        expect(isEmptyType(obj_01)).toBe(false);
        expect(isEmptyType(obj_02)).toBe(false);
        expect(isEmptyType(obj_03)).toBe(false);
        expect(isEmptyType(obj_04)).toBe(false);
      });
    });
    describe("As for [isSparseList]", function () {

      var isSparseList = Object.isSparseList;

      it([

        "it should return true only for every real list that is sparse/empty."

      ].join(" "), function () {

        expect(isSparseList(UNDEFINED_VALUE)).toBe(false);
        expect(isSparseList(NULL_VALUE)).toBe(false);

        expect(isSparseList(EMPTY_STRING)).toBe(true);

        expect(isSparseList(NOT_A_NUMBER)).toBe(false);

        expect(isSparseList(str_ws)).toBe(false);

        expect(isSparseList(args_empty)).toBe(true);
        expect(isSparseList(arr_empty)).toBe(true);

        expect(isSparseList(obj_empty)).toBe(false);
        expect(isSparseList(coll_empty)).toBe(false);
        expect(isSparseList(noop)).toBe(false);


        expect(isSparseList(obj_01)).toBe(false);
        expect(isSparseList(obj_02)).toBe(false);
        expect(isSparseList(obj_03)).toBe(false);
        expect(isSparseList(obj_04)).toBe(false);
      });
    });
    describe("As for [isUninhabitedStructure]", function () {

      var isUninhabitedStructure = Object.isUninhabitedStructure;

      it([

        "it should return true only for nested object structures that can not be resolved to",
        "either not having assigned non empty values to or being non empty types themselves."

      ].join(" "), function () {

        expect(isUninhabitedStructure(UNDEFINED_VALUE)).toBe(true);
        expect(isUninhabitedStructure(NULL_VALUE)).toBe(true);
        expect(isUninhabitedStructure(EMPTY_STRING)).toBe(true);
        expect(isUninhabitedStructure(NOT_A_NUMBER)).toBe(true);

        expect(isUninhabitedStructure(str_ws)).toBe(false);

        expect(isUninhabitedStructure(args_empty)).toBe(true);
        expect(isUninhabitedStructure(arr_empty)).toBe(true);
        expect(isUninhabitedStructure(obj_empty)).toBe(true);

        expect(isUninhabitedStructure(coll_empty)).toBe(false);

        expect(isUninhabitedStructure(noop)).toBe(true);


        expect(isUninhabitedStructure(obj_01)).toBe(true);  // true   - non cyclic
        expect(isUninhabitedStructure(obj_02)).toBe(true);  // true   - cyclic
        expect(isUninhabitedStructure(obj_03)).toBe(true);  // true   - cyclic
        expect(isUninhabitedStructure(obj_04)).toBe(false); // false  - cyclic
      });
    });
  });
});
