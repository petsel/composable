/**
 *  components.Introspective_isFunction_isCallable
 *  composites.Function_isFunction_isCallable
 *  components.Controllable_adviceTypes_before_after_returning_throwing_around
 *  composites.Function_modifiers_adviceTypes_before_after_returning_throwing_around
 */


/**
 *  composable  - base
 */
(function(r,j){var b,c=this;b=c.Object;var e=b.prototype,k=c.Array.prototype,d=c.RegExp.prototype,s=c.String.prototype,t=e.toString,u=e.valueOf,v=d.compile,g=/(?:)/;""+g.compile("(?:)","")!==""+g&&(d.compile=function(){v.apply(this,arguments);return this});var e=function(a){return["^\\[object\\s+",a,"\\]$"].join("")},m=function(a){return t.call(a)},w=e("String"),n=function(a){return void 0===a||null===a?a:u.call(a).valueOf()},f=function(a){return"function"==typeof a&&"function"==typeof a.call&&"function"==typeof a.apply},l=function(a){return g.compile(w).test(m(a))},d=function(a,b){return new c.ReferenceError(["A valid implementation of ",a," is missing.\n\nPlease provide the basic shims of ES5. Have a look at e.g.\nhttps://github.com/kriskowal/es5-shim/blob/master/es5-shim.js",b].join(""))};if(!f(b.keys))throw d("[Object.keys]","#L542");if(!f(s.trim))throw d("[String.prototype.trim]","#L899");if(!f(k.indexOf))throw d("[Array.prototype.indexOf]","#L479");if(!f(k.forEach))throw d("[Array.prototype.forEach]","#L238");if(!f(k.reduce))throw d("[Array.prototype.reduce]","#L382");var p=b.keys,x=c.parseFloat,y={global:c,objects:{regX:g},methods:{noop:function(){}},helpers:{compareTypes:function(a,b,c){c=f(c)&&c||n;var d,e;return(d=c(a))>(e=c(b))&&1||d<e&&-1||(d===e?0:void 0)},createClassSignaturePattern:e,protectBehaviorFromInstantiation:function(a,c){if(c instanceof a)throw new TypeError("Traits and Mixins always need to be applied onto objects but never get instantiated.");}},introspective:{isFunction:f,isString:l,baseValueOf:n,getClassSignature:m}},h={},q=function(a){return h[l(a)&&a.trim()||""]};j=j||c;b=function(a,b){a=l(a)&&a.trim()||"";var d=f(b)&&b(q,c,y);if(d&&a)return h[a]=d};b.all=function(){return p(h)};b.all.size=function(){return p(h).length};b.require=q;(function(){this.first=function(){return this()[0]};this.last=function(){var a;return(a=this())[a.length-1]};this.item=function(a){return this()[x(a,10)]}}).call(b.all);return j[r]=b}).call(null,"composable");



/**
 *  components  - mandatory   /   composites  - mandatory
 */
composable("components.Introspective_isFunction_isCallable",function(b,e,f){var g=e.Function.prototype,h=function(a){return"function"==typeof a&&"function"==typeof a.call&&"function"==typeof a.apply},j=function(a){var c;if(c=h(a)){var b;try{g.toString.call(a),b=!0}catch(e){b=!1}c=b}if(!c){var d;try{a(),d=!0}catch(f){try{g.call.call(a),d=!0}catch(j){d=!1}}c=d}return c};b=function(){this.isFunction=h;this.isCallable=j};b.apply(f.introspective);return b});
composable("components.Introspective_isArray_isArguments",function(d,b,c){d("components.Introspective_isFunction_isCallable");d=c.introspective;var e=b.Array,j,a=b.Object.prototype.propertyIsEnumerable;try{a.call(null,"length");var l=a,a=function(h,a){return l.call(h,a)}}catch(t){var m=a,a=function(h,a){var b;try{b=m.call(h,a)}catch(c){b=!0}return b}}j=a;var a=c.helpers.createClassSignaturePattern,f=c.objects.regX,n=a("Object"),p=a("Array"),k=a("Arguments"),g=d.getClassSignature;c=d.isFunction;var q=b.isFinite,r=c(e.isArray)&&e.isArray||function(a){return f.compile(p).test(g(a))};if(!(b=c(e.isArguments)&&e.isArguments))b=function(){return f.compile(k).test(g(arguments))}()?function(a){return f.compile(k).test(g(a))}:function(a){return!!a&&f.compile(n).test(g(a))&&"number"==typeof a.length&&q(a.length)&&!j(a,"length")};var s=b;b=function(){this.isArray=r;this.isArguments=s};b.apply(d);return b});

