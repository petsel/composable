

composable("components.Observable_SignalsAndSlots", function (require, global, internalBaseEnvironment) {


  "use strict"; // @TODO - merge the final change into other branches of this type detection module.


  /*
   *  all additional functionality this module needs
   *  is covered already by the [internalBaseEnvironment]
   *  of the "composable :: core"
   */


  var
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
      event.constructor = Event;

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
        defaultEvent = new Event(target, type), // default [Event] object
        listener = this
      ;
      listener.constructor = EventListener;

      listener.handleEvent = function (evt/*:[string|String|Event-like-Object]*/) { /*:void*/
        if (evt && (typeof evt == "object")) {

          evt.target    = defaultEvent.target;    //  - stay strictly typesafe - [dispatchEvent] never will take
          evt.type      = defaultEvent.type;      //    control of [defaultEvent] e.g trying to delegate another
          evt.uuid      = defaultEvent.uuid;      //    [target] by manipulating its event-object-like argument.
        //evt.timeStamp = defaultEvent.timeStamp; //

        } else {

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


      addEventListenerAlias = isString(config[addEventListenerAlias]) ? config[addEventListenerAlias] : addEventListenerAlias;
      removeEventListenerAlias = isString(config[removeEventListenerAlias]) ? config[removeEventListenerAlias] : removeEventListenerAlias;
      hasEventListenerAlias = isString(config[hasEventListenerAlias]) ? config[hasEventListenerAlias] : hasEventListenerAlias;
      dispatchEventAlias = isString(config[dispatchEventAlias]) ? config[dispatchEventAlias] : dispatchEventAlias;


      observable[addEventListenerAlias] = function (type/*:[string|String]*/, handler/*:[Function]*/) { /*:[EventListener|undefined]*/
        var reference;
      //if (type && isString(type) && isCallable(handler)) {
        if (type && isString(type) && isFunction(handler)) {
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
          type = ((evt && (typeof evt == "object") && isString(evt.type) && evt.type) || (isString(evt) && evt)),
          event = (type && eventMap[type])
        ;
        if (event) {
          var
          //handlers = [],                                //  - additional list ...

          //listeners = event.listeners,
            listeners = (event.listeners && array_from(event.listeners)),
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


      /*
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


- Simple          - 1.802 byte
composable("components.Observable_SignalsAndSlots",function(k,d,q){k=d.Array;var t=d.Math.random,r=q.introspective,l=r.isFunction,g=r.isString,u=l(k.from)&&k.from||q.helpers.makeArray,v=d.uuid&&l(d.uuid.v4)&&d.uuid.v4||function a(e){return e?(e^16*t()>>e/4).toString(16):([1E7]+-1E3+-4E3+-8E3+-1E11).replace(/[018]/g,a)},s=function(a,e){this.constructor=s;this.target=a;this.type=e;this.uuid=v()},p=function(a,e,g){var c=new s(a,e);this.constructor=p;this.handleEvent=function(a){a&&"object"==typeof a?(a.target=c.target,a.type=c.type,a.uuid=c.uuid):a={target:c.target,type:c.type,uuid:c.uuid};g(a)};this.getType=function(){return e};this.getHandler=function(){return g}};return function(a){a="object"==typeof a&&a||{};var e={},d="addEventListener",c="removeEventListener",m="hasEventListener",n="dispatchEvent",k=function(h,a){var b=e[h],f=!1;if(b){var g=b.handlers,b=b.listeners,c=g.indexOf(a);0<=c&&(g.splice(c,1),b.splice(c,1),f=!0)}return f},d=g(a[d])?a[d]:d,c=g(a[c])?a[c]:c,m=g(a[m])?a[m]:m,n=g(a[n])?a[n]:n;this[d]=function(h,a){var b;if(h&&g(h)&&l(a)){var f=e[h];b=new p(this,h,a);if(f){var c=f.handlers,f=f.listeners,d=c.indexOf(a);-1==d?(c.push(b.getHandler()),f.push(b)):b=f[d]}else f=e[h]={},f.handlers=[b.getHandler()],f.listeners=[b]}return b};this[c]=function(a,c){return g(a)&&l(c)&&k(a,c)||a instanceof p&&k(a.getType(),a.getHandler())||!1};this[m]=function(a,c){var b;if(!(b=g(a)&&l(c)&&(e[a]||!1)&&0<=e[a].handlers.indexOf(c))){if(b=a instanceof p){b=a.getType();var f=a.getHandler();b=(e[b]||!1)&&0<=e[b].handlers.indexOf(f)}b=b||!1}return b};this[n]=function(a){var c=!1,b=a&&"object"==typeof a&&g(a.type)&&a.type||g(a)&&a;if(b=b&&e[b]){var f=(b=b.listeners&&u(b.listeners))&&b.length||0,d=-1;if(1<=f){for(;++d<f;)b[d].handleEvent(a);c=!0}}return c};""in this&&delete this[""]}});


*/
