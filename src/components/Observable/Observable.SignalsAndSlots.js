

composable("components.Observable_SignalsAndSlots", function (require, global, environment) {


  "use strict";


//require("components.Introspective_isFunction_isCallable");  // implicitly by "composites.Array_make"
  require("composites.Array_make");


  var
    Array       = global.Array,
    Date        = global.Date,


    env_introspective = environment.introspective,


    isFunction  = env_introspective.isFunction,
    isCallable  = env_introspective.isCallable,
    isString    = env_introspective.isString,


//  makeArray = (function (proto_slice) {
//    return function (list) {
//
//      return proto_slice.call(list);
//    };
//  }(global.Array.prototype.slice))

    makeArray = (isFunction(Array.make) && Array.make) || environment.helpers.makeArray
  ;


  var
    Event = function (target/*:[EventTarget(observable)]*/, type/*:[string|String]*/) {
      /**
       *  implementing the [[Event]] constructor.
       */
      var
        event = this
      ;
      event.constructor = Event;

      event.target    = target;
      event.type      = type;
    //event.uuid      = uuid.create();
      event.timeStamp = (new Date);
    },


    EventListener = function (target/*:[EventTarget(observable)]*/, type/*:[string|String]*/, handler/*:[Function]*/) {
      /**
       *  SLOT(s)
       *  =======
       *  implementing the [[EventListener]] constructor.
       */
      var
        defaultEvent = new Event(target, type), // default [Event] object
        listener = this
      ;
      listener.constructor = EventListener;

      listener.handleEvent = function (evt/*:[string|String|Event-like-Object]*/) { /*:void*/
        if (evt && (typeof evt == "object")) {

          evt.target    = defaultEvent.target;    //  - stay strictly typesafe - [dispatchEvent] never will take
          evt.type      = defaultEvent.type;      //    control of [defaultEvent] e.g trying to delegate another
        //evt.uuid      = defaultEvent.uuid;      //    [target] by manipulating its event-object-like argument.
          evt.timeStamp = defaultEvent.timeStamp; //

        } else {

          evt = {                                 //  - create a [defaultEvent] copy.
            target      : defaultEvent.target,
            type        : defaultEvent.type,
          //uuid        : defaultEvent.uuid,
            timeStamp   : defaultEvent.timeStamp
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


        eventMap = {},

                                                            //      - alternative wording taken from the wild ...
        addEventListenerAlias     = "addEventListener",     //  e.g. "on" ............ "bind" ...... "addObserver"
        removeEventListenerAlias  = "removeEventListener",  //  e.g. "off" ........... "unbind" .... "removeObserver"
        hasEventListenerAlias     = "hasEventListener",     //  e.g. "hasListener" ... "isBound" ... "hasObserver"
        dispatchEventAlias        = "dispatchEvent",        //  e.g. "trigger" ....... "emit" ...... "emitEvent"


        removeEventListener = function (type/*:[string|String]*/, handler/*:[Function]*/) { /*:[true|false]*/
          var
            event = eventMap[type],
            successfully = false
          ;
          if (event) {
            var
              handlers = event.handlers,
              listeners = event.listeners,
              idx = handlers.indexOf(handler)
            ;
            if (idx >= 0) {
              handlers.splice(idx, 1);
              listeners.splice(idx, 1);
              successfully = true;
            }
          }
          return successfully;
        },
        hasEventListener = function (type/*:[string|String]*/, handler/*:[Function]*/) { /*:[true|false]*/
          return ((eventMap[type] || false) && (eventMap[type].handlers.indexOf(handler) >= 0));
        }
      ;


      addEventListenerAlias = ((isString(config[addEventListenerAlias]) && config[addEventListenerAlias]) || addEventListenerAlias);
      removeEventListenerAlias = ((isString(config[removeEventListenerAlias]) && config[removeEventListenerAlias]) || removeEventListenerAlias);
      hasEventListenerAlias = ((isString(config[hasEventListenerAlias]) && config[hasEventListenerAlias]) || hasEventListenerAlias);
      dispatchEventAlias = ((isString(config[dispatchEventAlias]) && config[dispatchEventAlias]) || dispatchEventAlias);


      observable[addEventListenerAlias] = function (type/*:[string|String]*/, handler/*:[Function]*/) { /*:[EventListener|undefined]*/
        var reference;
        if (type && isString(type) && isCallable(handler)) {
          var
            event = eventMap[type],
            listener = new EventListener(this, type, handler)
          ;
          if (event) {
            var
              handlers = event.handlers,
              listeners = event.listeners,
              idx = handlers.indexOf(handler)
            ;
            if (idx == -1) {
              handlers.push(listener.getHandler());   // in order to store a proper handler reference that later on could be compared to.
              listeners.push(listener);

              reference = listener;
            } else {
              reference = listeners[idx];
            }
          } else {
            event = eventMap[type] = {};
            event.handlers = [listener.getHandler()]; // in order to store a proper handler reference that later on could be compared to.
            event.listeners = [listener];

            reference = listener;
          }
        }
        return reference;
      };


      observable[removeEventListenerAlias] = function (typeOrListener/*:[string|String|EventListener]*/, handler/*:[Function]*/) { /*:[true|false]*/
        return ((

          isString(typeOrListener)
          && isCallable(handler)
          && removeEventListener(typeOrListener, handler)

        ) || (

          (typeOrListener instanceof EventListener)
          && removeEventListener(typeOrListener.getType(), typeOrListener.getHandler())

        ) || false);
      };


      observable[hasEventListenerAlias] = function (typeOrListener/*:[string|String|EventListener]*/, handler/*:[Function]*/) { /*:[true|false]*/
        return ((

          isString(typeOrListener)
          && isCallable(handler)
          && hasEventListener(typeOrListener, handler)

        ) || (

          (typeOrListener instanceof EventListener)
          && hasEventListener(typeOrListener.getType(), typeOrListener.getHandler())

        ) || false);
      };


      observable[dispatchEventAlias] = function (evt/*:[string|String|Event-like-Object]*/) { /*:[true|false]*/
        var
          successfully = false,
          type = ((evt && (typeof evt == "object") && isString(evt.type) && evt.type) || (isString(evt) && evt)),
          event = (type && eventMap[type])
        ;
        if (event) {
          var
          //handlers = [],                                //  - additional list ...

          //listeners = event.listeners,
            listeners = (event.listeners && makeArray(event.listeners)),
            len = ((listeners && listeners.length) || 0),
            idx = -1
          ;
          if (len >= 1) {
          //while (++idx < len) {                         //    ... filled on the fly with
          //                                              //    all current available
          //  handlers[idx] = listeners[idx].handleEvent; //    handler references.
          ////handlers.push(listeners[idx].handleEvent);  //
          //}                                             //  - thus preventing race condition errors that most probably might
          //idx = -1;                                     //    occur when the [listeners] array mutates whilst iterating it.
            while (++idx < len) {

            //handlers[idx](evt);                         //  - sticking to the current above described solution.
              listeners[idx].handleEvent(evt);            //  - solution that has been used before without the
            }                                             //    additional *caching* of handler references.
            successfully = true;
          }
        }
        return successfully;
      };
    }
  ;


  return EventTargetMixin; // [EventTargetMixin] will be exposed as "Observable_SignalsAndSlots" Mixin Module.


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          - 1.712 byte
composable("components.Observable_SignalsAndSlots",function(h,c,p){h("composites.Array_make");h=c.Array;var r=c.Date;c=p.introspective;var s=c.isFunction,n=c.isCallable,f=c.isString,t=s(h.make)&&h.make||p.helpers.makeArray,q=function(a,g){this.constructor=q;this.target=a;this.type=g;this.timeStamp=new r},m=function(a,g,f){var d=new q(a,g);this.constructor=m;this.handleEvent=function(a){a&&"object"==typeof a?(a.target=d.target,a.type=d.type,a.timeStamp=d.timeStamp):a={target:d.target,type:d.type,timeStamp:d.timeStamp};f(a)};this.getType=function(){return g};this.getHandler=function(){return f}};return function(a){a="object"==typeof a&&a||{};var g={},c="addEventListener",d="removeEventListener",k="hasEventListener",l="dispatchEvent",h=function(j,a){var b=g[j],e=!1;if(b){var c=b.handlers,b=b.listeners,f=c.indexOf(a);0<=f&&(c.splice(f,1),b.splice(f,1),e=!0)}return e},c=f(a[c])&&a[c]||c,d=f(a[d])&&a[d]||d,k=f(a[k])&&a[k]||k,l=f(a[l])&&a[l]||l;this[c]=function(j,a){var b;if(j&&f(j)&&n(a)){var e=g[j];b=new m(this,j,a);if(e){var c=e.handlers,e=e.listeners,d=c.indexOf(a);-1==d?(c.push(b.getHandler()),e.push(b)):b=e[d]}else e=g[j]={},e.handlers=[b.getHandler()],e.listeners=[b]}return b};this[d]=function(a,c){return f(a)&&n(c)&&h(a,c)||a instanceof m&&h(a.getType(),a.getHandler())||!1};this[k]=function(a,c){var b;if(!(b=f(a)&&n(c)&&(g[a]||!1)&&0<=g[a].handlers.indexOf(c))){if(b=a instanceof m){b=a.getType();var e=a.getHandler();b=(g[b]||!1)&&0<=g[b].handlers.indexOf(e)}b=b||!1}return b};this[l]=function(a){var c=!1,b=a&&"object"==typeof a&&f(a.type)&&a.type||f(a)&&a;if(b=b&&g[b]){var e=(b=b.listeners&&t(b.listeners))&&b.length||0,d=-1;if(1<=e){for(;++d<e;)b[d].handleEvent(a);c=!0}}return c}}});


*/
