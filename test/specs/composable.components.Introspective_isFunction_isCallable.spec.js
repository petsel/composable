

describe("»components.Introspective_isFunction_isCallable« module", function () {


  var
    GLOBAL_OBJECT = ((window && window.window === window) && window) || ((global && global.global === global) && global) || this,

    require = GLOBAL_OBJECT.composable.require,

    Introspective_isFunction_isCallable = require("components.Introspective_isFunction_isCallable")
  ;
  it("should - if required via »( composable. )require(\"components.Introspective_isFunction_isCallable\")« - always be a \"function\" type.", function () {
    expect(typeof Introspective_isFunction_isCallable).toBe("function");
  });


  describe("This module being a functional Trait", function () {

    var Function = GLOBAL_OBJECT.Function;
    Introspective_isFunction_isCallable.call(Function);

    it([

      "should - if applied onto an object e.g. »Introspective_isFunction_isCallable.call(Function)«",
      "- always provide both of its implemented methods [isFunction] and [isCallable]."

    ].join(" "), function () {
      expect(typeof Function.isFunction).toBe("function");
      expect(typeof Function.isCallable).toBe("function");
    });

    var
      Node = GLOBAL_OBJECT.Node,
      Element = GLOBAL_OBJECT.Element,
      HTMLElement = GLOBAL_OBJECT.HTMLElement
    ;
    describe("As for [isFunction]", function () {

      var isFunction = Function.isFunction;

      it([

        "it should return true only for every real [[Function]] type. That is, it has to be",
        "a \"function\" type and also needs to feature its both call methods [call] and [apply]."

      ].join(" "), function () {

        expect(isFunction(GLOBAL_OBJECT.parseFloat)).toBe(true);
        expect(isFunction(GLOBAL_OBJECT.isFinite)).toBe(true);
        expect(isFunction(GLOBAL_OBJECT.Object)).toBe(true);
        expect(isFunction(GLOBAL_OBJECT.Array)).toBe(true);

        expect(isFunction(isFunction)).toBe(true);

        if (Node && (typeof Node == "function") && (typeof Node.call == "function") && (typeof Node.apply == "function")) {

          expect(isFunction(Node)).toBe(true);
        } else {
          expect(isFunction(Node)).toBe(false);
        }
        if (Element && (typeof Element == "function") && (typeof Element.call == "function") && (typeof Element.apply == "function")) {

          expect(isFunction(Element)).toBe(true);
        } else {
          expect(isFunction(Element)).toBe(false);
        }
        if (HTMLElement && (typeof HTMLElement == "function") && (typeof HTMLElement.call == "function") && (typeof HTMLElement.apply == "function")) {

          expect(isFunction(HTMLElement)).toBe(true);
        } else {
          expect(isFunction(HTMLElement)).toBe(false);
        }

        expect(isFunction()).toBe(false);
        expect(isFunction("")).toBe(false);
        expect(isFunction({})).toBe(false);
        expect(isFunction([])).toBe(false);
      });
    });
    describe("As for [isCallable]", function () {

      var isCallable = Function.isCallable;

      it([

        "it should return true only for every callable type. That is, it only needs to be invokable",
        "via the call operator - »()«. There will be no test at all for if it is a \"function\" type."

      ].join(" "), function () {


        expect(isCallable(GLOBAL_OBJECT.parseFloat)).toBe(true);
        expect(isCallable(GLOBAL_OBJECT.isFinite)).toBe(true);
        expect(isCallable(GLOBAL_OBJECT.Object)).toBe(true);
        expect(isCallable(GLOBAL_OBJECT.Array)).toBe(true);

        expect(isCallable(isCallable)).toBe(true);

        if (Node) {
          expect(isCallable(Node)).toBe(false);
        }
        if (Element) {
          expect(isCallable(Element)).toBe(false);
        }
        if (HTMLElement) {
          expect(isCallable(HTMLElement)).toBe(false);
        }

        expect(isCallable()).toBe(false);
        expect(isCallable("")).toBe(false);
        expect(isCallable({})).toBe(false);
        expect(isCallable([])).toBe(false);
      });
    });
  });
});
