

describe("»composites.DataNodeFactory« module", function () {


  var
    GLOBAL_OBJECT = ((window && window.window === window) && window) || ((global && global.global === global) && global) || this,


    object_keys = GLOBAL_OBJECT.Object.keys,

    require = GLOBAL_OBJECT.composable.require,


    DataNodeFactory = require("composites.DataNodeFactory"),


    config = {

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

    enqueueListener,
    dequeueListener,
    emptyListener,

    enqueueHandler = function (evt) {
      ++pushBufferLength;
      pushBuffer.push(evt.item);

      targetCollector.push(evt.target);
      typeCollector.push(evt.type);
    },
    dequeueHandler = function (evt) {
      --pushBufferLength;
      var
        idx = pushBuffer.indexOf(evt.item),
        word = pushBuffer.splice(idx,1)[0]
      ;
      ++sliceBufferLength;
      sliceBuffer.push(evt.item === word && word || "");

      targetCollector.push(evt.target);
      typeCollector.push(evt.type);
    },
    emptyHandler = function (evt) {
      var word = evt.item;
      if (word) {
        ++pushBufferLength;
        pushBuffer.push(word);
      }
      targetCollector.push(evt.target);
      typeCollector.push(evt.type);
    }
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

//        it([
//
//          "it - also in addition - should feature all methods applied by the »components.Allocable« Trait -",
//          "[toArray] / [valueOf], [toString] and [size] as well as [first], [last] and [item]."
//
//        ].join(" "), function () {
//
//          expect(typeof queue_3.toArray).toBe("function");
//          expect(typeof queue_3.valueOf).toBe("function");
//          expect(queue_3.toArray).toBe(queue_3.valueOf);
//          expect(typeof queue_3.toString).toBe("function");
//          expect(typeof queue_3.size).toBe("function");
//
//          expect(typeof queue_3.first).toBe("function");
//          expect(typeof queue_3.last).toBe("function");
//          expect(typeof queue_3.item).toBe("function");
//        });
//
//        describe("As for [enqueue]", function () {
//          it([
//
//            "it accepts a single parameter - the item that is going to be stored into the queue."
//
//          ].join(" "), function () {
//
//            expect(queue_1.enqueue.length).toBe(1);
//            expect(queue_2.enqueue.length).toBe(1);
//            expect(queue_3.enqueue.length).toBe(1);
//          });
//
//          it([
//
//            "it should internally store a reference of the provided type or - if it was a primitive - this type itself.",
//            "It also is supposed to return the stored reference or value again."
//
//          ].join(" "), function () {
//
//            expect(queue_1.size()).toBe(0);
//            expect(queue_1.enqueue(wordList[1])).toBe(wordList[1]);
//            expect(queue_1.size()).toBe(1);
//            expect(queue_1.enqueue(wordList[3])).toBe(wordList[3]);
//            expect(queue_1.enqueue(wordList[5])).toBe(wordList[5]);
//            expect(queue_1.size()).toBe(3);
//          });
//        });
//
//        describe("As for [dequeue]", function () {
//          it([
//
//            "it should - for every invocation - return one of the internally stored items, ensuring the same precedence",
//            "as of each item's \"enqueueing\". Thus working the way of a FIFO (first in first out) stack."
//
//          ].join(" "), function () {
//
//            expect(queue_1.size()).toBe(3);
//            expect(queue_1.dequeue()).toBe(wordList[1]);
//            expect(queue_1.size()).toBe(2);
//            expect(queue_1.dequeue()).toBe(wordList[3]);
//            expect(queue_1.dequeue()).toBe(wordList[5]);
//            expect(queue_1.size()).toBe(0);
//          });
//
//          it([
//            "it should - in case of an empty queue - return the [undefined] value."
//
//          ].join(" "), function () {
//
//            expect(queue_1.size()).toBe(0);
//            expect(queue_1.dequeue()).toBeUndefined();
//            expect(queue_1.size()).toBe(0);
//            expect(queue_1.dequeue()).toBeUndefined();
//            expect(queue_1.size()).toBe(0);
//          });
//        });
//
//        describe("As for listening to \"enqueue\"", function () {
//          it([
//
//            "it needs subscribing to it - »queue.addEventListener(\"enqueue\", enqueueHandler)«."
//
//          ].join(" "), function () {
//
//            enqueueListener = queue_2.addEventListener("enqueue", enqueueHandler);
//
//            expect(enqueueListener.getType()).toBe("enqueue");
//            expect(enqueueListener.getHandler()).toBe(enqueueHandler);
//          });
//
//          it([
//
//            "the [event] object that is passed into the event handler - in addition to both of its",
//            "standard fields [type] and [target] - exposes [item]. The latter equals the \"enqueued\" type."
//
//          ].join(" "), function () {
//
//            targetCollector = [];
//            typeCollector = [];
//
//            wordList.forEach(function (word) {
//              queue_2.enqueue(word);
//            });
//
//            expect(sliceBufferLength).toBe(0);
//
//            expect(pushBufferLength).toBe(wordListLength);
//            expect(pushBufferLength).toBe(pushBuffer.length);
//
//            expect(targetCollector.every(function (target) {return (target === queue_2);})).toBe(true);
//            expect(typeCollector.every(function (type) {return (type === "enqueue");})).toBe(true);
//          });
//        });
//
//        describe("As for listening to \"dequeue\"", function () {
//          it([
//
//            "it needs subscribing to it - »queue.addEventListener(\"dequeue\", dequeueHandler)«."
//
//          ].join(" "), function () {
//
//            dequeueListener = queue_2.addEventListener("dequeue", dequeueHandler);
//
//            expect(dequeueListener.getType()).toBe("dequeue");
//            expect(dequeueListener.getHandler()).toBe(dequeueHandler);
//          });
//
//          it([
//
//            "the [event] object that is passed into the event handler - in addition to both of its",
//            "standard fields [type] and [target] - exposes [item]. The latter equals the \"dequeued\" type."
//
//          ].join(" "), function () {
//
//            targetCollector = [];
//            typeCollector = [];
//
//            while (queue_2.size() >= 1) {
//              queue_2.dequeue();
//            }
//
//            expect(pushBufferLength).toBe(0);
//
//            expect(sliceBufferLength).toBe(wordListLength);
//            expect(sliceBufferLength).toBe(sliceBuffer.length);
//
//            expect(targetCollector.every(function (target) {return (target === queue_2);})).toBe(true);
//            expect(typeCollector.every(function (type) {return (type === "dequeue");})).toBe(true);
//          });
//        });
//
//        describe("As for listening to \"empty\" that will be dispatched whenever [dequeue] was operated on or has ended up with an empty queue", function () {
//          it([
//
//            "it needs subscribing to it - »queue.addEventListener(\"empty\", emptyHandler)«."
//
//          ].join(" "), function () {
//
//            emptyListener = queue_2.addEventListener("empty", emptyHandler);
//
//            expect(emptyListener.getType()).toBe("empty");
//            expect(emptyListener.getHandler()).toBe(emptyHandler);
//          });
//
//          it([
//
//            "the [event] object that is passed into the event handler does not expose any fields in addition",
//            "to both of its standard fields [type] and [target] - NOTE: \"dequeue\" dispatching still continues",
//            "in parallel just before \"empty\" gets dispatched."
//
//          ].join(" "), function () {
//
//            targetCollector = [];
//            typeCollector = [];
//
//            queue_2.dequeue();
//            queue_2.dequeue();
//            queue_2.dequeue();
//            queue_2.dequeue();
//            queue_2.dequeue();
//
//            expect(pushBufferLength).toBe(-5);  // - since "dequeue" dispatching still continues in parallel.
//            expect(pushBuffer.length).toBe(0);  // - since an array's minimum length always will be zero.
//
//            expect(targetCollector.length).toBe(10);  // - since "dequeue" dispatching still continues in parallel ...
//            expect(typeCollector.length).toBe(10);    //   ... just before "empty" gets dispatched.
//
//            expect(targetCollector.every(function (target) {return (target === queue_2);})).toBe(true);
//
//            typeCollector.sort(); // - since "dequeue" dispatching still continues in parallel just before "empty" gets dispatched.
//            expect(typeCollector.splice(0, 5).every(function (type) {return (type === "dequeue");})).toBe(true);
//            expect(typeCollector.splice(5, 5).every(function (type) {return (type === "empty");})).toBe(true);
//          });
//        });
//
//        describe("As for every queue's [Allocable] method API", function () {
//          it([
//
//            "[size] returns the current amount of stored items as (integer) number value."
//
//          ].join(" "), function () {
//
//            expect(queue_3.size()).toBe(0);
//
//            wordList.forEach(function (word) {
//              queue_3.enqueue(word);
//            });
//
//            expect(queue_3.size()).toBe(wordListLength);
//          });
//
//          it([
//
//            "both [toArray] and [valueOf] return a copy of the stored",
//            "items in array form ensuring the items correct precedence."
//
//          ].join(" "), function () {
//
//            expect(queue_3.toArray().join("")).toBe(wordList.join(""));
//            expect(queue_3.valueOf().join("")).toBe(wordList.join(""));
//          });
//
//          it([
//
//            "[toString] does return the [toString] value of every queue's enclosed/wrapped item list."
//
//          ].join(" "), function () {
//
//            expect(queue_3.toString()).toBe(wordList.toString());
//            expect(queue_3.toString()).toBe(GLOBAL_OBJECT.String(wordList));
//            expect(queue_3.toString()).toBe("" + wordList);
//          });
//
//          it([
//
//            "[first] returns every queue's first item."
//
//          ].join(" "), function () {
//
//            expect(queue_3.first()).toBe(wordList[0]);
//          });
//
//          it([
//
//            "[last] returns every queue's last item."
//
//          ].join(" "), function () {
//
//            expect(queue_3.last()).toBe(wordList[wordListLength - 1]);
//          });
//
//          it([
//
//            "[item] accepts a sole argument that will be interpreted as integer value N.",
//            "It than returns every queue's N'th item."
//
//          ].join(" "), function () {
//
//            expect(queue_3.item(0)).toBe(queue_3.first());
//            expect(queue_3.item(queue_3.size() - 1)).toBe(queue_3.last());
//            expect(queue_3.item(5)).toBe(wordList[5]);
//          });
//        });
      });
    });


    describe("In addition to its [create] method this factory does feature an [isDataNode] method", function () {

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


  });
});
