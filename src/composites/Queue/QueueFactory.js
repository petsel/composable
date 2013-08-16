

composable("composites.QueueFactory", function (require, global, environment) {


  "use strict";


  var
    Observable  = require("components.Observable_SignalsAndSlots"),
    Allocable   = require("components.Allocable"),


    Factory,


    Queue,
    createQueue
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

    return (new Queue);
  };


  Factory = {

    create: createQueue
  };


  return Factory;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   472 byte
composable("composites.QueueFactory",function(e){var f=e("components.Observable_SignalsAndSlots"),g=e("components.Allocable"),d;d=function(){var a=this,c=[];f.call(a);g.call(a,c);a.constructor=d;a.enqueue=function(b){c.push(b);a.dispatchEvent({target:a,type:"enqueue",item:b})};a.dequeue=function(){var b=c.shift();0>=c.length&&a.dispatchEvent({target:a,type:"empty"});a.dispatchEvent({target:a,type:"dequeue",item:b});return b}};return{create:function(){return new d}}});


*/