composable("components.Enumerable_toArray",function(a,d,h){a("components.Introspective_isArray_isArguments");a=h.introspective;var e=d.Array.prototype.slice,j=a.isFunction,k=a.isString,n=a.isArguments,p=a.isArray,l=d.isFinite,f=d.document,q=function(){var a,b,g,d=f&&f.forms||[],m=f&&j(f.getElementsByTagName)&&f.getElementsByTagName("")||d;try{b=e.call(d);b=e.call(m);b=e.call(arguments);g=b.join("");if(3!=b.length||"Array.make"!=g)throw Error();b=e.call(g);if(10!==b.length||"."!=b[5])throw Error();a=function(){var a,c=(this||k(this))&&this.length;"number"==typeof c&&l(c)&&(a=[],a.length=c,a=e.call(this));return a}}catch(h){a=function(){var a,c,b=(p(this)||n(this))&&e.call(this)||k(this)&&this.split("")||a;if(!b&&(c=0!==this&&this&&this.length,"number"==typeof c&&l(c)))if(b=[],b.length=c,j(this.item))for(;c--;)a=this.item(c),c in this&&(b[c]=a);else for(;c--;)a=this[c],c in this&&(b[c]=a);return b}}b=g=d=m=null;return a}("Array",".","make");return function(){this.toArray=q}});
composable("composites.Array_make",function(b,c,d){var a={},e=b("components.Enumerable_toArray").call(a)||a.toArray;c.Array.make=d.helpers.makeArray=function(a){return e.call(a)}});

composable("components.Introspective_typeDetection_core",function(c,l,j){c("components.Introspective_isFunction_isCallable");c("components.Introspective_isArray_isArguments");c=j.introspective;var x=c.isFunction,y=c.isCallable,z=c.isArray,A=c.isArguments,m=c.isString,B=c.baseValueOf,h=j.helpers.createClassSignaturePattern,f=function(a){return["(?:^",a,":)|(?:^",a,"$)|(?:\\[",a,":\\s*name\\:\\s*",a,")"].join("")},b=j.objects.regX,C=h("Boolean"),D=h("Number"),E=h("Object"),F=h("RegExp"),G=h("Date"),H=h("Error"),I=f("Error"),J=f("EvalError"),K=f("RangeError"),L=f("ReferenceError"),M=f("SyntaxError"),N=f("TypeError"),O=f("URIError"),g=c.getClassSignature,d,P=l.Error.prototype.toString;d=function(a){return P.call(a)};var n=l.isFinite,Q=function(a){return void 0===a},R=function(a){return void 0!==a},S=function(a){return null===a},T=function(a){return null!==a},p=function(a){return!a&&(void 0===a||null===a)},k=function(a){return void 0!==a&&null!==a},q=function(a){return"string"==typeof a||"number"==typeof a||"boolean"==typeof a},U=function(a){return q(a)||p(a)},r=function(a){return a&&("object"==typeof a||"function"==typeof a)},s=function(a){return k(a)&&"function"==typeof a.constructor},V=function(a){return r(a)&&"function"!=typeof a.constructor},t=function(a){return b.compile(C).test(g(a))},u=function(a){return"boolean"==typeof a},W=function(a){return t(a)&&!u(a)},v=function(a){return b.compile(D).test(g(a))&&"number"!=typeof a},X=function(a){return"number"==typeof a},Y=function(a){return("number"==typeof a||v(a))&&n(a)},w=function(a){return"string"==typeof a},Z=function(a){return m(a)&&!w(a)},$=function(a){return k(a)&&"number"==typeof a.length&&n(a.length)&&0<=a.length},aa=function(a){return s(a)&&b.compile(E).test(g(a))},ba=function(a){return b.compile(F).test(g(a))},ca=function(a){return b.compile(G).test(g(a))},e=function(a){return b.compile(H).test(g(a))},da=function(a){return e(a)&&(b.compile(I).test(d(a))||"Error"===a.name)},ea=function(a){return e(a)&&(b.compile(J).test(d(a))||"EvalError"===a.name)},fa=function(a){return e(a)&&(b.compile(K).test(d(a))||"RangeError"===a.name)},ga=function(a){return e(a)&&(b.compile(L).test(d(a))||"ReferenceError"===a.name)},ha=function(a){return e(a)&&(b.compile(M).test(d(a))||"SyntaxError"===a.name)},ia=function(a){return e(a)&&(b.compile(N).test(d(a))||"TypeError"===a.name)},ja=function(a){return e(a)&&(b.compile(O).test(d(a))||"URIError"===a.name)};return function(){this.isUndefined=Q;this.isDefined=R;this.isNull=S;this.isNotNull=T;this.isUndefinedOrNull=p;this.isNeitherUndefinedNorNull=k;this.isPrimitive=q;this.isValue=U;this.isObject=r;this.isNative=s;this.isAlien=V;this.isBoolean=t;this.isBooleanValue=u;this.isBooleanObject=W;this.isNumber=Y;this.isNumberValue=X;this.isNumberObject=v;this.isString=m;this.isStringValue=w;this.isStringObject=Z;this.isArray=z;this.isArguments=A;this.isListLike=$;this.isObjectObject=aa;this.isFunction=x;this.isCallable=y;this.isRegExp=ba;this.isDate=ca;this.isError=e;this.isGenericError=da;this.isEvalError=ea;this.isRangeError=fa;this.isReferenceError=ga;this.isSyntaxError=ha;this.isTypeError=ia;this.isURIError=ja;this.baseValueOf=B;this.getClassSignature=g}});

