

describe("»composites.Object_respondTo_isAssigned« module", function () {


  var
    GLOBAL_OBJECT = ((window && window.window === window) && window) || ((global && global.global === global) && global) || this,

    require = GLOBAL_OBJECT.composable.require,

    Object_respondTo_isAssigned = require("composites.Object_respondTo_isAssigned"),


    Object = GLOBAL_OBJECT.Object,
    Array = GLOBAL_OBJECT.Array,
    Function = GLOBAL_OBJECT.Function,

    object_prototype = Object.prototype
  ;
  it([

    "should - if required via »( composable. )require(\"composites.Object_respondTo_isAssigned\")«",
    "- return the [undefined] value."

  ].join(" "), function () {

    expect(Object_respondTo_isAssigned).toBeUndefined();
  });


  describe("It is a module that as soon as it gets registered ...", function () {

    it([

      "... does augment [Object.prototype] by its two methods [respondTo] and [isAssigned] thus providing",
      "additional functionality for property testing to every ECMAScript conform object."

    ].join(" "), function () {
      expect(typeof object_prototype.respondTo).toBe("function");
      expect(typeof object_prototype.isAssigned).toBe("function");

      var obj = {};

      require("components.Introspective_respondTo").call(obj);
      expect(object_prototype.respondTo).not.toBe(obj.respondTo);
      expect("" + object_prototype.respondTo).toBe("" + obj.respondTo);

      require("components.Introspective_isAssigned").call(obj);
      expect(object_prototype.isAssigned).not.toBe(obj.isAssigned);
      expect("" + object_prototype.isAssigned).toBe("" + obj.isAssigned);
    });

    describe("As for [respondTo]", function () {

      it([

        "it should return true for every string based argument that as key matches a method",
        "of the very object the [respondTo] method is working on."

      ].join(" "), function () {

        expect(Object.respondTo("isAssigned")).toBe(true);
        expect(Object.respondTo("respondTo")).toBe(true);

        expect(Array.respondTo("isArray")).toBe(true);
        expect(Array.respondTo("isArguments")).toBe(true);

        expect(Function.respondTo("isFunction")).toBe(true);
        expect(Function.respondTo("isCallable")).toBe(true);

        expect(Function.respondTo("length")).toBe(false);

        expect(Function.respondTo("some unassigned key")).toBe(false);
      });
    });

    describe("As for [isAssigned]", function () {

      it([

        "it should return true for every string based argument that as key matches a property",
        "of the very object the [isAssigned] method is working on regardless whether this property",
        "is of [undefined] value or not or whether it is a method or not."

      ].join(" "), function () {

        expect(Object.isAssigned("isAssigned")).toBe(true);
        expect(Object.isAssigned("respondTo")).toBe(true);

        expect(Array.isAssigned("isArray")).toBe(true);
        expect(Array.isAssigned("isArguments")).toBe(true);

        expect(Function.isAssigned("isFunction")).toBe(true);
        expect(Function.isAssigned("isCallable")).toBe(true);

        expect(Function.isAssigned("length")).toBe(true);

        expect(Function.isAssigned("some unassigned key")).toBe(false);
      });
    });
  });
});
