

describe("»components.Introspective_respondTo« module", function () {


  var
    GLOBAL_OBJECT = ((window && window.window === window) && window) || ((global && global.global === global) && global) || this,

    require = GLOBAL_OBJECT.composable.require,

    Introspective_respondTo = require("components.Introspective_respondTo")
  ;
  it([

    "should - if required via »( composable. )require(\"components.Introspective_respondTo\")«",
    "- always be a \"function\" type."

  ].join(" "), function () {

    expect(typeof Introspective_respondTo).toBe("function");
  });


  describe("This module being a functional Trait", function () {

    var experimentalCat = {
      sound     : "meow",
      makeSound : function () {return this.sound;},
      gender    : void 0
    };
    Introspective_respondTo.call(experimentalCat);

    it([

      "should - if applied onto an object e.g. »Introspective_respondTo.call(Object.prototype)«",
      "- always provide its sole method [respondTo]."

    ].join(" "), function () {
      expect(typeof experimentalCat.respondTo).toBe("function");
    });

    describe("As for [respondTo]", function () {

      it([

        "it should return true for every string based argument that as key matches a method",
        "of the very object the [respondTo] method is working on."

      ].join(" "), function () {

        expect(experimentalCat.respondTo("isAssigned")).toBe(true);
        expect(experimentalCat.respondTo("respondTo")).toBe(true);

        expect(experimentalCat.respondTo("makeSound")).toBe(true);

        expect(experimentalCat.respondTo("sound")).toBe(false);
        expect(experimentalCat.respondTo("gender")).toBe(false);

        expect(experimentalCat.respondTo("some unassigned key")).toBe(false);
      });
    });
  });
});
