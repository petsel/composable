

composable("composites.QueueFactory", function (require/*, global, internalBaseEnvironment*/) {


  "use strict";


  var
    Observable  = require("components.Observable_SignalsAndSlots"),
    Allocable   = require("components.Allocable"),


    Factory,
    Queue,

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
    return (new Queue);
  };


  Factory = {

    create  : createQueue
  };


  return Factory;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   466 byte
composable("composites.QueueFactory",function(e){var f=e("components.Observable_SignalsAndSlots"),g=e("components.Allocable"),d;d=function(){var a=this,c=[];a.constructor=d;a.enqueue=function(b){c.push(b);a.dispatchEvent({type:"enqueue",item:b});return b};a.dequeue=function(){var b=c.shift();a.dispatchEvent({type:"dequeue",item:b});c.length||a.dispatchEvent("empty");return b};f.call(a,{hasEventListener:""});g.call(a,c)};return{create:function(){return new d}}});


*/
