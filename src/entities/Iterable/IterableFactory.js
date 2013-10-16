

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

    GetNextTrait = (isFunction(getNext) && (function (get_next, compare_types, stop_iteration, UNDEFINED_VALUE) {
      return/* (isReturnTuple &&*/ function () {/*

        this.next = function () {
          var
            curr = this,

            next = get_next.call(curr),
            comparison = (next !== UNDEFINED_VALUE) ? compare_types(curr, next) : next,

            secondNext = ((comparison !== UNDEFINED_VALUE) && (comparison <= 0)) ? get_next.call(curr) : UNDEFINED_VALUE,
            secondComparison = (secondNext !== UNDEFINED_VALUE) ? compare_types(curr, secondNext) : secondNext
          ;
          (this.previous && this.previous()); // does conceptually work till here. but then it relies on the
                                              // counter operation that's availability can not be assured.
          return (
            ((comparison !== UNDEFINED_VALUE) && (comparison <= 0))
            ? {

              value : next,
              done  : ((secondComparison === UNDEFINED_VALUE) || (secondComparison > 0))

            } : stop_iteration()
          );
        };
      }) || function () {*/

        this.next = function () {
          var
            curr = this,
            next = get_next.call(curr),

            comparison = compare_types(curr, next)
          ;
          return ((next !== UNDEFINED_VALUE) && (comparison !== UNDEFINED_VALUE) && (comparison <= 0)) ? next : stop_iteration();
        };
      };
    }(getNext, compareTypes, stopIteration))) || noop;

    GetPreviousTrait = (isFunction(getPrevious) && (function (get_previous, compare_types, stop_iteration, UNDEFINED_VALUE) {
      return function () {

        this.previous = function () {

          var
            curr = this,
            prev = get_previous.call(curr),

            comparison = compare_types(curr, prev)
          ;
          return ((prev !== UNDEFINED_VALUE) && (comparison !== UNDEFINED_VALUE) && (comparison >= 0)) ? prev : stop_iteration();
        };
      };
    }(getPrevious, compareTypes, stopIteration))) || noop;


    IterableTrait = (function (GetNextTrait, GetPreviousTrait) {
      return function () {

        GetNextTrait.call(this);
        GetPreviousTrait.call(this);
      };
    }(GetNextTrait, GetPreviousTrait));


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


- Simple          - 1.194 byte
composable("entities.IterableFactory",function(m,n,f){var k=f.introspective;m=f.helpers;var r=k.getClassSignature,l=k.isFunction,k=m.createClassSignaturePattern,s=m.compareTypes,p=f.methods.noop,q=f.objects.regX.compile(k("StopIteration")).test(r(n.StopIteration))&&n.StopIteration||function(){var a=function(){};a.prototype={};a.prototype.toString=function(){return"[object StopIteration]"};a.prototype.valueOf=function(){return this};return new a}(),t=function(){throw q;},u=function(){};return{create:function(a){a="object"==typeof a&&a||{};var c,d;c=a.next;d=a.previous;var b=a.compare;a=!!a.isThrowStopIteration&&t||u;l(b)?1==b.length&&(b=function(a){return function(g,e){return a.call(g,e)}}(b)):b=function(a,g){return function(e,h){return a(e.compareTo)?e.compareTo(h):g(e,h)}}(l,s);c=l(c)&&function(a,g,e,h){return function(){this.next=function(){var b=a.call(this),c=g(this,b);return b!==h&&c!==h&&0>=c?b:e()}}}(c,b,a)||p;d=l(d)&&function(a,b,e,c){return function(){this.previous=function(){var d=a.call(this),f=b(this,d);return d!==c&&f!==c&&0<=f?d:e()}}}(d,b,a)||p;return function(a,b){return function(){a.call(this);b.call(this)}}(c,d)},isStopIteration:function(a){return a===q}}});


*/
