

describe("»components.Propagable_EventAdapter« module", function () {


  var
    GLOBAL_OBJECT = ((window && window.window === window) && window) || ((global && global.global === global) && global) || this,

    require = GLOBAL_OBJECT.composable.require,

    Propagable_EventAdapter = require("components.Propagable_EventAdapter"),


    CustomEvent = function (type, target) {
      this.type   = type;
      this.target = target;
    },

    customEvent, testTarget
  ;


  it("should - if required via »( composable. )require(\"components.Propagable_EventAdapter\")« - always be a \"function\" type.", function () {

    expect(Propagable_EventAdapter && (typeof Propagable_EventAdapter == "function")).toBe(true);
  });


  describe("This module being a privileged functional Mixin", function () {

    describe("should - if applied onto a custom event or an event like object - ", function () {
      it([
        "return that object in its enriched form. Thus it has to feature 3 additional methods ...",
        "[isStopPropagation], [stopPropagation] and [stopImmediatePropagation]."

      ].join(" "), function () {

        testTarget = {};
        customEvent = new CustomEvent("augmented", testTarget);

        Propagable_EventAdapter.call(customEvent);


        expect(testTarget).not.toBeNull();
        expect(typeof testTarget).toBe("object");

        expect(customEvent instanceof CustomEvent).toBe(true);


        expect(typeof customEvent.isStopPropagation).toBe("function");
        expect(typeof customEvent.stopPropagation).toBe("function");
        expect(typeof customEvent.stopImmediatePropagation).toBe("function");
      });

      describe("as for the applied [isStopPropagation] method", function () {
        it([
          "it should return a boolean value depending on whether such an object",
          "still can be propageted over (false) or if it is not propagable anymore (true)."

        ].join(" "), function () {

          testTarget = {};
          customEvent = new CustomEvent("augmented", testTarget);

          Propagable_EventAdapter.call(customEvent);

          expect(customEvent.type).toBe("augmented");
          expect(customEvent.target).toEqual(testTarget);

          expect(customEvent.isStopPropagation()).toBe(false);

          customEvent.stopPropagation();
          expect(customEvent.isStopPropagation()).toBe(true);

          customEvent.stopImmediatePropagation();
          expect(customEvent.isStopPropagation()).toBe(true);
        });
      });

      describe("as for both applied methods [stopPropagation] and [stopImmediatePropagation]", function () {
        it([
          "they should - if invoked - switch the internal [isstoppropagation] state of each propagable object",
          "from its default [false] value to [true]."

        ].join(" "), function () {

          testTarget = {};
          customEvent = new CustomEvent("augmented", testTarget);
          Propagable_EventAdapter.call(customEvent);

          expect(customEvent.isStopPropagation()).toBe(false);

          customEvent.stopPropagation();
          expect(customEvent.isStopPropagation()).toBe(true);

          customEvent.stopImmediatePropagation();
          expect(customEvent.isStopPropagation()).toBe(true);


          customEvent = new CustomEvent("augmented", testTarget);
          Propagable_EventAdapter.call(customEvent);

          expect(customEvent.isStopPropagation()).toBe(false);

          customEvent.stopImmediatePropagation();
          expect(customEvent.isStopPropagation()).toBe(true);

          customEvent.stopPropagation();
          expect(customEvent.isStopPropagation()).toBe(true);
        });
      });
    });


  });
});
