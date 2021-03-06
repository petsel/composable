

composable("composites.QueueFactory_Allocable", function (require/*, global, internalBaseEnvironment*/) {


  "use strict";


  var
    Observable  = require("components.Observable_SignalsAndSlots"),
    Allocable   = require("components.Allocable"),

    Allocable_all         = require("components.Allocable_all"),
    Enumerable_first_last = require("components.Enumerable_first_last"),


    Factory,
    Queue,

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


  createQueue = function () {

    queueList.push(new Queue);
    return queueList.last();
  };


  Factory = {

    create  : createQueue
  };
  Enumerable_first_last.call(queueList);
  Allocable_all.call(Factory, queueList);


  return Factory;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   603 byte
composable("composites.QueueFactory_Allocable",function(a){var g=a("components.Observable_SignalsAndSlots"),h=a("components.Allocable"),k=a("components.Allocable_all");a=a("components.Enumerable_first_last");var e,f,d=[];f=function(){var b=this,a=[];b.constructor=f;b.enqueue=function(c){a.push(c);b.dispatchEvent({type:"enqueue",item:c});return c};b.dequeue=function(){var c=a.shift();b.dispatchEvent({type:"dequeue",item:c});a.length||b.dispatchEvent("empty");return c};g.call(b,{hasEventListener:""});h.call(b,a)};e={create:function(){d.push(new f);return d.last()}};a.call(d);k.call(e,d);return e});


*/
