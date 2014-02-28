

composable("composites.DataNodeFactory", function (require, global/*, internalBaseEnvironment*/) {


  "use strict";


  var
    environment = require("environment_extended_introspective_core"),


    Observable  = require("components.Observable_SignalsAndSlots"),
    Propagable  = require("components.Propagable_EventProxy"),

  //Storable    = require("components.LocallyStorable"),
  //Allocable   = require("components.Allocable"),


    env_introspective = environment.introspective,


    isValue         = env_introspective.isValue,
    isString        = env_introspective.isString,
    isFunction      = env_introspective.isFunction,
    isObjectObject  = env_introspective.isObjectObject,


    object_keys = global.Object.keys,


    Factory,
    DataNode,

    isNodeConfig,
    isDataNode,
    createDataNode,


    methodAPIKeys = (function (obj) {
      Observable.call(obj, {hasEventListener: ""}); // - applying the Observable Mixin API without [hasEventListener].
    //Storable.call(obj);                           // - applying the Storable Privileged Trait API.
      return object_keys(obj).filter(function (key/*, idx, list*/) {
        return isFunction(obj[key]);
      });
    }({
      setAttr     : "",
      getAttr     : "",
      removeAttr  : "",
      setChild    : "",
      getChild    : "",
      removeChild : "",
      getAttrKeys : "",
      getAttrList : "",
      getChildKeys: "",
      getChildList: "",
      getParent   : ""
    })),

    doesMatchMethodAPI = function (type) {
      return methodAPIKeys.every(function (key/*, idx, list*/) {

        return isFunction(type[key]);
      });
    },


    isValidNodeConfigStructure = function (config) {
      var
        isValidStructure = false,
        type,

        keys = object_keys(config),
        amountOfKeys = keys.length
      ;
      if (("attributes" in config) && (amountOfKeys == 1)) {
        isValidStructure = (

          isObjectObject(type = config["attributes"])
          && object_keys(type).every(function (key/*, idx, list*/) {

            return isValue(type[key]);
          })
        );
      } else if (("children" in config) && (amountOfKeys == 1)) {
        isValidStructure = (

          isObjectObject(type = config["children"])
          && object_keys(type).every(function (key/*, idx, list*/) {

            return isNodeConfig(type[key]);
          })
        );
      } else if (("attributes" in config) && ("children" in config) && (amountOfKeys == 2)) {
        isValidStructure = (

          isObjectObject(type = config["attributes"])
          && object_keys(type).every(function (key/*, idx, list*/) {

            return isValue(type[key]);

          }) && isObjectObject(type = config["children"])
          && object_keys(type).every(function (key/*, idx, list*/) {

            return isNodeConfig(type[key]);
          })
        );
      } else {
        isValidStructure = keys.every(function (key/*, idx, list*/) {
          var type = config[key];

//console.log(keys, key, isValue(type), isNodeConfig(type));
          return (isValue(type) || isNodeConfig(type));
        });
      }
//console.log(isValidStructure, config);

      return isValidStructure;
    },
    recursivelyParseNodeConfig = function (config, parentNode) {
      var
        dataNode = (new DataNode(parentNode)),
        type,

        keys = object_keys(config),
        amountOfKeys = keys.length
      ;
      if (("attributes" in config) && (amountOfKeys == 1)) {
        type = config["attributes"];

        object_keys(type).forEach(function (key) {
          dataNode.setAttr(

            key,
            type.key,
            true

          ); // third [isPreventDispatch] parameter set to true does prevent event dispatching.
        });
      } else if (("children" in config) && (amountOfKeys == 1)) {
        type = config["children"];

        object_keys(type).forEach(function (key) {
          dataNode.setChild(

            key,
            recursivelyParseNodeConfig(type.key, dataNode),
            true

          ); // third [isPreventDispatch] parameter set to true does prevent event dispatching.
        });
      } else if (("attributes" in config) && ("children" in config) && (amountOfKeys == 2)) {
        type = config["attributes"];

        object_keys(type).forEach(function (key) {
          dataNode.setAttr(

            key,
            type.key,
            true

          ); // third [isPreventDispatch] parameter set to true does prevent event dispatching.
        });
        type = config["children"];

        object_keys(type).forEach(function (key) {
          dataNode.setChild(

            key,
            recursivelyParseNodeConfig(type.key, dataNode),
            true

          ); // third [isPreventDispatch] parameter set to true does prevent event dispatching.
        });
      } else {
        keys.forEach(function (key/*, idx, list*/) {
          var type = config[key];

          if (isValue(type)) {
            dataNode.setAttr(

              key,
              type,
              true

            ); // third [isPreventDispatch] parameter set to true does prevent event dispatching.
          } else {
//console.log(key, type, dataNode, recursivelyParseNodeConfig(type, dataNode));
            dataNode.setChild(

              key,
              recursivelyParseNodeConfig(type, dataNode),
              true

            ); // third [isPreventDispatch] parameter set to true does prevent event dispatching.
          }
        });
      }

      return dataNode;
    },


    sanitizeKey = function (key) {
      return ((isString(key) && key.trim()) || "");
    },
    triggerEventPropagation = function (evt, targetNode, parentNode) {
      parentNode && Propagable.call(evt);

      targetNode.dispatchEvent(evt);

      while (parentNode && !evt.isStopPropagation()) {

        evt.currentTarget = parentNode;
        parentNode.dispatchEvent(evt);

        parentNode = parentNode.getParent();
        !parentNode && evt.stopPropagation();
      }
    }
  ;


  DataNode = function (parentNode) {
    /**
     *  implementing the [[DataNode]] constructor.
     */
    var
      node = this,

      attributeMap = {},
      childNodeMap = {}
    ;
    node.constructor = DataNode;

    node.setAttr = function (key, attrValue, isPreventDispatch) {
      var
        isDispatch,

        returnValue = (

          (isDispatch = (key = sanitizeKey(key)) || void 0) /* : undefined|key:string */

          && (isDispatch = !isObjectObject(attrValue))      /* : false|true */
          && (attributeMap[key] = attrValue)                /* : attrValue  */

        )/* : undefined|false|attrValue */
      ;
      if (!isPreventDispatch && !!isDispatch && (returnValue === attrValue)) {
        triggerEventPropagation({

          type          : "attributechange",
          currentTarget : node,
          key           : key,
          value         : attrValue

        }, this, parentNode);

        triggerEventPropagation({

          type          : "change",
          specificType  : "attributechange",
          currentTarget : node,
          key           : key,
          value         : attrValue

        }, this, parentNode);
      }
      return returnValue; // : undefined|false|attrValue
    };
    node.getAttr = function (key) {

      return attributeMap[sanitizeKey(key)]; // : undefined|attrValue
    };
    node.removeAttr = function (key, isPreventDispatch) {
      var
        attrValue = attributeMap[key = sanitizeKey(key)], // : undefined|attrValue
        isDispatch = (key in attributeMap)
      ;
      delete attributeMap[key];

      if (!isPreventDispatch && isDispatch) {
        triggerEventPropagation({

          type          : "attributeremove",
          currentTarget : node,
          key           : key,
          value         : attrValue

        }, this, parentNode);

        triggerEventPropagation({

          type          : "change",
          specificType  : "attributeremove",
          currentTarget : node,
          key           : key,
          value         : attrValue

        }, this, parentNode);
      }
      return attrValue; // : undefined|attrValue
    };

    node.setChild = function (key, childNode, isPreventDispatch) {
      var
        isDispatch,

        returnValue = (

          (isDispatch = (key = sanitizeKey(key)) || void 0) /* : undefined|key:string */

          && (isDispatch = isDataNode(childNode))           /* : false|true */
          && (childNodeMap[key] = childNode)                /* : [DataNode] */

        )/* : undefined|false|[DataNode] */
      ;
      if (!isPreventDispatch && !!isDispatch && (returnValue === childNode)) {
        triggerEventPropagation({

          type          : "childchange",
          currentTarget : node,
          key           : key,
          value         : childNode

        }, this, parentNode);

        triggerEventPropagation({

          type          : "change",
          specificType  : "childchange",
          currentTarget : node,
          key           : key,
          value         : childNode

        }, this, parentNode);
      }
      return returnValue; // : undefined|false|[DataNode
    };
    node.getChild = function (key) {

      return childNodeMap[sanitizeKey(key)]; // : undefined|[DataNode]
    };
    node.removeChild = function (key, isPreventDispatch) {
      var
        childNode = childNodeMap[key = sanitizeKey(key)], // : undefined|[DataNode]
        isDispatch = (key in childNodeMap)
      ;
      delete childNodeMap[key];

      if (!isPreventDispatch && isDispatch) {
        triggerEventPropagation({

          type          : "childremove",
          currentTarget : node,
          key           : key,
          value         : childNode

        }, this, parentNode);

        triggerEventPropagation({

          type          : "change",
          specificType  : "childremove",
          currentTarget : node,
          key           : key,
          value         : childNode

        }, this, parentNode);
      }
      return childNode; // : undefined|[DataNode]
    };

    node.getAttrKeys = function () {
      return object_keys(attributeMap);
    };
    node.getAttrList = function () {
      return object_keys(attributeMap).map(function (key/*, idx, list*/) {
        return {
          key   : key,
          value : attributeMap[key]
        }
      });
    };

    node.getChildKeys = function () {
      return object_keys(childNodeMap);
    };
    node.getChildList = function () {
      return object_keys(childNodeMap).map(function (key/*, idx, list*/) {
        return {
          key   : key,
          value : childNodeMap[key]
        }
      });
    };

    node.getParent = function () {
      return parentNode; // : null|[DataNode]
    };

    Observable.call(node, {hasEventListener: ""}); // - applying the Observable Mixin API without [hasEventListener].
  };


  isNodeConfig = function (type) {
    return (isObjectObject(type) && !isDataNode(type) && isValidNodeConfigStructure(type));
  };
  isDataNode = function (type) {
    return !!(type && ((type instanceof DataNode) || doesMatchMethodAPI(type)));
  };
  createDataNode = function (config, parentNode) {
    return recursivelyParseNodeConfig(

      ((isNodeConfig(config) && config) || {}),
      ((isDataNode(parentNode) && parentNode) || null)
    );
  };


  Factory = {

    isNodeConfig  : isNodeConfig,
    isDataNode    : isDataNode,
    create        : createDataNode
  };


  return Factory;


});



