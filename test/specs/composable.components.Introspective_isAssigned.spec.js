

describe("»components.Introspective_isAssigned« module", function () {


  var
    GLOBAL_OBJECT = ((window && window.window === window) && window) || ((global && global.global === global) && global) || this,

    require = GLOBAL_OBJECT.composable.require,

    Introspective_isAssigned = require("components.Introspective_isAssigned")
  ;
  it([

    "should - if required via »( composable. )require(\"components.Introspective_isAssigned\")«",
    "- always be a \"function\" type."

  ].join(" "), function () {

    expect(typeof Introspective_isAssigned).toBe("function");
  });


  describe("This module being a functional Trait", function () {

    var experimentalCat = {
      sound     : "meow",
      makeSound : function () {return this.sound;},
      gender    : void 0
    };
    Introspective_isAssigned.call(experimentalCat);

    it([

      "should - if applied onto an object e.g. »Introspective_isAssigned.call(Object.prototype)«",
      "- always provide its sole method [isAssigned]."

    ].join(" "), function () {
      expect(typeof experimentalCat.isAssigned).toBe("function");
    });

    describe("As for [isAssigned]", function () {

      it([

        "it should return true for every string based argument that as key matches a property",
        "of the very object the [isAssigned] method is working on regardless whether this property",
        "is of [undefined] value or not or whether it is a method or not."

      ].join(" "), function () {

        expect(experimentalCat.isAssigned("isAssigned")).toBe(true);
        expect(experimentalCat.isAssigned("respondTo")).toBe(true);

        expect(experimentalCat.isAssigned("makeSound")).toBe(true);

        expect(experimentalCat.isAssigned("sound")).toBe(true);
        expect(experimentalCat.isAssigned("gender")).toBe(true);

        expect(experimentalCat.isAssigned("some unassigned key")).toBe(false);
      });
    });
  });
});
