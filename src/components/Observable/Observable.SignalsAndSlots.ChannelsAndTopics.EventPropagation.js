

composable("components.Observable_SignalsAndSlots_ChannelsAndTopics_EventPropagation", function (require, global, internalBaseEnvironment) {


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
    ),


    sanitizeEventType = function (type) {
      return type.replace(regX.compile([REG_X_PATTERN_NAME_SPACE_SEPARATOR, "g"].join("")), ".");
    },
    regX = internalBaseEnvironment.objects.regX,
    REG_X_PATTERN_NAME_SPACE_SEPARATOR = "[.:]+"
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
            eventType = eventTypeMap[sanitizeEventType(type)],
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
          return ((eventTypeMap[type = sanitizeEventType(type)] || false) && (eventTypeMap[type].handlerList.indexOf(handler) >= 0));
        }
      ;


      addEventListenerAlias = isString(config[addEventListenerAlias]) ? config[addEventListenerAlias] : addEventListenerAlias;
      removeEventListenerAlias = isString(config[removeEventListenerAlias]) ? config[removeEventListenerAlias] : removeEventListenerAlias;
      hasEventListenerAlias = isString(config[hasEventListenerAlias]) ? config[hasEventListenerAlias] : hasEventListenerAlias;
      dispatchEventAlias = isString(config[dispatchEventAlias]) ? config[dispatchEventAlias] : dispatchEventAlias;


      observable[addEventListenerAlias] = function (type/*:[string|String]*/, handler/*:[Function]*/) { /*:[EventListener|undefined]*/
        var reference;
      //if (type && isString(type) && (type = sanitizeEventType(type)) && isCallable(handler)) {
        if (type && isString(type) && (type = sanitizeEventType(type)) && isFunction(handler)) {
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

            (evt && (typeof evt == "object") && isString(evt.type) && (evt.type = sanitizeEventType(evt.type)))

            || (isString(evt) && (evt = {type: evt}) && (evt.type = sanitizeEventType(evt.type)))
            || ""
          ),
          eventType = (type && eventTypeMap[type])
        ;
        if (eventType) {

          Propagable.call(evt); // enable Event Propagation.

          /**
           *  divide [eventType] into Channel and Topics - e.g. "channel.topic_A.topic_B.topic_C" into path partials:
           *
           *  "channel"
           *  "channel.topic_A"
           *  "channel.topic_A.topic_B"
           *  "channel.topic_A.topic_B.topic_C"
           */
          eventType.split(".").reduce(function (collector, partial) {

            collector.partials.push(partial);
            collector.pathList.push(collector.partials.join("."));

            return collector;
          }, {
            partials : [],
            pathList : []

          }).pathList.reverse().some(function (eventType/*, idx, list*/) {

            if (!evt.isStopPropagation()) {
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
            return evt.isStopPropagation();
          });
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


- Simple          - 2.271 byte
composable("components.Observable_SignalsAndSlots_ChannelsAndTopics_EventPropagation",function(k,g,l){var s=k("components.Propagable_EventProxy");k=g.Array;var u=g.Math.random,t=l.introspective,m=t.isFunction,e=t.isString,v=m(k.from)&&k.from||l.helpers.makeArray,w=g.uuid&&m(g.uuid.v4)&&g.uuid.v4||function a(f){return f?(f^16*u()>>f/4).toString(16):([1E7]+-1E3+-4E3+-8E3+-1E11).replace(/[018]/g,a)},n=function(a){return a.replace(x.compile([y,"g"].join("")),".")},x=l.objects.regX,y="[.:]+",z=function(a,f){this.target=a;this.type=f;this.uuid=w()},r=function(a,f,e){var d=new z(a,f);this.constructor=r;this.handleEvent=function(a){a&&"object"==typeof a?(a.target=d.target,a.type=d.type,a.uuid=d.uuid):(a={target:d.target,type:d.type,uuid:d.uuid},s.call(a));e(a)};this.getType=function(){return f};this.getHandler=function(){return e}};return function(a){a="object"==typeof a&&a||{};var f={},g="addEventListener",d="removeEventListener",p="hasEventListener",q="dispatchEvent",k=function(b,a){var c=f[n(b)],h=!1;if(c){var e=c.handlerList,c=c.listenerList,d=e.indexOf(a);0<=d&&(e.splice(d,1),c.splice(d,1),h=!0)}return h},l=function(b,a){return(f[b=n(b)]||!1)&&0<=f[b].handlerList.indexOf(a)},g=e(a[g])?a[g]:g,d=e(a[d])?a[d]:d,p=e(a[p])?a[p]:p,q=e(a[q])?a[q]:q;this[g]=function(b,a){var c;if(b&&e(b)&&(b=n(b))&&m(a)){var h=f[b];c=new r(this,b,a);if(h){var d=h.handlerList,h=h.listenerList,g=d.indexOf(a);-1==g?(d.push(c.getHandler()),h.push(c)):c=h[g]}else h=f[b]={},h.handlerList=[c.getHandler()],h.listenerList=[c]}return c};this[d]=function(b,a){return e(b)&&m(a)&&k(b,a)||b instanceof r&&k(b.getType(),b.getHandler())||!1};this[p]=function(b,a){return e(b)&&m(a)&&l(b,a)||b instanceof r&&l(b.getType(),b.getHandler())||!1};this[q]=function(a){var d=!1,c=a&&"object"==typeof a&&e(a.type)&&(a.type=n(a.type))||e(a)&&(a={type:a})&&(a.type=n(a.type))||"";if(c=c&&f[c])s.call(a),c.split(".").reduce(function(a,b){a.partials.push(b);a.pathList.push(a.partials.join("."));return a},{partials:[],pathList:[]}).pathList.reverse().some(function(c){if(!a.isStopPropagation()){var e=(c=c.listenerList&&v(c.listenerList))&&c.length||0,f=-1;if(1<=e){for(;!a.isStopPropagation()&&++f<e;)c[f].handleEvent(a);d=!0}}return a.isStopPropagation()});return d};""in this&&delete this[""]}});


*/