//composable("environment",function(a,c,b){return b});
composable("environment",function(a,c,b){a=function(){};a.prototype=b;return new a});
composable("environment_extended_introspective_core",function(a){var b=a("environment");a("components.Introspective_typeDetection_core").call(b.introspective);return b});



/**
 *  components  - recommended
 */
composable("components.Enumerable_first_last",function(){return function(){this.first=function(){return this[0]};this.last=function(){return this[this.length-1]}}});
composable("components.Enumerable_first_last_item",function(c,a){var b=a.parseFloat;return function(){this.first=function(){return this[0]};this.last=function(){return this[this.length-1]};this.item=function(a){return this[b(a,10)]}}});
composable("components.Enumerable_first_last_item_listWrapper",function(d,b){var c=b.parseFloat;return function(a){this.first=function(){return a[0]};this.last=function(){return a[a.length-1]};this.item=function(b){return a[c(b,10)]}}});
composable("components.Enumerable_first_last_item_listGetterShorthands",function(d,b){var c=b.parseFloat;return function(){this.first=function(){return this()[0]};this.last=function(){var a;return(a=this())[a.length-1]};this.item=function(a){return this()[c(a,10)]}}});

composable("components.Allocable",function(a,b,c){a("composites.Array_make");var d=a("components.Enumerable_first_last_item_listWrapper");a=b.Array;b=c.introspective.isFunction;var e=b(a.make)&&a.make||c.helpers.makeArray;return function(a){this.valueOf=this.toArray=function(){return e(a)};this.toString=function(){return""+a};this.size=function(){return a.length};d.call(this,a)}});
composable("components.Allocable_all",function(a,b,c){a("composites.Array_make");var d=a("components.Enumerable_first_last_item_listGetterShorthands");a=b.Array;b=c.introspective.isFunction;var e=b(a.make)&&a.make||c.helpers.makeArray;return function(a){this.all=function(){return e(a)};this.all.size=function(){return a.length};d.call(this.all)}});

composable("components.Controllable_adviceTypes_before_after_returning_throwing_around",function(k,t,l){k("components.Introspective_isFunction_isCallable");k=l.introspective;var e=k.isFunction,m=k.isCallable,c=function(b){return!b&&(void 0===b||null===b)?null:b},n=function(b,f,g){var a;if(a=e(this))if(a=e(b)){var h=this,d=c(f),j=c(g);a=function(){var a=arguments;b.call(d,a,j);return h.apply(d,a)}}return a||this},p=function(b,f,g){var a;if(a=e(this))if(a=e(b)){var h=this,d=c(f),j=c(g);a=function(){var a,c=arguments;try{a=h.apply(d,c)}finally{b.call(d,c,a,j)}return a}}return a||this},q=function(b,f,g){var a;if(a=e(this))if(a=e(b)){var h=this,d=c(f),j=c(g);a=function(){var a,c=arguments;a=h.apply(d,c);b.call(d,c,a,j);return a}}return a||this},r=function(b,f,g){var a;if(a=e(this))if(a=e(b)){var h=this,d=c(f),j=c(g);a=function(){var a=arguments;try{h.apply(d,a)}catch(c){throw b.call(d,a,c,j),c;}}}return a||this},s=function(b,f,g){var a;if(a=m(this))if(a=e(b)){var h=this,d=c(f),j=c(g);a=function(){return b.call(d,h,b,arguments,d,j)}}return a||this};return function(){this.before=n;this.after=p;this.afterReturning=q;this.afterThrowing=r;this.around=s}});


