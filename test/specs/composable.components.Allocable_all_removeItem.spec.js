

describe("»components.Allocable_all_removeItem« module", function () {


  var
    GLOBAL_OBJECT = ((window && window.window === window) && window) || ((global && global.global === global) && global) || this,

    require = GLOBAL_OBJECT.composable.require,

    Allocable_all_removeItem = require("components.Allocable_all_removeItem"),


    Array = GLOBAL_OBJECT.Array,

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

      Allocable_all_removeItem.call(this, arrayFrom(listLikeStructure) || []);
    },
    listWrapperFromString         = new MyOwnCollectionType(str),
    listWrapperFromArray          = new MyOwnCollectionType(arr),
    listWrapperFromObject         = new MyOwnCollectionType(obj),
    listWrapperFromCollection     = new MyOwnCollectionType(coll),
    listWrapperFromArguments      = new MyOwnCollectionType(args),
    listWrapperFromNodeList       = new MyOwnCollectionType(nodeList),
    listWrapperFromHtmlCollection = new MyOwnCollectionType(htmlCollection)
  ;
  it("should - if required via »( composable. )require(\"components.Allocable_all_removeItem\")« - always be a \"function\" type.", function () {
    expect(typeof Allocable_all_removeItem).toBe("function");
  });


  describe("This module being a privileged functional Mixin", function () {

    it([

      "does accept an additional parameter that should be an array instance",
      "or any other instance of a list structure that's items can be accessed",
      "via square bracket notation.",
      "NOTE: This additional parameter will not be tested."

    ].join(" "), function () {

      expect(Allocable_all_removeItem.length).toBe(1);
    });

    it([

      "should - if applied onto an object e.g. »Allocable_all_removeItem.call(customType, arrayInstance)«",
      "- always provide its accessor methods [all], [all.size] and [all.removeItem]."

    ].join(" "), function () {

      expect(typeof listWrapperFromString.all).toBe("function");
      expect(typeof listWrapperFromString.all.size).toBe("function");
      expect(typeof listWrapperFromString.all.removeItem).toBe("function");

      expect(typeof listWrapperFromArray.all).toBe("function");
      expect(typeof listWrapperFromArray.all.size).toBe("function");
      expect(typeof listWrapperFromArray.all.removeItem).toBe("function");

      expect(typeof listWrapperFromObject.all).toBe("function");
      expect(typeof listWrapperFromObject.all.size).toBe("function");
      expect(typeof listWrapperFromObject.all.removeItem).toBe("function");

      expect(typeof listWrapperFromCollection.all).toBe("function");
      expect(typeof listWrapperFromCollection.all.size).toBe("function");
      expect(typeof listWrapperFromCollection.all.removeItem).toBe("function");

      expect(typeof listWrapperFromString.all).toBe("function");
      expect(typeof listWrapperFromString.all.size).toBe("function");
      expect(typeof listWrapperFromString.all.removeItem).toBe("function");

      expect(typeof listWrapperFromArguments.all).toBe("function");
      expect(typeof listWrapperFromArguments.all.size).toBe("function");
      expect(typeof listWrapperFromArguments.all.removeItem).toBe("function");

      expect(typeof listWrapperFromNodeList.all).toBe("function");
      expect(typeof listWrapperFromNodeList.all.size).toBe("function");
      expect(typeof listWrapperFromNodeList.all.removeItem).toBe("function");

      expect(typeof listWrapperFromHtmlCollection.all).toBe("function");
      expect(typeof listWrapperFromHtmlCollection.all.size).toBe("function");
      expect(typeof listWrapperFromHtmlCollection.all.removeItem).toBe("function");
    });


    describe("As for [all]", function () {

      it([

        "it should return - in array form - a copy of the objects enclosed/wrapped list."

      ].join(" "), function () {

        expect(listWrapperFromString.all() instanceof Array).toBe(true);
        expect(listWrapperFromString.all()).not.toBe(str);
        expect("" + listWrapperFromString.all()).toBe("" + arrayFrom(str));

        expect(listWrapperFromArray.all() instanceof Array).toBe(true);
        expect(listWrapperFromArray.all()).not.toBe(arr);
        expect("" + listWrapperFromArray.all()).toBe("" + arr);


        expect(listWrapperFromObject.all() instanceof Array).toBe(true);
        expect(listWrapperFromObject.all()).not.toBe([]);
        expect("" + listWrapperFromObject.all()).toBe("" + []);

        expect("" + listWrapperFromObject.all()).not.toBe("" + obj);


        expect(listWrapperFromCollection.all() instanceof Array).toBe(true);
        expect(listWrapperFromCollection.all()).not.toBe([listWrapperFromCollection.all()[0], listWrapperFromCollection.all()[1]]);
        expect("" + listWrapperFromCollection.all()).toBe("" + [listWrapperFromCollection.all()[0], listWrapperFromCollection.all()[1]]);

        expect(listWrapperFromArguments.all() instanceof Array).toBe(true);
        expect(listWrapperFromArguments.all()).not.toBe(args);
        expect("" + listWrapperFromArguments.all()).toBe("" + arrayFrom(args));

        if (nodeList && (nodeList.length >= 1)) {

          expect(listWrapperFromNodeList.all() instanceof Array).toBe(true);
          expect(listWrapperFromNodeList.all()).not.toBe(nodeList);
          expect("" + listWrapperFromNodeList.all()).toBe("" + arrayFrom(nodeList));
        }
        if (htmlCollection && (htmlCollection.length >= 1)) {

          expect(listWrapperFromHtmlCollection.all() instanceof Array).toBe(true);
          expect(listWrapperFromHtmlCollection.all()).not.toBe(htmlCollection);
          expect("" + listWrapperFromHtmlCollection.all()).toBe("" + arrayFrom(htmlCollection));
        }
      });
    });


    describe("As for [all.size]", function () {

      it([

        "it should return the current length of the objects enclosed/wrapped list as (integer) number value."

      ].join(" "), function () {

        expect(typeof listWrapperFromString.all.size()).toBe("number");
        expect(listWrapperFromString.all.size()).toBe(str.length);

        expect(typeof listWrapperFromArray.all.size()).toBe("number");
        expect(listWrapperFromArray.all.size()).toBe(arr.length);


        expect(typeof listWrapperFromObject.all.size()).toBe("number");
        expect(listWrapperFromObject.all.size()).toBe([].length);

        expect(listWrapperFromObject.all.size()).not.toBe(obj.length);


        expect(typeof listWrapperFromCollection.all.size()).toBe("number");
        expect(listWrapperFromCollection.all.size()).toBe(coll.length);

        expect(typeof listWrapperFromArguments.all.size()).toBe("number");
        expect(listWrapperFromArguments.all.size()).toBe(args.length);


        if (nodeList && (nodeList.length >= 1)) {

          expect(typeof listWrapperFromNodeList.all.size()).toBe("number");
          expect(listWrapperFromNodeList.all.size()).toBe(nodeList.length);
        }
        if (htmlCollection && (htmlCollection.length >= 1)) {

          expect(typeof listWrapperFromHtmlCollection.all.size()).toBe("number");
          expect(listWrapperFromHtmlCollection.all.size()).toBe(nodeList.length);
        }
      });
    });


    describe("As for [all.removeItem]", function () {

      it([

        "it relies on providing a sole parameter - the item (reference) that is going to be removed."

      ].join(" "), function () {

        expect(listWrapperFromString.all.removeItem.length).toBe(1);
        expect(listWrapperFromArray.all.removeItem.length).toBe(1);
        expect(listWrapperFromObject.all.removeItem.length).toBe(1);
        expect(listWrapperFromCollection.all.removeItem.length).toBe(1);
        expect(listWrapperFromString.all.removeItem.length).toBe(1);
        expect(listWrapperFromArguments.all.removeItem.length).toBe(1);
        expect(listWrapperFromNodeList.all.removeItem.length).toBe(1);
        expect(listWrapperFromHtmlCollection.all.removeItem.length).toBe(1);
      });

      it([

        "it should return the very item that was meant to be removed in case it did match successfully.",
        "Thus altering the state of the objects enclosed/wrapped list."

      ].join(" "), function () {

        expect(listWrapperFromString.all.removeItem(" ")).toBe(" ");
        expect(listWrapperFromString.all().join("")).toBe("halloworld");
        expect(listWrapperFromString.all().join("")).not.toBe("hallo world");

        expect(listWrapperFromArray.all.removeItem("l")).toBe("l");
        expect(listWrapperFromArray.all().join("")).toBe("hao word");
        expect(listWrapperFromArray.all().join("")).not.toBe("hallo world");

        //expect(listWrapperFromObject.all.removeItem("")).toBeUndefined();

        expect(listWrapperFromCollection.all.removeItem("world")).toBe("world");
        expect(listWrapperFromCollection.all().join("")).toBe("hallo");
        expect(listWrapperFromCollection.all().join("")).not.toBe("halloworld");

        expect(listWrapperFromArguments.all.removeItem("o")).toBe("o");
        expect(listWrapperFromArguments.all().join("")).toBe("hall wrld");
        expect(listWrapperFromArguments.all().join("")).not.toBe("hallo world");
      });

      it([

        "it should return [undefined] for every item that was meant to be removed but did not match.",
        "Thus leaving the state of the objects enclosed/wrapped list untouched."

      ].join(" "), function () {

        expect(listWrapperFromString.all.removeItem(" ")).toBeUndefined();
        expect(listWrapperFromString.all().join("")).toBe("halloworld");
        expect(listWrapperFromString.all().join("")).not.toBe("hallo world");

        expect(listWrapperFromArray.all.removeItem("l")).toBeUndefined();
        expect(listWrapperFromArray.all().join("")).toBe("hao word");
        expect(listWrapperFromArray.all().join("")).not.toBe("hallo world");

        expect(listWrapperFromObject.all.removeItem("")).toBeUndefined();

        expect(listWrapperFromCollection.all.removeItem("world")).toBeUndefined();
        expect(listWrapperFromCollection.all().join("")).toBe("hallo");
        expect(listWrapperFromCollection.all().join("")).not.toBe("halloworld");

        expect(listWrapperFromArguments.all.removeItem("o")).toBeUndefined();
        expect(listWrapperFromArguments.all().join("")).toBe("hall wrld");
        expect(listWrapperFromArguments.all().join("")).not.toBe("hallo world");


        //restoring test defaults
        listWrapperFromString         = new MyOwnCollectionType(str);
        listWrapperFromArray          = new MyOwnCollectionType(arr);
        listWrapperFromObject         = new MyOwnCollectionType(obj);
        listWrapperFromCollection     = new MyOwnCollectionType(coll);
        listWrapperFromArguments      = new MyOwnCollectionType(args);
      });
    });
  });


  describe("This module also applies the »components.Enumerable_first_last_item_listGetterShorthands« Trait onto its list accessor method [all] ...", function () {

    it([

      "... thus it always in addition provides those 3 shorthand accessor methods [first], [last] and [item]",
      "to its list accessor method [all] in order to make an objects enclosed/wrapped list items accessible",
      "in a more convenient way."

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
        expect(listWrapperFromArray.all.item(listWrapperFromArray.all.size() - 1)).toBe(listWrapperFromArray.all.last());

        expect(listWrapperFromObject.all.item()).toBeUndefined();

        expect(listWrapperFromCollection.all.item(0)).toBe("hallo");
        expect(listWrapperFromCollection.all.item(1)).toBe("world");
        expect(listWrapperFromCollection.all.item(2)).toBeUndefined();
        expect(listWrapperFromCollection.all.item(-1)).toBeUndefined();

        expect(listWrapperFromCollection.all.item(0)).toBe(listWrapperFromCollection.all.first());
        expect(listWrapperFromCollection.all.item(listWrapperFromCollection.all().length - 1)).toBe(listWrapperFromCollection.all.last());

        expect(listWrapperFromArray.all.item(1)).toBe("a");
        expect(listWrapperFromArray.all.item(listWrapperFromArray.all.size() - 2)).toBe("l");

        expect(listWrapperFromArray.all.item(0)).toBe(listWrapperFromArray.all.first());
        expect(listWrapperFromArray.all.item(listWrapperFromArray.all().length - 1)).toBe(listWrapperFromArray.all.last());

        if (nodeList && (nodeList.length >= 1)) {

          expect(typeof listWrapperFromNodeList.all.item(0).nodeType()).toBe("number");
          expect(typeof listWrapperFromNodeList.all.item(0).nodeName()).toBe("string");

          expect(listWrapperFromNodeList.all.item(0)).toBe(listWrapperFromNodeList.all.first());
          expect(listWrapperFromNodeList.all.item(listWrapperFromNodeList.all.size() - 1)).toBe(listWrapperFromNodeList.all.last());
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
        expect(listWrapperFromString.all.item(listWrapperFromString.all.size() - 5)).toBe("w");
        expect(listWrapperFromString.all.item(listWrapperFromString.all().length - 4)).toBe("o");
        expect(listWrapperFromString.all.item(listWrapperFromString.all.size() - 3)).toBe("r");
        expect(listWrapperFromString.all.item(listWrapperFromString.all().length - 2)).toBe("l");
        expect(listWrapperFromString.all.item(listWrapperFromString.all.size() - 1)).toBe("d");

        expect(listWrapperFromString.all.item(0)).toBe(listWrapperFromString.all.first());
        expect(listWrapperFromString.all.item(listWrapperFromString.all().length - 1)).toBe(listWrapperFromString.all.last());
      });
    });
  });
});
