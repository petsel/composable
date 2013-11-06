

composable("components.Observable_SignalsAndSlots_ChannelsAndTopics", function (require, global, internalBaseEnvironment) {


  "use strict"; // @TODO - merge the final change into other branches of this type detection module.


  /*
   *  all additional functionality this module needs
   *  is covered already by the [internalBaseEnvironment]
   *  of the "composable :: core"
   */


  var
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

          }).pathList.reverse().forEach(function (eventType/*, idx, list*/) {

            var
              listenerList = (eventType.listenerList && array_from(eventType.listenerList)),
              len = ((listenerList && listenerList.length) || 0),
              idx = -1
            ;
            if (len >= 1) {
              while (++idx < len) {

                listenerList[idx].handleEvent(evt);
              }
              successfully = true;
            }
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


- Simple          - 2.111 byte
composable("components.Observable_SignalsAndSlots_ChannelsAndTopics",function(k,g,l){k=g.Array;var t=g.Math.random,s=l.introspective,m=s.isFunction,e=s.isString,u=m(k.from)&&k.from||l.helpers.makeArray,v=g.uuid&&m(g.uuid.v4)&&g.uuid.v4||function a(f){return f?(f^16*t()>>f/4).toString(16):([1E7]+-1E3+-4E3+-8E3+-1E11).replace(/[018]/g,a)},n=function(a){return a.replace(w.compile([x,"g"].join("")),".")},w=l.objects.regX,x="[.:]+",y=function(a,f){this.target=a;this.type=f;this.uuid=v()},r=function(a,f,e){var b=new y(a,f);this.constructor=r;this.handleEvent=function(a){a&&"object"==typeof a?(a.target=b.target,a.type=b.type,a.uuid=b.uuid):a={target:b.target,type:b.type,uuid:b.uuid};e(a)};this.getType=function(){return f};this.getHandler=function(){return e}};return function(a){a="object"==typeof a&&a||{};var f={},g="addEventListener",b="removeEventListener",p="hasEventListener",q="dispatchEvent",k=function(d,a){var c=f[n(d)],h=!1;if(c){var e=c.handlerList,c=c.listenerList,b=e.indexOf(a);0<=b&&(e.splice(b,1),c.splice(b,1),h=!0)}return h},l=function(d,a){return(f[d=n(d)]||!1)&&0<=f[d].handlerList.indexOf(a)},g=e(a[g])?a[g]:g,b=e(a[b])?a[b]:b,p=e(a[p])?a[p]:p,q=e(a[q])?a[q]:q;this[g]=function(d,a){var c;if(d&&e(d)&&(d=n(d))&&m(a)){var h=f[d];c=new r(this,d,a);if(h){var b=h.handlerList,h=h.listenerList,g=b.indexOf(a);-1==g?(b.push(c.getHandler()),h.push(c)):c=h[g]}else h=f[d]={},h.handlerList=[c.getHandler()],h.listenerList=[c]}return c};this[b]=function(d,a){return e(d)&&m(a)&&k(d,a)||d instanceof r&&k(d.getType(),d.getHandler())||!1};this[p]=function(a,b){return e(a)&&m(b)&&l(a,b)||a instanceof r&&l(a.getType(),a.getHandler())||!1};this[q]=function(a){var b=!1,c=a&&"object"==typeof a&&e(a.type)&&(a.type=n(a.type))||e(a)&&(a={type:a})&&(a.type=n(a.type))||"";(c=c&&f[c])&&c.split(".").reduce(function(a,b){a.partials.push(b);a.pathList.push(a.partials.join("."));return a},{partials:[],pathList:[]}).pathList.reverse().forEach(function(c){var e=(c=c.listenerList&&u(c.listenerList))&&c.length||0,f=-1;if(1<=e){for(;++f<e;)c[f].handleEvent(a);b=!0}});return b};""in this&&delete this[""]}});


*/
