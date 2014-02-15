

describe("»components.Introspective_type_equality« module", function () {


  var
    GLOBAL_OBJECT = ((window && window.window === window) && window) || ((global && global.global === global) && global) || this,

    require = GLOBAL_OBJECT.composable.require,

    Introspective_type_equality = require("components.Introspective_type_equality")
  ;
  it("should - if required via »( composable. )require(\"components.Introspective_type_equality\")« - always be a \"function\" type.", function () {
    expect(typeof Introspective_type_equality).toBe("function");
  });


  describe("This module being a functional Trait", function () {

    var
      parseInt  = GLOBAL_OBJECT.parseInt,
      Math      = GLOBAL_OBJECT.Math,

      Boolean   = GLOBAL_OBJECT.Boolean,
      Number    = GLOBAL_OBJECT.Number,

      Object    = GLOBAL_OBJECT.Object
    ;
    Introspective_type_equality.call(Object);

    it([

      "should - if applied onto an object e.g. »Introspective_type_equality.call(Object)«",
      "- always provide its sole method [isEqualType]."

    ].join(" "), function () {
      expect(typeof Object.isEqualType).toBe("function");
    });

    var
      isEqualType = Object.isEqualType,

      UNDEFINED_VALUE,
      NULL_VALUE = null,
      EMPTY_STRING = "",
      NOT_A_NUMBER = Number.NaN,
      arr_empty = [],
      obj_empty = {},

      obj_01 = {x:{x:{x:"",y:[,[,,,],,[,{x:"",y:[,[,,,],,[,new RegExp,,new Function,"",,Number.NaN,"",,""]],z:{x:""}},,]],z:{x:""}}}},                    // non cyclic
      obj_02 = {x:{x:{x:"",y:[,[,,,],,[,{x:"",y:[,[,,,],,[,new RegExp,,new Function,"",,Number.NaN,"",,""]],z:{x:""}},,]],z:{x:""}}}},                    // non cyclic

      obj_03 = {x:{x:{x:"",y:[,[,,,],,[,{x:"",y:[,[,,,],,[,new RegExp,,new Function,"",,Number.NaN,"",obj_03,""]],z:{x:""}},,]],z:{x:obj_03}}}},          // cyclic
      obj_04 = {x:{x:{x:"",y:[,[,,,],,[,{x:"",y:[,[,,,],,[,new RegExp,,new Function,"",,Number.NaN,"",obj_04,""]],z:{x:""}},,]],z:{x:obj_04}}}},          // cyclic

      obj_05 = {x:{x:{x:"",y:[,[,,,],,[,{x:"",y:[,[,,,],,[,new RegExp,,new Function,"",,Number.NaN,"",obj_05,""]],z:{x:""}},,]],z:{x:obj_05,y:obj_04}}}}, // cyclic
      obj_06 = {x:{x:{x:"",y:[,[,,,],,[,{x:"",y:[,[,,,],,[,new RegExp,,new Function,"",,Number.NaN,"",obj_06,""]],z:{x:""}},,]],z:{x:obj_06,y:obj_03}}}}, // cyclic
      obj_07 = {x:{x:{x:"",y:[,[,,,],,[,{x:"",y:[,[,,],,[,new RegExp,,new Function,"",,Number.NaN,"",obj_06,""]],z:{x:""}},,]],z:{x:obj_06,y:obj_03}}}},  // cyclic

      obj_08 = {x:{x:{x:"",y:[,[,,,],,[,{x:"",y:[,[,,,],,[,new RegExp,,new Function,"",,Number.NaN,"",obj_08,""]],z:{x:""}},,]],z:{x:obj_08,y:obj_09}}}}, // cyclic - bidirectional cross reference
      obj_09 = {x:{x:{x:"",y:[,[,,,],,[,{x:"",y:[,[,,,],,[,new RegExp,,new Function,"",,Number.NaN,"",obj_09,""]],z:{x:""}},,]],z:{x:obj_09,y:obj_08}}}}  // cyclic - bidirectional cross reference
    ;
    describe("As for [isEqualType]", function () {
      it([

        "it should return true for types that if compared to each other equal in structure - even if they",
        "feature cyclic references - as well as true for identical types and true for same values."

      ].join(" "), function () {

        expect(isEqualType(UNDEFINED_VALUE, (void 0))).toBe(true);        // same value
        expect(isEqualType(NULL_VALUE, null)).toBe(true);                 // same value
        expect(isEqualType(EMPTY_STRING, "")).toBe(true);                 // same value
        expect(isEqualType(NOT_A_NUMBER, parseInt(",2" ,10))).toBe(true); // same value
        expect(isEqualType(NOT_A_NUMBER, NOT_A_NUMBER)).toBe(true);       // same value
        expect(isEqualType(Math.pow(2, 53), Math.pow(2, 53))).toBe(true); // same value
        expect(isEqualType((new Boolean()).valueOf(), false)).toBe(true); // same value
        expect(isEqualType(0, 0)).toBe(true);                             // same value
        expect(isEqualType(-0, -0)).toBe(true);                           // same value
        expect(isEqualType((-1 * 0), -0)).toBe(true);                     // same value

        expect(isEqualType(0, -0)).toBe(false);                           // NOT same value
        expect(isEqualType((-1 * 0), 0)).toBe(false);                     // NOT same value


        expect(isEqualType(arr_empty, arr_empty)).toBe(true); // identical types
        expect(isEqualType(arr_empty, [])).toBe(true);        // equal types

        expect(isEqualType(obj_empty, obj_empty)).toBe(true); // identical types
        expect(isEqualType(obj_empty, {})).toBe(true);        // equal types


        expect(isEqualType(obj_01, obj_02)).toBe(true);   // equal types - non cyclic
        expect(isEqualType(obj_03, obj_04)).toBe(true);   // equal types - cyclic
        expect(isEqualType(obj_05, obj_06)).toBe(true);   // equal types - cyclic - cross references

        expect(isEqualType(obj_06, obj_07)).toBe(false);  // non equal types
        expect(isEqualType(obj_08, obj_09)).toBe(false);  // non equal types - cyclic - bidirectional cross reference
      });
    });
  });
});
