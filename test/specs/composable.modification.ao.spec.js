

describe("»modification.ao« module", function () {


  var
    GLOBAL_OBJECT = ((window && window.window === window) && window) || ((global && global.global === global) && global) || this,

    require = GLOBAL_OBJECT.composable.require,


    environment = require("environment_extended_introspective_equality"),
    env_introspective = environment.introspective,
    isEqualType = env_introspective.isEqualType,


    aoSystem    = require("modification.ao"),

    Joinpoint,
    Pointcut,
    Advice,
    Aspect,

    isOff,
    isOn,
    off,
    on,
    reboot,


    Function = GLOBAL_OBJECT.Function,
    fctProto = Function.prototype,

    object_keys = GLOBAL_OBJECT.Object.keys,


    makeProtoypalCopy = function (blueprint) {
      var GreenBody = function () {
        this.constructor = Object;
      };
      GreenBody.prototype = blueprint;
      return (new GreenBody);
    }
  ;


  it("should - if required via »( composable. )require(\"modification.ao\")« - always be a real \"object\" type.", function () {

    expect(aoSystem && (typeof aoSystem == "object")).toBe(true);
  });


  describe("This module provides an Aspect Oriented domain specific language (DSL) and ...", function () {


    beforeEach(function() {
      require("components.Controllable_adviceTypes_before_after_around").call(fctProto);
      require("components.Controllable_adviceTypes_afterThrowing_afterFinally").call(fctProto);
    });
    afterEach(function() {
      delete fctProto.before;
      delete fctProto.after;
      delete fctProto.around;
      delete fctProto.afterFinally;
      delete fctProto.afterThrowing;
    });
    describe("This test for every spec ...", function () {
      it([
        "... expects having 5 prototypal [Function] methods accessible",
        "- [before], [after], [around], [afterFinally] and [afterThrowing]."

      ].join(" "), function () {

        expect(typeof fctProto.before).toBe("function");
        expect(typeof fctProto.after).toBe("function");
        expect(typeof fctProto.around).toBe("function");
        expect(typeof fctProto.afterFinally).toBe("function");
        expect(typeof fctProto.afterThrowing).toBe("function");
      });
    });


    it([
      "... should feature/expose 4 specific factory/builder objects - [Joinpoint],",
      "[Pointcut], [Advice] and [Aspect] - as well as 5 static system methods",
      "- [isOff], [isOn], [off], [on] and [reboot]."

    ].join(" "), function () {


      Joinpoint = aoSystem.Joinpoint;
      Pointcut  = aoSystem.Pointcut;
      Advice    = aoSystem.Advice;
      Aspect    = aoSystem.Aspect;

      expect(Joinpoint && (typeof Joinpoint == "object")).toBe(true);
      expect(Pointcut && (typeof Pointcut == "object")).toBe(true);
      expect(Advice && (typeof Advice == "object")).toBe(true);
      expect(Aspect && (typeof Aspect == "object")).toBe(true);


      isOff   = aoSystem.isOff;
      isOn    = aoSystem.isOn;
      off     = aoSystem.off;
      on      = aoSystem.on;
      reboot  = aoSystem.reboot;

      expect(typeof isOff).toBe("function");
      expect(typeof isOn).toBe("function");
      expect(typeof off).toBe("function");
      expect(typeof on).toBe("function");
      expect(typeof reboot).toBe("function");
    });
//  var ao = require("modification.ao") // aspect oriented system
//
//  // static properties
//
//  ao.Joinpoint                // [Object] // module
//  ao.Pointcut                 // [Object] // module
//  ao.Advice                   // [Object] // module
//  ao.Aspect                   // [Object] // module
//
//  // static methods
//
//  ao.isOff                    // [Function]:true|false
//  ao.isOn                     // [Function]:true|false
//  ao.off                      // [Function]:void
//  ao.on                       // [Function]:void
//  ao.reboot                   // [Function]:void


    describe("Regarding the domain specific [Joinpoint] object ...", function () {


      var
        jpConfig_01 = {
          target: GLOBAL_OBJECT,
          methodName: "parseInt"
        },
        jpConfig_02 = {
          label: "Object.keys",
          target: GLOBAL_OBJECT.Object,
          methodName: "keys"
        },
        jpConfig_03 = {
          target: GLOBAL_OBJECT.Object,
          methodName: ""
        },
        jpConfig_04 = {
          target: GLOBAL_OBJECT,
          methodName: "parseFloat"
        },
        jp_01,
        jp_02,
        jp_03,
        jp_04,


        jpLike,


        makeJoinpointLikeObject = function (config) {
          return (config && {
            getLabel      : function () {return config.label || ""},
            getTarget     : function () {return config.target},
            getMethodName : function () {return config.methodName},
            getBaseMethod : function () {return config.target[config.methodName]}
          }) || {
            getLabel      : function () {},
            getTarget     : function () {},
            getMethodName : function () {},
            getBaseMethod : function () {}
          }
        }
      ;


      it([
        "it should provide 4 static methods - [add], [remove], [isJoinpoint] and [isJoinpointLike]."

      ].join(" "), function () {

        expect(typeof Joinpoint.add).toBe("function");
        expect(typeof Joinpoint.remove).toBe("function");
        expect(typeof Joinpoint.isJoinpoint).toBe("function");
        expect(typeof Joinpoint.isJoinpointLike).toBe("function");
      });
//
//  ao.Joinpoint.add              // [Function]:[Joinpoint]|undefined
//  ao.Joinpoint.remove           // [Function]:[Joinpoint]|undefined|false
//  ao.Joinpoint.isJoinpoint      // [Function]:true|false
//  ao.Joinpoint.isJoinpointLike  // [Function]:true|false


//  var jp = ao.Joinpoint.add(/*config:{
//
//   target      :[Object],       // required
//   methodName  :string,         // required
// //label       :string          // optional
//
//   }*/);                        // :[Joinpoint]|undefined|false
//
      describe("- its static [add] method ...", function () {

        it("... does accept a sole argument.", function () {

          expect(Joinpoint.add.length).toBe(1);
        });
        describe("This argument is allowed to be ...", function () {

          it([
            "... either a [config] object that describes a joinpoint from both a [methodName] and its",
            "associated [target] object ..."

          ].join(" "), function () {

            jp_01 = Joinpoint.add(jpConfig_01);
            expect(Joinpoint.isJoinpoint(jp_01)).toBe(true);

            jp_02 = Joinpoint.add(jpConfig_02);
            expect(Joinpoint.isJoinpoint(jp_02)).toBe(true);

            jp_03 = Joinpoint.add(jpConfig_03);
            expect(Joinpoint.isJoinpoint(jp_03)).toBe(false);


            expect(Joinpoint.all.size()).toBe(2);
          });
          it("... or any [Joinpoint] instance.", function () {

            jp_03 = Joinpoint.add(jp_01);
            expect(Joinpoint.isJoinpoint(jp_01)).toBe(true);
            expect(Joinpoint.isJoinpoint(jp_03)).toBe(true);
          //expect(jp_01 === jp_03).toBe(true);


            expect(Joinpoint.all.size()).toBe(2);
          });
        });

        describe([
          "... usually creates [Joinpoint] instances but returns 2 distinct types",
          "- either a [Joinpoint] instance or the [undefined] value ..."

        ].join(" "), function () {

          it([
            "- it creates and returns a [Joinpoint] instance in case",
            "there was no other matching instance found within the AO System."

          ].join(" "), function () {

            jp_04 = Joinpoint.add(jpConfig_04);
            expect(Joinpoint.isJoinpoint(jp_04)).toBe(true);


            expect(Joinpoint.all.size()).toBe(3);
          });

          it([
            "- it returns an already existing [Joinpoint] instance in case",
            "a [config] object's description does exactly match it or in case",
            "a provided joinpoint does match too."

          ].join(" "), function () {

            jp_01 = Joinpoint.add(jp_03);
            expect(Joinpoint.isJoinpoint(jp_01)).toBe(true);
            expect(Joinpoint.isJoinpoint(jp_03)).toBe(true);
            expect(jp_01 === jp_03).toBe(true);

            jp_03 = Joinpoint.add(jpConfig_02);
            expect(Joinpoint.isJoinpoint(jp_03)).toBe(true);
            expect(Joinpoint.isJoinpoint(jp_02)).toBe(true);
            expect(jp_03 === jp_02).toBe(true);

            jp_03 = Joinpoint.add(jpConfig_04);
            expect(Joinpoint.isJoinpoint(jp_03)).toBe(true);
            expect(Joinpoint.isJoinpoint(jp_04)).toBe(true);
            expect(jp_03 === jp_02).toBe(false);
            expect(jp_03 === jp_04).toBe(true);


            expect(Joinpoint.all.size()).toBe(3);
          });

          it([
            "- it returns the [undefined] value for getting passed invalid joinpoint configurations (this means",
            "[undefined] for any case other than this both valid ones that just have been described before)."

          ].join(" "), function () {

            expect(Joinpoint.add(jpConfig_03)).toBeUndefined();
            expect(Joinpoint.add(null)).toBeUndefined();
            expect(Joinpoint.add()).toBeUndefined();

            expect(Joinpoint.add("")).toBeUndefined();
            expect(Joinpoint.add({})).toBeUndefined();
            expect(Joinpoint.add({target: "", methodName: "parseInt"})).toBeUndefined();


            expect(Joinpoint.all.size()).toBe(3);
          });
        });
      });


      describe("- its static [remove] method ...", function () {

        it("... does accept a sole argument.", function () {

          expect(Joinpoint.remove.length).toBe(1);
        });
        describe("This argument is allowed to be ...", function () {

          it([
            "... either a [config] object that describes a joinpoint from both a [methodName] and its",
            "associated [target] object ..."

          ].join(" "), function () {

            jp_01 = Joinpoint.add(jpConfig_01);
            jp_02 = Joinpoint.add(jpConfig_02);

            expect(Joinpoint.all.size()).toBe(3);

            expect(Joinpoint.remove(jpConfig_01)).toBe(jp_01);
            expect(Joinpoint.remove(jpConfig_02)).toBe(jp_02);


            expect(Joinpoint.all.size()).toBe(1);
          });
          it("... or any [Joinpoint] instance.", function () {

            jp_03 = Joinpoint.add(jpConfig_04);
            jp_04 = Joinpoint.add(jpConfig_04);

            expect(Joinpoint.all.size()).toBe(1);

            expect(Joinpoint.remove(jp_03)).toBe(jp_04);


            expect(Joinpoint.all.size()).toBe(0);
          });
        });

        describe([
          "... usually removes [Joinpoint] instances from within the AO System",
          "but returns 3 distinct types - either a [Joinpoint] instance or",
          "[undefined] or [false] ..."

        ].join(" "), function () {

          it([
            "- it removes and returns the very [Joinpoint] instance that is matched",
            "either by a [config] object or by a joinpoint object."

          ].join(" "), function () {

            jp_01 = Joinpoint.add(jpConfig_01);
            jp_02 = Joinpoint.add(jpConfig_02);
            jp_04 = Joinpoint.add(jpConfig_04);


            expect(Joinpoint.all.size()).toBe(3);


            expect(Joinpoint.remove(jp_01)).toBe(jp_01);
            expect(Joinpoint.remove(jpConfig_02)).toBe(jp_02);


            expect(Joinpoint.all.size()).toBe(1);
          });

          it([
            "- it returns a [false] value in case of either being called with a valid",
            "[config] object or a valid joinpoint object, each not matching any of",
            "the internally stored [Joinpoint] instances."

          ].join(" "), function () {

            expect(Joinpoint.remove(jpConfig_01)).toBe(false);
            expect(Joinpoint.remove(jp_02)).toBe(false);

            expect(Joinpoint.all.size()).toBe(1);

            expect(Joinpoint.remove(jpConfig_04)).toBe(jp_04);


            expect(Joinpoint.all.size()).toBe(0);
          });

          it([
            "- it returns the [undefined] value for getting passed invalid joinpoint configurations (this means",
            "[undefined] for any case other than this both valid ones that just have been described before)."

          ].join(" "), function () {

            expect(Joinpoint.remove(jpConfig_03)).toBeUndefined();
            expect(Joinpoint.remove(null)).toBeUndefined();
            expect(Joinpoint.remove()).toBeUndefined();

            expect(Joinpoint.remove("")).toBeUndefined();
            expect(Joinpoint.remove({})).toBeUndefined();
            expect(Joinpoint.remove({target: "", methodName: "parseInt"})).toBeUndefined();


            expect(Joinpoint.all.size()).toBe(0);
          });
        });
      });


      describe("- its static [isJoinpoint] method ...", function () {

        it("... does accept a sole argument.", function () {

          expect(Joinpoint.isJoinpoint.length).toBe(1);
        });

        it([
          "... does return [true] only in case the passed object is an",
          "instance of the AO System's internal [Joinpoint] Constructor."

        ].join(" "), function () {

          expect(Joinpoint.isJoinpoint(jp_01)).toBe(true);
          expect(Joinpoint.isJoinpoint(jp_02)).toBe(true);
          expect(Joinpoint.isJoinpoint(jp_04)).toBe(true);

          expect(Joinpoint.isJoinpoint(jpConfig_01)).not.toBe(true);
          expect(Joinpoint.isJoinpoint(jpConfig_02)).not.toBe(true);
          expect(Joinpoint.isJoinpoint(jpConfig_04)).not.toBe(true);

          expect(Joinpoint.isJoinpoint(Joinpoint.add(jpConfig_03))).not.toBe(true);

          expect(Joinpoint.isJoinpoint(null)).not.toBe(true);
          expect(Joinpoint.isJoinpoint()).not.toBe(true);
          expect(Joinpoint.isJoinpoint({})).not.toBe(true);
          expect(Joinpoint.isJoinpoint("")).not.toBe(true);


          jpLike = makeProtoypalCopy(jp_01);
          expect(Joinpoint.isJoinpoint(jpLike)).toBe(true);

          jpLike = makeJoinpointLikeObject();
          expect(Joinpoint.isJoinpoint(jpLike)).not.toBe(true);


          expect(Joinpoint.all.size()).toBe(0);
        });

        it([
          "... does return [false] for any passed object that is not an",
          "instance of the AO System's internal [Joinpoint] Constructor."

        ].join(" "), function () {

          expect(Joinpoint.isJoinpoint(jp_01)).not.toBe(false);
          expect(Joinpoint.isJoinpoint(jp_02)).not.toBe(false);
          expect(Joinpoint.isJoinpoint(jp_04)).not.toBe(false);

          expect(Joinpoint.isJoinpoint(jpConfig_01)).toBe(false);
          expect(Joinpoint.isJoinpoint(jpConfig_02)).toBe(false);
          expect(Joinpoint.isJoinpoint(jpConfig_04)).toBe(false);

          expect(Joinpoint.isJoinpoint(Joinpoint.add(jpConfig_03))).toBe(false);

          expect(Joinpoint.isJoinpoint(null)).toBe(false);
          expect(Joinpoint.isJoinpoint()).toBe(false);
          expect(Joinpoint.isJoinpoint({})).toBe(false);
          expect(Joinpoint.isJoinpoint("")).toBe(false);


          jpLike = makeProtoypalCopy(jp_01);
          expect(Joinpoint.isJoinpoint(jpLike)).not.toBe(false);

          jpLike = makeJoinpointLikeObject();
          expect(Joinpoint.isJoinpoint(jpLike)).toBe(false);


          expect(Joinpoint.all.size()).toBe(0);
        });
      });


      describe("- its static [isJoinpointLike] method ...", function () {

        it("... does accept a sole argument.", function () {

          expect(Joinpoint.isJoinpointLike.length).toBe(1);
        });

        it([
          "... does return [true] for any passed object that is either an",
          "instance of the AO System's internal [Joinpoint] Constructor or",
          "an object that features all instance methods of a joinpoint object."

        ].join(" "), function () {

          expect(Joinpoint.isJoinpointLike(jp_01)).toBe(true);
          expect(Joinpoint.isJoinpointLike(jp_02)).toBe(true);
          expect(Joinpoint.isJoinpointLike(jp_04)).toBe(true);

          expect(Joinpoint.isJoinpointLike(jpConfig_01)).not.toBe(true);
          expect(Joinpoint.isJoinpointLike(jpConfig_02)).not.toBe(true);
          expect(Joinpoint.isJoinpointLike(jpConfig_04)).not.toBe(true);

          expect(Joinpoint.isJoinpointLike(Joinpoint.add(jpConfig_03))).not.toBe(true);

          expect(Joinpoint.isJoinpointLike(null)).not.toBe(true);
          expect(Joinpoint.isJoinpointLike()).not.toBe(true);
          expect(Joinpoint.isJoinpointLike({})).not.toBe(true);
          expect(Joinpoint.isJoinpointLike("")).not.toBe(true);


          jpLike = makeProtoypalCopy(jp_01);
          expect(Joinpoint.isJoinpointLike(jpLike)).toBe(true);

          jpLike = makeJoinpointLikeObject();
          expect(Joinpoint.isJoinpointLike(jpLike)).toBe(true);


          expect(Joinpoint.all.size()).toBe(0);
        });

        it([
          "... does return [false] for any passed object that is neither an",
          "instance of the AO System's internal [Joinpoint] Constructor nor",
          "an object that features all instance methods of a joinpoint object."

        ].join(" "), function () {

          expect(Joinpoint.isJoinpointLike(jp_01)).not.toBe(false);
          expect(Joinpoint.isJoinpointLike(jp_02)).not.toBe(false);
          expect(Joinpoint.isJoinpointLike(jp_04)).not.toBe(false);

          expect(Joinpoint.isJoinpointLike(jpConfig_01)).toBe(false);
          expect(Joinpoint.isJoinpointLike(jpConfig_02)).toBe(false);
          expect(Joinpoint.isJoinpointLike(jpConfig_04)).toBe(false);

          expect(Joinpoint.isJoinpointLike(Joinpoint.add(jpConfig_03))).toBe(false);

          expect(Joinpoint.isJoinpointLike(null)).toBe(false);
          expect(Joinpoint.isJoinpointLike()).toBe(false);
          expect(Joinpoint.isJoinpointLike({})).toBe(false);
          expect(Joinpoint.isJoinpointLike("")).toBe(false);


          jpLike = makeProtoypalCopy(jp_01);
          expect(Joinpoint.isJoinpointLike(jpLike)).not.toBe(false);

          jpLike = makeJoinpointLikeObject();
          expect(Joinpoint.isJoinpointLike(jpLike)).not.toBe(false);


          expect(Joinpoint.all.size()).toBe(0);
        });
      });


      describe("As for every [Joinpoint] instance ...", function () {

//  // instance methods
//
//  var jp = ao.Joinpoint.add(/*config:{
//
//   target      :[Object],    // required
//   methodName  :string,      // required
//   //label       :string       // optional
//
//   }*/);                       // :[Joinpoint]|undefined|false
//
//  jp.getLabel                 // [Function]:string
//  jp.getTarget                // [Function]:[Object]
//  jp.getMethodName            // [Function]:string
//  jp.getBaseMethod            // [Function]:[Function]
//  jp.equals                   // [Function]:true|false

        it([
          "it should provide 5 methods; its 4 own ones [getLabel], [getTarget],",
          "[getMethodName] and [getBaseMethod] as well as its constructor specific prototypal [equals] one."

        ].join(" "), function () {

          jp_01 = Joinpoint.add(jpConfig_01);
          jp_02 = Joinpoint.add(jpConfig_02);

          expect(typeof jp_01.getLabel).toBe("function");
          expect(typeof jp_01.getTarget).toBe("function");
          expect(typeof jp_01.getMethodName).toBe("function");
          expect(typeof jp_01.getBaseMethod).toBe("function");
          expect(typeof jp_01.equals).toBe("function");

          expect(typeof jp_02.getLabel).toBe("function");
          expect(typeof jp_02.getTarget).toBe("function");
          expect(typeof jp_02.getMethodName).toBe("function");
          expect(typeof jp_02.getBaseMethod).toBe("function");
          expect(typeof jp_02.equals).toBe("function");

          expect(object_keys(jp_01).sort(function (a, b) {return (a < b ? -1 : (a > b ? 1 : 0));}).join(", ")).toBe("getBaseMethod, getLabel, getMethodName, getTarget");
          expect(object_keys(jp_02).sort(function (a, b) {return (a < b ? -1 : (a > b ? 1 : 0));}).join(", ")).toBe("getBaseMethod, getLabel, getMethodName, getTarget");

          expect(jp_01.equals).toEqual(jp_01.constructor.prototype.equals);
          expect(jp_02.equals).toEqual(jp_02.constructor.prototype.equals);
        });

        describe("- [getLabel] returns every joinpoints label, a string value ...", function () {

          it("... that is empty in case it was not provided at add/construction time.", function () {

            expect(jp_01.getLabel()).toBe("");
          });
          it("... that matches the one that was provided at add/construction time.", function () {

            expect(jp_02.getLabel()).toBe("Object.keys");
          });
        });
        describe("- [getTarget] returns every joinpoints [target] object, the one ...", function () {

          it("... that got provided at add/construction time", function () {

            expect(jp_01.getTarget()).toBe(GLOBAL_OBJECT);
            expect(jp_02.getTarget()).toBe(GLOBAL_OBJECT.Object);
          });
        });
        describe("- [getMethodName] returns every joinpoints method name, a string value ...", function () {

          it("... that got provided at add/construction time", function () {

            expect(jp_01.getMethodName()).toBe("parseInt");
            expect(jp_02.getMethodName()).toBe("keys");
          });
        });
        describe("- [getBaseMethod] returns every joinpoints method in its original form/state ...", function () {

          it("... as it could be accessed at compile time from both provided properties - [target] and [methodName].", function () {

            expect(jp_01.getBaseMethod()).toEqual(GLOBAL_OBJECT.parseInt);
            expect(jp_02.getBaseMethod()).toEqual(GLOBAL_OBJECT.Object.keys);
          });
        });
        describe("- [equals] compares a joinpoint object to any other object passed to it ...", function () {

          it("... thus it should accept a sole parameter.", function () {

            expect(jp_01.equals.length).toBe(1);
            expect(jp_02.equals.length).toBe(1);
          });
          it("... and should return true in case two joinpoint types are equal.", function () {

            expect(jp_01.equals(jp_02)).not.toBe(true);
            expect(jp_02.equals(jp_01)).not.toBe(true);

            expect(jp_01.equals(jp_01)).toBe(true);
            expect(jp_02.equals(jp_02)).toBe(true);


            expect(jp_01.equals(makeJoinpointLikeObject())).not.toBe(true);
            expect(jp_02.equals(makeJoinpointLikeObject())).not.toBe(true);

            expect(jp_01.equals(makeJoinpointLikeObject(jpConfig_01))).toBe(true);
            expect(jp_02.equals(makeJoinpointLikeObject(jpConfig_02))).toBe(true);
          });
          it("... and should return false in case a joinpoint object does not equal the type it is compared to.", function () {

            expect(jp_01.equals(jp_02)).toBe(false);
            expect(jp_02.equals(jp_01)).toBe(false);

            expect(jp_01.equals(jp_01)).not.toBe(false);
            expect(jp_02.equals(jp_02)).not.toBe(false);


            expect(jp_01.equals(makeJoinpointLikeObject())).toBe(false);
            expect(jp_02.equals(makeJoinpointLikeObject())).toBe(false);

            expect(jp_01.equals(makeJoinpointLikeObject(jpConfig_01))).not.toBe(false);
            expect(jp_02.equals(makeJoinpointLikeObject(jpConfig_02))).not.toBe(false);
          });
        });
      });
    });


    describe("Regarding the domain specific [Pointcut] object ...", function () {


      var
        jpConfig_01 = {
          target: GLOBAL_OBJECT,
          methodName: "parseInt"
        },
        jpConfig_02 = {
          label: "Object.keys",
          target: GLOBAL_OBJECT.Object,
          methodName: "keys"
        },
        jpConfig_03 = {
          target: GLOBAL_OBJECT.Object,
          methodName: ""
        },
        jpConfig_04 = {
          target: GLOBAL_OBJECT,
          methodName: "parseFloat"
        },
        jp_01,
        jp_02,
        jp_03,
        jp_04,


        pcConfig_01 = {
          filter: function (joinpoint) {
            return (joinpoint.methodName == "parseInt");
          }
        },
        pcConfig_02 = {
          id: "pc-from-config-02",
          filter: function (joinpoint) {
            return (joinpoint.label == "Object.keys");
          }
        },
        pcConfig_03 = {
          id: "pc-from-config-03",
          filter: "not a funtion"
        },
        pcConfig_04 = {
          filter: function (joinpoint) {
            return (joinpoint.target === GLOBAL_OBJECT);
          }
        },
        pc_01,
        pc_02,
        pc_03,
        pc_04,


        pcLike,


        makePointcutLikeObject = function (config) { // @TODO
          return (config && {
            getId         : function () {return config.id || "";},
            getFilter     : function () {return config.filter;},
            getJoinpoints : function () {return Joinpoint.all().filter(config.filter);}
          }) || {
            getId         : function () {},
            getFilter     : function () {},
            getJoinpoints : function () {}
          }
        }
      ;


      it([
        "it should provide 5 static methods - [add], [remove], [getById], [isPointcut] and [isPointcutLike]."

      ].join(" "), function () {

        expect(typeof Pointcut.add).toBe("function");
        expect(typeof Pointcut.remove).toBe("function");
        expect(typeof Pointcut.getById).toBe("function");
        expect(typeof Pointcut.isPointcut).toBe("function");
        expect(typeof Pointcut.isPointcutLike).toBe("function");
      });
//
//  ao.Pointcut.getById           // [Function]:[Pointcut]|undefined
//  ao.Pointcut.add               // [Function]:[Pointcut]|undefined|false
//  ao.Pointcut.remove            // [Function]:[Pointcut]|undefined|false
//  ao.Pointcut.isPointcut        // [Function]:true|false
//  ao.Pointcut.isPointcutLike    // [Function]:true|false


//  var pc = ao.Pointcut.add(/*config{
//
// //id      :string,             // if omitted UUID will be generated
//   filter  :[Function]          // a joinpoint filter is required
//
//   }*/);                        // :[Pointcut]|undefined|false
//
      describe("- its static [add] method ...", function () {

        it("... does accept a sole argument.", function () {

          expect(Pointcut.add.length).toBe(1);
        });
        describe("This argument is allowed to be ...", function () {

          it([
            "... either a [config] object that defines a pointcut by its [filter] functionality",
            "and its identifier [id]."

          ].join(" "), function () {

            jp_01 = Joinpoint.add(jpConfig_01),
            jp_02 = Joinpoint.add(jpConfig_02),
            jp_03 = Joinpoint.add(jpConfig_03),
            jp_04 = Joinpoint.add(jpConfig_04),

            expect(Joinpoint.all.size()).toBe(3);


            pc_01 = Pointcut.add(pcConfig_01);
            expect(Pointcut.isPointcut(pc_01)).toBe(true);

            pc_02 = Pointcut.add(pcConfig_02);
            expect(Pointcut.isPointcut(pc_02)).toBe(true);

            pc_03 = Pointcut.add(pcConfig_03);
            expect(Pointcut.isPointcut(pc_03)).toBe(false);


            expect(Pointcut.all.size()).toBe(2);
          });
          it("... or any [Pointcut] instance.", function () {

            pc_03 = Pointcut.add(pc_01);
            expect(Pointcut.isPointcut(pc_01)).toBe(true);
            expect(Pointcut.isPointcut(pc_03)).toBe(true);
          //expect(pc_01 === pc_03).toBe(true);


            expect(Pointcut.all.size()).toBe(2);
          });

          describe("NOTE - regarding any [config] objects [id] ...", function () {

            it([
              "... if the identifier was omitted, which is allowed, the AO System creates an UUID instead."

            ].join(" "), function () {

              expect(pcConfig_01.id).toBeUndefined();
              expect(typeof pc_01.getId()).toBe("string");

              expect(pcConfig_02.id).toBe("pc-from-config-02");
              expect(pc_02.getId()).toBe(pcConfig_02.id);


              expect(Pointcut.all.size()).toBe(2);
            });
          });
        });

        describe([
          "... usually creates [Pointcut] instances but returns 3 distinct types",
          "- either a [Pointcut] instance or [false] or the [undefined] value ..."

        ].join(" "), function () {

          it([
            "- it creates and returns a [Pointcut] instance in case",
            "there was no other matching instance found within the AO System."

          ].join(" "), function () {

            pc_04 = Pointcut.add(pcConfig_04);
            expect(Pointcut.isPointcut(pc_04)).toBe(true);


            expect(Pointcut.all.size()).toBe(3);
          });

          it([
            "- it returns an already existing [Pointcut] instance in case",
            "a [config] object's description does exactly match it or in case",
            "a provided pointcut does match too."

          ].join(" "), function () {

            pc_01 = Pointcut.add(pc_03);
            expect(Pointcut.isPointcut(pc_01)).toBe(true);
            expect(Pointcut.isPointcut(pc_03)).toBe(true);
            expect(pc_01 === pc_03).toBe(true);

            pc_03 = Pointcut.add(pcConfig_02);
            expect(Pointcut.isPointcut(pc_03)).toBe(true);
            expect(Pointcut.isPointcut(pc_02)).toBe(true);
            expect(pc_03 === pc_02).toBe(true);


            pc_03 = Pointcut.add(pcConfig_04);  // [false]  - see next following spec for explanation.
            expect(pc_03).toBe(false);          //

            expect(Pointcut.isPointcut(pc_04)).toBe(true);

            pc_03 = Pointcut.add(pc_04);
            expect(Pointcut.isPointcut(pc_03)).toBe(true);

            expect(pc_03 === pc_02).toBe(false);
            expect(pc_03 === pc_04).toBe(true);


            expect(Pointcut.all.size()).toBe(3);
          });

          it([
            "- it returns a [false] value for getting passed a valid pointcut configuration",
            "that does provide a [filter] reference that again is part of an already existing pointcut."

          ].join(" "), function () {

            expect(isEqualType(pcConfig_01, {filter: pcConfig_01.filter})).toBe(true);


            expect(Pointcut.add({filter: pcConfig_01.filter})).toBe(false); // reference already is in use by an existing pointcut.
            expect(Pointcut.add({filter: pcConfig_02.filter})).toBe(false); // reference already is in use by an existing pointcut.
            expect(Pointcut.add({filter: pcConfig_04.filter})).toBe(false); // reference already is in use by an existing pointcut.

            expect(Pointcut.add(pcConfig_01)).toBe(false); // reference already is in use by an existing pointcut.
            expect(Pointcut.add(pcConfig_04)).toBe(false); // reference already is in use by an existing pointcut.


            expect(Pointcut.add(pcConfig_02)).not.toBe(false);  // configuration does match an already existing pointcut.
            expect(Pointcut.add(pcConfig_02)).toEqual(pc_02);   //

            expect(Pointcut.add(pcConfig_03)).not.toBe(false);  // configuration is not valid - see next following spec.
            expect(Pointcut.add(pcConfig_03)).toBeUndefined();  //

            expect(Pointcut.add(pc_04)).not.toBe(false);  // passed pointcut reference does match an already existing one.
            expect(Pointcut.add(pc_04)).toEqual(pc_04);   //


            expect(Pointcut.all.size()).toBe(3);


            expect(Pointcut.add({id: "handcrafted-uuid-01", filter: pcConfig_01.filter})).toBe(false);
            expect(Pointcut.add({id: "handcrafted-uuid-02", filter: pcConfig_02.filter})).toBe(false);
            expect(Pointcut.add({id: "handcrafted-uuid-04", filter: pcConfig_04.filter})).toBe(false);


            expect(Pointcut.all.size()).toBe(3);


            pcConfig_03.filter = function (joinpoint) {
              return (joinpoint.id == "pc-from-config-03");
            };
            pc_03 = Pointcut.add(pcConfig_03);              // a newly created pointcut instance.
            expect(pc_03).not.toBe(false);                  //
            expect(Pointcut.isPointcut(pc_03)).toBe(true);  //


            expect(Pointcut.all.size()).toBe(4);
          });

          it([
            "- it returns the [undefined] value for getting passed invalid pointcut configurations (this means",
            "[undefined] for any case other than these 3 valid ones that just have been described before)."

          ].join(" "), function () {

            expect(Pointcut.add({filter: "not a funtion"})).toBeUndefined();
            expect(Pointcut.add(null)).toBeUndefined();
            expect(Pointcut.add()).toBeUndefined();

            expect(Pointcut.add("")).toBeUndefined();
            expect(Pointcut.add({})).toBeUndefined();
            expect(Pointcut.add({id: "uuid", filter: "not a function"})).toBeUndefined();


            expect(Pointcut.add({filter: pcConfig_01.filter})).not.toBeUndefined(); // [false]
            expect(Pointcut.add({filter: pcConfig_02.filter})).not.toBeUndefined(); // [false]
            expect(Pointcut.add({filter: pcConfig_04.filter})).not.toBeUndefined(); // [false]

            expect(Pointcut.add(pcConfig_01)).not.toBeUndefined();  // [false]
            expect(Pointcut.add(pcConfig_02)).not.toBeUndefined();  // [Pointcut] instance
            expect(Pointcut.add(pcConfig_03)).not.toBeUndefined();  // [Pointcut] instance
            expect(Pointcut.add(pcConfig_04)).not.toBeUndefined();  // [false]


            expect(Pointcut.all.size()).toBe(4);
          });
        });
      });
    });


    describe("Regarding the domain specific [Advice] object ...", function () {

      it([
        "it should provide 5 static methods - [add], [remove], [getById], [isAdvice] and [isAdviceLike]."

      ].join(" "), function () {

        expect(typeof Advice.add).toBe("function");
        expect(typeof Advice.remove).toBe("function");
        expect(typeof Advice.getById).toBe("function");
        expect(typeof Advice.isAdvice).toBe("function");
        expect(typeof Advice.isAdviceLike).toBe("function");
      });
    });
//  ao.Advice.getById           // [Function]:[Advice]|undefined
//  ao.Advice.add               // [Function]:[Advice]|undefined|false
//  ao.Advice.remove            // [Function]:[Advice]|undefined|false
//  ao.Advice.isAdvice          // [Function]:true|false
//  ao.Advice.isAdviceLike      // [Function]:true|false


    describe("Regarding the domain specific [Aspect] object ...", function () {

      it([
        "it should provide 5 static methods - [add], [remove], [getById], [isAspect] and [isAspectLike]."

      ].join(" "), function () {

        expect(typeof Aspect.add).toBe("function");
        expect(typeof Aspect.remove).toBe("function");
        expect(typeof Aspect.getById).toBe("function");
        expect(typeof Aspect.isAspect).toBe("function");
        expect(typeof Aspect.isAspectLike).toBe("function");
      });
    });
//  ao.Aspect.getById           // [Function]:[Aspect]|undefined
//  ao.Aspect.add               // [Function]:[Aspect]|undefined|false
//  ao.Aspect.remove            // [Function]:[Aspect]|undefined|false
//  ao.Aspect.isAspect          // [Function]:true|false
//  ao.Aspect.isAspectLike      // [Function]:true|false


  });
});



