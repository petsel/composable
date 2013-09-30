

describe("»components.Enumerable_first_last_item_listWrapper« module", function () {


  var
    GLOBAL_OBJECT = ((window && window.window === window) && window) || ((global && global.global === global) && global) || this,

    require = GLOBAL_OBJECT.composable.require,

    Enumerable_first_last_item_listWrapper = require("components.Enumerable_first_last_item_listWrapper"),


    str = "hallo world",
    arr = str.split(""),
    obj = {},
    coll = {"length": 2, "0": "hallo", "1": "world"},
    args = (function () {return arguments;}).apply(null, arr),

    document = GLOBAL_OBJECT.document,

    nodeList = (document && document.getElementsByTagName("")) || [],
    htmlCollection = (document && document.forms) || [],


    arrayFrom = require("environment").helpers.makeArray,

    MyOwnCollectionType = function (listLikeStructure) {
      var internalListRepresentation = arrayFrom(listLikeStructure) || [];

      this.toArray = this.valueOf = function () {
        return arrayFrom(internalListRepresentation);
      };
      this.toString = function () {
        return ("" + internalListRepresentation);
      };
      Enumerable_first_last_item_listWrapper.call(this, internalListRepresentation);
    },
    listWrapperFromString         = new MyOwnCollectionType(str),
    listWrapperFromArray          = new MyOwnCollectionType(arr),
    listWrapperFromObject         = new MyOwnCollectionType(obj),
    listWrapperFromCollection     = new MyOwnCollectionType(coll),
    listWrapperFromArguments      = new MyOwnCollectionType(args),
    listWrapperFromNodeList       = new MyOwnCollectionType(nodeList),
    listWrapperFromHtmlCollection = new MyOwnCollectionType(htmlCollection)
  ;
  it("should - if required via »( composable. )require(\"components.Enumerable_first_last_item_listWrapper\")« - always be a \"function\" type.", function () {
    expect(typeof Enumerable_first_last_item_listWrapper).toBe("function");
  });


  describe("This module being a privileged functional Trait", function () {

    it([

      "does accept an additional parameter that should be an array instance",
      "or any other instance of a list structure that's items can be accessed",
      "via square bracket notation.",
      "NOTE: This additional parameter will not be tested."

    ].join(" "), function () {

      expect(Enumerable_first_last_item_listWrapper.length).toBe(1);
    });

    it([

      "should - if applied onto an object e.g. »Enumerable_first_last_item_listWrapper.call(customType, arrayInstance)«",
      "- always provide its accessor methods [first], [last] and [item]."

    ].join(" "), function () {

      expect(typeof listWrapperFromString.first).toBe("function");
      expect(typeof listWrapperFromString.last).toBe("function");
      expect(typeof listWrapperFromString.item).toBe("function");

      expect(typeof listWrapperFromArray.first).toBe("function");
      expect(typeof listWrapperFromArray.last).toBe("function");
      expect(typeof listWrapperFromArray.item).toBe("function");

      expect(typeof listWrapperFromObject.first).toBe("function");
      expect(typeof listWrapperFromObject.last).toBe("function");
      expect(typeof listWrapperFromObject.item).toBe("function");

      expect(typeof listWrapperFromCollection.first).toBe("function");
      expect(typeof listWrapperFromCollection.last).toBe("function");
      expect(typeof listWrapperFromCollection.item).toBe("function");

      expect(typeof listWrapperFromArguments.first).toBe("function");
      expect(typeof listWrapperFromArguments.last).toBe("function");
      expect(typeof listWrapperFromArguments.item).toBe("function");

      expect(typeof listWrapperFromNodeList.first).toBe("function");
      expect(typeof listWrapperFromNodeList.last).toBe("function");
      expect(typeof listWrapperFromNodeList.item).toBe("function");

      expect(typeof listWrapperFromHtmlCollection.first).toBe("function");
      expect(typeof listWrapperFromHtmlCollection.last).toBe("function");
      expect(typeof listWrapperFromHtmlCollection.item).toBe("function");
    });


    describe("As for [first]", function () {

      it([

        "it should return the objects first enclosed/wrapped list item."

      ].join(" "), function () {

        expect(listWrapperFromString.first()).toBe("h");
        expect(listWrapperFromArray.first()).toBe("h");
        expect(listWrapperFromObject.first()).toBeUndefined();
        expect(listWrapperFromCollection.first()).toBe("hallo");
        expect(listWrapperFromArguments.first()).toBe("h");

        if (nodeList && (nodeList.length >= 1)) {

          expect(typeof listWrapperFromNodeList.first().nodeType()).toBe("number");
          expect(typeof listWrapperFromNodeList.first().nodeName()).toBe("string");

        //expect(listWrapperFromNodeList.first().nodeName().toLowerCase()).toBe("html");
        }
        if (htmlCollection && (htmlCollection.length >= 1)) {

          expect(typeof listWrapperFromHtmlCollection.first().nodeType()).toBe("number");
          expect(typeof listWrapperFromHtmlCollection.first().nodeName()).toBe("string");
        }
      });
    });

    describe("As for [last]", function () {

      it([

        "it should return the objects last enclosed/wrapped list item."

      ].join(" "), function () {

        expect(listWrapperFromString.last()).toBe("d");
        expect(listWrapperFromArray.last()).toBe("d");
        expect(listWrapperFromObject.last()).toBeUndefined();
        expect(listWrapperFromCollection.last()).toBe("world");
        expect(listWrapperFromArguments.last()).toBe("d");

        if (nodeList && (nodeList.length >= 1)) {

          expect(typeof listWrapperFromNodeList.last().nodeType()).toBe("number");
          expect(typeof listWrapperFromNodeList.last().nodeName()).toBe("string");
        }
        if (htmlCollection && (htmlCollection.length >= 1)) {

          expect(typeof listWrapperFromHtmlCollection.last().nodeType()).toBe("number");
          expect(typeof listWrapperFromHtmlCollection.last().nodeName()).toBe("string");
        }
      });
    });

    describe("As for [item]", function () {

      it([

        "it accepts a sole argument that will be interpreted as integer value N.",
        "It than should return the objects N'th enclosed/wrapped list item."

      ].join(" "), function () {

        expect(listWrapperFromArray.item(1)).toBe("a");

        expect(listWrapperFromArray.item(0)).toBe(listWrapperFromArray.first());
        expect(listWrapperFromArray.item(listWrapperFromArray.toArray().length - 1)).toBe(listWrapperFromArray.last());

        expect(listWrapperFromObject.item()).toBeUndefined();

        expect(listWrapperFromCollection.item(0)).toBe("hallo");
        expect(listWrapperFromCollection.item(1)).toBe("world");
        expect(listWrapperFromCollection.item(2)).toBeUndefined();
        expect(listWrapperFromCollection.item(-1)).toBeUndefined();

        expect(listWrapperFromCollection.item(0)).toBe(listWrapperFromCollection.first());
        expect(listWrapperFromCollection.item(listWrapperFromCollection.valueOf().length - 1)).toBe(listWrapperFromCollection.last());

        expect(listWrapperFromArray.item(1)).toBe("a");
        expect(listWrapperFromArray.item(listWrapperFromArray.toArray().length - 2)).toBe("l");

        expect(listWrapperFromArray.item(0)).toBe(listWrapperFromArray.first());
        expect(listWrapperFromArray.item(listWrapperFromArray.valueOf().length - 1)).toBe(listWrapperFromArray.last());

        if (nodeList && (nodeList.length >= 1)) {

          expect(typeof listWrapperFromNodeList.item(0).nodeType()).toBe("number");
          expect(typeof listWrapperFromNodeList.item(0).nodeName()).toBe("string");

          expect(listWrapperFromNodeList.item(0)).toBe(listWrapperFromNodeList.first());
          expect(listWrapperFromNodeList.item(listWrapperFromNodeList.toArray().length - 1)).toBe(listWrapperFromNodeList.last());
        }
        if (htmlCollection && (htmlCollection.length >= 1)) {

          expect(typeof listWrapperFromHtmlCollection.item(0).nodeType()).toBe("number");
          expect(typeof listWrapperFromHtmlCollection.item(0).nodeName()).toBe("string");

          expect(listWrapperFromHtmlCollection.item(0)).toBe(listWrapperFromHtmlCollection.first());
          expect(listWrapperFromHtmlCollection.item(listWrapperFromHtmlCollection.valueOf().length - 1)).toBe(listWrapperFromHtmlCollection.last());
        }

        expect(listWrapperFromString.item(0)).toBe("h");
        expect(listWrapperFromString.item(1)).toBe("a");
        expect(listWrapperFromString.item(2)).toBe("l");
        expect(listWrapperFromString.item(3)).toBe("l");
        expect(listWrapperFromString.item(4)).toBe("o");
        expect(listWrapperFromString.item(5)).toBe(" ");
        expect(listWrapperFromString.item(listWrapperFromString.toArray().length - 5)).toBe("w");
        expect(listWrapperFromString.item(listWrapperFromString.valueOf().length - 4)).toBe("o");
        expect(listWrapperFromString.item(listWrapperFromString.toArray().length - 3)).toBe("r");
        expect(listWrapperFromString.item(listWrapperFromString.valueOf().length - 2)).toBe("l");
        expect(listWrapperFromString.item(listWrapperFromString.toArray().length - 1)).toBe("d");

        expect(listWrapperFromString.item(0)).toBe(listWrapperFromString.first());
        expect(listWrapperFromString.item(listWrapperFromString.valueOf().length - 1)).toBe(listWrapperFromString.last());
      });
    });
  });
});
