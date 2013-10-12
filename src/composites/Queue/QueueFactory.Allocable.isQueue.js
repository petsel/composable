

composable("composites.QueueFactory_Allocable_isQueue", function (require, global, internalBaseEnvironment) {


  "use strict";


  var
    Observable  = require("components.Observable_SignalsAndSlots"),
    Allocable   = require("components.Allocable"),

    Allocable_all         = require("components.Allocable_all"),
    Enumerable_first_last = require("components.Enumerable_first_last"),

    isFunction  = internalBaseEnvironment.introspective.isFunction,


    Factory,
    Queue,

    isQueue,
    createQueue,

    queueList = [],


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

    queueList.push(new Queue);
    return queueList.last();
  };


  Factory = {

    isQueue : isQueue,
    create  : createQueue
  };
  Enumerable_first_last.call(queueList);
  Allocable_all.call(Factory, queueList);


  return Factory;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   901 byte
composable("composites.QueueFactory_Allocable_isQueue",function(b,l,d){var g=b("components.Observable_SignalsAndSlots"),h=b("components.Allocable"),m=b("components.Allocable_all");b=b("components.Enumerable_first_last");var k=d.introspective.isFunction,e,f=[],n=function(a){g.call(a,{hasEventListener:""});h.call(a);return l.Object.keys(a).filter(function(c){return k(a[c])})}({enqueue:"",dequeue:""}),p=function(a){return n.every(function(c){return k(a[c])})};e=function(){var a=this,c=[];a.constructor=e;a.enqueue=function(b){c.push(b);a.dispatchEvent({type:"enqueue",item:b});return b};a.dequeue=function(){var b=c.shift();a.dispatchEvent({type:"dequeue",item:b});c.length||a.dispatchEvent("empty");return b};g.call(a,{hasEventListener:""});h.call(a,c)};d={isQueue:function(a){return!(!a||!(a instanceof e||p(a)))},create:function(){f.push(new e);return f.last()}};b.call(f);m.call(d,f);return d});


*/