//  // instance methods
//
//
//  var pc = ao.Pointcut.add(/*config{
//
//   //id      :string,          // if omitted UUID will be generated
//   filter  :[Function]       // a joinpoint filter is required
//
//   }*/);                       // :[Pointcut]|undefined|false
//
//  pc.getId                    // [Function]:string
//  pc.getFilter                // [Function]:[Function]
//  pc.getJoinpoints            // [Function]:[Array:[Joinpoint]]
//  pc.equals                   // [Function]:true|false
//
//
//  var av = ao.Advice.add(/*config{
//
//   //id      :string,          // if omitted UUID will be generated
//   type    :string,          // required: valid quantifier / type
//   handler :[Function]       // required: behavior / advice handler
//
//   }*/);                       // :[Advice]|undefined|false
//
//  av.getId                    // [Function]:string
//  av.getType                  // [Function]:string("after"..."before")
//  av.getHandler               // [Function]:[Function]
//  av.equals                   // [Function]:true|false
//
//
//  var as = ao.Aspect.add(/*config{
//
//   //id      :string,          // if omitted UUID will be generated
//   handler :[Function]       // required: "callback" function that
//   //           links advices to pointcuts
//
//   }*/);                       // :[Aspect]|undefined|false
//
//  as.getId                    // [Function]:string
//  as.getHandler               // [Function]:[Function]
//  as.getLinkList              // [Function]:[Array:[Advice][Pointcut]]
//  as.isReconfirm              // [Function]:true|false
//  as.isConfirmed              // [Function]:true|false
//  as.isDenied                 // [Function]:true|false
//  as.confirm                  // [Function]:void
//  as.deny                     // [Function]:void
//  as.equals                   // [Function]:true|false
