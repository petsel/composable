

describe("»components.Allocable« module", function () {


  var
    GLOBAL_OBJECT = ((window && window.window === window) && window) || ((global && global.global === global) && global) || this,

    require = GLOBAL_OBJECT.composable.require,

    Allocable = require("components.Allocable"),


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

        Allocable.call(this, arrayFrom(listLikeStructure) || []);
    },
    listWrapperFromString         = new MyOwnCollectionType(str),
    listWrapperFromArray          = new MyOwnCollectionType(arr),
    listWrapperFromObject         = new MyOwnCollectionType(obj),
    listWrapperFromCollection     = new MyOwnCollectionType(coll),
    listWrapperFromArguments      = new MyOwnCollectionType(args),
    listWrapperFromNodeList       = new MyOwnCollectionType(nodeList),
    listWrapperFromHtmlCollection = new MyOwnCollectionType(htmlCollection)
  ;
  it("should - if required via »( composable. )require(\"components.Allocable\")« - always be a \"function\" type.", function () {
    expect(typeof Allocable).toBe("function");
  });


  describe("This module being a privileged functional Trait", function () {

    it([

      "does accept an additional parameter that should be an array instance",
      "or any other instance of a list structure that's items can be accessed",
      "via square bracket notation.",
      "NOTE: This additional parameter will not be tested."

    ].join(" "), function () {

      expect(Allocable.length).toBe(1);
    });

    it([

      "should - if applied onto an object e.g. »Allocable.call(customType, arrayInstance)«",
      "- always provide its accessor methods [toArray] / [valueOf] which are equivalent",
      "as well as [toString] and [size]."

    ].join(" "), function () {

      expect(typeof listWrapperFromString.toArray).toBe("function");
      expect(typeof listWrapperFromString.valueOf).toBe("function");
      expect(listWrapperFromString.toArray).toBe(listWrapperFromString.valueOf);
      expect(typeof listWrapperFromString.toString).toBe("function");
      expect(typeof listWrapperFromString.size).toBe("function");

      expect(typeof listWrapperFromArray.toArray).toBe("function");
      expect(typeof listWrapperFromArray.valueOf).toBe("function");
      expect(listWrapperFromArray.toArray).toBe(listWrapperFromArray.valueOf);
      expect(typeof listWrapperFromArray.toString).toBe("function");
      expect(typeof listWrapperFromArray.size).toBe("function");

      expect(typeof listWrapperFromObject.toArray).toBe("function");
      expect(typeof listWrapperFromObject.valueOf).toBe("function");
      expect(listWrapperFromObject.toArray).toBe(listWrapperFromObject.valueOf);
      expect(typeof listWrapperFromObject.toString).toBe("function");
      expect(typeof listWrapperFromObject.size).toBe("function");

      expect(typeof listWrapperFromCollection.toArray).toBe("function");
      expect(typeof listWrapperFromCollection.valueOf).toBe("function");
      expect(listWrapperFromCollection.toArray).toBe(listWrapperFromCollection.valueOf);
      expect(typeof listWrapperFromCollection.toString).toBe("function");
      expect(typeof listWrapperFromCollection.size).toBe("function");

      expect(typeof listWrapperFromArguments.toArray).toBe("function");
      expect(typeof listWrapperFromArguments.valueOf).toBe("function");
      expect(listWrapperFromArguments.toArray).toBe(listWrapperFromArguments.valueOf);
      expect(typeof listWrapperFromArguments.toString).toBe("function");
      expect(typeof listWrapperFromArguments.size).toBe("function");

      expect(typeof listWrapperFromNodeList.toArray).toBe("function");
      expect(typeof listWrapperFromNodeList.valueOf).toBe("function");
      expect(listWrapperFromNodeList.toArray).toBe(listWrapperFromNodeList.valueOf);
      expect(typeof listWrapperFromNodeList.toString).toBe("function");
      expect(typeof listWrapperFromNodeList.size).toBe("function");

      expect(typeof listWrapperFromHtmlCollection.toArray).toBe("function");
      expect(typeof listWrapperFromHtmlCollection.valueOf).toBe("function");
      expect(listWrapperFromHtmlCollection.toArray).toBe(listWrapperFromHtmlCollection.valueOf);
      expect(typeof listWrapperFromHtmlCollection.toString).toBe("function");
      expect(typeof listWrapperFromHtmlCollection.size).toBe("function");
    });


    describe("As for [toArray] / [valueOf]", function () {

      it([

        "it should return - in array form - a copy of the objects enclosed/wrapped list."

      ].join(" "), function () {

        expect(listWrapperFromString.toArray() instanceof Array).toBe(true);
        expect(listWrapperFromString.toArray()).not.toBe(str);
        expect("" + listWrapperFromString.toArray()).toBe("" + arrayFrom(str));

        expect(listWrapperFromArray.toArray() instanceof Array).toBe(true);
        expect(listWrapperFromArray.toArray()).not.toBe(arr);
        expect("" + listWrapperFromArray.toArray()).toBe("" + arr);


        expect(listWrapperFromObject.toArray() instanceof Array).toBe(true);
        expect(listWrapperFromObject.toArray()).not.toBe([]);
        expect("" + listWrapperFromObject.toArray()).toBe("" + []);

        expect("" + listWrapperFromObject.toArray()).not.toBe("" + obj);


        expect(listWrapperFromCollection.toArray() instanceof Array).toBe(true);
        expect(listWrapperFromCollection.toArray()).not.toBe([listWrapperFromCollection.toArray()[0], listWrapperFromCollection.toArray()[1]]);
        expect("" + listWrapperFromCollection.toArray()).toBe("" + [listWrapperFromCollection.toArray()[0], listWrapperFromCollection.toArray()[1]]);

        expect(listWrapperFromArguments.toArray() instanceof Array).toBe(true);
        expect(listWrapperFromArguments.toArray()).not.toBe(args);
        expect("" + listWrapperFromArguments.toArray()).toBe("" + arrayFrom(args));

        if (nodeList && (nodeList.length >= 1)) {

          expect(listWrapperFromNodeList.toArray() instanceof Array).toBe(true);
          expect(listWrapperFromNodeList.toArray()).not.toBe(nodeList);
          expect("" + listWrapperFromNodeList.toArray()).toBe("" + arrayFrom(nodeList));
        }
        if (htmlCollection && (htmlCollection.length >= 1)) {

          expect(listWrapperFromHtmlCollection.toArray() instanceof Array).toBe(true);
          expect(listWrapperFromHtmlCollection.toArray()).not.toBe(htmlCollection);
          expect("" + listWrapperFromHtmlCollection.toArray()).toBe("" + arrayFrom(htmlCollection));
        }
      });
    });

    describe("As for [toString]", function () {

      it([

        "it should return the [toString] value of the objects enclosed/wrapped list."

      ].join(" "), function () {

        expect(listWrapperFromString.toString()).toBe("" + arrayFrom(str));
        expect(listWrapperFromString.toString()).toBe(arrayFrom(str).toString());

        expect(listWrapperFromString.toString()).not.toBe(str);


        expect(listWrapperFromArray.toString()).toBe("" + arr);
        expect(listWrapperFromArray.toString()).toBe(arr.toString());


        expect(listWrapperFromObject.toString()).toBe("" + []);

        expect(listWrapperFromObject.toString()).not.toBe("" + {});


        expect(listWrapperFromCollection.toString()).toBe("" + [listWrapperFromCollection.toArray()[0], listWrapperFromCollection.toArray()[1]]);
        expect(listWrapperFromCollection.toString()).toBe([listWrapperFromCollection.toArray()[0], listWrapperFromCollection.toArray()[1]].toString());

        expect(listWrapperFromObject.toString()).not.toBe("" + coll);


        expect(listWrapperFromArguments.toString()).toBe("" + arrayFrom(args));
        expect(listWrapperFromArguments.toString()).toBe(arrayFrom(args).toString());


        if (nodeList && (nodeList.length >= 1)) {

          expect(listWrapperFromNodeList.toString()).toBe("" + arrayFrom(nodeList));
          expect(listWrapperFromNodeList.toString()).toBe(arrayFrom(nodeList).toString());
        }
        if (htmlCollection && (htmlCollection.length >= 1)) {

          expect(listWrapperFromHtmlCollection.toString()).toBe("" + arrayFrom(htmlCollection));
          expect(listWrapperFromHtmlCollection.toString()).toBe(arrayFrom(htmlCollection).toString());
        }
      });
    });

    describe("As for [size]", function () {

      it([

        "it should return the current length of the objects enclosed/wrapped list as (integer) number value."

      ].join(" "), function () {

        expect(typeof listWrapperFromString.size()).toBe("number");
        expect(listWrapperFromString.size()).toBe(str.length);

        expect(typeof listWrapperFromArray.size()).toBe("number");
        expect(listWrapperFromArray.size()).toBe(arr.length);


        expect(typeof listWrapperFromObject.size()).toBe("number");
        expect(listWrapperFromObject.size()).toBe([].length);

        expect(listWrapperFromObject.size()).not.toBe(obj.length);


        expect(typeof listWrapperFromCollection.size()).toBe("number");
        expect(listWrapperFromCollection.size()).toBe(coll.length);

        expect(typeof listWrapperFromArguments.size()).toBe("number");
        expect(listWrapperFromArguments.size()).toBe(args.length);


        if (nodeList && (nodeList.length >= 1)) {

          expect(typeof listWrapperFromNodeList.size()).toBe("number");
          expect(listWrapperFromNodeList.size()).toBe(nodeList.length);
        }
        if (htmlCollection && (htmlCollection.length >= 1)) {

          expect(typeof listWrapperFromHtmlCollection.size()).toBe("number");
          expect(listWrapperFromHtmlCollection.size()).toBe(nodeList.length);
        }
      });
    });
  });


  describe("This module also applies the »components.Enumerable_first_last_item_listWrapper« Trait onto itself ...", function () {

    it([

      "... thus it always in addition provides those 3 accessor methods [first], [last] and [item]",
      "in order to make an objects enclosed/wrapped list items accessible."

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
