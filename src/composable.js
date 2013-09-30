

(function (moduleName, namespace) {


  var
    module, // the "composable" Core Module.


    global = this,

  //Function  = global.Function,
    Object    = global.Object,
    Array     = global.Array,
    RegExp    = global.RegExp,
    String    = global.String,

  //functionPrototype = Function.prototype,
    objectPrototype   = Object.prototype,
    arrayPrototype    = Array.prototype,
    regexpPrototype   = RegExp.prototype,
    stringPrototype   = String.prototype,


    expose_class_signature  = objectPrototype.toString,
    expose_internal_value   = objectPrototype.valueOf,

  //array_slice     = arrayPrototype.slice,

    regexp_compile  = regexpPrototype.compile,


    regX = (/(?:)/),

    NULL_VALUE = null,
    UNDEFINED_VALUE
  ;


  /*
   * fix some browsers (e.g. webkit) "broken" prototypal [RegExp.compile] method.
   */
  if (("" + regX.compile("(?:)", "")) !== ("" + regX)) {
    regexpPrototype.compile = function (/*search, flags*/) {

      regexp_compile.apply(this, arguments);
      return this;
    };
  }
//regexpPrototype = null;


  var
    createClassSignaturePattern = function (internalClassName) {
      return ["^\\[object\\s+", internalClassName, "\\]$"].join("");
    },
    getClassSignature = function (type) {
      return expose_class_signature.call(type);
    },


    PATTERN_CLASS_SIGNATURE_STRING  = createClassSignaturePattern("String"),


    baseValueOf = function (type) {
      /**
       *  Object.prototype.valueOf.call(new String(1))              // "[object String]"
       *  Object.prototype.valueOf.call(new Number("1"))            // "[object Number]"
       *  //versus
       *  Object.prototype.valueOf.call(new String(1)).valueOf()    // "1" [string] value
       *  Object.prototype.valueOf.call(new Number("1")).valueOf()  // 1 [number] value
       */
      return ((type === UNDEFINED_VALUE) || (type === NULL_VALUE)) ? type : expose_internal_value.call(type).valueOf();
    },
    compareTypes = function (typeA, typeB, customValueOf) {

      customValueOf = (isFunction(customValueOf) && customValueOf) || baseValueOf;

      var valueA, valueB;
      return (

        (((valueA = customValueOf(typeA)) > (valueB = customValueOf(typeB))) && 1)

        || ((valueA < valueB) && -1)
      //|| ((valueA == valueB) ? 0 : UNDEFINED_VALUE)
        || ((valueA === valueB) ? 0 : UNDEFINED_VALUE) // as for UNDEFINED_VALUE, the 4th possible return value, please countercheck with [http://apidock.com/ruby/Comparable]
      );
    },


    isFunction = function (type) {
      /*
       *  - x-frame-safe and also filters e.g. [[RegExp]] implementation of older mozilla's
       *    as well as e.g. modern browser implementations of [[Element]], [[Node]] and of
       *    related DOM elements that claim to be functional but are not at all callable.
       */
      return ((typeof type == "function") && (typeof type.call == "function") && (typeof type.apply == "function"));
    },
    isString = function (type) {
      return regX.compile(PATTERN_CLASS_SIGNATURE_STRING).test(getClassSignature(type));
    },


    protectBehaviorFromInstantiation = function (Behavior, target) {
      if (target instanceof Behavior) {
        throw (new TypeError("Traits and Mixins always need to be applied onto objects but never get instantiated."));
      }
    },
    createES5ImplementationError = function (/*errorType, */msgMissing, msgResource) {
    //return (new global[errorType]([
      return (new global.ReferenceError([

        "A valid implementation of ", msgMissing, " is missing.\n\n",
        "Please provide the basic shims of ES5. Have a look at e.g.\n",
        "https://github.com/kriskowal/es5-shim/blob/master/es5-shim.js",
        msgResource

      ].join("")));
    }
  ;


  if (!isFunction(Object.keys)) {
    /*
     *  ES5 15.2.3.14
     *  http://es5.github.com/#x15.2.3.14
     *
     *  https://github.com/kriskowal/es5-shim/blob/master/es5-shim.js#L542
     */
    throw createES5ImplementationError(
    //"ReferenceError",
      "[Object.keys]",
      "#L542"
    //"https://github.com/kriskowal/es5-shim/blob/master/es5-shim.js#L542"
    );
  }
  if (!isFunction(stringPrototype.trim)) {
    /*
     *  ES5 15.5.4.20
     *  http://es5.github.com/#x15.5.4.20
     *
     *  https://github.com/kriskowal/es5-shim/blob/master/es5-shim.js#L899
     */
    throw createES5ImplementationError(
      //"ReferenceError",
      "[String.prototype.trim]",
      "#L899"
      //"https://github.com/kriskowal/es5-shim/blob/master/es5-shim.js#L899"
    );
  }
  if (!isFunction(arrayPrototype.indexOf)) {
    /*
     *  ES5 15.2.3.14
     *  http://es5.github.com/#x15.2.3.14
     *
     *  https://github.com/kriskowal/es5-shim/blob/master/es5-shim.js#L479
     */
    throw createES5ImplementationError(
      //"ReferenceError",
      "[Array.prototype.indexOf]",
      "#L479"
      //"https://github.com/kriskowal/es5-shim/blob/master/es5-shim.js#L479"
    );
  }
  if (!isFunction(arrayPrototype.forEach)) {
    /*
     *  ES5 15.2.3.14
     *  http://es5.github.com/#x15.2.3.14
     *
     *  https://github.com/kriskowal/es5-shim/blob/master/es5-shim.js#L238
     */
    throw createES5ImplementationError(
    //"ReferenceError",
      "[Array.prototype.forEach]",
      "#L238"
    //"https://github.com/kriskowal/es5-shim/blob/master/es5-shim.js#L238"
    );
  }
  if (!isFunction(arrayPrototype.reduce)) {
    /*
     *  ES5 15.2.3.14
     *  http://es5.github.com/#x15.2.3.14
     *
     *  https://github.com/kriskowal/es5-shim/blob/master/es5-shim.js#L382
     */
    throw createES5ImplementationError(
    //"ReferenceError",
      "[Array.prototype.reduce]",
      "#L382"
    //"https://github.com/kriskowal/es5-shim/blob/master/es5-shim.js#L382"
    );
  }


  var
    noop = function () {},

    keys = Object.keys,


    baseEnvironment = {
      global  :             global,

      objects : {
        regX                : regX
      },
      methods : {
        noop                : noop
      },
      helpers : {
      //makeArray           : makeArray,    // will soon be provided by     "components.Enumerable_toArray"
        compareTypes                    : compareTypes,
        createClassSignaturePattern     : createClassSignaturePattern,
        protectBehaviorFromInstantiation: protectBehaviorFromInstantiation
      },
      introspective : {
        isFunction          : isFunction,   // will soon be overwritten by  "components.Introspective_isFunction_isCallable"
      //isCallable          : isCallable,   // will soon be provided by     "components.Introspective_isFunction_isCallable"
      //isArray             : isArray,      // will soon be provided by     "components.Introspective_isArray_isArguments"
      //isArguments         : isArguments,  // will soon be provided by     "components.Introspective_isArray_isArguments"
        isString            : isString,
        baseValueOf         : baseValueOf,
        getClassSignature   : getClassSignature
      }/*,
      states : {
      },
      vendors : {
        underscore          : global.underscore,
        lowdash             : global.lowdash
      }*/
    },
    moduleIndex = {},


    sanitizeIdentifier = function (identifier) {
      return ((isString(identifier) && identifier.trim()) || "");
    },
    require = function (moduleIdentifier) {
      return moduleIndex[sanitizeIdentifier(moduleIdentifier)];
    }//,
//  offerInclude = function (factory, advice, args) {         // implementing [include] into a "comparable"
//    var                                                     // module pattern can be achieved by using
//      mixins = [],                                          // the AOP base method modifier [around].
//
//      checkAndReserveMixin = function (moduleIdentifier) {
//        var mixin = require(moduleIdentifier);
//        if (mixin) {
//          mixins.push(mixin);
//        }
//      },
//      include = function (/*moduleIdentifier[, moduleIdentifier[, ...]]*/) {
//        array_slice.call(arguments).forEach(checkAndReserveMixin);
//      },
//      module = factory(args[0], args[1], args[2], include)  // [require], [global] and [baseEnvironment] by default
//    ;                                                       // enriched with a 4th [include] argument.
//    if (module && mixins.length) {
//      mixins.forEach(function (mixin/*, idx, list*/) {
//
//        mixin.call(module);
//      });
//    }
//    /**
//     *  EXAMPLE:
//     *  >> composable("test", function(require, global, environment, include) {console.log("test", arguments);return {};}); <<
//     *  >> composable.all.last() <<
//     *
//     *  >> composable("comparableTest", function(require, global, environment, include) {console.log("test", arguments);include("components.Comparable");return {};});
//     *  >> composable.all.last() <<
//     *  >> var ct = composable.require(composable.all.last()); <<
//     */
//    return module;
//  }
  ;
  namespace = (namespace || global);


  module = function (moduleIdentifier, moduleFactory) {
    /**
     *  implementing the "composable" Core Module.
     */
    moduleIdentifier = sanitizeIdentifier(moduleIdentifier);

    var module = (isFunction(moduleFactory)/* && (moduleFactory = moduleFactory.around(offerInclude))*/ && moduleFactory(require, global, baseEnvironment));
    if (module && moduleIdentifier) {

    //moduleIndex[moduleIdentifier] = module;
      return (moduleIndex[moduleIdentifier] = module);
    }
  };
  module.all = function () {

    return keys(moduleIndex);
  };
  module.all.size = function () {

    return keys(moduleIndex).length;
  };
  module.require = require; // @TODO - do not forget to switch exposing and hiding according to development/debugging or production.


  (function () {
    /**
     *  implementing the "Enumerable_first_last_item" Trait Module.
     *
     *  ... that's accessor methods will work as shorthands on a
     *  list getter (method) they were applied to; thus saving a
     *  direct call to the latter.
     *
     *  example:
     *
     *  >> all()         << is a list getter that returns a list/array.
     *  >> all().first() << will return the first item of a list/array if such a structure does respond to this method.
     *  >> all.first()   << will return the first item of the very same list/array as of calling >> all().first() <<.
     */
    var
      parse_float = global.parseFloat,
      math_floor  = global.Math.floor
    ;
    this.first = function () {

      return (this()[0]);
    };
    this.last = function () {

      var list;
      return ((list = this())[list.length - 1]);
    };
    this.item = function (idx) {

      return (this()[math_floor(parse_float(idx, 10))]);
    };
  }).call(module.all);  // applying the [first], [last] and [item] shorthand functionality of the anonymous
                        // Enumerable Trait onto the list getter method [all] of the "composable" Core Module.


  return (namespace[moduleName] = module);


}).call(null, "composable"/*, namespace*/);



