composable("modification.ao", function (require, global/*, internalBaseEnvironment*/) {


  "use strict";


//require("composites.Function_modifiers_adviceTypes_before_after_returning_throwing_around");
  require("composites.Function_modifiers_adviceTypes_before_after_throwing_finally_around");


  var
    environment   = require("environment_extended_introspective_core"),


    Allocable_all = require("components.Allocable_all"),
    Observable    = require("components.Observable_SignalsAndSlots"),


    Array         = global.Array,


    env_introspective = environment.introspective,

    isUndefined       = env_introspective.isUndefined,
    isFunction        = env_introspective.isFunction,
    isObject          = env_introspective.isObject,
    isStringValue     = env_introspective.isStringValue,


    math_random = global.Math.random,

    array_from  = (isFunction(Array.from) && Array.from) || environment.helpers.makeArray,


    mutateArray_removeItemsByFilter = function (arr, filter) {
      var
        idx = -1,
        len = arr.length
      ;
      while (++idx < len) {
        if (filter(arr[idx], idx, arr)) {

          arr.splice(idx, 1);
          --idx;
          --len;
        }
      }
    },
    array_getItemByFilter = function(arr, filter) {
      var
        item,
        idx = -1,
        len = arr.length
      ;
      while (++idx < len) {
        if (filter(arr[idx], idx, arr)) {

          item = arr[idx];
          break;
        }
      }
      return item;
    },


    getSanitizedIdentifier = function (identifier) {
      return (isStringValue(identifier) && identifier.trim()) || "";
    },
    createId = (
      /*  [https://github.com/broofa/node-uuid] - Robert Kieffer  */
      (global.uuid && isFunction(global.uuid.v4) && global.uuid.v4)

      /*  [https://gist.github.com/jed/982883]  - Jed Schmidt     */
      || function b(a){return a?(a^math_random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,b)}
    ),


    AspectOrientedModule, // control flow modifying module of an Aspect Oriented DSL

    Joinpoint,
    Pointcut,
    Advice,
    Aspect,


    systemState = "on", // "off"

    isSystemOff = function () {return (systemState == "off");},
    isSystemOn = function () {return (systemState == "on");},

    systemOff,  //:Function(scoped)
    systemOn,   //:Function(scoped)

    rebootSystem = function () {

      systemOff();
      systemOn();
    },


    EventProxy = {}
  ;


  Observable.call(EventProxy, {           // ++ OBSERVABLE API CONFIGURATION ++
    addEventListener    : "on",           // "addListener"    - "addObserver"
    removeEventListener : "off",          // "removeListener" - "removeObserver"
  //hasEventListener    : "hasListener",  // "hasListener"    - "hasObserver"
    dispatchEvent       : "emit"          // "dispatch"       - "triggerEvent"
  });


  Joinpoint = (function () {
    var
      module,

      joinpointList = [],

      Constructor = function (config) {
        var joinpoint = this;

        joinpoint.getLabel = function () {
          return config.label;
        };
        joinpoint.getTarget = function () {
          return config.target;
        };
        joinpoint.getMethodName = function () {
          return config.methodName;
        };
        joinpoint.getBaseMethod = function () {
          return config.baseMethod;
        };
      }
    ;
    Constructor.prototype.equals = function (type) {
      var joinpoint = this;
      return (

        (isJoinpoint(joinpoint) && isJoinpoint(type) && (joinpoint === type))
        || (
          isJoinpointLike(joinpoint) && isJoinpointLike(type)

          && (joinpoint.getBaseMethod() === type.getBaseMethod())
          && (joinpoint.getMethodName() === type.getMethodName())
          && (joinpoint.getTarget() === type.getTarget())
          && (joinpoint.getLabel() === type.getLabel())
        )
      );
    };

    var
      isJoinpoint = function (type) {
        return (type instanceof Constructor);
      },
      isJoinpointLike = function (type) {
        return !!(
          type && (typeof type == "object")

          && isFunction(type.getLabel) && isFunction(type.getTarget)
          && isFunction(type.getMethodName) && isFunction(type.getBaseMethod)
        );
      },
      isJoinpointConfig = function (type) {
        return (
          type && (typeof type == "object")

          && isObject(type.target) && isStringValue(type.methodName)
          && isFunction(type.target[type.methodName])
        );
      },

      makeFilter_equalsJoinpoint = function (joinpoint) {
        var
          baseMethod  = joinpoint.getBaseMethod(),  // generated
          methodName  = joinpoint.getMethodName(),  // required
          target      = joinpoint.getTarget(),      // required
          label       = joinpoint.getLabel()        // fallback
        ;
        return function/* equalsJoinpoint */(item/*, idx, list*/) {
          return (

            (item.getBaseMethod() === baseMethod) && (item.getMethodName() === methodName)
            && (item.getTarget() === target) && (item.getLabel() === label)
          );
        };
      },
      createJoinpoint = function (config) {

        config.baseMethod = config.target[config.methodName];
        config.label = getSanitizedIdentifier(config.label);

        return (new Constructor(config));
      },

      addJoinpoint = function (configOrJoinpoint) {
        var
          joinpoint,
          listItem
        ;
        if (isJoinpointConfig(configOrJoinpoint)) {

          joinpoint = createJoinpoint(configOrJoinpoint);

        } else if (isJoinpoint(configOrJoinpoint) || isJoinpointLike(configOrJoinpoint)) {

          joinpoint = configOrJoinpoint;
        }
        if (joinpoint) {

          listItem = array_getItemByFilter(joinpointList, makeFilter_equalsJoinpoint(joinpoint));
          if (!listItem) {

            // add Joinpoint
            joinpointList.push(joinpoint);

            EventProxy.emit({
              type      : "joinpoint:add",
              joinpoint : joinpoint
            });
          } else {
            joinpoint = listItem;
          }
        }
        return joinpoint; // :Joinpoint|undefined
      },
      removeJoinpoint = function (configOrJoinpoint) {
        var
          joinpoint,
          equalsJoinpoint
        ;
        if (isJoinpointConfig(configOrJoinpoint)) {

          joinpoint = createJoinpoint(configOrJoinpoint);

        } else if (isJoinpoint(configOrJoinpoint) || isJoinpointLike(configOrJoinpoint)) {

          joinpoint = configOrJoinpoint;
        }
        if (joinpoint) {

          equalsJoinpoint = makeFilter_equalsJoinpoint(joinpoint);
          joinpoint = array_getItemByFilter(joinpointList, equalsJoinpoint);

          if (joinpoint) {

            // remove Joinpoint
            // this approach keeps the list reference that was passed into the privileged "Allocable_all" Trait Module.
            mutateArray_removeItemsByFilter(joinpointList, equalsJoinpoint);

            EventProxy.emit({
              type      : "joinpoint:remove",
              joinpoint : joinpoint
            });
          } else {
            joinpoint = false;
          }
        }
        return joinpoint;
      }
    ;

    module = {
      add             : addJoinpoint,
      remove          : removeJoinpoint,
      isJoinpoint     : isJoinpoint,
      isJoinpointLike : isJoinpointLike
    };
    Allocable_all.call(module, joinpointList);

    return module;

  }());


  Pointcut = (function () {
    var
      module,

      pointcutList  = [],
      pointcutMap   = {},

      Constructor = function (config) {
        var pointcut = this;

        pointcut.getFilter = function () {
          return config.filter;
        };
        pointcut.getId = function () {
          return config.id;
        };
      }
    ;
    Constructor.prototype.equals = function (type) {
      var pointcut = this;
      return (

        (isPointcut(pointcut) && isPointcut(type) && (pointcut === type))
        || (
          isPointcutLike(pointcut) && isPointcutLike(type)

          && (pointcut.getFilter() === type.getFilter())
          && (pointcut.getId() === type.getId())
        )
      );
    };

    Constructor.prototype.getJoinpoints = function () {
      var pointcut = this;
      return ((isPointcut(pointcut) || isPointcutLike(pointcut)) && Joinpoint.all().filter(pointcut.getFilter())) || [];
    };

    var
      isPointcut = function (type) {
        return (type instanceof Constructor);
      },
      isPointcutLike = function (type) {
        return (type && (typeof type == "object") && isFunction(type.getFilter) && isFunction(type.getId));
      },
      isPointcutConfig = function (type) {
        return (type && (typeof type == "object") && isFunction(type.filter));
      },

      makeFilter_isPointcutFilter = function (filter) {
        return function/* isPointcutFilter */(item/*, idx, list*/) {

          return (item.getFilter() === filter);
        };
      },
      makeFilter_equalsPointcut = function (pointcut) {
        var
          filter  = pointcut.getFilter(), // required
          id      = pointcut.getId()      // required
        ;
        return function/* equalsPointcut */(item/*, idx, list*/) {

          return ((item.getFilter() === filter) && (item.getId() === id));
        };
      },

      getPointcutById = function (id) {
        var pointcut;
        if (id && isStringValue(id)) {
          pointcut = pointcutMap[id];
        }
        return pointcut;
      },
      getPointcutByConfig = function (config) {
        var
          pointcut,

          id = getSanitizedIdentifier(config.id),
          pc = getPointcutById(id) // pointcutMap[id]
        ;
        if (pc) {
          pointcut = (pc.getFilter() === config.filter) ? pc : false;
        } else {
          var isPointcutFilter = makeFilter_isPointcutFilter(config.filter);
          pc = array_getItemByFilter(pointcutList, isPointcutFilter);

          if (pc) {
            pointcut = (pc.getId() === id) ? pc : false;
          }
        }
        return pointcut; // :Pointcut|false|undefined
      },
      getPointcutByReference = function (pointcut) {
        return getPointcutByConfig({

          filter  : pointcut.getFilter(),
          id      : pointcut.getId()

        }); // :Pointcut|false|undefined
      },

      createPointcut = function (config) {
        return (new Constructor(config));
      },

      addPointcut = function (configOrPointcut) {
        var
          config,
          pointcut,
          listItem
        ;
        if (isPointcutConfig(configOrPointcut)) {
          config = {
            id    : configOrPointcut.id,
            filter: configOrPointcut.filter
          };
          pointcut = getPointcutByConfig(config);               // :Pointcut|false|undefined

          if (isUndefined(pointcut)) {
            config.id = (getSanitizedIdentifier(config.id) || createId());

            pointcut = createPointcut(config);                  // :Pointcut
          }
        } else if (isPointcut(configOrPointcut)) {

          pointcut = configOrPointcut;                          // :Pointcut

        } else if (isPointcutLike(configOrPointcut)) {

          pointcut = getPointcutByReference(configOrPointcut);  // :Pointcut|false|undefined
          if (isUndefined(pointcut)) {

            pointcut = createPointcut({

              filter  : configOrPointcut.getFilter(),
              id      : configOrPointcut.getId()
            });                                                 // :Pointcut
          }
        }
      //if (pointcut && !pointcutList.some(makeFilter_equalsPointcut(pointcut))) {
        if (pointcut) {

          listItem = array_getItemByFilter(pointcutList, makeFilter_equalsPointcut(pointcut));
          if (!listItem) {

            // add Pointcut
            pointcutList.push(pointcut);
            pointcutMap[pointcut.getId()] = pointcut;

            EventProxy.emit({
              type      : "pointcut:add",
              pointcut  : pointcut
            });
          } else {
            pointcut = listItem;
          }
        }
        return pointcut; // :Pointcut|false|undefined
      },
      removePointcut = function (configOrPointcut) {
        var pointcut;
        if (isPointcutConfig(configOrPointcut)) {

          pointcut = getPointcutByConfig(configOrPointcut);     // :Pointcut|false|undefined

        } else if (isPointcut(configOrPointcut) || isPointcutLike(configOrPointcut)) {

          pointcut = getPointcutByReference(configOrPointcut);  // :Pointcut|false|undefined
        }
        if (pointcut) {

          var equalsPointcut = makeFilter_equalsPointcut(pointcut);
          if (pointcutList.some(equalsPointcut)) {

          // this approach keeps the list reference that was passed into the privileged "Allocable_all" Trait Module.
            mutateArray_removeItemsByFilter(pointcutList, equalsPointcut);
            delete  pointcutMap[pointcut.getId()];

            EventProxy.emit({

              type      : "pointcut:remove",
              pointcut  : pointcut
            });
          } else {
            pointcut = false;
          }
          equalsPointcut = null;
        }
        return pointcut;
      }
    ;

    module = {
      getById         : getPointcutById,
      add             : addPointcut,
      remove          : removePointcut,
      isPointcut      : isPointcut,
      isPointcutLike  : isPointcutLike
    };
    Allocable_all.call(module, pointcutList);

    return module;

  }());


  Advice = (function () {
    var
      module,

      adviceList  = [],
      adviceMap   = {},

      adviceTypeCheckList = {
        "AROUND"          : "around",
        "BEFORE"          : "before",
        "AFTER"           : "after",
        "AFTERTHROWING"   : "afterThrowing",
        "AFTERRETURNING"  : "afterReturning"
      },

      Constructor = function (config) {
        var advice = this;

        advice.getHandler = function () {
          return config.handler;
        };
        advice.getType = function () {
          return config.type;
        };
        advice.getId = function () {
          return config.id;
        };
      }
    ;
    Constructor.prototype.equals = function (type) {
      var advice = this;
      return (

        (isAdvice(advice) && isAdvice(type) && (advice === type))
        || (
          isAdviceLike(advice) && isAdviceLike(type)

          && (advice.getHandler() === type.getHandler())
          && (advice.getType() === type.getType())
          && (advice.getId() === type.getId())
        )
      );
    };

    var
      getSanitizedAdviceType = function (adviceType) {
        return adviceTypeCheckList[getSanitizedIdentifier(adviceType).toUpperCase()] || "";
      },
      isValidAdviceType = function (adviceType) {
        return (isStringValue(adviceType) && (adviceTypeCheckList[adviceType.toUpperCase()] === adviceType));
      },

      isAdvice = function (type) {
        return (type instanceof Constructor);
      },
      isAdviceLike = function (type) {
        return (
          type && (typeof type == "object")

          && isFunction(type.getHandler) && isFunction(type.getType)
          && isValidAdviceType(type.getType()) && isFunction(type.getId)
        );
      },
      isAdviceConfig = function (type) {
        return (
          type && (typeof type == "object")

          && isFunction(type.handler) && getSanitizedAdviceType(type.type)
        );
      },

      makeFilter_equalsBehavior = function (handler, type) {
        return function/* equalsBehavior */(item/*, idx, list*/) {

          return ((item.getHandler() === handler) && (item.getType() === type));
        };
      },
      makeFilter_equalsAdvice = function (advice) {
        var
          handler = advice.getHandler(),  // required
          type    = advice.getType(),     // required
          id      = advice.getId()        // required
        ;
        return function/* equalsAdvice */(item/*, idx, list*/) {

          return ((item.getHandler() === handler) && (item.getType() === type) && (item.getId() === id));
        };
      },

      getAdviceById = function (id) {
        var advice;
        if (isStringValue(id)) {
          advice = adviceMap[id];
        }
        return advice;
      },
      getAdviceByConfig = function (config) {
        var
          advice,

          id = getSanitizedIdentifier(config.id),
          av = getAdviceById(id) // adviceMap[id]
        ;
        config.type = getSanitizedAdviceType(config.type);

        if (av) {
          advice = ((av.getHandler() === config.handler) && (av.getType() === config.type)) ? av : false;
        } else {
          var equalsBehavior = makeFilter_equalsBehavior(config.handler, config.type);
          av = array_getItemByFilter(adviceList, equalsBehavior);

          if (av) {
            advice = (av.getId() === id) ? av : false;
          }
          equalsBehavior = null;
        }
        return advice; // :Advice|false|undefined
      },
      getAdviceByReference = function (advice) {
        return getAdviceByConfig({

          handler : advice.getHandler(),
          type    : advice.getType(),
          id      : advice.getId()

        }); // :Advice|false|undefined
      },

      createAdvice = function (config) {
        return (new Constructor(config));
      },

      addAdvice = function (configOrAdvice) {
        var config, advice;
        if (isAdviceConfig(configOrAdvice)) {
          config = configOrAdvice;

          advice = getAdviceByConfig(config);             // :Advice|false|undefined

          if (isUndefined(advice)) {
            config.type = getSanitizedAdviceType(config.type);
            config.id = (getSanitizedIdentifier(config.id) || createId());

            advice = createAdvice(config);                // :Advice
          }
        } else if (isAdvice(configOrAdvice)) {

          advice = configOrAdvice;                        // :Advice

        } else if (isAdviceLike(configOrAdvice)) {

          advice = getAdviceByReference(configOrAdvice);  // :Advice|false|undefined
          if (isUndefined(advice)) {

            advice = createAdvice({

              handler : configOrAdvice.getHandler(),
              type    : configOrAdvice.getType(),
              id      : configOrAdvice.getId()
            });                                           // :Advice
          }
        }
        if (advice && !adviceList.some(makeFilter_equalsAdvice(advice))) {

        // addAdvice
          adviceList.push(advice);
          adviceMap[advice.getId()] = advice;

          EventProxy.emit({

            type    : "advice:add",
            advice  : advice
          });
        }
        return advice; // :Advice|false|undefined
      },
      removeAdvice = function (configOrAdvice) {
        var advice;
        if (isAdviceConfig(configOrAdvice)) {

          advice = getAdviceByConfig(configOrAdvice);     // :Advice|false|undefined

        } else if (isAdvice(configOrAdvice) || isAdviceLike(configOrAdvice)) {

          advice = getAdviceByReference(configOrAdvice);  // :Advice|false|undefined
        }
        if (advice) {

          var equalsAdvice = makeFilter_equalsAdvice(advice);
          if (adviceList.some(equalsAdvice)) {

          // this approach keeps the list reference that was passed into the privileged "Allocable_all" Trait Module.
            mutateArray_removeItemsByFilter(adviceList, equalsAdvice);
            delete  adviceMap[advice.getId()];

            EventProxy.emit({

              type    : "advice:remove",
              advice  : advice
            });
          } else {
            advice = false;
          }
          equalsAdvice = null;
        }
        return advice;
      }
    ;

    module = {
      getById         : getAdviceById,
      add             : addAdvice,
      remove          : removeAdvice,
      isAdvice        : isAdvice,
      isAdviceLike    : isAdviceLike
    };
    Allocable_all.call(module, adviceList);

    return module;

  }());


  Aspect = (function () {
    var
      module,

      aspectList  = [],
      aspectMap   = {},

      Constructor = function (config) {
        var
          aspect = this,

          confirmationState = {
            current: "deny",
            nominal: "deny"
          },
          markForReconfirmation = function () {
            confirmationState.current = "";
          },
          linkList = [],

          linkAdviceToPointcut = function (configOrAdvice, configOrPointcut) {
            injectLinkIntoAspect(linkList, configOrAdvice, configOrPointcut);
          },
          handler = config.handler
        ;
        handler(linkAdviceToPointcut, AspectOrientedModule); // Aspect Handler Arguments (API)

        aspect.getLinkList = function () {
          return array_from(linkList);
        };
        aspect.getHandler = function () {
          return handler;
        };
        aspect.getId = function () {
          return config.id;
        };

        aspect.deny = function () {
          if ((this === aspect) && !aspect.isDenied()) {

            denyAspect(/*aspect, */confirmationState, markForReconfirmation);
          }
        };
        aspect.confirm = function () {
          if ((this === aspect) && !aspect.isConfirmed()) {

            confirmAspect(aspect, confirmationState, markForReconfirmation);
          }
        };
        aspect.isReconfirm = function () {
          return ((this === aspect) && (confirmationState.current != "confirm") && (confirmationState.nominal == "confirm"));
        };
        aspect.isConfirmed = function () {
          return ((this === aspect) && (confirmationState.current == "confirm") && (confirmationState.nominal == "confirm"));
        };
        aspect.isDenied = function () {
          return ((this === aspect) && (confirmationState.current == "deny") && (confirmationState.nominal == "deny"));
        };
      }
    ;
    Constructor.prototype.equals = function (type) {
      var aspect = this;
      return (

        (isAspect(aspect) && isAspect(type) && (aspect === type))
        || (
        isAspectLike(aspect) && isAspectLike(type)

          && (aspect.getHandler() === type.getHandler())
          && (aspect.getId() === type.getId())
        )
      );
    };

    var
      isPointcut  = Pointcut.isPointcut,
      isAdvice    = Advice.isAdvice,

      isAspect = function (type) {
        return (type instanceof Constructor);
      },
      isAspectLike = function (type) {
        return (
          type && (typeof type == "object")

          && isFunction(type.getLinkList) && isFunction(type.getHandler) && isFunction(type.getId)
          && isFunction(type.deny) && isFunction(type.confirm) && isFunction(type.isConfirmed)
        );
      },
      isAspectConfig = function (type) {
        return (type && (typeof type == "object") && isFunction(type.handler));
      },

      makeFilter_isAspectHandler = function (handler) {
        return function/* isAspectHandler */(item/*, idx, list*/) {

          return (item.getHandler() === handler);
        };
      },
      makeFilter_equalsAspect = function (aspect) {
        var
          handler = aspect.getHandler(),  // required
          id      = aspect.getId()        // required
        ;
        return function/* equalsAspect */(item/*, idx, list*/) {

          return ((item.getHandler() === handler) && (item.getId() === id));
        };
      },


      makeFilter_equalsAspectLink = function (advice, pointcut) {
        return function/* equalsAspectLink */(item/*, idx, list*/) {

          return ((item.advice === advice) && (item.pointcut === pointcut));
        };
      },
      injectLinkIntoAspect = function (linkList, configOrAdvice, configOrPointcut) {
        var
          advice    = Advice.add(configOrAdvice),
          pointcut  = Pointcut.add(configOrPointcut)
        ;
        if (isAdvice(advice) && isPointcut(pointcut) && !linkList.some(makeFilter_equalsAspectLink(advice, pointcut))) {
          linkList.push({

            advice    : advice,
            pointcut  : pointcut
          });
        }
      },



//    isConfirmedAspect = function (aspect/*, idx, list*/) {
//      return aspect.isConfirmed();
//    },
      reconfirmAspect = function (aspect/*, idx, list*/) {
        aspect.isReconfirm() && aspect.confirm();
      },

      restoreInitialSystemState = function () {
      //if (Aspect.all().some(isConfirmedAspect)) {           // only in case of finding at least one "confirmed" aspect.
          Joinpoint.all().forEach(function (joinpoint/*, idx, list*/) {

            restoreJoinpoint(joinpoint.getTarget(), joinpoint.getMethodName(), joinpoint.getBaseMethod());
          });
          EventProxy.emit("system:restore"/*initialstate*/);  // triggers the internal current confirmation state of each
      //}                                                     // aspect to be set to anything different from "confirm" -
      },                                                      // thus switching each aspect into its "isReconfirm" mode.
      reinitializeSystemState = function () {
        Aspect.all().forEach(reconfirmAspect);
      },


      restoreJoinpoint = function (methodTarget, methodName, baseMethod) {
        methodTarget[methodName] = baseMethod;
      },
      modifyJoinpoint = function (methodTarget, methodName, adviceType, adviceHandler, joinpoint) {
        methodTarget[methodName] = methodTarget[methodName][adviceType](adviceHandler, methodTarget, joinpoint);
      //console.warn = console.warn.before(function () {console.log("before warn", arguments);}, console);
      },

      joinAdviceAndPointcut = function (advice, pointcut) {
        var
          adviceType = advice.getType(),
          adviceHandler = advice.getHandler()
        ;
        pointcut.getJoinpoints().forEach(function (joinpoint/*, idx, list*/) {

          modifyJoinpoint(joinpoint.getTarget(), joinpoint.getMethodName(), adviceType, adviceHandler, joinpoint);
        });
      },


      confirmAspect = function (aspect, confirmationState, eventHandler) {
        if (isSystemOff()) {
          confirmationState.current = "";
          confirmationState.nominal = "confirm";
        } else {
          aspect.getLinkList().forEach(function (link/*, idx, list*/) {

            joinAdviceAndPointcut(link.advice, link.pointcut);
          });
          confirmationState.current = "confirm";
          confirmationState.nominal = "confirm";

          EventProxy.on("system:restore"/*initialstate*/, eventHandler);
        }
      },
      denyAspect = function (/*aspect, */confirmationState, eventHandler) {

        EventProxy.off("system:restore"/*initialstate*/, eventHandler);

        confirmationState.current = "deny";
        confirmationState.nominal = "deny";

        restoreInitialSystemState();
        reinitializeSystemState();
      },



      getAspectById = function (id) {
        var aspect;
        if (isStringValue(id)) {
          aspect = aspectMap[id];
        }
        return aspect;
      },
      getAspectByConfig = function (config) {
        var
          aspect,

          id = getSanitizedIdentifier(config.id),
          as = getAspectById(id) // aspectMap[id]
        ;
        if (as) {
          aspect = (as.getHandler() === config.handler) ? as : false;
        } else {
          var isAspectHandler = makeFilter_isAspectHandler(config.handler);
          as = array_getItemByFilter(aspectList, isAspectHandler);

          if (as) {
            aspect = (as.getId() === id) ? as : false;
          }
          isAspectHandler = null;
        }
        return aspect; // :Aspect|false|undefined
      },
      getAspectByReference = function (aspect) {
        return getAspectByConfig({

          handler : aspect.getHandler(),
          id      : aspect.getId()

        }); // :Aspect|false|undefined
      },

      createAspect = function (config) {
        return (new Constructor(config));
      },

      addAspect = function (configOrAspect) {
        var config, aspect;
        if (isAspectConfig(configOrAspect)) {
          config = configOrAspect;

          aspect = getAspectByConfig(config);             // :Aspect|false|undefined

          if (isUndefined(aspect)) {
            config.id = (getSanitizedIdentifier(config.id) || createId());

            aspect = createAspect(config);                // :Aspect
          }
        } else if (isAspect(configOrAspect)) {

          aspect = configOrAspect;                        // :Aspect

        } else if (isAspectLike(configOrAspect)) {

          aspect = getAspectByReference(configOrAspect);  // :Aspect|false|undefined
          if (isUndefined(aspect)) {

            aspect = createAspect({

              handler : configOrAspect.getHandler(),
              id      : configOrAspect.getId()
            });                                           // :Aspect
          }
        }
        if (aspect && !aspectList.some(makeFilter_equalsAspect(aspect))) {

        // addAspect
          aspectList.push(aspect);
          aspectMap[aspect.getId()] = aspect;

          EventProxy.emit({

            type    : "aspect:add",
            aspect  : aspect
          });
        }
        return aspect; // :Aspect|false|undefined
      },
      removeAspect = function (configOrAspect) {
        var aspect;
        if (isAspectConfig(configOrAspect)) {

          aspect = getAspectByConfig(configOrAspect);     // :Aspect|false|undefined

        } else if (isAspect(configOrAspect) || isAspectLike(configOrAspect)) {

          aspect = getAspectByReference(configOrAspect);  // :Aspect|false|undefined
        }
        if (aspect) {

          var equalsAspect = makeFilter_equalsAspect(aspect);
          if (aspectList.some(equalsAspect)) {

          // this approach keeps the list reference that was passed into the privileged "Allocable_all" Trait Module.
            mutateArray_removeItemsByFilter(aspectList, equalsAspect);
            delete  aspectMap[aspect.getId()];

            EventProxy.emit({

              type    : "aspect:remove",
              aspect  : aspect
            });
          } else {
            aspect = false;
          }
          equalsAspect = null;
        }
        return aspect;
      }
    ;

    systemOff = function () {
      systemState = "off";
      restoreInitialSystemState();
    };
    systemOn = function () {
      systemState = "on";
      reinitializeSystemState();
    };

    module = {
      getById         : getAspectById,
      add             : addAspect,
      remove          : removeAspect,
      isAspect        : isAspect,
      isAspectLike    : isAspectLike
    };
    Allocable_all.call(module, aspectList);

    return module;

  }());


  EventProxy.on("joinpoint:add", rebootSystem);
  EventProxy.on("joinpoint:remove", rebootSystem);
  EventProxy.on("pointcut:add", rebootSystem);
  EventProxy.on("pointcut:remove", rebootSystem);
  EventProxy.on("advice:add", rebootSystem);
  EventProxy.on("advice:remove", rebootSystem);
  EventProxy.on("aspect:add", rebootSystem);
  EventProxy.on("aspect:remove", rebootSystem);


  AspectOrientedModule = {

    Joinpoint : Joinpoint,

    Pointcut  : Pointcut,
    Advice    : Advice,

    Aspect    : Aspect,

    isOff     : isSystemOff,
    isOn      : isSystemOn,
    off       : systemOff,
    on        : systemOn,
    reboot    : rebootSystem
  };


  return AspectOrientedModule;


});
