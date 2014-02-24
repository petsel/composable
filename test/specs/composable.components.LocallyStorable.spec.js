

describe("»components.LocallyStorable« module", function () {


  var
    GLOBAL_OBJECT = ((window && window.window === window) && window) || ((global && global.global === global) && global) || this,

    require = GLOBAL_OBJECT.composable.require,

    LocallyStorable = require("components.LocallyStorable"),


    TypeError = GLOBAL_OBJECT.TypeError,


    customModel = {
      myKey: "myValue"
    },
    wellformedDataGetter = function (model, stringify) {
      return {
        key   : "subdata",
        value : stringify(model)
      };
    },
    malformedDataGetter = function (model, stringify) {
      return {
        type  : "subdata",
        value : stringify(model)
      };
    },
    nonMatchingDataGetter = function (model, stringify) {
      return null;
    },

    complexModel_01 = {
      x: "x",
      y: "y",
      z: {
        a: "a",
        b: "b"
      },
      a: {
        x: "x",
        y: "y",
        z: {
          a: "a",
          b: "b"
        },
        a: {

        }
      }
    },
    complexModel_02 = {
      a: {
        z: {
          b: "b",
          a: "a"
        },
        y: "y",
        x: "x",
        a: {

        }
      },
      z: {
        b: "b",
        a: "a"
      },
      y: "y",
      x: "x"
    },


    exception,


    storage = GLOBAL_OBJECT.localStorage,

    isStorage = (storage
      && (typeof storage.setItem == "function")
      && (typeof storage.getItem == "function")
      && (typeof storage.removeItem == "function")
      && (typeof storage.clear == "function")
      && (storage.key != null)
    )
  ;


  it("should - if required via »( composable. )require(\"components.LocallyStorable\")« - always be a \"function\" type.", function () {

    expect(LocallyStorable && (typeof LocallyStorable == "function")).toBe(true);
  });


  describe("This module being a Privileged Trait", function () {

    describe("has to be applied correctly onto a model that's (sub)structure is supposed to be locally stored ...", function () {

      it([
        "thus it should throw a [TypeError] at apply time if the mandatory 2nd argument - a function",
        "that creates the storable data as [key] [value] pair from the current model - has been omitted."

      ].join(" "), function () {

        exception = null;
        try {
          LocallyStorable.call(customModel);
        } catch (exc) {
          exception = exc;
        }
        expect(exception).not.toBeNull();
        expect(exception instanceof TypeError).toBe(true);

      });

      it([
        "thus it should throw a [TypeError] at apply time if the mandatory 2nd argument - a function",
        "that creates the storable data as [key] [value] pair from the current model - was provided",
        "but is not able to return a well formed storable data type."

      ].join(" "), function () {

        exception = null;
        try {
          LocallyStorable.call(customModel, nonMatchingDataGetter);
        } catch (exc) {
          exception = exc;
        }
        expect(exception).not.toBeNull();
        expect(exception instanceof TypeError).toBe(true);

        exception = null;
        try {
          LocallyStorable.call(customModel, malformedDataGetter);
        } catch (exc) {
          exception = exc;
        }
        expect(exception).not.toBeNull();
        expect(exception instanceof TypeError).toBe(true);
      });


      describe("if such a function is able to return a well formed storable data type ...", function () {

        it([
          "no [TypeError] will be thrown at apply time."

        ].join(" "), function () {

          exception = null;
          try {
            LocallyStorable.call(customModel, wellformedDataGetter);
          } catch (exc) {
            exception = exc;
          }
          expect(exception).toBeNull();

        });

        it([
          "a successfully augmented model then features 6 additional storage specific methods - [isStorable],",
          "[putDataIntoStorage], [removeDataFromStorage], [doesDataExistInStorage], [doesStoredDataDiffer]",
          "and [doesStoredDataMatch]."

        ].join(" "), function () {

          expect(typeof customModel.isStorable).toBe("function");

          expect(typeof customModel.putDataIntoStorage).toBe("function");
          expect(typeof customModel.removeDataFromStorage).toBe("function");

          expect(typeof customModel.doesDataExistInStorage).toBe("function");
          expect(typeof customModel.doesStoredDataDiffer).toBe("function");
          expect(typeof customModel.doesStoredDataMatch).toBe("function");

        });

        describe("as for the applied [isStorable] method", function () {
          it([
            "it should return a boolean value that indicates whether the client",
            "provides the global [localStorage] object or not."

          ].join(" "), function () {

            expect(customModel.isStorable()).toBe(isStorage);
          });
        });

        describe("as for the applied [putDataIntoStorage] method", function () {
          it([
            "it should put the result of the internally called data provider function into the Local Storage.",
            "In case Local Storage is not supported this method - if invoked - just returns the [undefined] value."

          ].join(" "), function () {
            if (customModel.isStorable()) {

              storage.clear();

              expect(customModel.putDataIntoStorage()).toBeUndefined();
              expect(storage.getItem("subdata")).toBe('{"myKey":"myValue"}');
            } else {
              expect(customModel.putDataIntoStorage()).toBeUndefined();
            }
          });
        });

        describe("as for the applied [removeDataFromStorage] method", function () {
          it([
            "it should remove the data that is associated with the [LocallyStorables] key - that comes",
            "from the internal data provider function - from the Local Storage. In case Local Storage",
            "is not supported this method - if invoked - just returns the [undefined] value."

          ].join(" "), function () {
            if (customModel.isStorable()) {

              storage.clear();

              customModel.putDataIntoStorage();
              expect(storage.getItem("subdata")).toBe('{"myKey":"myValue"}');

              expect(customModel.removeDataFromStorage()).toBeUndefined();
              expect(storage.getItem("subdata")).toBeNull();
            } else {
              expect(customModel.removeDataFromStorage()).toBeUndefined();
            }
          });
        });

        describe("as for the applied [doesDataExistInStorage] method", function () {
          it([
            "it should return a boolean value that indicates whether the (sub) data structure that is",
            "associated with the locally storable model does already exist in the Local Storage or not.",
            "In case Local Storage is not supported this method - if invoked - returns a [true] value."

          ].join(" "), function () {
            if (customModel.isStorable()) {

              storage.clear();

              customModel.putDataIntoStorage();
              expect(storage.getItem("subdata")).toBe('{"myKey":"myValue"}');

              expect(customModel.doesDataExistInStorage()).toBe(true);

              storage.clear();

              expect(customModel.doesDataExistInStorage()).toBe(false);
            } else {
              expect(customModel.doesDataExistInStorage()).toBe(true);
            }
          });
        });

        describe([

          "... as for both applied data matcher methods [doesStoredDataDiffer] / [doesStoredDataMatch] ...",
          "each should return a boolean value that indicates whether the stored (sub) data structure does match",
          "the current state of the locally storable model or not."

        ].join(" "), function () {


          it([
            "[doesStoredDataDiffer] should return a [true] value in both cases - either its models counterpart",
            "does not yet exist in the Local Storage or in case Local Storage is not supported at all."

          ].join(" "), function () {
            if (customModel.isStorable()) {

              storage.clear();

              expect(customModel.doesStoredDataDiffer()).toBe(true);
            } else {
              expect(customModel.doesStoredDataDiffer()).toBe(true);
            }
          });

          it([
            "[doesStoredDataDiffer] should return a [true] value in case",
            "it does not match its models locally storable counterpart."

          ].join(" "), function () {
            if (customModel.isStorable()) {

              storage.clear();

              customModel.myKey = "anotherValue";

              customModel.putDataIntoStorage();
              expect(storage.getItem("subdata")).toBe('{"myKey":"anotherValue"}');

              customModel.myKey = "yetAnotherValue";
              expect(customModel.doesStoredDataDiffer()).toBe(true);
            } else {
              expect(customModel.doesStoredDataDiffer()).toBe(true);
            }
          });

          it([
            "[doesStoredDataDiffer] should return a [false] value in case",
            "it does match its models locally storable counterpart."

          ].join(" "), function () {
            if (customModel.isStorable()) {

              storage.clear();

              customModel.myKey = "myValue";

              customModel.putDataIntoStorage();
              expect(storage.getItem("subdata")).toBe('{"myKey":"myValue"}');

              expect(customModel.doesStoredDataDiffer()).toBe(false);
            } else {
              expect(customModel.doesStoredDataDiffer()).toBe(true);
            }
          });


          it([
            "[doesStoredDataMatch] should return a [false] value in both cases - either its counterpart",
            "does not yet exist in the Local Storage or in case Local Storage is not supported at all."

          ].join(" "), function () {
            if (customModel.isStorable()) {

              storage.clear();

              expect(customModel.doesStoredDataMatch()).toBe(false);
            } else {
              expect(customModel.doesStoredDataMatch()).toBe(false);
            }
          });

          it([
            "[doesStoredDataMatch] should return a [false] value in case",
            "it does not match its models locally storable counterpart."

          ].join(" "), function () {
            if (customModel.isStorable()) {

              storage.clear();

              customModel.myKey = "anotherValue";

              customModel.putDataIntoStorage();
              expect(storage.getItem("subdata")).toBe('{"myKey":"anotherValue"}');

              customModel.myKey = "yetAnotherValue";
              expect(customModel.doesStoredDataMatch()).toBe(false);
            } else {
              expect(customModel.doesStoredDataMatch()).toBe(false);
            }
          });

          it([
            "[doesStoredDataMatch] should return a [true] value in case",
            "it does match its models locally storable counterpart."

          ].join(" "), function () {
            if (customModel.isStorable()) {

              storage.clear();

              customModel.myKey = "myValue";

              customModel.putDataIntoStorage();
              expect(storage.getItem("subdata")).toBe('{"myKey":"myValue"}');

              expect(customModel.doesStoredDataMatch()).toBe(true);
            } else {
              expect(customModel.doesStoredDataMatch()).toBe(false);
            }
          });


          describe("Both methods handle complex nested models and differently implemented sub data provider functions.", function () {
            it([
              "each should reliably recognize equal structures independently of theirs internal key order."

            ].join(" "), function () {
              if (customModel.isStorable()) {

                storage.clear();

                LocallyStorable.call(complexModel_01, wellformedDataGetter);
                LocallyStorable.call(complexModel_02, wellformedDataGetter);

                complexModel_01.putDataIntoStorage();
                expect(complexModel_02.doesStoredDataMatch()).toBe(true);
                expect(complexModel_02.doesStoredDataDiffer()).toBe(false);

                complexModel_02.a.z.b = "B";
                expect(complexModel_02.doesStoredDataMatch()).toBe(false);
                expect(complexModel_02.doesStoredDataDiffer()).toBe(true);

                complexModel_02.a.z.b = "b";
                expect(complexModel_02.doesStoredDataMatch()).toBe(true);
                expect(complexModel_02.doesStoredDataDiffer()).toBe(false);
              } else {
                expect(complexModel_02.doesStoredDataMatch()).toBe(false);
                expect(complexModel_02.doesStoredDataDiffer()).toBe(true);
              }
            });
          });
        });
      });
    });


  });
});
