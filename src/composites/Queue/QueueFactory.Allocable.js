

composable("composites.QueueFactory_Allocable", function (require, global, environment) {


  "use strict";


  var
    Observable  = require("components.Observable_SignalsAndSlots"),
    Allocable   = require("components.Allocable"),

    Allocable_all         = require("components.Allocable_all"),
    Enumerable_first_last = require("components.Enumerable_first_last"),


    Factory,


    Queue,
    createQueue,

    queueList = []
  ;


  Queue = function () { // [http://de.wikipedia.org/wiki/Datenstruktur#Warteschlange]
    /**
     *  implementing the [[Queue]] constructor.
     */
    var
      queue = this,

      list = [],

      onEnqueue = function (type) {
        queue.dispatchEvent({target: queue, type: "enqueue", item: type/*, even more key:value pairs */});
      },
      onDequeue = function (type) {
        queue.dispatchEvent({target: queue, type: "dequeue", item: type/*, even more key:value pairs */});
      },
      onEmpty = function () {
        queue.dispatchEvent({target: queue, type: "empty"/*, even more key:value pairs */});
      }
    ;
    Observable.call(queue);
    Allocable.call(queue, list);

    queue.constructor = Queue;

    queue.enqueue = function (type/*:[Object]*/) { /* enqueue | line up | [Array.push] */

      list.push(type);
      onEnqueue(type);
    };
    queue.dequeue = function () { /* dequeue | line up | [Array.shift] */

      var type = list.shift();
      if (list.length <= 0) {

        onEmpty();
      }
      onDequeue(type);

      return type;
    };
  };
  createQueue = function () {

    queueList.push(new Queue);
    return queueList.last();
  };


  Factory = {

    create: createQueue
  };
  Enumerable_first_last.call(queueList);
  Allocable_all.call(Factory, queueList);


  return Factory;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   609 byte
composable("composites.QueueFactory_Allocable",function(a){var g=a("components.Observable_SignalsAndSlots"),h=a("components.Allocable"),j=a("components.Allocable_all");a=a("components.Enumerable_first_last");var e,f,d=[];f=function(){var b=this,a=[];g.call(b);h.call(b,a);b.constructor=f;b.enqueue=function(c){a.push(c);b.dispatchEvent({target:b,type:"enqueue",item:c})};b.dequeue=function(){var c=a.shift();0>=a.length&&b.dispatchEvent({target:b,type:"empty"});b.dispatchEvent({target:b,type:"dequeue",item:c});return c}};e={create:function(){d.push(new f);return d.last()}};a.call(d);j.call(e,d);return e});


*/