/*


  [http://closure-compiler.appspot.com/home]


- Simple          - 2.023 byte  - straight forward featuring [require], [global] and [baseEnvironment] as arguments of a module callback.
(function(t,l){var b,c=this;b=c.Object;var g=b.prototype,m=c.Array.prototype,d=c.RegExp.prototype,u=c.String.prototype,v=g.toString,w=g.valueOf,x=d.compile,h=/(?:)/;""+h.compile("(?:)","")!==""+h&&(d.compile=function(){x.apply(this,arguments);return this});var g=function(a){return["^\\[object\\s+",a,"\\]$"].join("")},p=function(a){return v.call(a)},y=g("String"),q=function(a){return void 0===a||null===a?a:w.call(a).valueOf()},e=function(a){return"function"==typeof a&&"function"==typeof a.call&&"function"==typeof a.apply},n=function(a){return h.compile(y).test(p(a))},d=function(a,b){return new c.ReferenceError(["A valid implementation of ",a," is missing.\n\nPlease provide the basic shims of ES5. Have a look at e.g.\nhttps://github.com/kriskowal/es5-shim/blob/master/es5-shim.js",b].join(""))};if(!e(b.keys))throw d("[Object.keys]","#L542");if(!e(u.trim))throw d("[String.prototype.trim]","#L899");if(!e(m.indexOf))throw d("[Array.prototype.indexOf]","#L479");if(!e(m.forEach))throw d("[Array.prototype.forEach]","#L238");if(!e(m.reduce))throw d("[Array.prototype.reduce]","#L382");var r=b.keys,z={global:c,objects:{regX:h},methods:{noop:function(){}},helpers:{compareTypes:function(a,b,f){f=e(f)&&f||q;var c,d;return(c=f(a))>(d=f(b))&&1||c<d&&-1||(c===d?0:void 0)},createClassSignaturePattern:g,protectBehaviorFromInstantiation:function(a,b){if(b instanceof a)throw new TypeError("Traits and Mixins always need to be applied onto objects but never get instantiated.");}},introspective:{isFunction:e,isString:n,baseValueOf:q,getClassSignature:p}},k={},s=function(a){return k[n(a)&&a.trim()||""]};l=l||c;b=function(a,b){a=n(a)&&a.trim()||"";var f=e(b)&&b(s,c,z);if(f&&a)return k[a]=f};b.all=function(){return r(k)};b.all.size=function(){return r(k).length};b.require=s;(function(){var a=c.parseFloat,b=c.Math.floor;this.first=function(){return this()[0]};this.last=function(){var a;return(a=this())[a.length-1]};this.item=function(c){return this()[b(a(c,10))]}}).call(b.all);return l[t]=b}).call(null,"composable");


*/
