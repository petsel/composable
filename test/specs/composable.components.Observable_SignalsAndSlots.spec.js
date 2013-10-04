

describe("»components.Observable_SignalsAndSlots« module", function () {


  var
    GLOBAL_OBJECT = ((window && window.window === window) && window) || ((global && global.global === global) && global) || this,

    require = GLOBAL_OBJECT.composable.require,

    Observable = require("components.Observable_SignalsAndSlots"),


    executedEventType,
    executedEventTarget,
    executedEventObject,
    handlerHasBeenExecuted,

    resetExecutionControls = function () {

      executedEventType = null;
      executedEventTarget = null;
      executedEventObject = null;

      handlerHasBeenExecuted = false;
    },

    eventHandler = function (evt) {

      executedEventType = evt.type;
      executedEventTarget = evt.target;

      executedEventObject = evt;

      handlerHasBeenExecuted = true;
    },
    eventType = "observableTest",

    eventListener,


    observableObject = {}
  ;
  Observable.call(observableObject);


  resetExecutionControls();


  it("should - if required via »( composable. )require(\"components.Observable_SignalsAndSlots\")« - always be a \"function\" type.", function () {
    expect(typeof Observable).toBe("function");
  });


  describe("This module being a functional Mixin", function () {


    it([

      "should - if applied onto an object e.g. »Observable.call(anyObject)« - always provide",
      "its 4 methods that - by default - are named [addEventListener], [removeEventListener],",
      "[hasEventListener] and [dispatchEvent]."

    ].join(" "), function () {

      expect(typeof observableObject.addEventListener).toBe("function");
      expect(typeof observableObject.removeEventListener).toBe("function");
      expect(typeof observableObject.hasEventListener).toBe("function");
      expect(typeof observableObject.dispatchEvent).toBe("function");
    });


    describe([

      "optionally accepts - if going to be applied onto / delegated to an object - a configuration",
      "object that's key value pairs ..."

    ].join(" "), function () {

      it([

        "... do describe alternative method names that are going to replace the default ones."

      ].join(" "), function () {

        expect(Observable.length).toBe(1);

        observableObject = {};
        Observable.call(observableObject, {     // ++ OBSERVABLE API CONFIGURATION ++
          addEventListener    : "on",           //    "bind" ...... "addObserver"
          removeEventListener : "off",          //    "unbind" .... "removeObserver"
          hasEventListener    : "hasListener",  //    "isBound" ... "hasObserver"
          dispatchEvent       : "trigger"       //    "emit" ...... "emitEvent"
        });

        expect(typeof observableObject.on).toBe("function");
        expect(typeof observableObject.off).toBe("function");
        expect(typeof observableObject.hasListener).toBe("function");
        expect(typeof observableObject.trigger).toBe("function");

        // restore default
        observableObject = {};
        Observable.call(observableObject);
      });

      it([

        "Methods will not be accessible if the value of such an descriptors key value pair",
        "was an empty string."

      ].join(" "), function () {

        expect(typeof observableObject.addEventListener).toBe("function");
        expect(typeof observableObject.removeEventListener).toBe("function");
        expect(typeof observableObject.hasEventListener).toBe("function");
        expect(typeof observableObject.dispatchEvent).toBe("function");

        observableObject = {};
        Observable.call(observableObject, {       // ++ OBSERVABLE API CONFIGURATION ++
          addEventListener    : "addObserver",    //    "bind" ...... "addObserver"
          removeEventListener : "removeObserver", //    "unbind" .... "removeObserver"
          hasEventListener    : "",               //    "isBound" ... "hasObserver"
          dispatchEvent       : "emitEvent"       //    "emit" ...... "emitEvent"
        });

        expect(typeof observableObject.addObserver).toBe("function");
        expect(typeof observableObject.removeObserver).toBe("function");
        expect(typeof observableObject.emitEvent).toBe("function");

        expect(observableObject.hasEventListener).toBeUndefined();
        expect(observableObject.hasListener).toBeUndefined();
        expect(observableObject.hasObserver).toBeUndefined();
        expect(observableObject.isBound).toBeUndefined();

        // restore default
        observableObject = {};
        Observable.call(observableObject);
      });
    });


    describe("As for [addEventListener]", function () {
      it([

        "it accepts two arguments in this order, the string based event type",
        "and a function object that will be invoked as the event gets handled."

      ].join(" "), function () {

        expect(observableObject.addEventListener.length).toBe(2);
      });

      describe("Invoking [addEventListener] with the right arguments", function () {
        it([
          "returns an [EventListener] object."

        ].join(" "), function () {
          eventListener = observableObject.addEventListener(eventType, eventHandler);

          expect(eventListener).not.toBeUndefined();
          expect(eventListener).not.toBeNull();

          expect(handlerHasBeenExecuted).toBe(false);
        });

        describe("This [EventListener] object ...", function () {
          it([
            "... features three methods [getType], [getHandler] and [handleEvent]."

          ].join(" "), function () {

            expect(typeof eventListener.getType).toBe("function");
            expect(typeof eventListener.getHandler).toBe("function");
            expect(typeof eventListener.handleEvent).toBe("function");
          });

          describe("As for [EventListener.getType]", function () {
            it([
              "it should return a string based type that needs to equal the type",
              "that was passed to this objects creation method [addEventListener]."

            ].join(" "), function () {

              expect(eventListener.getType()).toBe(eventType);
            });
          });

          describe("As for [EventListener.getHandler]", function () {
            it([
              "it should return a reference to the function that has been",
              "passed to this objects creation method [addEventListener]."

            ].join(" "), function () {

              expect(eventListener.getHandler()).toBe(eventHandler);
            });
          });

          describe("As for [EventListener.handleEvent]", function () {
            it([
              "it should return a method that if it gets invoked with or without valid arguments",
              "ensures the correctness of the original assignment of an event and its target.",
              "Thus supporting or enabling the creation of type safe event systems."

            ].join(" "), function () {

              expect(eventListener.handleEvent.length).toBe(1);

              eventListener.handleEvent();

              expect(handlerHasBeenExecuted).toBe(true);
              expect(executedEventType).toBe(eventType);
              expect(executedEventTarget).toBe(observableObject);

              resetExecutionControls();
            });
          });
        });
      });
    });


    describe("As for [hasEventListener]", function () {
      it([

        "it accepts one to two arguments either an [EventListener] object as its sole argument",
        "or, in this order, the string based event type and a reference to the function that has",
        "been used for creating the very [EventListener] object that now is intended to be looked for."

      ].join(" "), function () {

        expect(observableObject.hasEventListener.length).toBe(2);
      });

      it([
        "it should return a [true] value in case the [EventListener] object was fetched."

      ].join(" "), function () {

        expect(observableObject.hasEventListener(eventListener)).toBe(true);
        expect(observableObject.hasEventListener(eventListener.getType(), eventListener.getHandler())).toBe(true);
      });

      it([
        "it should return a [false] value in case the [EventListener] object was not fetched."

      ].join(" "), function () {

        expect(observableObject.hasEventListener(eventListener.getHandler(), eventListener.getType())).toBe(false);
      });
    });


    describe("As for [removeEventListener]", function () {
      it([

        "it accepts one to two arguments either an [EventListener] object as its sole argument",
        "or, in this order, the string based event type and a reference to the function that has",
        "been used for creating the very [EventListener] object that now is intended to be removed."

      ].join(" "), function () {

        expect(observableObject.removeEventListener.length).toBe(2);
      });

      it([
        "it should remove the targeted [EventListener] object and",
        "return a [true] value and in case the former was fetched."

      ].join(" "), function () {

        expect(observableObject.removeEventListener(eventListener)).toBe(true);
        expect(observableObject.removeEventListener(eventListener)).toBe(false);

        observableObject.addEventListener(eventListener.getType(), eventListener.getHandler());

        expect(observableObject.hasEventListener(eventListener)).toBe(true);
        expect(observableObject.hasEventListener(eventListener.getType(), eventListener.getHandler())).toBe(true);

        expect(observableObject.removeEventListener(eventListener.getType(), eventListener.getHandler())).toBe(true);
        expect(observableObject.removeEventListener(eventListener.getType(), eventListener.getHandler())).toBe(false);
      });

      it([
        "it should return a [false] value in case the targeted [EventListener] object was not fetched."

      ].join(" "), function () {

        expect(observableObject.removeEventListener(eventListener)).toBe(false);

        observableObject.addEventListener(eventListener.getType(), eventListener.getHandler());

        expect(observableObject.removeEventListener(eventListener.getType(), eventListener.getHandler())).toBe(true);
        expect(observableObject.removeEventListener(eventListener.getType(), eventListener.getHandler())).toBe(false);


        observableObject.addEventListener(eventListener.getType(), eventListener.getHandler());
      });
    });


    describe("As for [dispatchEvent]", function () {
      it([

        "it accepts a single argument either the string based event type or an object that's key value pairs",
        "do describe an event object that in return needs to feature at least the mandatory event type amongst",
        "all other optional custom properties e.g. {type: \"change\", state: currentState, args: arguments} ."

      ].join(" "), function () {

        expect(observableObject.dispatchEvent.length).toBe(1);
      });

      it([
        "it should return a [false] value in case it was invoked with incorrect or missing arguments."

      ].join(" "), function () {

        expect(handlerHasBeenExecuted).toBe(false);
        expect(executedEventType).toBeNull();
        expect(executedEventTarget).toBeNull();

        expect(observableObject.dispatchEvent()).toBe(false);

        expect(handlerHasBeenExecuted).toBe(false);
        expect(executedEventType).toBeNull();
        expect(executedEventTarget).toBeNull();

        expect(observableObject.dispatchEvent("anyType")).toBe(false);

        expect(handlerHasBeenExecuted).toBe(false);
        expect(executedEventType).toBeNull();
        expect(executedEventTarget).toBeNull();

        expect(observableObject.dispatchEvent({type: "anyType"})).toBe(false);

        expect(handlerHasBeenExecuted).toBe(false);
        expect(executedEventType).toBeNull();
        expect(executedEventTarget).toBeNull();
      });

      it([
        "it should return a [true] value in case it was invoked with matching arguments."

      ].join(" "), function () {

        expect(observableObject.dispatchEvent(eventType)).toBe(true);

        expect(handlerHasBeenExecuted).toBe(true);
        expect(executedEventType).toBe(eventType);
        expect(executedEventTarget).toBe(observableObject);

        resetExecutionControls();
        expect(handlerHasBeenExecuted).toBe(false);
        expect(executedEventType).toBeNull();
        expect(executedEventTarget).toBeNull();

        expect(observableObject.dispatchEvent({type: eventType})).toBe(true);

        expect(handlerHasBeenExecuted).toBe(true);
        expect(executedEventType).toBe(eventType);
        expect(executedEventTarget).toBe(observableObject);

        resetExecutionControls();
        expect(handlerHasBeenExecuted).toBe(false);
        expect(executedEventType).toBeNull();
        expect(executedEventTarget).toBeNull();
      });
    });


    describe("As for the [Event] object - handling events within the callback functions.", function () {


      it([

        "The event object will be the only argument that gets passed if the event handler gets invoked."

      ].join(" "), function () {

        expect(eventListener.getHandler().length).toBe(1);
      });

      it([
        "The event objects default properties are always [type], [target] and [uuid].",
        "[uuid] is the replacement for the formerly used [timeStamp] that now, for fast CPU's",
        "and fast browsers everywhere, is not reliable anymore."

      ].join(" "), function () {

        observableObject.dispatchEvent(eventType);

        expect(executedEventObject).not.toBeNull();
        expect(executedEventObject.type).toBe(eventType);
        expect(executedEventObject.target).toBe(observableObject);
        expect(typeof executedEventObject.uuid).toBe("string");

        resetExecutionControls();
        expect(handlerHasBeenExecuted).toBe(false);
        expect(executedEventType).toBeNull();
        expect(executedEventTarget).toBeNull();
      });

      it([
        "These parameters are type safe, theirs entity can't be spoofed or tricked in any way."

      ].join(" "), function () {

        observableObject.dispatchEvent({
          type    : "observableTest",
          target  : Observable,
          uuid    : 1234,
          foo     : "bar"
        });
        expect(executedEventObject).not.toBeNull();

        expect(executedEventObject.type).toBe("observableTest");
        expect(executedEventObject.target).toBe(observableObject);

        expect(typeof executedEventObject.uuid).not.toBe(1234);
        expect(typeof executedEventObject.uuid).toBe("string");

        expect(executedEventObject.foo).toBe("bar");

        resetExecutionControls();
        expect(handlerHasBeenExecuted).toBe(false);
        expect(executedEventType).toBeNull();
        expect(executedEventTarget).toBeNull();
        expect(executedEventObject).toBeNull();


        observableObject.dispatchEvent.call(Observable, {
          type    : "observableTest",
          target  : Observable,
          uuid    : 1234,
          foo     : "bar"
        });
        expect(executedEventObject).not.toBeNull();

        expect(executedEventObject.type).toBe("observableTest");
        expect(executedEventObject.target).toBe(observableObject);

        expect(typeof executedEventObject.uuid).not.toBe(1234);
        expect(typeof executedEventObject.uuid).toBe("string");

        expect(executedEventObject.foo).toBe("bar");

        resetExecutionControls();
        expect(handlerHasBeenExecuted).toBe(false);
        expect(executedEventType).toBeNull();
        expect(executedEventTarget).toBeNull();
        expect(executedEventObject).toBeNull();


        observableObject.dispatchEvent.call(Observable, {
          type    : "anyType",
          target  : Observable,
          uuid    : 1234,
          foo     : "bar"
        });
        expect(handlerHasBeenExecuted).toBe(false);
        expect(executedEventType).toBeNull();
        expect(executedEventTarget).toBeNull();
        expect(executedEventObject).toBeNull();
      });
    });
  });
});
