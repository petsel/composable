

composable("entities.IterableFactory", function (require, global, environment) {


  "use strict";


  var
    Factory,


    env_introspective = environment.introspective,
    env_helpers       = environment.helpers,


    getClassSignature = env_introspective.getClassSignature,
    isFunction        = env_introspective.isFunction,

    createClassSignaturePattern = env_helpers.createClassSignaturePattern,
    defaultCompareTypes         = env_helpers.compareTypes,

    noop = environment.methods.noop,
    regX = environment.objects.regX,

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
//console.log("+++ compareTypes +++", compareTypes);

    GetNextTrait = (isFunction(getNext) && (function (get_next, compare_types, stop_iteration, UNDEFINED_VALUE) {
      return function () {

        this.next = function () {

          var
            curr = this,
            next = get_next.call(curr),

            comparison = compare_types(curr, next)
          ;
//console.log("next", [curr, next, comparison, ((next !== UNDEFINED_VALUE) && (comparison !== UNDEFINED_VALUE) && (comparison <= 0))]);

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
//console.log("previous", [curr, prev, comparison, ((prev !== UNDEFINED_VALUE) && (comparison !== UNDEFINED_VALUE) && (comparison >= 0))]);

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


- Simple          - 1.083 byte
composable("entities.IterableFactory",function(f,b,c){var d=c.introspective;f=c.helpers;var j=d.getClassSignature,g=d.isFunction,d=f.createClassSignaturePattern,l=f.compareTypes,k=c.methods.noop;if(!(b=c.objects.regX.compile(d("StopIteration")).test(j(b.StopIteration))&&b.StopIteration))b=function(){},b.prototype={},b.prototype.toString=function(){return"[object StopIteration]"},b.prototype.valueOf=function(){return this},b=new b;var h=b,m=function(){throw h;},n=function(){};return{create:function(a){a="object"==typeof a&&a||{};var b,c=a.next,d=a.previous,e=a.compare,f=!!a.isThrowStopIteration&&m||n;if(g(e)){if(1==e.length)var h=e,e=function(a,b){return h.call(a,b)}}else e=function(a,b){return g(a.compareTo)?a.compareTo(b):l(a,b)};if(a=g(c)){var j=e;a=function(){this.next=function(){var a=c.call(this),b=j(this,a);return void 0!==a&&void 0!==b&&0>=b?a:f()}}}b=a||k;if(a=g(d)){var p=e;a=function(){this.previous=function(){var a=d.call(this),b=p(this,a);return void 0!==a&&void 0!==b&&0<=b?a:f()}}}var q=a||k;return function(){b.call(this);q.call(this)}},isStopIteration:function(a){return a===h}}});


*/
