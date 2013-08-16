

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
    parseFloat = global.parseFloat,


    baseEnvironment = {
      global  :             global,

      objects : {
        regX                : regX
      },
      methods : {
        noop                : noop
      },
      helpers : {
        compareTypes                    : compareTypes,
        createClassSignaturePattern     : createClassSignaturePattern,
        protectBehaviorFromInstantiation: protectBehaviorFromInstantiation
      },
      introspective : {
        isFunction          : isFunction,
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
  module.require = require; // for development/debugging only.


  (function () {
    /**
     *  implementing the "Enumerable_first_last_item" Trait Module
     *
     *  ... that's accessor methods will work as shorthands on a
     *  list getter (method) they were applied to; thus saving a
     *  direct call to the latter.
     *
     *  example:
     *
     *  >> all()         << is a list getter that returns a list/array.
     *  >> all().first() << will return the first item of a list/array if such a structure does respond to this method.
     *  >> all.first()   << will return the first item of the very same list/array as of calling >> all() <<.
     */
    this.first = function () {

      return (this()[0]);
    };
    this.last = function () {

      var list;
      return ((list = this())[list.length - 1]);
    };
    this.item = function (idx) {

      return (this()[parseFloat(idx, 10)]);
    };
  }).call(module.all); // methods of the anonymous trait module get applied to the "composable"'s Core Module [module.all].


  return (namespace[moduleName] = module);


}).call(null, "composable"/*, namespace*/);



/*


  [http://closure-compiler.appspot.com/home]


- Simple          - 1.803 byte  - straight forward featuring [require], [global] and [environment] as arguments of a module callback.
(function(r,j){var b,c=this;b=c.Object;var e=b.prototype,k=c.Array.prototype,d=c.RegExp.prototype,s=c.String.prototype,t=e.toString,u=e.valueOf,v=d.compile,g=/(?:)/;""+g.compile("(?:)","")!==""+g&&(d.compile=function(){v.apply(this,arguments);return this});var e=function(a){return["^\\[object\\s+",a,"\\]$"].join("")},m=function(a){return t.call(a)},w=e("String"),n=function(a){return void 0===a||null===a?a:u.call(a).valueOf()},f=function(a){return"function"==typeof a&&"function"==typeof a.call&&"function"==typeof a.apply},l=function(a){return g.compile(w).test(m(a))},d=function(a,b){return new c.ReferenceError(["A valid implementation of ",a," is missing.\n\nPlease provide the basic shims of ES5. Have a look at e.g.\nhttps://github.com/kriskowal/es5-shim/blob/master/es5-shim.js",b].join(""))};if(!f(b.keys))throw d("[Object.keys]","#L542");if(!f(s.trim))throw d("[String.prototype.trim]","#L899");if(!f(k.indexOf))throw d("[Array.prototype.indexOf]","#L479");if(!f(k.forEach))throw d("[Array.prototype.forEach]","#L238");if(!f(k.reduce))throw d("[Array.prototype.reduce]","#L382");var p=b.keys,x=c.parseFloat,y={global:c,objects:{regX:g},methods:{noop:function(){}},helpers:{compareTypes:function(a,b,c){c=f(c)&&c||n;var d,e;return(d=c(a))>(e=c(b))&&1||d<e&&-1||(d===e?0:void 0)},createClassSignaturePattern:e,protectBehaviorFromInstantiation:function(a,c){if(c instanceof a)throw new TypeError("Traits and Mixins always need to be applied onto objects but never get instantiated.");}},introspective:{isFunction:f,isString:l,baseValueOf:n,getClassSignature:m}},h={},q=function(a){return h[l(a)&&a.trim()||""]};j=j||c;b=function(a,b){a=l(a)&&a.trim()||"";var d=f(b)&&b(q,c,y);if(d&&a)return h[a]=d};b.all=function(){return p(h)};b.all.size=function(){return p(h).length};b.require=q;(function(){this.first=function(){return this()[0]};this.last=function(){var a;return(a=this())[a.length-1]};this.item=function(a){return this()[x(a,10)]}}).call(b.all);return j[r]=b}).call(null,"composable");


- Simple          - 2.010 byte  - featuring [include] as additional 4th argument of a module callback; relies on the implementation of [Function.modifiers.aop.base]
(function(s,l){var c,d=this;c=d.Object;var f=c.prototype,h=d.Array.prototype,b=d.RegExp.prototype,t=d.String.prototype,u=f.toString,v=f.valueOf,w=h.slice,x=b.compile,j=/(?:)/;""+j.compile("(?:)","")!==""+j&&(b.compile=function(){x.apply(this,arguments);return this});var b=null,f=function(a){return["^\\[object\\s+",a,"\\]$"].join("")},p=function(a){return u.call(a)},y=f("String"),q=function(a){return v.call(a).valueOf()},e=function(a){return"function"==typeof a&&"function"==typeof a.call&&"function"==typeof a.apply},m=function(a){return j.compile(y).test(p(a))},b=function(a,c){return new d.ReferenceError(["A valid implementation of ",a," is missing.\n\nPlease provide the basic shims of ES5. Have a look at e.g.\nhttps://github.com/kriskowal/es5-shim/blob/master/es5-shim.js",c].join(""))};if(!e(c.keys))throw b("[Object.keys]","#L542");if(!e(t.trim))throw b("[String.prototype.trim]","#L899");if(!e(h.indexOf))throw b("[Array.prototype.indexOf]","#L479");if(!e(h.forEach))throw b("[Array.prototype.forEach]","#L238");if(!e(h.reduce))throw b("[Array.prototype.reduce]","#L382");var r=c.keys,z=d.parseFloat,A={objects:{global:d,regX:j},methods:{noop:function(){}},helpers:{compareTypes:function(a,c,g){g=e(g)&&g||q;var d,b;return(d=g(a))>(b=g(c))&&1||d<b&&-1||(d===b?0:void 0)},createClassSignaturePattern:f},introspective:{isFunction:e,isString:m,baseValueOf:q,getClassSignature:p}},k={},n=function(a){return k[m(a)&&a.trim()||""]},B=function(a,c,d){var b=[],e=function(a){(a=n(a))&&b.push(a)},f=a(d[0],d[1],d[2],function(){w.call(arguments).forEach(e)});f&&b.length&&b.forEach(function(a){a.call(f)});return f};l=l||d;c=function(a,b){a=m(a)&&a.trim()||"";var c=e(b)&&(b=b.around(B))&&b(n,d,A);c&&a&&(k[a]=c)};c.all=function(){return r(k)};c.all.size=function(){return r(k).length};c.require=n;(function(){this.first=function(){return this()[0]};this.last=function(){var a;return(a=this())[a.length-1]};this.item=function(a){return this()[z(a,10)]}}).call(c.all);return l[s]=c}).call(null,"composable");


//composable("",function(c,a,d,b){b("components.Iterable_Character_next_previous");return a.String.prototype});
//composable("",function(c,a,d,b){b("components.Iterable_Integer_next_previous");return a.Number.prototype});


*/
