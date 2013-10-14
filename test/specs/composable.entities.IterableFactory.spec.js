

describe("»entities.IterableFactory« module", function () {


  var
    GLOBAL_OBJECT = ((window && window.window === window) && window) || ((global && global.global === global) && global) || this,

    require = GLOBAL_OBJECT.composable.require,

    IterableFactory = require("entities.IterableFactory"),


    Iterable_1,
    Iterable_2,
    Iterable_3,

    iter_1 = {},
    iter_2 = {},
    iter_3 = {},

    stopIterationException
  ;


  it("should - if required via »( composable. )require(\"entities.IterableFactory\")« - always be a real \"object\" type.", function () {

    expect(IterableFactory && (typeof IterableFactory == "object")).toBe(true);
  });


  describe("This module being a factory", function () {

    it([
      "should feature both of its methods [create] and [isStopIteration]."

    ].join(" "), function () {

      expect(typeof IterableFactory.create).toBe("function");
      expect(typeof IterableFactory.isStopIteration).toBe("function");
    });

    describe("As for [create]", function () {
      it([

        "it accepts a single argument - a config object that injects custom defined",
        "\"next\", \"previous\" and \"compare\" functionality into an [Iterable] Trait."

      ].join(" "), function () {

        expect(IterableFactory.create.length).toBe(1);
      });

      it([
        "it should - if invoked - return an [Iterable] Trait that itself is a function object."

      ].join(" "), function () {

        Iterable_1 = IterableFactory.create();
        Iterable_2 = IterableFactory.create();
        Iterable_3 = IterableFactory.create();

        expect(typeof Iterable_1).toBe("function");
        expect(typeof Iterable_2).toBe("function");
        expect(typeof Iterable_3).toBe("function");
      });

      it([
        "omitted or wrongly assigned fields of the config objects or omitting the config object",
        "at all does result in customized Traits that will lack the omitted iterable functionality."

      ].join(" "), function () {

        Iterable_1 = IterableFactory.create({
          next: function () {
            if (typeof this.idx != "number") {
              this.idx = 0;
            } else {
              ++this.idx;
            }
            return this.idx;
          },
          previous: function () {
            if (typeof this.idx != "number") {
              this.idx = 0;
            } else {
              --this.idx;
            }
            return this.idx;
          },
          compare: function (a, b) {
            return a.idx - b;
          }
        });
        Iterable_2 = IterableFactory.create({
          next: function () {
            if (typeof this.idx != "number") {
              this.idx = 0;
            } else {
              ++this.idx;
            }
            return this.idx;
          },
          compare: function (a, b) {
            return a.idx - b;
          }
        });
      //Iterable_3 = IterableFactory.create(); // see above.

        expect(typeof Iterable_1).toBe("function");
        expect(typeof Iterable_2).toBe("function");
        expect(typeof Iterable_3).toBe("function");

        Iterable_1.call(iter_1);
        Iterable_2.call(iter_2);
        Iterable_3.call(iter_3);

        expect(typeof iter_1.next).toBe("function");
        expect(typeof iter_1.previous).toBe("function");

        expect(typeof iter_2.next).toBe("function");
        expect(typeof iter_2.previous).not.toBe("function");
        expect(iter_2.previous).toBeUndefined();

        expect(typeof iter_3.next).not.toBe("function");
        expect(iter_3.next).toBeUndefined();
        expect(typeof iter_3.previous).not.toBe("function");
        expect(iter_3.previous).toBeUndefined();
      });

      describe("As for every object that has applied a meaningful Iterable Trait onto it", function () {
        it([

          "it should feature at least one of the both essential iterator methods [next] and [previous]."

        ].join(" "), function () {

          expect((typeof iter_1.next == "function") || (typeof iter_1.previous == "function")).toBe(true);
          expect((typeof iter_2.next == "function") || (typeof iter_2.previous == "function")).toBe(true);
        });

        describe("As for [next]", function () {
          it([

            "the iterator should return the next expected item."

          ].join(" "), function () {

            expect(iter_2.next()).toBe(0);
            expect(iter_2.next()).toBe(1);
            expect(iter_2.next()).toBe(2);
            expect(iter_2.next()).toBe(3);
            expect(iter_2.next()).toBe(4);
          });

          it([

            "the iterator should return undefined in case the \"compare\" functionality was not part of the",
            "custom Iterable's configuration at this Trait's creation time and the internal fallback comparison",
            "could not resolve either the compare task between an iterator's current and next state."

          ].join(" "), function () {

            iter_3 = {};
            IterableFactory.create({
              next: function () {
                if (typeof this.idx != "number") {
                  this.idx = 0;
                } else {
                  ++this.idx;
                }
                return this.idx;
              }
            }).call(iter_3);

            expect(typeof iter_3.next).toBe("function");
            expect(typeof iter_3.previous).not.toBe("function");
            expect(iter_3.previous).toBeUndefined();

            expect(iter_3.next()).toBeUndefined();
            expect(iter_3.idx).toBe(0);

            expect(iter_3.next()).toBeUndefined();
            expect(iter_3.idx).toBe(1);

            expect(iter_3.next()).toBeUndefined();
            expect(iter_3.idx).toBe(2);

            expect(iter_3.next()).toBeUndefined();
            expect(iter_3.idx).toBe(3);

            expect(iter_3.next()).toBeUndefined();
            expect(iter_3.idx).toBe(4);
          })
        });

        describe("As for [previous]", function () {
          it([

            "the iterator should return the previous expected item."

          ].join(" "), function () {

            expect(iter_1.previous()).toBe(0);
            expect(iter_1.previous()).toBe(-1);
            expect(iter_1.previous()).toBe(-2);
            expect(iter_1.previous()).toBe(-3);
            expect(iter_1.previous()).toBe(-4);
          });

          it([

            "the iterator should return undefined in case the \"compare\" functionality was not part of the",
            "custom Iterable's configuration at this Trait's creation time and the internal fallback comparison",
            "could not resolve either the compare task between an iterator's current and previous state."

          ].join(" "), function () {

            iter_3 = {};
            IterableFactory.create({
              previous: function () {
                if (typeof this.idx != "number") {
                  this.idx = 0;
                } else {
                  --this.idx;
                }
                return this.idx;
              }
            }).call(iter_3);

            expect(typeof iter_3.previous).toBe("function");
            expect(typeof iter_3.next).not.toBe("function");
            expect(iter_3.next).toBeUndefined();

            expect(iter_3.previous()).toBeUndefined();
            expect(iter_3.idx).toBe(0);

            expect(iter_3.previous()).toBeUndefined();
            expect(iter_3.idx).toBe(-1);

            expect(iter_3.previous()).toBeUndefined();
            expect(iter_3.idx).toBe(-2);

            expect(iter_3.previous()).toBeUndefined();
            expect(iter_3.idx).toBe(-3);

            expect(iter_3.previous()).toBeUndefined();
            expect(iter_3.idx).toBe(-4);
          })
        });

        describe([

          "As for reaching an iterator's boundaries in case \"next\" / \"previous\" / \"compare\"",
          "implementations cover it by just providing [undefined] as theirs return value."

        ].join(" "), function () {
          it([

            "the iterator then returns an [undefined] value as well. This is every's iterator",
            "default terminating condition. Receiving this value once any further attempts of",
            "invoking [next] or [previous] should only return [undefined] again and again."

          ].join(" "), function () {


            // [previous] / [next] triggered termination
            iter_3 = {};
            IterableFactory.create({
              next: function () {
                if (typeof this.idx != "number") {
                  this.idx = 0;
                } else {
                  ++this.idx;
                }
                return ((this.idx <= 5) && (this.idx >= -5)) ? this.idx : void 0;
              },
              previous: function () {
                if (typeof this.idx != "number") {
                  this.idx = 0;
                } else {
                  --this.idx;
                }
                return ((this.idx <= 5) && (this.idx >= -5)) ? this.idx : void 0;
              },
              compare: function (a, b) {
                return a.idx - b;
              }
            }).call(iter_3);

            expect(typeof iter_3.previous).toBe("function");
            expect(typeof iter_3.next).toBe("function");


            expect(iter_3.next()).toBe(0);
            expect(iter_3.next()).toBe(1);
            expect(iter_3.next()).toBe(2);
            expect(iter_3.next()).toBe(3);
            expect(iter_3.next()).toBe(4);
            expect(iter_3.next()).toBe(5);              // boundary
                                                        // boundary
            expect(iter_3.next()).toBeUndefined();      // boundary
            expect(iter_3.idx).toBe(6);                 // boundary
                                                        // boundary
            expect(iter_3.next()).toBeUndefined();      // boundary
            expect(iter_3.idx).toBe(7);                 // boundary
                                                        // boundary
            expect(iter_3.next()).toBeUndefined();      // boundary
            expect(iter_3.idx).toBe(8);                 // boundary
                                                        // boundary
                                                        // boundary
            expect(iter_3.previous()).toBeUndefined();  // boundary
            expect(iter_3.idx).toBe(7);                 // boundary
                                                        // boundary
            expect(iter_3.previous()).toBeUndefined();  // boundary
            expect(iter_3.idx).toBe(6);                 // boundary
                                                        // boundary
                                                        // boundary
            expect(iter_3.previous()).toBe(5);          // boundary
            expect(iter_3.previous()).toBe(4);
            expect(iter_3.previous()).toBe(3);


            iter_3.idx = -2;
            expect(iter_3.idx).toBe(-2);


            expect(iter_3.previous()).toBe(-3);
            expect(iter_3.previous()).toBe(-4);
            expect(iter_3.previous()).toBe(-5);         // boundary
                                                        // boundary
            expect(iter_3.previous()).toBeUndefined();  // boundary
            expect(iter_3.idx).toBe(-6);                // boundary
                                                        // boundary
            expect(iter_3.previous()).toBeUndefined();  // boundary
            expect(iter_3.idx).toBe(-7);                // boundary
                                                        // boundary
            expect(iter_3.previous()).toBeUndefined();  // boundary
            expect(iter_3.idx).toBe(-8);                // boundary
                                                        // boundary
                                                        // boundary
            expect(iter_3.next()).toBeUndefined();      // boundary
            expect(iter_3.idx).toBe(-7);                // boundary
                                                        // boundary
            expect(iter_3.next()).toBeUndefined();      // boundary
            expect(iter_3.idx).toBe(-6);                // boundary
                                                        // boundary
                                                        // boundary
            expect(iter_3.next()).toBe(-5); //          // boundary
            expect(iter_3.next()).toBe(-4);
            expect(iter_3.next()).toBe(-3);


            iter_3.idx = 0;
            expect(iter_3.idx).toBe(0);


            // [compare] triggered termination
            iter_3 = {};
            IterableFactory.create({
              next: function () {
                if (typeof this.idx != "number") {
                  this.idx = 0;
                } else {
                  ++this.idx;
                }
                return this.idx;
              },
              previous: function () {
                if (typeof this.idx != "number") {
                  this.idx = 0;
                } else {
                  --this.idx;
                }
                return this.idx;
              },
              compare: function (a, b) {
                return ((a.idx <= 7) && (a.idx >= -3)) ? a.idx -b : void 0;
              }
            }).call(iter_3);

            expect(typeof iter_3.previous).toBe("function");
            expect(typeof iter_3.next).toBe("function");


            expect(iter_3.next()).toBe(0);
            expect(iter_3.next()).toBe(1);
            expect(iter_3.next()).toBe(2);
            expect(iter_3.next()).toBe(3);
            expect(iter_3.next()).toBe(4);
            expect(iter_3.next()).toBe(5);
            expect(iter_3.next()).toBe(6);
            expect(iter_3.next()).toBe(7);              // boundary
                                                        // boundary
            expect(iter_3.next()).toBeUndefined();      // boundary
            expect(iter_3.idx).toBe(8);                 // boundary
                                                        // boundary
                                                        // boundary
            expect(iter_3.previous()).toBe(7);          // boundary
            expect(iter_3.previous()).toBe(6);
            expect(iter_3.previous()).toBe(5);


            iter_3.idx = 0;
            expect(iter_3.idx).toBe(0);


            expect(iter_3.previous()).toBe(-1);
            expect(iter_3.previous()).toBe(-2);
            expect(iter_3.previous()).toBe(-3);         // boundary
                                                        // boundary
            expect(iter_3.previous()).toBeUndefined();  // boundary
            expect(iter_3.idx).toBe(-4);                // boundary
                                                        // boundary
            expect(iter_3.previous()).toBeUndefined();  // boundary
            expect(iter_3.idx).toBe(-5);                // boundary
                                                        // boundary
            expect(iter_3.previous()).toBeUndefined();  // boundary
            expect(iter_3.idx).toBe(-6);                // boundary
                                                        // boundary
                                                        // boundary
            expect(iter_3.next()).toBeUndefined();      // boundary
            expect(iter_3.idx).toBe(-5);                // boundary
                                                        // boundary
            expect(iter_3.next()).toBeUndefined();      // boundary
            expect(iter_3.idx).toBe(-4);                // boundary
                                                        // boundary
                                                        // boundary
            expect(iter_3.next()).toBe(-3); //          // boundary
            expect(iter_3.next()).toBe(-2);
            expect(iter_3.next()).toBe(-1);


            iter_3.idx = 0;
            expect(iter_3.idx).toBe(0);
          });

          describe([

            "Having assigned a truthy value tue the [isThrowStopIteration] property",
            "of an Traits config object at its creation time ..."

          ].join(" "), function () {
            it([

              "... the iterator should throw a [StopIteration] object.",
              "Thus such an iterator's terminating condition changes from",
              "returning an [undefined] value to raising an exception instead.",
              "Such iterators can only worked with by wrapping each invocation",
              "of [next] or [previous] into a [try ... catch] clause."

            ].join(" "), function () {

              // [compare] triggered termination
              iter_3 = {};
              IterableFactory.create({
                next: function () {
                  if (typeof this.idx != "number") {
                    this.idx = 0;
                  } else {
                    ++this.idx;
                  }
                  return this.idx;
                },
                previous: function () {
                  if (typeof this.idx != "number") {
                    this.idx = 0;
                  } else {
                    --this.idx;
                  }
                  return this.idx;
                },
                compare: function (a, b) {
                  return ((a.idx <= 7) && (a.idx >= -3)) ? a.idx -b : void 0;
                },
                isThrowStopIteration: true

              }).call(iter_3);

              expect(typeof iter_3.previous).toBe("function");
              expect(typeof iter_3.next).toBe("function");

              iter_3.idx = 5;
              expect(iter_3.idx).toBe(5);


              expect(iter_3.next()).toBe(6);
              expect(iter_3.next()).toBe(7);

              try {
                expect(iter_3.next()).toBeUndefined();
              } catch (exc) {
                stopIterationException = exc;
              }
              expect(stopIterationException).not.toBeUndefined();
              expect(stopIterationException && typeof stopIterationException == "object").toBe(true);
              expect(stopIterationException.toString()).toBe("[object StopIteration]");

              stopIterationException = null;
              try {
                expect(iter_3.next()).toBeUndefined();
              } catch (exc) {
                stopIterationException = exc;
              }
              expect(stopIterationException).not.toBeUndefined();
              expect(stopIterationException && typeof stopIterationException == "object").toBe(true);
              expect(stopIterationException.toString()).toBe("[object StopIteration]");
            });
          });

          describe("Looking at the [IterableFactory] and its static method [isStopIteration] ...", function () {
            it([

              "... it accepts a single argument - the type that is going to be tested",
              "of whether it is a [StopIteration] type or not."

            ].join(" "), function () {

              expect(IterableFactory.isStopIteration.length).toBe(1);
            });

            it([
              "... it returns true for every type that passes this test and false for every type that fails this test."

            ].join(" "), function () {

              expect(IterableFactory.isStopIteration(stopIterationException)).toBe(true);

              expect(IterableFactory.isStopIteration()).toBe(false);
              expect(IterableFactory.isStopIteration(0)).toBe(false);
              expect(IterableFactory.isStopIteration("")).toBe(false);
              expect(IterableFactory.isStopIteration(GLOBAL_OBJECT)).toBe(false);
              expect(IterableFactory.isStopIteration({toString:function(){return "[object StopIteration]";}})).toBe(false);
            });
          });
        });
      });
    });
  });
});
