

describe("»components.Enumerable_first_last_item« module", function () {


  var
    GLOBAL_OBJECT = ((window && window.window === window) && window) || ((global && global.global === global) && global) || this,

    require = GLOBAL_OBJECT.composable.require,

    Enumerable_first_last_item = require("components.Enumerable_first_last_item"),


    str = "hallo world",
    arr = str.split(""),
    obj = {},
    coll = {"length": 2, "0": "hallo", "1": "world"},
    args = (function () {return arguments;}).apply(null, arr),

    document = GLOBAL_OBJECT.document,

    nodeList = (document && document.getElementsByTagName("")),
    htmlCollection = (document && document.forms)
  ;
  it("should - if required via »( composable. )require(\"components.Enumerable_first_last_item\")« - always be a \"function\" type.", function () {
    expect(typeof Enumerable_first_last_item).toBe("function");
  });


  describe("This module being a functional Trait", function () {

    it([

      "should - if applied onto an object e.g. »Enumerable_first_last_item.call(anyListLikeStructure)«",
      "- always provide its accessor methods [first], [last] and [item]. This explicit delegation does",
      "not work for primitive types like [string]. For the latter e.g. [String.prototype] needs to be targeted."

    ].join(" "), function () {

      //Enumerable_first_last_item.call(str); // does not work for primitive types like [string].

      //try .. catch is due to Safari 6.0 (Mac) that throws an exception for calling a primitive other browsers behave as expected.
      try {
        Enumerable_first_last_item.call(str);
      } catch (exc) {
        void 0;
      }

//console.log("args", args);

      Enumerable_first_last_item.call(arr);
      Enumerable_first_last_item.call(obj);
      Enumerable_first_last_item.call(coll);
      Enumerable_first_last_item.call(args);
      Enumerable_first_last_item.call(nodeList);
      Enumerable_first_last_item.call(htmlCollection);

//console.log("args", args);

      expect(str.item).toBeUndefined();

      expect(typeof arr.first).toBe("function");
      expect(typeof arr.last).toBe("function");
      expect(typeof arr.item).toBe("function");

      expect(typeof obj.first).toBe("function");
      expect(typeof obj.last).toBe("function");
      expect(typeof obj.item).toBe("function");

      expect(typeof coll.first).toBe("function");
      expect(typeof coll.last).toBe("function");
      expect(typeof coll.item).toBe("function");

      expect(typeof args.first).toBe("function");
      expect(typeof args.last).toBe("function");
      expect(typeof args.item).toBe("function");

      if (nodeList) {expect(typeof nodeList.first).toBe("function");}
      if (htmlCollection) {expect(typeof htmlCollection.last).toBe("function");}


      Enumerable_first_last_item.call(GLOBAL_OBJECT.String.prototype); // [String.prototype] needs to be targeted.

      expect(typeof str.first).toBe("function");
      expect(typeof str.last).toBe("function");
      expect(typeof str.item).toBe("function");
    });


    describe("As for [first]", function () {

      it([

        "it should return the objects first item or undefined if the object is not list like."

      ].join(" "), function () {

        expect(arr.first()).toBe("h");
        expect(obj.first()).toBeUndefined();
        expect(coll.first()).toBe("hallo");
        expect(args.first()).toBe("h");

//console.log("nodeList", nodeList);
//console.dir("nodeList", nodeList);
//console.log("htmlCollection", htmlCollection);
//console.dir("htmlCollection", htmlCollection);

        if (nodeList && (nodeList.length >= 1)) {

          expect(typeof nodeList.first().nodeType()).toBe("number");
          expect(typeof nodeList.first().nodeName()).toBe("string");

        //expect(nodeList.first().nodeName().toLowerCase()).toBe("html");
        }
        if (htmlCollection && (htmlCollection.length >= 1)) {

          expect(typeof htmlCollection.first().nodeType()).toBe("number");
          expect(typeof htmlCollection.first().nodeName()).toBe("string");
        }

        expect(str.first()).toBe("h");
      });
    });

    describe("As for [last]", function () {

      it([

        "it should return the objects last item or undefined if the object is not list like."

      ].join(" "), function () {

        expect(arr.last()).toBe("d");
        expect(obj.last()).toBeUndefined();
        expect(coll.last()).toBe("world");
        expect(args.last()).toBe("d");

        if (nodeList && (nodeList.length >= 1)) {

          expect(typeof nodeList.last().nodeType()).toBe("number");
          expect(typeof nodeList.last().nodeName()).toBe("string");
        }
        if (htmlCollection && (htmlCollection.length >= 1)) {

          expect(typeof htmlCollection.last().nodeType()).toBe("number");
          expect(typeof htmlCollection.last().nodeName()).toBe("string");
        }

        expect(str.last()).toBe("d");
      });
    });

    describe("As for [item]", function () {

      it([

        "it accepts a sole argument that will be interpreted as integer value N.",
        "It than should return the objects N'th item or undefined if the object is not list like."

      ].join(" "), function () {

        expect(arr.item(1)).toBe("a");

        expect(arr.item(0)).toBe(arr.first());
        expect(arr.item(arr.length - 1)).toBe(arr.last());

        expect(obj.item()).toBeUndefined();

        expect(coll.item(0)).toBe("hallo");
        expect(coll.item(1)).toBe("world");
        expect(coll.item(2)).toBeUndefined();
        expect(coll.item(-1)).toBeUndefined();

        expect(coll.item(0)).toBe(coll.first());
        expect(coll.item(coll.length - 1)).toBe(coll.last());

        expect(args.item(1)).toBe("a");
        expect(args.item(args.length - 2)).toBe("l");

        expect(args.item(0)).toBe(args.first());
        expect(args.item(args.length - 1)).toBe(args.last());

        if (nodeList && (nodeList.length >= 1)) {

          expect(typeof nodeList.item(0).nodeType()).toBe("number");
          expect(typeof nodeList.item(0).nodeName()).toBe("string");

          expect(nodeList.item(0)).toBe(nodeList.first());
          expect(nodeList.item(nodeList.length - 1)).toBe(nodeList.last());
        }
        if (htmlCollection && (htmlCollection.length >= 1)) {

          expect(typeof htmlCollection.item(0).nodeType()).toBe("number");
          expect(typeof htmlCollection.item(0).nodeName()).toBe("string");

          expect(htmlCollection.item(0)).toBe(htmlCollection.first());
          expect(htmlCollection.item(htmlCollection.length - 1)).toBe(htmlCollection.last());
        }

        expect(str.item(0)).toBe("h");
        expect(str.item(1)).toBe("a");
        expect(str.item(2)).toBe("l");
        expect(str.item(3)).toBe("l");
        expect(str.item(4)).toBe("o");
        expect(str.item(5)).toBe(" ");
        expect(str.item(str.length - 5)).toBe("w");
        expect(str.item(str.length - 4)).toBe("o");
        expect(str.item(str.length - 3)).toBe("r");
        expect(str.item(str.length - 2)).toBe("l");
        expect(str.item(str.length - 1)).toBe("d");

        expect(str.item(0)).toBe(str.first());
        expect(str.item(str.length - 1)).toBe(str.last());
      });
    });
  });
});
