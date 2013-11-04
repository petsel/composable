

composable("components.LocallyStorable", function (require, global, internalBaseEnvironment) {


  "use strict";


  var
    Trait,


    UNDEFINED_VALUE,
    NULL_VALUE = null,


    fct_empty         = internalBaseEnvironment.methods.noop,
    fct_return_null   = function () {return null;},
    fct_return_true   = function () {return true;},
    fct_return_false  = function () {return false;},


    object_keys = global.Object.keys,


    isAssigned  = function (obj) {
      return ((obj !== NULL_VALUE) && (obj !== UNDEFINED_VALUE));
    },
    isString    = internalBaseEnvironment.introspective.isString,
    isFunction  = internalBaseEnvironment.introspective.isFunction,


    json_parse = (function (obj) {
      return (
        (isFunction(obj.stringify) && isFunction(obj.parse) && obj.parse)
        || (isFunction(obj.parseJSON) && obj.parseJSON)
        || function () {return {};}
      );
    }(global.JSON || global.jQuery)),

    json_stringify = (function (obj) {
      return (
        (isFunction(obj.parse) && isFunction(obj.stringify) && obj.stringify)
        || function () {return "";}
      );
    }(global.JSON)),

    rearrangeKeyOrderOfDataValue = function (dataValue) {
      var dataObj = json_parse(dataValue);

      return json_stringify(
        object_keys(
          dataObj
        ).sort(function (a, b) {

          return ((a < b) ? -1 : ((a > b) ? 1 : 0));

        }).reduce(function (collector, key) {

        //collector[key] = rearrangeKeyOrderOfDataValue(dataObj[key]);  // - test/refactor this recursive approach that ...
          collector[key] = dataObj[key];                                //   ... also could work on nested (not only flat) structures.
          return collector;

        }, {})
      );
    },

    isLocalStorage = function (obj) {
      return (obj && isFunction(obj.setItem) && isFunction(obj.getItem) && isFunction(obj.removeItem) && isFunction(obj.clear) && isAssigned(obj.key));
    },
    storage = isLocalStorage(global.localStorage) ? global.localStorage : UNDEFINED_VALUE,

    clearData,
    putData,
    getData,
    doesDataExist,
    doesDataHasChanged,
    doesDataHasNotChanged
  ;
  if (storage) {

    clearData = function (data) {
      return storage.removeItem(data.key);
    };

    putData = function (data) {
      return storage.setItem(data.key, data.value);
    };

    getData = function (data) {
      return storage.getItem(data.key);
    };

    doesDataExist = function (data) {
      return isString(getData(data));
    };

    doesDataHasChanged = function (data) {
      var storageValue = getData(data) || "{}";
      return ((storageValue != data.value) && (rearrangeKeyOrderOfDataValue(storageValue) != rearrangeKeyOrderOfDataValue(data.value)));
    };

    doesDataHasNotChanged = function (data) {
      var storageValue = getData(data) || "{}";
      return ((storageValue == data.value) || (rearrangeKeyOrderOfDataValue(storageValue) == rearrangeKeyOrderOfDataValue(data.value)));
    };

  } else {
    clearData = fct_return_null;
    putData = fct_empty;
  //getData = fct_return_null;
    doesDataExist = fct_return_true;
    doesDataHasChanged = fct_return_true;
    doesDataHasNotChanged = fct_return_false;
  }


  Trait = function (getStorableData) { // Privileged Trait.
    /**
     *
     *  - the getter for a models storable (sub)data structure needs
     *    to be injected at apply time.
     *
     *  implementing the privileged "LocallyStorable" Trait Module.
     *
     *  - actually it looks like a Trait.
     *    but since - with [getStorableData] - it encloses *state*
     *    that does not get mutated by this implementation it should
     *    be referred to as privileged Trait.
     */
    var modelComposite = this;

    modelComposite.removeDataFromStorage  = function () {return clearData(getStorableData());};
    modelComposite.putDataInStorage       = function () {return putData(getStorableData());};
  //modelComposite.getStorableData        = function () {return getStorableData()};           // - [getStorableData] is to be used for debugging only.
  //modelComposite.getDataFromStorage     = function () {return getData(getStorableData());}; // - currently there is no use case for [getDataFromStorage].
    modelComposite.doesDataExistInStorage = function () {return doesDataExist(getStorableData());};
    modelComposite.doesStoredDataDiffer   = function () {return doesDataHasChanged(getStorableData());};
    modelComposite.doesStoredDataMatch    = function () {return doesDataHasNotChanged(getStorableData());};

  //Trait.list.push(modelComposite);  // for debugging only.

    return modelComposite;
  };
//Trait.list = [];                    // to be used for debugging only.


  return Trait;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          - 1.395 byte
composable("components.LocallyStorable",function(p,b,g){p=g.methods.noop;var q=function(){return null},r=function(){return!0},s=function(){return!1},t=b.Object.keys,u=g.introspective.isString,c=g.introspective.isFunction,v=function(a){return c(a.stringify)&&c(a.parse)&&a.parse||c(a.parseJSON)&&a.parseJSON||function(){return{}}}(b.JSON||b.jQuery),w=function(a){return c(a.parse)&&c(a.stringify)&&a.stringify||function(){return""}}(b.JSON),d=function(a){var b=v(a);return w(t(b).sort(function(a,b){return a<b?-1:a>b?1:0}).reduce(function(a,c){a[c]=b[c];return a},{}))},e=b.localStorage&&c(b.localStorage.setItem)&&c(b.localStorage.getItem)&&c(b.localStorage.removeItem)&&c(b.localStorage.clear)&&null!==b.localStorage.key&&void 0!==b.localStorage.key?b.localStorage:void 0,h,k,f,l,m,n;e?(h=function(a){return e.removeItem(a.key)},k=function(a){return e.setItem(a.key,a.value)},f=function(a){return e.getItem(a.key)},l=function(a){return u(f(a))},m=function(a){var b=f(a)||"{}";return b!=a.value&&d(b)!=d(a.value)},n=function(a){var b=f(a)||"{}";return b==a.value||d(b)==d(a.value)}):(h=q,k=p,m=l=r,n=s);return function(a){this.removeDataFromStorage=function(){return h(a())};this.putDataInStorage=function(){return k(a())};this.doesDataExistInStorage=function(){return l(a())};this.doesStoredDataDiffer=function(){return m(a())};this.doesStoredDataMatch=function(){return n(a())};return this}});


*/