/**
 *  composites  - recommended
 */
composable("composites.Function_isFunction_isCallable",function(a,b){a("components.Introspective_isFunction_isCallable").call(b.Function)});

composable("",function(a,b){a("components.Introspective_isArray_isArguments").call(b.Array)});
composable("",function(a,b){a("components.Enumerable_first_last").call(b.Array.prototype)});

composable("composites.Function_modifiers_adviceTypes_before_after_returning_throwing_around",function(a,b){a("components.Controllable_adviceTypes_before_after_returning_throwing_around").call(b.Function.prototype)});



/**
 *  composites  - free to everyone's own decision
 */
composable("components.Observable_SignalsAndSlots",function(h,c,p){h("composites.Array_make");h=c.Array;var r=c.Date;c=p.introspective;var s=c.isFunction,n=c.isCallable,f=c.isString,t=s(h.make)&&h.make||p.helpers.makeArray,q=function(a,g){this.constructor=q;this.target=a;this.type=g;this.timeStamp=new r},m=function(a,g,f){var d=new q(a,g);this.constructor=m;this.handleEvent=function(a){a&&"object"==typeof a?(a.target=d.target,a.type=d.type,a.timeStamp=d.timeStamp):a={target:d.target,type:d.type,timeStamp:d.timeStamp};f(a)};this.getType=function(){return g};this.getHandler=function(){return f}};return function(a){a="object"==typeof a&&a||{};var g={},c="addEventListener",d="removeEventListener",k="hasEventListener",l="dispatchEvent",h=function(j,a){var b=g[j],e=!1;if(b){var c=b.handlers,b=b.listeners,f=c.indexOf(a);0<=f&&(c.splice(f,1),b.splice(f,1),e=!0)}return e},c=f(a[c])&&a[c]||c,d=f(a[d])&&a[d]||d,k=f(a[k])&&a[k]||k,l=f(a[l])&&a[l]||l;this[c]=function(j,a){var b;if(j&&f(j)&&n(a)){var e=g[j];b=new m(this,j,a);if(e){var c=e.handlers,e=e.listeners,d=c.indexOf(a);-1==d?(c.push(b.getHandler()),e.push(b)):b=e[d]}else e=g[j]={},e.handlers=[b.getHandler()],e.listeners=[b]}return b};this[d]=function(a,c){return f(a)&&n(c)&&h(a,c)||a instanceof m&&h(a.getType(),a.getHandler())||!1};this[k]=function(a,c){var b;if(!(b=f(a)&&n(c)&&(g[a]||!1)&&0<=g[a].handlers.indexOf(c))){if(b=a instanceof m){b=a.getType();var e=a.getHandler();b=(g[b]||!1)&&0<=g[b].handlers.indexOf(e)}b=b||!1}return b};this[l]=function(a){var c=!1,b=a&&"object"==typeof a&&f(a.type)&&a.type||f(a)&&a;if(b=b&&g[b]){var e=(b=b.listeners&&t(b.listeners))&&b.length||0,d=-1;if(1<=e){for(;++d<e;)b[d].handleEvent(a);c=!0}}return c}}});









