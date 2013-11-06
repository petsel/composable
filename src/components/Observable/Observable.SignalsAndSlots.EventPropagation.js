

composable("components.Observable_SignalsAndSlots_EventPropagation", function (require, global, internalBaseEnvironment) {


  "use strict"; // @TODO - merge the final change into other branches of this type detection module.


  var
    Propagable  = require("components.Propagable_EventProxy"),


  //Object      = global.Object,
    Array       = global.Array,
  //Date        = global.Date,

    math_random = global.Math.random,


    env_introspective = internalBaseEnvironment.introspective,


    isFunction  = env_introspective.isFunction,
  //isCallable  = env_introspective.isCallable, // can not be used for testing a callbacks "callability" within an event system since this test actually tries to invoke its test candidate.
    isString    = env_introspective.isString,


//  array_from = (function (proto_slice) {
//    return function (list) {
//
//      return proto_slice.call(list);
//    };
//  }(global.Array.prototype.slice))

    array_from = (isFunction(Array.from) && Array.from) || internalBaseEnvironment.helpers.makeArray,


    createId = (
      /*  [https://github.com/broofa/node-uuid] - Robert Kieffer  */
      (global.uuid && isFunction(global.uuid.v4) && global.uuid.v4)

      /*  [https://gist.github.com/jed/982883]  - Jed Schmidt     */
      || function b(a){return a?(a^math_random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,b)}
    )
  ;


  var
    Event = function (target/*:[EventTarget(observable)]*/, type/*:[string|String]*/) {
      /**
       *  implementing the [[Event]] constructor.
       */
      var
        event = this
      ;
    //event.constructor = Event; // Object;

      event.target    = target;
      event.type      = type;
      event.uuid      = createId();
    //event.timeStamp = (new Date);
    },


    EventListener = function (target/*:[EventTarget(observable)]*/, type/*:[string|String]*/, handler/*:[Function]*/) {
      /**
       *  SLOT(s)
       *  =======
       *  implementing the [[EventListener]] constructor.
       */
      var
        defaultEvent = new Event(target, type),   // default [Event] object
        listener = this
      ;
      listener.constructor = EventListener;       // Object;

      listener.handleEvent = function (evt/*:[string|String|Event-like-Object]*/) { /*:void*/
        if (evt && (typeof evt == "object")) {

          evt.target    = defaultEvent.target;    //  - stay strictly typesafe - [dispatchEvent] never will take
          evt.type      = defaultEvent.type;      //    control of [defaultEvent] e.g trying to delegate another
          evt.uuid      = defaultEvent.uuid;      //    [target] by manipulating its event-object-like argument.
        //evt.timeStamp = defaultEvent.timeStamp; //

        } else { // since [dispatchEvent] already prevents stepping into the "else" clause it only will be kept as fallback in case of direct [listener.handleEvent] calls.

          evt = {                                 //  - create a [defaultEvent] copy.
            target      : defaultEvent.target,
            type        : defaultEvent.type,
            uuid        : defaultEvent.uuid
          //timeStamp   : defaultEvent.timeStamp
          };

          Propagable.call(evt); // enable Event Propagation.
        }
        handler(evt);
      };
      listener.getType = function () { /*:[string]*/
        return type;
      };
      listener.getHandler = function () { /*:[Function]*/
        return handler;
      };
    },


    EventTargetMixin = function (config) {
      /**
       *  SIGNAL(s)
       *  =========
       *  implementing the "Observable_SignalsAndSlots" Mixin Module.
       */
      config = (((typeof config == "object") && config) || {}); //  - an optional configuration object that
                                                                //    maps custom method names to each object
                                                                //    this [Observable] Mixin gets applied to.
      var
        observable/*target*/ = this,


        eventTypeMap = {},

                                                            //      - alternative wording taken from the wild ...
        addEventListenerAlias     = "addEventListener",     //  e.g. "on" ............ "bind" ...... "addObserver"
        removeEventListenerAlias  = "removeEventListener",  //  e.g. "off" ........... "unbind" .... "removeObserver"
        hasEventListenerAlias     = "hasEventListener",     //  e.g. "hasListener" ... "isBound" ... "hasObserver"
        dispatchEventAlias        = "dispatchEvent",        //  e.g. "trigger" ....... "emit" ...... "emitEvent"


        removeEventListener = function (type/*:[string|String]*/, handler/*:[Function]*/) { /*:[true|false]*/
          var
            eventType = eventTypeMap[type],
            successfully = false
          ;
          if (eventType) {
            var
              handlerList = eventType.handlerList,
              listenerList = eventType.listenerList,
              idx = handlerList.indexOf(handler)
            ;
            if (idx >= 0) {
              handlerList.splice(idx, 1);
              listenerList.splice(idx, 1);
              successfully = true;
            }
          }
          return successfully;
        },
        hasEventListener = function (type/*:[string|String]*/, handler/*:[Function]*/) { /*:[true|false]*/
          return ((eventTypeMap[type] || false) && (eventTypeMap[type].handlerList.indexOf(handler) >= 0));
        }
      ;


      addEventListenerAlias = isString(config[addEventListenerAlias]) ? config[addEventListenerAlias] : addEventListenerAlias;
      removeEventListenerAlias = isString(config[removeEventListenerAlias]) ? config[removeEventListenerAlias] : removeEventListenerAlias;
      hasEventListenerAlias = isString(config[hasEventListenerAlias]) ? config[hasEventListenerAlias] : hasEventListenerAlias;
      dispatchEventAlias = isString(config[dispatchEventAlias]) ? config[dispatchEventAlias] : dispatchEventAlias;


      observable[addEventListenerAlias] = function (type/*:[string|String]*/, handler/*:[Function]*/) { /*:[EventListener|undefined]*/
        var reference;
      //if (type && isString(type) && isCallable(handler)) {
        if (type && isString(type) && isFunction(handler)) {
          var
            eventType = eventTypeMap[type],
            listener = new EventListener(this, type, handler)
          ;
          if (eventType) {
            var
              handlerList = eventType.handlerList,
              listenerList = eventType.listenerList,
              idx = handlerList.indexOf(handler)
            ;
            if (idx == -1) {
              handlerList.push(listener.getHandler());        // in order to store a proper handler reference that later could be compared to.
              listenerList.push(listener);

              reference = listener;
            } else {
              reference = listenerList[idx];
            }
          } else {
            eventType = eventTypeMap[type] = {};
            eventType.handlerList = [listener.getHandler()];  // in order to store a proper handler reference that later could be compared to.
            eventType.listenerList = [listener];

            reference = listener;
          }
        }
        return reference;
      };


      observable[removeEventListenerAlias] = function (typeOrListener/*:[string|String|EventListener]*/, handler/*:[Function]*/) { /*:[true|false]*/
        return ((

          isString(typeOrListener)
        //&& isCallable(handler)
          && isFunction(handler)
          && removeEventListener(typeOrListener, handler)

        ) || (

          (typeOrListener instanceof EventListener)
          && removeEventListener(typeOrListener.getType(), typeOrListener.getHandler())

        ) || false);
      };


      observable[hasEventListenerAlias] = function (typeOrListener/*:[string|String|EventListener]*/, handler/*:[Function]*/) { /*:[true|false]*/
        return ((

          isString(typeOrListener)
        //&& isCallable(handler)
          && isFunction(handler)
          && hasEventListener(typeOrListener, handler)

        ) || (

          (typeOrListener instanceof EventListener)
          && hasEventListener(typeOrListener.getType(), typeOrListener.getHandler())

        ) || false);
      };


      observable[dispatchEventAlias] = function (evt/*:[string|String|Event-like-Object]*/) { /*:[true|false]*/
        var
          successfully = false,
          type = (

            (evt && (typeof evt == "object") && isString(evt.type) && evt.type)

            || (isString(evt) && (evt = {type: evt}) && evt.type)
            || ""
          ),
          eventType = (type && eventTypeMap[type])
        ;
        if (eventType) {

          Propagable.call(evt); // enable Event Propagation.

          var
            listenerList = (eventType.listenerList && array_from(eventType.listenerList)),
            len = ((listenerList && listenerList.length) || 0),
            idx = -1
          ;
          if (len >= 1) {
            while (!evt.isStopPropagation() && (++idx < len)) {

              listenerList[idx].handleEvent(evt);
            }
            successfully = true;
          }
        }
        return successfully;
      };


      /**
       *  in order to delete properties that were omitted with
       *  the optional configuration object that will be used
       *  for altering the naming of the [Observable] API methods.
       */
      if ("" in observable) {
        delete observable[""];
      }
    //("" in observable) && (delete observable[""])
    }
  ;


  return EventTargetMixin; // [EventTargetMixin] will be exposed as "Observable_SignalsAndSlots" Mixin Module.


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          - 1.943 byte
composable("components.Observable_SignalsAndSlots_EventPropagation",function(h,d,q){var r=h("components.Propagable_EventProxy");h=d.Array;var t=d.Math.random,s=q.introspective,l=s.isFunction,g=s.isString,u=l(h.from)&&h.from||q.helpers.makeArray,v=d.uuid&&l(d.uuid.v4)&&d.uuid.v4||function a(e){return e?(e^16*t()>>e/4).toString(16):([1E7]+-1E3+-4E3+-8E3+-1E11).replace(/[018]/g,a)},w=function(a,e){this.target=a;this.type=e;this.uuid=v()},p=function(a,e,g){var c=new w(a,e);this.constructor=p;this.handleEvent=function(a){a&&"object"==typeof a?(a.target=c.target,a.type=c.type,a.uuid=c.uuid):(a={target:c.target,type:c.type,uuid:c.uuid},r.call(a));g(a)};this.getType=function(){return e};this.getHandler=function(){return g}};return function(a){a="object"==typeof a&&a||{};var e={},d="addEventListener",c="removeEventListener",m="hasEventListener",n="dispatchEvent",h=function(k,a){var b=e[k],f=!1;if(b){var g=b.handlerList,b=b.listenerList,c=g.indexOf(a);0<=c&&(g.splice(c,1),b.splice(c,1),f=!0)}return f},d=g(a[d])?a[d]:d,c=g(a[c])?a[c]:c,m=g(a[m])?a[m]:m,n=g(a[n])?a[n]:n;this[d]=function(k,a){var b;if(k&&g(k)&&l(a)){var f=e[k];b=new p(this,k,a);if(f){var c=f.handlerList,f=f.listenerList,d=c.indexOf(a);-1==d?(c.push(b.getHandler()),f.push(b)):b=f[d]}else f=e[k]={},f.handlerList=[b.getHandler()],f.listenerList=[b]}return b};this[c]=function(a,c){return g(a)&&l(c)&&h(a,c)||a instanceof p&&h(a.getType(),a.getHandler())||!1};this[m]=function(a,c){var b;if(!(b=g(a)&&l(c)&&(e[a]||!1)&&0<=e[a].handlerList.indexOf(c))){if(b=a instanceof p){b=a.getType();var f=a.getHandler();b=(e[b]||!1)&&0<=e[b].handlerList.indexOf(f)}b=b||!1}return b};this[n]=function(a){var c=!1,b=a&&"object"==typeof a&&g(a.type)&&a.type||g(a)&&(a={type:a})&&a.type||"";if(b=b&&e[b]){r.call(a);var f=(b=b.listenerList&&u(b.listenerList))&&b.length||0,d=-1;if(1<=f){for(;!a.isStopPropagation()&&++d<f;)b[d].handleEvent(a);c=!0}}return c};""in this&&delete this[""]}});


*/