/*

var config = {

  name        : "Hans",
  lastName    : "Sachs",
  dateOfBirth : "1972-07-28",

  firstChild : {

    name        : "Otto",
    lastName    : "Sachs",
    dateOfBirth : "2002-05-02"
  },
  secondChild : {

    name        : "Mina",
    lastName    : "Sachs",
    dateOfBirth : "1998-11-07"
  },
  spouse : {

    name        : "Erna",
    lastName    : "Sachs",
    dateOfBirth : "1971-11-21",

    firstChild : {

      name        : "Otto",
      lastName    : "Sachs",
      dateOfBirth : "2002-05-02"
    },
    secondChild : {

      name        : "Mina",
      lastName    : "Sachs",
      dateOfBirth : "1998-11-07"
    },
    spouse : {

      name        : "Hans",
      lastName    : "Sachs",
      dateOfBirth : "1972-07-28",

      firstChild : {

        name        : "Otto",
        lastName    : "Sachs",
        dateOfBirth : "2002-05-02"
      },
      secondChild : {

        name        : "Mina",
        lastName    : "Sachs",
        dateOfBirth : "1998-11-07"
      },
      spouse : {

        name        : "Erna",
        lastName    : "Sachs",
        dateOfBirth : "1971-11-21",

        firstChild : {

          name        : "Otto",
          lastName    : "Sachs",
          dateOfBirth : "2002-05-02"
        },
        secondChild : {

          name        : "Mina",
          lastName    : "Sachs",
          dateOfBirth : "1998-11-07"
        },
        spouse : {

          name        : "Hans",
          lastName    : "Sachs",
          dateOfBirth : "1972-07-28"
        }
      }
    }
  }
};
var DNF = composable.require("composites.DataNodeFactory");
DNF.isNodeConfig(config);

*/