composable("modification.ao", function (require, global, environment) {


  "use strict";


  require("composites.Function_modifiers_adviceTypes_before_after_returning_throwing_around");
  environment   = require("environment");


  var
    Allocable_all = require("components.Allocable_all"),
    Observable    = require("components.Observable_SignalsAndSlots"),


    isUndefined   = environment.introspective.isUndefined,
    isFunction    = environment.introspective.isFunction,
    isObject      = environment.introspective.isObject, // (type && ((typeof type == "object") || (typeof type == "function")))
  //isArray       = environment.introspective.isArray,
  //isString      = environment.introspective.isString,
    isStringValue = environment.introspective.isStringValue,

    math_random   = global.Math.random,

    makeArray     = environment.helpers.makeArray,


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
        return (
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
        var joinpoint;
        if (isJoinpointConfig(configOrJoinpoint)) {

          joinpoint = createJoinpoint(configOrJoinpoint);

        } else if (isJoinpoint(configOrJoinpoint) || isJoinpointLike(configOrJoinpoint)) {

          joinpoint = configOrJoinpoint;
        }
        if (joinpoint && !joinpointList.some(makeFilter_equalsJoinpoint(joinpoint))) {

        // addJoinpoint
          joinpointList.push(joinpoint);

          EventProxy.emit({

            type      : "joinpoint:add",
            joinpoint : joinpoint
          });
        }
        return joinpoint;
      },
      removeJoinpoint = function (configOrJoinpoint) {
        var joinpoint;
        if (isJoinpointConfig(configOrJoinpoint)) {

          joinpoint = createJoinpoint(configOrJoinpoint);

        } else if (isJoinpoint(configOrJoinpoint) || isJoinpointLike(configOrJoinpoint)) {

          joinpoint = configOrJoinpoint;
        }
        if (joinpoint) {

          var equalsJoinpoint = makeFilter_equalsJoinpoint(joinpoint);
          if (joinpointList.some(equalsJoinpoint)) {

          // this approach keeps the list reference that was passed into the privileged "Allocable_all" Trait Module.
            mutateArray_removeItemsByFilter(joinpointList, equalsJoinpoint);

            EventProxy.emit({

              type      : "joinpoint:remove",
              joinpoint : joinpoint
            });
          } else {
            joinpoint = false;
          }
          equalsJoinpoint = null;
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
        if (isStringValue(id)) {
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
          isPointcutFilter = null;
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
        var config, pointcut;
        if (isPointcutConfig(configOrPointcut)) {
          config = configOrPointcut;

          pointcut = getPointcutByConfig(config);               // :Pointcut|false|undefined

          if (isUndefined(pointcut)) {
            config.id = (getSanitizedIdentifier(config.id) || createId());

            pointcut = createPointcut(config);                  // :Pointcut
          }
      //} else if (isPointcut(configOrPointcut) || isPointcutLike(configOrPointcut)) {
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
        if (pointcut && !pointcutList.some(makeFilter_equalsPointcut(pointcut))) {

        // addPointcut
          pointcutList.push(pointcut);
          pointcutMap[pointcut.getId()] = pointcut;

          EventProxy.emit({

            type      : "pointcut:add",
            pointcut  : pointcut
          });
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
      //} else if (isAdvice(configOrAdvice) || isAdviceLike(configOrAdvice)) {
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
console.log("markForReconfirmation", [aspect.getId(), confirmationState.current, confirmationState.nominal, confirmationState, this]);
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
          return makeArray(linkList);
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
console.log("confirmAspect :: system off");
          confirmationState.current = "";
          confirmationState.nominal = "confirm";
        } else {
console.log("confirmAspect :: system on", aspect.getLinkList());
          aspect.getLinkList().forEach(function (link/*, idx, list*/) {

            joinAdviceAndPointcut(link.advice, link.pointcut);
          });
          confirmationState.current = "confirm";
          confirmationState.nominal = "confirm";

          EventProxy.on("system:restore"/*initialstate*/, eventHandler);
        }
      },
      denyAspect = function (/*aspect, */confirmationState, eventHandler) {
console.log("denyAspect", [confirmationState.current, confirmationState.nominal, confirmationState]);
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
      //} else if (isAspect(configOrAspect) || isAspectLike(configOrAspect)) {
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
//EventProxy.on("system:restore"/*initialstate*/, logEvent);


//  var logEvent = function (evt) {
//    console.log(evt.target, evt);
//  };
//  EventProxy.on("joinpoint:add", logEvent);
//  EventProxy.on("joinpoint:remove", logEvent);
//  EventProxy.on("pointcut:add", logEvent);
//  EventProxy.on("pointcut:remove", logEvent);
//  EventProxy.on("advice:add", logEvent);
//  EventProxy.on("advice:remove", logEvent);
//  EventProxy.on("aspect:add", logEvent);
//  EventProxy.on("aspect:remove", logEvent);
//  EventProxy.on("system:restore"/*initialstate*/, logEvent);


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



var
  ao = composable.require("modification.ao"),

  JP = ao.Joinpoint,
  PC = ao.Pointcut,
  AV = ao.Advice,
  AS = ao.Aspect,

  timeline = [{log:"before AO system initialize",date:new Date}],

  jp_A = JP.add({methodName:"add",target:JP}),
  jp_B = JP.add({methodName:"parseInt",target:window}),

  pc_A = PC.add({filter:function () {return true;}}),
  pc_B = PC.add({filter:function () {return true;}}),

  av_A = AV.add({type:"before",handler:function(){console.log("before");}}),
  av_B = AV.add({type:"after",handler:function(){console.log("after");}}),

  as_A = AS.add({handler:function (link, ao) {
console.log("AS.add", [link, ao]);
    link(av_A, pc_B);
    link(av_B, pc_A);
    link(av_B, pc_B);

    link(av_A, pc_B);
    link(av_B, pc_A);
    link(av_B, pc_B);
  }}),
  as_B = AS.add({handler:function (link, ao) {
console.log("AS.add", [link, ao]);
    link(av_A, pc_A);
    link(av_B, pc_B);

    link(av_A, pc_A);
    link(av_B, pc_B);
  }})
;
timeline.push({log:"after AO system initialize",date:new Date});
as_A.confirm();
timeline.push({log:"after 1st aspect confirm",date:new Date});
as_B.confirm();
timeline.push({log:"after 2nd aspect confirm",date:new Date});

JP.all().reduce(function (buffer, item) {

  buffer.push(function (jp) {
    return function () {

      console.log([jp.getTarget(), jp.getMethodName()+"", jp.getBaseMethod()+""]);
    };
  }(item));

  return buffer;

}, []).forEach(function (log) {log();});


PC.all().reduce(function (buffer, item) {

  buffer.push(function (pc) {
    return function () {

      console.log([pc.getId(), pc.getFilter()+""]);
    };
  }(item));

  return buffer;

}, []).forEach(function (log) {log();});

timeline.forEach(function (capsule, idx, timeline) {
  console.log(capsule.log, capsule.date, ((idx >= 1) ? (timeline[idx].date - timeline[idx - 1].date) : 0));
});


// 8646 bytes
//composable("modification.ao",function(j,f,h){j("composites.Function_modifiers_adviceTypes_before_after_returning_throwing_around");h=j("environment");var D=j("components.Allocable_all");j=j("components.Observable_SignalsAndSlots");var k=h.introspective.isUndefined,c=h.introspective.isFunction,ka=h.introspective.isObject,l=h.introspective.isStringValue,la=f.Math.random,ma=h.helpers.makeArray,E=function(c,a){for(var b=-1,e=c.length;++b<e;)a(c[b],b,c)&&(c.splice(b,1),--b,--e)},N=function(c,a){for(var b,e=-1,M=c.length;++e<M;)if(a(c[e],e,c)){b=c[e];break}return b},g=function(c){return l(c)&&c.trim()||""},O=f.uuid&&c(f.uuid.v4)&&f.uuid.v4||function a(b){return b?(b^16*la()>>b/4).toString(16):([1E7]+-1E3+-4E3+-8E3+-1E11).replace(/[018]/g,a)},W,F,G="on",X=function(){return"off"==G},P,Q;f=function(){P();Q()};var d={};j.call(d,{addEventListener:"on",removeEventListener:"off",dispatchEvent:"emit"});var s,t=[],R=function(a){this.getLabel=function(){return a.label};this.getTarget=function(){return a.target};this.getMethodName=function(){return a.methodName};this.getBaseMethod=function(){return a.baseMethod}};R.prototype.equals=function(a){return u(this)&&u(a)&&this===a||v(this)&&v(a)&&this.getBaseMethod()===a.getBaseMethod()&&this.getMethodName()===a.getMethodName()&&this.getTarget()===a.getTarget()&&this.getLabel()===a.getLabel()};var u=function(a){return a instanceof R},v=function(a){return a&&"object"==typeof a&&c(a.getLabel)&&c(a.getTarget)&&c(a.getMethodName)&&c(a.getBaseMethod)},Y=function(a){return a&&"object"==typeof a&&ka(a.target)&&l(a.methodName)&&c(a.target[a.methodName])},Z=function(a){var b=a.getBaseMethod(),e=a.getMethodName(),M=a.getTarget(),c=a.getLabel();return function(a){return a.getBaseMethod()===b&&a.getMethodName()===e&&a.getTarget()===M&&a.getLabel()===c}},$=function(a){a.baseMethod=a.target[a.methodName];a.label=g(a.label);return new R(a)};s={add:function(a){var b;if(Y(a))b=$(a);else if(u(a)||v(a))b=a;b&&!t.some(Z(b))&&(t.push(b),d.emit({type:"joinpoint:add",joinpoint:b}));return b},remove:function(a){var b;if(Y(a))b=$(a);else if(u(a)||v(a))b=a;b&&(a=Z(b),t.some(a)?(E(t,a),d.emit({type:"joinpoint:remove",joinpoint:b})):b=!1);return b},isJoinpoint:u,isJoinpointLike:v};D.call(s,t);var w,m=[],S={},x=function(a){this.getFilter=function(){return a.filter};this.getId=function(){return a.id}};x.prototype.equals=function(a){return n(this)&&n(a)&&this===a||p(this)&&p(a)&&this.getFilter()===a.getFilter()&&this.getId()===a.getId()};x.prototype.getJoinpoints=function(){return(n(this)||p(this))&&s.all().filter(this.getFilter())||[]};var n=function(a){return a instanceof x},p=function(a){return a&&"object"==typeof a&&c(a.getFilter)&&c(a.getId)},aa=function(a){var b=a.getFilter(),e=a.getId();return function(a){return a.getFilter()===b&&a.getId()===e}},ba=function(a){var b;l(a)&&(b=S[a]);return b},H=function(a){var b,e=g(a.id),c=ba(e);if(c)b=c.getFilter()===a.filter?c:!1;else{var d=a.filter;(c=N(m,function(a){return a.getFilter()===d}))&&(b=c.getId()===e?c:!1)}return b};w={getById:ba,add:function(a){var b;a&&"object"==typeof a&&c(a.filter)?(b=H(a),k(b)&&(a.id=g(a.id)||O(),b=new x(a))):n(a)?b=a:p(a)&&(b=H({filter:a.getFilter(),id:a.getId()}),k(b)&&(a={filter:a.getFilter(),id:a.getId()},b=new x(a)));b&&!m.some(aa(b))&&(m.push(b),S[b.getId()]=b,d.emit({type:"pointcut:add",pointcut:b}));return b},remove:function(a){var b;if(a&&"object"==typeof a&&c(a.filter))b=H(a);else if(n(a)||p(a))b=H({filter:a.getFilter(),id:a.getId()});b&&(a=aa(b),m.some(a)?(E(m,a),delete S[b.getId()],d.emit({type:"pointcut:remove",pointcut:b})):b=!1);return b},isPointcut:n,isPointcutLike:p};D.call(w,m);var y,q=[],T={},I={AROUND:"around",BEFORE:"before",AFTER:"after",AFTERTHROWING:"afterThrowing",AFTERRETURNING:"afterReturning"},J=function(a){this.getHandler=function(){return a.handler};this.getType=function(){return a.type};this.getId=function(){return a.id}};J.prototype.equals=function(a){return z(this)&&z(a)&&this===a||A(this)&&A(a)&&this.getHandler()===a.getHandler()&&this.getType()===a.getType()&&this.getId()===a.getId()};var z=function(a){return a instanceof J},A=function(a){var b;if(b=a)if(b="object"==typeof a)if(b=c(a.getHandler))if(b=c(a.getType))b=a.getType(),b=l(b)&&I[b.toUpperCase()]===b&&c(a.getId);return b},ca=function(a){return a&&"object"==typeof a&&c(a.handler)&&(I[g(a.type).toUpperCase()]||"")},da=function(a){var b=a.getHandler(),e=a.getType(),c=a.getId();return function(a){return a.getHandler()===b&&a.getType()===e&&a.getId()===c}},ea=function(a){var b;l(a)&&(b=T[a]);return b},U=function(a){var b,e=g(a.id),c=ea(e);a.type=I[g(a.type).toUpperCase()]||"";if(c)b=c.getHandler()===a.handler&&c.getType()===a.type?c:!1;else{var d=a.handler,f=a.type;(c=N(q,function(a){return a.getHandler()===d&&a.getType()===f}))&&(b=c.getId()===e?c:!1)}return b},fa=function(a){return U({handler:a.getHandler(),type:a.getType(),id:a.getId()})};y={getById:ea,add:function(a){var b;ca(a)?(b=U(a),k(b)&&(a.type=I[g(a.type).toUpperCase()]||"",a.id=g(a.id)||O(),b=new J(a))):z(a)?b=a:A(a)&&(b=fa(a),k(b)&&(a={handler:a.getHandler(),type:a.getType(),id:a.getId()},b=new J(a)));b&&!q.some(da(b))&&(q.push(b),T[b.getId()]=b,d.emit({type:"advice:add",advice:b}));return b},remove:function(a){var b;if(ca(a))b=U(a);else if(z(a)||A(a))b=fa(a);b&&(a=da(b),q.some(a)?(E(q,a),delete T[b.getId()],d.emit({type:"advice:remove",advice:b})):b=!1);return b},isAdvice:z,isAdviceLike:A};D.call(y,q);var r=[],V={},K=function(a){var b=this,c={current:"deny",nominal:"deny"},f=function(){console.log("markForReconfirmation",[b.getId(),c.current,c.nominal,c,this]);c.current=""},g=[],h=a.handler;h(function(a,b){var c=y.add(a),e=w.add(b);na(c)&&(oa(e)&&!g.some(pa(c,e)))&&g.push({advice:c,pointcut:e})},W);b.getLinkList=function(){return ma(g)};b.getHandler=function(){return h};b.getId=function(){return a.id};b.deny=function(){this===b&&!b.isDenied()&&(console.log("denyAspect",[c.current,c.nominal,c]),d.off("system:restore",f),c.current="deny",c.nominal="deny",ga(),F.all().forEach(ha))};b.confirm=function(){this===b&&!b.isConfirmed()&&(X()?(console.log("confirmAspect :: system off"),c.current="",c.nominal="confirm"):(console.log("confirmAspect :: system on",b.getLinkList()),b.getLinkList().forEach(function(a){var b=a.advice;a=a.pointcut;var c=b.getType(),e=b.getHandler();a.getJoinpoints().forEach(function(a){var b=a.getTarget(),d=a.getMethodName();b[d]=b[d][c](e,b,a)})}),c.current="confirm",c.nominal="confirm",d.on("system:restore",f)))};b.isReconfirm=function(){return this===b&&"confirm"!=c.current&&"confirm"==c.nominal};b.isConfirmed=function(){return this===b&&"confirm"==c.current&&"confirm"==c.nominal};b.isDenied=function(){return this===b&&"deny"==c.current&&"deny"==c.nominal}};K.prototype.equals=function(a){return B(this)&&B(a)&&this===a||C(this)&&C(a)&&this.getHandler()===a.getHandler()&&this.getId()===a.getId()};var oa=w.isPointcut,na=y.isAdvice,B=function(a){return a instanceof K},C=function(a){return a&&"object"==typeof a&&c(a.getLinkList)&&c(a.getHandler)&&c(a.getId)&&c(a.deny)&&c(a.confirm)&&c(a.isConfirmed)},ia=function(a){var b=a.getHandler(),c=a.getId();return function(a){return a.getHandler()===b&&a.getId()===c}},pa=function(a,b){return function(c){return c.advice===a&&c.pointcut===b}},ha=function(a){a.isReconfirm()&&a.confirm()},ga=function(){s.all().forEach(function(a){var b=a.getTarget(),c=a.getMethodName();a=a.getBaseMethod();b[c]=a});d.emit("system:restore")},ja=function(a){var b;l(a)&&(b=V[a]);return b},L=function(a){var b,c=g(a.id),d=ja(c);if(d)b=d.getHandler()===a.handler?d:!1;else{var f=a.handler;(d=N(r,function(a){return a.getHandler()===f}))&&(b=d.getId()===c?d:!1)}return b};P=function(){G="off";ga()};Q=function(){G="on";F.all().forEach(ha)};h={getById:ja,add:function(a){var b;a&&"object"==typeof a&&c(a.handler)?(b=L(a),k(b)&&(a.id=g(a.id)||O(),b=new K(a))):B(a)?b=a:C(a)&&(b=L({handler:a.getHandler(),id:a.getId()}),k(b)&&(a={handler:a.getHandler(),id:a.getId()},b=new K(a)));b&&!r.some(ia(b))&&(r.push(b),V[b.getId()]=b,d.emit({type:"aspect:add",aspect:b}));return b},remove:function(a){var b;if(a&&"object"==typeof a&&c(a.handler))b=L(a);else if(B(a)||C(a))b=L({handler:a.getHandler(),id:a.getId()});b&&(a=ia(b),r.some(a)?(E(r,a),delete V[b.getId()],d.emit({type:"aspect:remove",aspect:b})):b=!1);return b},isAspect:B,isAspectLike:C};D.call(h,r);F=h;d.on("joinpoint:add",f);d.on("joinpoint:remove",f);d.on("pointcut:add",f);d.on("pointcut:remove",f);d.on("advice:add",f);d.on("advice:remove",f);d.on("aspect:add",f);d.on("aspect:remove",f);return W={Joinpoint:s,Pointcut:w,Advice:y,Aspect:F,isOff:X,isOn:function(){return"on"==G},off:P,on:Q,reboot:f}});
