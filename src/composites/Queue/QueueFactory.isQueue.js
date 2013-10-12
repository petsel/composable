

composable("composites.QueueFactory_isQueue", function (require, global, internalBaseEnvironment) {


  "use strict";


  var
    Observable  = require("components.Observable_SignalsAndSlots"),
    Allocable   = require("components.Allocable"),

    isFunction  = internalBaseEnvironment.introspective.isFunction,


    Factory,
    Queue,

    isQueue,
    createQueue,


    onEnqueue = function (queue, type) {
      queue.dispatchEvent({type: "enqueue", item: type}); // object based for passing additional properties.
    },
    onDequeue = function (queue, type) {
      queue.dispatchEvent({type: "dequeue", item: type}); // object based for passing additional properties.
    }/*,
    onEmpty = function (queue, type) {
      queue.dispatchEvent({type: "empty", item: type});   // object based for passing additional properties.
    }*/,
    onEmpty = function (queue) {
      queue.dispatchEvent("empty");                       // string type flag alternatively to {type: "empty"}.
    },


    methodAPIKeys = (function (obj) {
      Observable.call(obj, {hasEventListener: ""}); // - applying the Observable Mixin API without [hasEventListener].
      Allocable.call(obj);                          // - applying the privileged Allocable Trait.
      return global.Object.keys(obj).filter(function (key/*, idx, list*/) {
        return isFunction(obj[key]);
      });
    }({
      enqueue: "",
      dequeue: ""
    })),

    doesMatchMethodAPI = function (type) {
      return methodAPIKeys.every(function (key/*, idx, list*/) {

        return isFunction(type[key]);
      });
    }
  ;


  Queue = function () { // [http://de.wikipedia.org/wiki/Datenstruktur#Warteschlange]
    /**
     *  implementing the [[Queue]] constructor.
     */
    var
      queue = this,
      list = []
    ;
    queue.constructor = Queue;

    queue.enqueue = function (type/*:[Object]*/) { /* enqueue | line up | [Array.push] */

      list.push(type);
      onEnqueue(queue, type);

      return type;
    };
    queue.dequeue = function () { /* dequeue | line up | [Array.shift] */

      var type = list.shift();
      onDequeue(queue, type);

      (list.length || onEmpty(queue));

      return type;
    };

    Observable.call(queue, {hasEventListener: ""}); // - applying the Observable Mixin API without [hasEventListener].
    Allocable.call(queue, list);                    // - applying the privileged Allocable Trait.
  };


  isQueue = function (type) {
    return !!(type && ((type instanceof Queue) || doesMatchMethodAPI(type)));
  };
  createQueue = function () {
    return (new Queue);
  };


  Factory = {

    isQueue : isQueue,
    create  : createQueue
  };


  return Factory;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   766 byte
composable("composites.QueueFactory_isQueue",function(e,k,l){var f=e("components.Observable_SignalsAndSlots"),g=e("components.Allocable"),h=l.introspective.isFunction,d,m=function(a){f.call(a,{hasEventListener:""});g.call(a);return k.Object.keys(a).filter(function(b){return h(a[b])})}({enqueue:"",dequeue:""}),n=function(a){return m.every(function(b){return h(a[b])})};d=function(){var a=this,b=[];a.constructor=d;a.enqueue=function(c){b.push(c);a.dispatchEvent({type:"enqueue",item:c});return c};a.dequeue=function(){var c=b.shift();a.dispatchEvent({type:"dequeue",item:c});b.length||a.dispatchEvent("empty");return c};f.call(a,{hasEventListener:""});g.call(a,b)};return{isQueue:function(a){return!(!a||!(a instanceof d||n(a)))},create:function(){return new d}}});


*/