/*


  [http://closure-compiler.appspot.com/home]


- Simple          - 3.293 byte
composable("composites.DataNodeFactory",function(t,x){var g=t("environment_extended_introspective_core"),v=t("components.Observable_SignalsAndSlots"),y=t("components.Propagable_EventProxy"),g=g.introspective,q=g.isValue,z=g.isString,w=g.isFunction,l=g.isObjectObject,f=x.Object.keys,r,m,p,A=function(a){v.call(a,{hasEventListener:""});return f(a).filter(function(c){return w(a[c])})}({setAttr:"",getAttr:"",removeAttr:"",setChild:"",getChild:"",removeChild:"",getAttrKeys:"",getAttrList:"",getChildKeys:"",getChildList:"",getParent:""}),B=function(a){return A.every(function(c){return w(a[c])})},C=function(a){var c=!1,b,c=f(a),d=c.length;return c="attributes"in a&&1==d?l(b=a.attributes)&&f(b).every(function(a){return q(b[a])}):"children"in a&&1==d?l(b=a.children)&&f(b).every(function(a){return m(b[a])}):"attributes"in a&&"children"in a&&2==d?l(b=a.attributes)&&f(b).every(function(a){return q(b[a])})&&l(b=a.children)&&f(b).every(function(a){return m(b[a])}):c.every(function(e){e=a[e];return q(e)||m(e)})},s=function(a,c){var b=new r(c),d,e=f(a),u=e.length;"attributes"in a&&1==u?(d=a.attributes,f(d).forEach(function(a){b.setAttr(a,d.key,!0)})):"children"in a&&1==u?(d=a.children,f(d).forEach(function(a){b.setChild(a,s(d.key,b),!0)})):"attributes"in a&&"children"in a&&2==u?(d=a.attributes,f(d).forEach(function(a){b.setAttr(a,d.key,!0)}),d=a.children,f(d).forEach(function(a){b.setChild(a,s(d.key,b),!0)})):e.forEach(function(e){var c=a[e];q(c)?b.setAttr(e,c,!0):b.setChild(e,s(c,b),!0)});return b},n=function(a){return z(a)&&a.trim()||""},k=function(a,c,b){b&&y.call(a);for(c.dispatchEvent(a);b&&!a.isStopPropagation();)a.currentTarget=b,b.dispatchEvent(a),b=b.getParent(),!b&&a.stopPropagation()};r=function(a){var c=this,b={},d={};c.constructor=r;c.setAttr=function(e,d,f){var h,g=(h=(e=n(e))||void 0)&&(h=!l(d))&&(b[e]=d);!f&&h&&g===d&&(k({type:"attributechange",currentTarget:c,key:e,value:d},this,a),k({type:"change",specificType:"attributechange",currentTarget:c,key:e,value:d},this,a));return g};c.getAttr=function(a){return b[n(a)]};c.removeAttr=function(e,d){var f=b[e=n(e)],h=e in b;delete b[e];!d&&h&&(k({type:"attributeremove",currentTarget:c,key:e,value:f},this,a),k({type:"change",specificType:"attributeremove",currentTarget:c,key:e,value:f},this,a));return f};c.setChild=function(e,b,f){var h,g=(h=(e=n(e))||void 0)&&(h=p(b))&&(d[e]=b);!f&&h&&g===b&&(k({type:"childchange",currentTarget:c,key:e,value:b},this,a),k({type:"change",specificType:"childchange",currentTarget:c,key:e,value:b},this,a));return g};c.getChild=function(a){return d[n(a)]};c.removeChild=function(b,f){var g=d[b=n(b)],h=b in d;delete d[b];!f&&h&&(k({type:"childremove",currentTarget:c,key:b,value:g},this,a),k({type:"change",specificType:"childremove",currentTarget:c,key:b,value:g},this,a));return g};c.getAttrKeys=function(){return f(b)};c.getAttrList=function(){return f(b).map(function(a){return{key:a,value:b[a]}})};c.getChildKeys=function(){return f(d)};c.getChildList=function(){return f(d).map(function(a){return{key:a,value:d[a]}})};c.getParent=function(){return a};v.call(c,{hasEventListener:""})};m=function(a){return l(a)&&!p(a)&&C(a)};p=function(a){return!(!a||!(a instanceof r||B(a)))};return{isNodeConfig:m,isDataNode:p,create:function(a,c){return s(m(a)&&a||{},p(c)&&c||null)}}});


*/
