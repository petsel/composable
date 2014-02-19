

composable("entities.IterableFactory", function (require, global, internalBaseEnvironment) {


  "use strict";


  var
    Factory,


    env_introspective = internalBaseEnvironment.introspective,
    env_helpers       = internalBaseEnvironment.helpers,


    getClassSignature = env_introspective.getClassSignature,
    isFunction        = env_introspective.isFunction,

    createClassSignaturePattern = env_helpers.createClassSignaturePattern,
    defaultCompareTypes         = env_helpers.compareTypes,

    noop = internalBaseEnvironment.methods.noop,
    regX = internalBaseEnvironment.objects.regX,

    UNDEFINED_VALUE,


    StopIteration = (

      regX
        .compile(createClassSignaturePattern("StopIteration"))
        .test(getClassSignature(global.StopIteration))

      && global.StopIteration

    ) || (function () {

      var StopIteration = function () {
      };
      StopIteration.prototype = {};

      StopIteration.prototype.toString = function () {
        return "[object StopIteration]";
      };
      StopIteration.prototype.valueOf = function () {
        return this;
      };
      return (new StopIteration);
    }()),

    isStopIteration = function (type) {
      return (type === StopIteration);
    },

    stopIterationByThrowStatement = function () {
      throw StopIteration;
    },
  //stopIterationReturningUndefined = function () {
    stopIterationWithUndefinedValue = function () {
      return UNDEFINED_VALUE;
    }
  ;


/**
 *
 *  - Iterators and generators
 *    [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators?redirectlocale=en-US&redirectslug=JavaScript%2FGuide%2FIterators_and_Generators]
 *
 *  - for...of
 *    [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of]
 *
 *  - [[harmony:iterators]]
 *    [http://wiki.ecmascript.org/doku.php?id=harmony:iterators]
 *
 *  - ES Discuss - Generators: Why do generator expressions return generators?
 *    [http://esdiscuss.org/topic/why-do-generator-expressions-return-generators]
 *
 *  - http://domenic.me/ - ES6 Iterators, Generators, and Iterables
 *    [http://domenic.me/2013/09/06/es6-iterators-generators-and-iterables/]
 *
 */


/*

  [http://apidock.com/ruby/Enumerable]

*/ /*

  JavaScript supports/enables [Function] based [Trait] and [Mixin] -patterns
  for object composition. Both patterns are containers for a single or a
  whole bunch of implemented method(s) that is/are supposed to get bound to
  and run on objects.

  In my opinion [Trait]s in JavaScript are considered to be "stateless".
  If it comes to state that needs to be carried throughout an object such
  implementations should be referred to as [Mixin]s.

  In order to avoid/solve conflicts [Trait] composition patterns should
  make use of [Function.prototype.before], [Function.prototype.after]
  and [Function.prototype.around].

*/
  var createIterable = function (config) {

    config = ((typeof config == "object") && config) || {};

    var
      IterableTrait,


      GetNextTrait,
      GetPreviousTrait,


      getNext       = config.next,
      getPrevious   = config.previous,
      compareTypes  = config.compare,

    //isReturnTuple = !!config.isReturnTuple,
      stopIteration = (!!config.isThrowStopIteration && stopIterationByThrowStatement) || stopIterationWithUndefinedValue
    ;

    if (isFunction(compareTypes)) {                             // either a [compare] respectively a [compareTo] method
      if (compareTypes.length == 1) {                           // needs to be passed to each [Iterable]'s creation
                                                                // process ...
        compareTypes = (function (compare_types) {
          return function (a, b) {

            return compare_types.call(a, b);
          };
        }(compareTypes));
      }
    } else {                                                    // ... or with a required [[Comparable]] module at least
                                                                // one created [Comparable] was applied onto each object
      compareTypes = (function (is_function, compare_types) {   // before applying of an created [Iterable] onto those
        return function (a, b) {                                // objects could take place.

//        return (is_function(a.compareTo) ? a.compareTo(b) : UNDEFINED_VALUE);
//      //return (is_callable(a.compareTo) ? a.compareTo(b) : UNDEFINED_VALUE);

          return (is_function(a.compareTo) ? a.compareTo(b) : compare_types(a, b));
        //return (is_callable(a.compareTo) ? a.compareTo(b) : compare_types(a, b));
        };
      }(isFunction, defaultCompareTypes));

    //compareTypes = defaultCompareTypes; // a possible fallback solution as well.
    }

    GetNextTrait = (isFunction(getNext) && /*((isReturnTuple && function () {
      this.next = function () {
        var
          curr = this,

          next = getNext.call(curr),
          comparison = (next !== UNDEFINED_VALUE) ? compareTypes(curr, next) : next,

          secondNext = ((comparison !== UNDEFINED_VALUE) && (comparison <= 0)) ? getNext.call(curr) : UNDEFINED_VALUE,
          secondComparison = (secondNext !== UNDEFINED_VALUE) ? compareTypes(curr, secondNext) : secondNext
        ;
        (this.previous && this.previous()); // does conceptually work till here. but then it relies on the
                                            // counter operation that's availability can not be assured.
        return (
          ((comparison !== UNDEFINED_VALUE) && (comparison <= 0))
          ? {

            value : next,
            done  : ((secondComparison === UNDEFINED_VALUE) || (secondComparison > 0))

          } : stopIteration()
        );
      };
    }) ||*/ function () {
      this.next = function () {
        var
          curr = this,
          next = getNext.call(curr),

          comparison = compareTypes(curr, next)
        ;
        return ((next !== UNDEFINED_VALUE) && (comparison !== UNDEFINED_VALUE) && (comparison <= 0)) ? next : stopIteration();
      };
      return this;
    })/*)*/ || noop;

    GetPreviousTrait = (isFunction(getPrevious) && function () {
      this.previous = function () {
        var
          curr = this,
          prev = getPrevious.call(curr),

          comparison = compareTypes(curr, prev)
        ;
        return ((prev !== UNDEFINED_VALUE) && (comparison !== UNDEFINED_VALUE) && (comparison >= 0)) ? prev : stopIteration();
      };
      return this;
    }) || noop;


    IterableTrait = function () {
      var iterable =/* ((typeof this != "object") && (typeof this != "function") && global.Object(this)) ||*/ this;

      GetNextTrait.call(iterable);
      GetPreviousTrait.call(iterable);

      return iterable;
    };


    return IterableTrait;
  };


  Factory = {

    "create"          : createIterable,
    "isStopIteration" : isStopIteration
  };


  return Factory;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          - 1.153 byte
composable("entities.IterableFactory",function(e,f,b){var c=b.introspective;e=b.helpers;var l=c.getClassSignature,h=c.isFunction,c=e.createClassSignaturePattern,m=e.compareTypes,k=b.methods.noop,g=b.objects.regX.compile(c("StopIteration")).test(l(f.StopIteration))&&f.StopIteration||function(){var a=function(){};a.prototype={};a.prototype.toString=function(){return"[object StopIteration]"};a.prototype.valueOf=function(){return this};return new a}(),n=function(){throw g;},p=function(){};return{create:function(a){a="object"==typeof a&&a||{};var b,c,e=a.next,f=a.previous,d=a.compare,g=!!a.isThrowStopIteration&&n||p;h(d)?1==d.length&&(d=function(a){return function(q,b){return a.call(q,b)}}(d)):d=function(a,b){return function(c,d){return a(c.compareTo)?c.compareTo(d):b(c,d)}}(h,m);b=h(e)&&function(){this.next=function(){var a=e.call(this),b=d(this,a);return void 0!==a&&void 0!==b&&0>=b?a:g()};return this}||k;c=h(f)&&function(){this.previous=function(){var a=f.call(this),b=d(this,a);return void 0!==a&&void 0!==b&&0<=b?a:g()};return this}||k;return function(){b.call(this);c.call(this);return this}},isStopIteration:function(a){return a===g}}});


*/
