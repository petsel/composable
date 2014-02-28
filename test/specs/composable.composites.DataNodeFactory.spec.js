

describe("»composites.DataNodeFactory« module", function () {


  var
    GLOBAL_OBJECT = ((window && window.window === window) && window) || ((global && global.global === global) && global) || this,

    require = GLOBAL_OBJECT.composable.require,


    environment = require("environment_extended_introspective_core"),

    DataNodeFactory = require("composites.DataNodeFactory"),


    object_keys = GLOBAL_OBJECT.Object.keys,

    env_introspective = environment.introspective,


    dataNodeConfig = {

      name        : "Hans",
      lastName    : "Sachs",
      dateOfBirth : "1972-07-28",

      firstChild : {

        name        : "Otto",
        lastName    : "Sachs",
        dateOfBirth : "2002-05-02"
      },
      secondChild : {

        name        : "Mina",
        lastName    : "Sachs",
        dateOfBirth : "1998-11-07"
      },
      spouse : {

        name        : "Erna",
        lastName    : "Sachs",
        dateOfBirth : "1971-11-21",

        firstChild : {

          name        : "Otto",
          lastName    : "Sachs",
          dateOfBirth : "2002-05-02"
        },
        secondChild : {

          name        : "Mina",
          lastName    : "Sachs",
          dateOfBirth : "1998-11-07"
        },
        spouse : {

          name        : "Hans",
          lastName    : "Sachs",
          dateOfBirth : "1972-07-28",

          firstChild : {

            name        : "Otto",
            lastName    : "Sachs",
            dateOfBirth : "2002-05-02"
          },
          secondChild : {

            name        : "Mina",
            lastName    : "Sachs",
            dateOfBirth : "1998-11-07"
          },
          spouse : {

            name        : "Erna",
            lastName    : "Sachs",
            dateOfBirth : "1971-11-21",

            firstChild : {

              name        : "Otto",
              lastName    : "Sachs",
              dateOfBirth : "2002-05-02"
            },
            secondChild : {

              name        : "Mina",
              lastName    : "Sachs",
              dateOfBirth : "1998-11-07"
            },
            spouse : {

              name        : "Hans",
              lastName    : "Sachs",
              dateOfBirth : "1972-07-28"
            }
          }
        }
      }
    },

    dataNode,

//    enqueueListener,
//    dequeueListener,
//    emptyListener,
//
//    enqueueHandler = function (evt) {
//      ++pushBufferLength;
//      pushBuffer.push(evt.item);
//
//      targetCollector.push(evt.target);
//      typeCollector.push(evt.type);
//    },
//    dequeueHandler = function (evt) {
//      --pushBufferLength;
//      var
//        idx = pushBuffer.indexOf(evt.item),
//        word = pushBuffer.splice(idx,1)[0]
//      ;
//      ++sliceBufferLength;
//      sliceBuffer.push(evt.item === word && word || "");
//
//      targetCollector.push(evt.target);
//      typeCollector.push(evt.type);
//    },
//    emptyHandler = function (evt) {
//      var word = evt.item;
//      if (word) {
//        ++pushBufferLength;
//        pushBuffer.push(word);
//      }
//      targetCollector.push(evt.target);
//      typeCollector.push(evt.type);
//    },

    NULL_VALUE = null,
    UNDEFINED_VALUE
  ;


  it("should - if required via »( composable. )require(\"composites.DataNodeFactory\")« - always be a real \"object\" type.", function () {

    expect(DataNodeFactory && (typeof DataNodeFactory == "object")).toBe(true);
  });


  describe("This module being a [DataNode] factory too", function () {


    it([
      "should feature three methods - [create], [isDataNode] and [isNodeConfig]."

    ].join(" "), function () {

      expect(object_keys(DataNodeFactory).length).toBe(3);

      expect(typeof DataNodeFactory.create).toBe("function");
      expect(typeof DataNodeFactory.isDataNode).toBe("function");
      expect(typeof DataNodeFactory.isNodeConfig).toBe("function");
    });


    describe("As for [create]", function () {
      it([

        "it should - if invoked - return a [DataNode] type.",
        "Thus such an object needs to feature a vast set of base methods -",
        "[setAttr], [getAttr], [removeAttr], [setChild], [getChild], [removeChild],",
        "[getAttrKeys], [getAttrList], [getChildKeys], [getChildList] and [getParent]."

      ].join(" "), function () {

        dataNode = DataNodeFactory.create();

        expect(
          object_keys(dataNode).filter(function (key) {
            return (typeof dataNode[key] == "function");
          }).length
        ).toBe(15); // inclusively [dataNode.constructor]

        expect(typeof dataNode.setAttr).toBe("function");
        expect(typeof dataNode.getAttr).toBe("function");
        expect(typeof dataNode.removeAttr).toBe("function");

        expect(typeof dataNode.setChild).toBe("function");
        expect(typeof dataNode.getChild).toBe("function");
        expect(typeof dataNode.removeChild).toBe("function");

        expect(typeof dataNode.getAttrKeys).toBe("function");
        expect(typeof dataNode.getAttrList).toBe("function");

        expect(typeof dataNode.getChildKeys).toBe("function");
        expect(typeof dataNode.getChildList).toBe("function");

        expect(typeof dataNode.getParent).toBe("function");
      });


      describe("it accepts two parameters - a [config] type and a future data node's parent node and ...", function () {

        it([
          "... if invoked without any of these parameters, it should return a [DataNode] type",
          "without attributes nor child nodes nor a parent node associated to it."

        ].join(" "), function () {

          dataNode = DataNodeFactory.create();

          expect(env_introspective.isEmptyType(dataNode.getAttrList())).toBe(true);
          expect(env_introspective.isEmptyType(dataNode.getChildList())).toBe(true);
          expect(dataNode.getParent()).toBeNull();
        });

        it([
          "... if invoked with an invalid [config] type and an invalid parent node reference, it should return",
          "a [DataNode] type without attributes nor child nodes nor this invalid parent node associated to it."

        ].join(" "), function () {

          dataNode = DataNodeFactory.create({}, {});

          expect(env_introspective.isEmptyType(dataNode.getAttrList())).toBe(true);
          expect(env_introspective.isEmptyType(dataNode.getChildList())).toBe(true);
          expect(dataNode.getParent()).toBeNull();
        });

        it([
          "... if invoked with a valid [config] type and a valid parent node reference, it should return",
          "a [DataNode] type with attributes, child nodes and this parent node associated to it."

        ].join(" "), function () {

          dataNode = DataNodeFactory.create(dataNodeConfig, DataNodeFactory.create());

          expect(env_introspective.isEmptyType(dataNode.getAttrList())).toBe(false);
          expect(env_introspective.isEmptyType(dataNode.getChildList())).toBe(false);

          expect(DataNodeFactory.isNodeConfig(dataNodeConfig)).toBe(true);
          expect(DataNodeFactory.isDataNode(dataNode)).toBe(true);
          expect(DataNodeFactory.isDataNode(dataNode.getParent())).toBe(true);
        });
      });


      describe("As for every returned [DataNode] type", function () {

        it([

          "it - in addition - should feature 3 methods out of the default",
          "»components.Observable_SignalsAndSlots« Mixin -",
          "[addEventListener], [removeEventListener] and [dispatchEvent]."

        ].join(" "), function () {

          expect(typeof dataNode.addEventListener).toBe("function");
          expect(typeof dataNode.removeEventListener).toBe("function");
          expect(typeof dataNode.dispatchEvent).toBe("function");

          expect(dataNode.hasEventListener).toBeUndefined();
        });


        describe([

          "... as for [setAttr] ..."

        ].join(" "), function () {

          it([
            "it accepts up to three parameters and expects at least [key] and [value]",
            "as the first both mandatory ones and should add a key value pair to the",
            "[DataNode] type if it did not exist before."

          ].join(" "), function () {

            dataNode = DataNodeFactory.create();
            expect(dataNode.getAttr("foo")).toBeUndefined();    // GET - for counter checking only

            expect(dataNode.setAttr.length).toBe(3);            // SET - for checking its arguments API

            expect(dataNode.setAttr()).toBeUndefined();         // SET
            expect(dataNode.setAttr("foo")).toBeUndefined();    // SET

            expect(dataNode.getAttr("foo")).toBeUndefined();    // GET - for counter checking only

            expect(dataNode.setAttr("foo", "bar")).toBe("bar"); // SET

            expect(dataNode.getAttr("foo")).toBe("bar");        // GET - for counter checking only
          });

          it([
            "its 1st [key] parameter should be a non empty and non blank string type in order to work properly."

          ].join(" "), function () {

            dataNode = DataNodeFactory.create();

            expect(dataNode.setAttr("", "empty")).toBeUndefined();          // SET
            expect(dataNode.getAttr("")).toBeUndefined();                   // GET - for counter checking only

            expect(dataNode.setAttr(" ", "single blank")).toBeUndefined();  // SET
            expect(dataNode.getAttr(" ")).toBeUndefined();                  // GET - for counter checking only
            expect(dataNode.getAttr("  ")).toBeUndefined();                 // GET - for counter checking only
            expect(dataNode.getAttr("")).toBeUndefined();                   // GET - for counter checking only

            expect(dataNode.setAttr("  ", "double blank")).toBeUndefined(); // SET
            expect(dataNode.getAttr("  ")).toBeUndefined();                 // GET - for counter checking only
            expect(dataNode.getAttr(" ")).toBeUndefined();                  // GET - for counter checking only
            expect(dataNode.getAttr("")).toBeUndefined();                   // GET - for counter checking only


            expect(dataNode.getAttr("foo")).toBeUndefined();  // GET - for counter checking only
            expect(dataNode.getAttr(5)).toBeUndefined();      // GET - for counter checking only

            expect(dataNode.setAttr(5, 5)).toBeUndefined();   // SET
            expect(dataNode.getAttr(5)).toBeUndefined();      // GET - for counter checking only
            expect(dataNode.getAttr("5")).toBeUndefined();    // GET - for counter checking only

            expect(dataNode.setAttr("5", 5)).toBe(5);         // SET
            expect(dataNode.getAttr(5)).toBeUndefined();      // GET - for counter checking only
            expect(dataNode.getAttr("5")).toBe(5);            // GET - for counter checking only
          });

          it([
            "its 2nd [value] parameter should allowed to be any type distinct from [object Object]."

          ].join(" "), function () {

            dataNode = DataNodeFactory.create();

            expect(dataNode.setAttr("foo", {})).toBe(false);          // SET
            expect(dataNode.setAttr("foo", {bar:"baz"})).toBe(false); // SET

            expect(dataNode.setAttr("boolean", true)).toBe(true);     // SET
            expect(dataNode.setAttr("number", 3)).toBe(3);            // SET
            expect(dataNode.setAttr("string", "3")).toBe("3");        // SET
          });

          it([
            "invoked with an [object Object] type as 2nd parameter it should return a [false] value."

          ].join(" "), function () {

            dataNode = DataNodeFactory.create();

            expect(dataNode.setAttr("foo", {})).toBe(false);          // SET
            expect(dataNode.setAttr("foo", {bar:"baz"})).toBe(false); // SET
          });

          it([
            "invoked with otherwise invalid arguments it should return the [undefined] value."

          ].join(" "), function () {

            dataNode = DataNodeFactory.create();

            expect(dataNode.setAttr(UNDEFINED_VALUE, "undefined")).toBeUndefined(); // SET
            expect(dataNode.setAttr(NULL_VALUE, "null")).toBeUndefined();           // SET

            expect(dataNode.setAttr("foo")).toBeUndefined();      // SET
            expect(dataNode.setAttr("", "bar")).toBeUndefined();  // SET
            expect(dataNode.setAttr(" ", "bar")).toBeUndefined(); // SET
            expect(dataNode.setAttr([], "")).toBeUndefined();     // SET
            expect(dataNode.setAttr("[]", "")).toBe("");          // SET
          });

          it([
            "validly invoked it should return the value that just got written as part of the key value pair."

          ].join(" "), function () {

            dataNode = DataNodeFactory.create();

            expect(dataNode.setAttr("foo", "bar")).toBe("bar");       // SET
            expect(dataNode.setAttr("foo", "baz")).toBe("baz");       // SET
            expect(dataNode.getAttr("foo")).toBe("baz");              // GET - for counter checking only


            expect(dataNode.setAttr("boolean", true)).toBe(true);     // SET
            expect(dataNode.setAttr("number", 3)).toBe(3);            // SET
            expect(dataNode.setAttr("string", "3")).toBe("3");        // SET

            expect(dataNode.setAttr("number", 3)).toBe(3);            // SET
            expect(dataNode.setAttr("string", "3")).toBe("3");        // SET

            expect("" + dataNode.setAttr("Function", new Function)).toBe("" +(new Function)); // SET
            expect("" + dataNode.setAttr("RegExp", new RegExp)).toBe("" + (/(?:)/));          // SET
            expect("" + dataNode.setAttr("Array", new Array)).toBe("" + []);                  // SET
          });
        });


        describe([

          "... as for [getAttr] ..."

        ].join(" "), function () {

          it([
            "it expects [key] as its sole parameter that should be a non empty and non blank string type."

          ].join(" "), function () {

            dataNode = DataNodeFactory.create();

            expect(dataNode.getAttr.length).toBe(1);


            dataNode.setAttr("", "empty");
            expect(dataNode.getAttr("")).toBeUndefined();

            dataNode.setAttr(" ", "single blank");
            expect(dataNode.getAttr(" ")).toBeUndefined();

            dataNode.setAttr("  ", "double blank");
            expect(dataNode.getAttr("  ")).toBeUndefined();


            expect(dataNode.getAttr("foo")).toBeUndefined();
            expect(dataNode.getAttr(5)).toBeUndefined();

            dataNode.setAttr(5, 5);
            expect(dataNode.getAttr(5)).toBeUndefined();
            expect(dataNode.getAttr("5")).toBeUndefined();

            dataNode.setAttr("5", 5);
            expect(dataNode.getAttr(5)).toBeUndefined();
            expect(dataNode.getAttr("5")).toBe(5);

            dataNode.setAttr("foo", "bar");
            expect(dataNode.getAttr("foo")).toBe("bar");

            expect(dataNode.getAttr()).toBeUndefined();
          });

          it([
            "validly invoked it should return the value that is associated with the passed [key] argument."

          ].join(" "), function () {

            dataNode = DataNodeFactory.create();

            dataNode.setAttr("foo", "baz");
            expect(dataNode.getAttr("foo")).toBe("baz");

            dataNode.setAttr("boolean", false);
            expect(dataNode.getAttr("boolean")).toBe(false);

            dataNode.setAttr("number", 3);
            expect(dataNode.getAttr("number")).toBe(3);

            dataNode.setAttr("string", "3");
            expect(dataNode.getAttr("string")).toBe("3");

            dataNode.setAttr("Function", new Function);
            expect("" + dataNode.getAttr("Function")).toBe("" +(new Function));

            dataNode.setAttr("RegExp", new RegExp);
            expect("" + dataNode.getAttr("RegExp", new RegExp)).toBe("" + (/(?:)/));

            dataNode.setAttr("Array", new Array);
            expect("" + dataNode.getAttr("Array", new Array)).toBe("" + []);
          });
        });


////"[setAttr], [getAttr], [removeAttr], [setChild], [getChild], [removeChild],",
////"[getAttrKeys], [getAttrList], [getChildKeys], [getChildList] and [getParent]."
//        xdescribe([
//
//          "... as for [removeAttr] ..."
//
//        ].join(" "), function () {
//
//          it([
//            "it expects [key] as its sole parameter that should be a non empty and non blank string type."
//
//          ].join(" "), function () {
//
//            dataNode = DataNodeFactory.create();
//
//            expect(dataNode.getAttr.length).toBe(1);
//
//
//            dataNode.setAttr("", "empty");
//            expect(dataNode.getAttr("")).toBeUndefined();
//
//            dataNode.setAttr(" ", "single blank");
//            expect(dataNode.getAttr(" ")).toBeUndefined();
//
//            dataNode.setAttr("  ", "double blank");
//            expect(dataNode.getAttr("  ")).toBeUndefined();
//
//
//            expect(dataNode.getAttr("foo")).toBeUndefined();
//            expect(dataNode.getAttr(5)).toBeUndefined();
//
//            dataNode.setAttr(5, 5);
//            expect(dataNode.getAttr(5)).toBeUndefined();
//            expect(dataNode.getAttr("5")).toBeUndefined();
//
//            dataNode.setAttr("5", 5);
//            expect(dataNode.getAttr(5)).toBeUndefined();
//            expect(dataNode.getAttr("5")).toBe(5);
//
//            dataNode.setAttr("foo", "bar");
//            expect(dataNode.getAttr("foo")).toBe("bar");
//
//            expect(dataNode.getAttr()).toBeUndefined();
//          });
//
//          it([
//            "validly invoked it should return the value that is associated with the passed [key] argument."
//
//          ].join(" "), function () {
//
//            dataNode = DataNodeFactory.create();
//
//            dataNode.setAttr("foo", "baz");
//            expect(dataNode.getAttr("foo")).toBe("baz");
//
//            dataNode.setAttr("boolean", false);
//            expect(dataNode.getAttr("boolean")).toBe(false);
//
//            dataNode.setAttr("number", 3);
//            expect(dataNode.getAttr("number")).toBe(3);
//
//            dataNode.setAttr("string", "3");
//            expect(dataNode.getAttr("string")).toBe("3");
//
//            dataNode.setAttr("Function", new Function);
//            expect("" + dataNode.getAttr("Function")).toBe("" +(new Function));
//
//            dataNode.setAttr("RegExp", new RegExp);
//            expect("" + dataNode.getAttr("RegExp", new RegExp)).toBe("" + (/(?:)/));
//
//            dataNode.setAttr("Array", new Array);
//            expect("" + dataNode.getAttr("Array", new Array)).toBe("" + []);
//          });
//        });


      });
    });


    describe([

      "In addition to its static [create] method this factory does feature a static [isDataNode] method"

    ].join(" "), function () {

      it([

        "that expects a single parameter - the type that is going to be tested",
        "of whether being a [DataNode] type or not."

      ].join(" "), function () {

        expect(DataNodeFactory.isDataNode(dataNode)).toBe(true);

        expect(DataNodeFactory.isDataNode()).toBe(false);
        expect(DataNodeFactory.isDataNode(DataNodeFactory)).toBe(false);


        // method API comparison
        expect(DataNodeFactory.isDataNode(require("composites.DataNodeFactory").create())).toBe(true);
      });
    });


    describe([

      "In addition to its both methods [create] and [isDataNode] this factory does feature",
      "[isNodeConfig] as its 3rd static method."

    ].join(" "), function () {

      it([

        "that expects a single parameter - the object that is going to be tested",
        "of whether being a valid [config] type or not."

      ].join(" "), function () {

        expect(DataNodeFactory.isNodeConfig(dataNode)).toBe(false);

        expect(DataNodeFactory.isNodeConfig()).toBe(false);
        expect(DataNodeFactory.isNodeConfig([])).toBe(false);
        expect(DataNodeFactory.isNodeConfig(GLOBAL_OBJECT.Number.NaN)).toBe(false);
        expect(DataNodeFactory.isNodeConfig(new GLOBAL_OBJECT.Number)).toBe(false);
        expect(DataNodeFactory.isNodeConfig(new GLOBAL_OBJECT.String)).toBe(false);

        expect(DataNodeFactory.isNodeConfig({})).toBe(true);
        expect(DataNodeFactory.isNodeConfig(dataNodeConfig)).toBe(true);
      });
    });


  });
});
