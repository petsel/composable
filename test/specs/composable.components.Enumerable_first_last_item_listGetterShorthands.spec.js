

describe("»components.Enumerable_first_last_item_listGetterShorthands« module", function () {


  var
    GLOBAL_OBJECT = ((window && window.window === window) && window) || ((global && global.global === global) && global) || this,

    require = GLOBAL_OBJECT.composable.require,

    Enumerable_first_last_item_listGetterShorthands = require("components.Enumerable_first_last_item_listGetterShorthands"),


    str = "hallo world",
    arr = str.split(""),
    obj = {},
    coll = {"length": 2, "0": "hallo", "1": "world"},
    args = (function () {return arguments;}).apply(null, arr),

    document = GLOBAL_OBJECT.document,

    nodeList = (document && document.getElementsByTagName("")),
    htmlCollection = (document && document.forms),


    arrayFrom = require("environment").helpers.makeArray,

    MyOwnCollectionType = function (listLikeStructure) {
      var internalListRepresentation = arrayFrom(listLikeStructure) || [];

      this.all = function () {
        return arrayFrom(internalListRepresentation);
      };
      this.toString = function () {
        return ("" + this.all());
      };
      Enumerable_first_last_item_listGetterShorthands.call(this.all);
    },
    listWrapperFromString         = new MyOwnCollectionType(str),
    listWrapperFromArray          = new MyOwnCollectionType(arr),
    listWrapperFromObject         = new MyOwnCollectionType(obj),
    listWrapperFromCollection     = new MyOwnCollectionType(coll),
    listWrapperFromArguments      = new MyOwnCollectionType(args),
    listWrapperFromNodeList       = new MyOwnCollectionType(nodeList),
    listWrapperFromHtmlCollection = new MyOwnCollectionType(htmlCollection)
  ;
  it("should - if required via »( composable. )require(\"components.Enumerable_first_last_item_listGetterShorthands\")« - always be a \"function\" type.", function () {
    expect(typeof Enumerable_first_last_item_listGetterShorthands).toBe("function");
  });

  it([

    "should - if applied onto an objects list getter method e.g. »Enumerable_first_last_item_listGetterShorthands.call(customType.all)«",
    "- always provide its accessor methods [first], [last] and [item]."

  ].join(" "), function () {

    expect(typeof listWrapperFromString.all.first).toBe("function");
    expect(typeof listWrapperFromString.all.last).toBe("function");
    expect(typeof listWrapperFromString.all.item).toBe("function");

    expect(typeof listWrapperFromArray.all.first).toBe("function");
    expect(typeof listWrapperFromArray.all.last).toBe("function");
    expect(typeof listWrapperFromArray.all.item).toBe("function");

    expect(typeof listWrapperFromObject.all.first).toBe("function");
    expect(typeof listWrapperFromObject.all.last).toBe("function");
    expect(typeof listWrapperFromObject.all.item).toBe("function");

    expect(typeof listWrapperFromCollection.all.first).toBe("function");
    expect(typeof listWrapperFromCollection.all.last).toBe("function");
    expect(typeof listWrapperFromCollection.all.item).toBe("function");

    expect(typeof listWrapperFromArguments.all.first).toBe("function");
    expect(typeof listWrapperFromArguments.all.last).toBe("function");
    expect(typeof listWrapperFromArguments.all.item).toBe("function");

    expect(typeof listWrapperFromNodeList.all.first).toBe("function");
    expect(typeof listWrapperFromNodeList.all.last).toBe("function");
    expect(typeof listWrapperFromNodeList.all.item).toBe("function");

    expect(typeof listWrapperFromHtmlCollection.all.first).toBe("function");
    expect(typeof listWrapperFromHtmlCollection.all.last).toBe("function");
    expect(typeof listWrapperFromHtmlCollection.all.item).toBe("function");
  });


  describe("As for [first]", function () {

    it([

      "it should return the objects first enclosed/wrapped list item."

    ].join(" "), function () {

      expect(listWrapperFromString.all.first()).toBe("h");
      expect(listWrapperFromArray.all.first()).toBe("h");
      expect(listWrapperFromObject.all.first()).toBeUndefined();
      expect(listWrapperFromCollection.all.first()).toBe("hallo");
      expect(listWrapperFromArguments.all.first()).toBe("h");

      if (nodeList && (nodeList.length >= 1)) {

        expect(typeof listWrapperFromNodeList.all.first().nodeType()).toBe("number");
        expect(typeof listWrapperFromNodeList.all.first().nodeName()).toBe("string");

        //expect(listWrapperFromNodeList.all.first().nodeName().toLowerCase()).toBe("html");
      }
      if (htmlCollection && (htmlCollection.length >= 1)) {

        expect(typeof listWrapperFromHtmlCollection.all.first().nodeType()).toBe("number");
        expect(typeof listWrapperFromHtmlCollection.all.first().nodeName()).toBe("string");
      }
    });
  });

  describe("As for [last]", function () {

    it([

      "it should return the objects last enclosed/wrapped list item."

    ].join(" "), function () {

      expect(listWrapperFromString.all.last()).toBe("d");
      expect(listWrapperFromArray.all.last()).toBe("d");
      expect(listWrapperFromObject.all.last()).toBeUndefined();
      expect(listWrapperFromCollection.all.last()).toBe("world");
      expect(listWrapperFromArguments.all.last()).toBe("d");

      if (nodeList && (nodeList.length >= 1)) {

        expect(typeof listWrapperFromNodeList.all.last().nodeType()).toBe("number");
        expect(typeof listWrapperFromNodeList.all.last().nodeName()).toBe("string");
      }
      if (htmlCollection && (htmlCollection.length >= 1)) {

        expect(typeof listWrapperFromHtmlCollection.all.last().nodeType()).toBe("number");
        expect(typeof listWrapperFromHtmlCollection.all.last().nodeName()).toBe("string");
      }
    });
  });

  describe("As for [item]", function () {

    it([

      "it accepts a sole argument that will be interpreted as integer value N.",
      "It than should return the objects N'th enclosed/wrapped list item."

    ].join(" "), function () {

      expect(listWrapperFromArray.all.item(1)).toBe("a");

      expect(listWrapperFromArray.all.item(0)).toBe(listWrapperFromArray.all.first());
      expect(listWrapperFromArray.all.item(listWrapperFromArray.all().length - 1)).toBe(listWrapperFromArray.all.last());

      expect(listWrapperFromObject.all.item()).toBeUndefined();

      expect(listWrapperFromCollection.all.item(0)).toBe("hallo");
      expect(listWrapperFromCollection.all.item(1)).toBe("world");
      expect(listWrapperFromCollection.all.item(2)).toBeUndefined();
      expect(listWrapperFromCollection.all.item(-1)).toBeUndefined();

      expect(listWrapperFromCollection.all.item(0)).toBe(listWrapperFromCollection.all.first());
      expect(listWrapperFromCollection.all.item(listWrapperFromCollection.all().length - 1)).toBe(listWrapperFromCollection.all.last());

      expect(listWrapperFromArray.all.item(1)).toBe("a");
      expect(listWrapperFromArray.all.item(listWrapperFromArray.all().length - 2)).toBe("l");

      expect(listWrapperFromArray.all.item(0)).toBe(listWrapperFromArray.all.first());
      expect(listWrapperFromArray.all.item(listWrapperFromArray.all().length - 1)).toBe(listWrapperFromArray.all.last());

      if (nodeList && (nodeList.length >= 1)) {

        expect(typeof listWrapperFromNodeList.all.item(0).nodeType()).toBe("number");
        expect(typeof listWrapperFromNodeList.all.item(0).nodeName()).toBe("string");

        expect(listWrapperFromNodeList.all.item(0)).toBe(listWrapperFromNodeList.all.first());
        expect(listWrapperFromNodeList.all.item(listWrapperFromNodeList.all().length - 1)).toBe(listWrapperFromNodeList.all.last());
      }
      if (htmlCollection && (htmlCollection.length >= 1)) {

        expect(typeof listWrapperFromHtmlCollection.all.item(0).nodeType()).toBe("number");
        expect(typeof listWrapperFromHtmlCollection.all.item(0).nodeName()).toBe("string");

        expect(listWrapperFromHtmlCollection.all.item(0)).toBe(listWrapperFromHtmlCollection.all.first());
        expect(listWrapperFromHtmlCollection.all.item(listWrapperFromHtmlCollection.all().length - 1)).toBe(listWrapperFromHtmlCollection.all.last());
      }

      expect(listWrapperFromString.all.item(0)).toBe("h");
      expect(listWrapperFromString.all.item(1)).toBe("a");
      expect(listWrapperFromString.all.item(2)).toBe("l");
      expect(listWrapperFromString.all.item(3)).toBe("l");
      expect(listWrapperFromString.all.item(4)).toBe("o");
      expect(listWrapperFromString.all.item(5)).toBe(" ");
      expect(listWrapperFromString.all.item(listWrapperFromString.all().length - 5)).toBe("w");
      expect(listWrapperFromString.all.item(listWrapperFromString.all().length - 4)).toBe("o");
      expect(listWrapperFromString.all.item(listWrapperFromString.all().length - 3)).toBe("r");
      expect(listWrapperFromString.all.item(listWrapperFromString.all().length - 2)).toBe("l");
      expect(listWrapperFromString.all.item(listWrapperFromString.all().length - 1)).toBe("d");

      expect(listWrapperFromString.all.item(0)).toBe(listWrapperFromString.all.first());
      expect(listWrapperFromString.all.item(listWrapperFromString.all().length - 1)).toBe(listWrapperFromString.all.last());
    });
  });
});
