

composable("components.LocallyStorable", function (require, global, internalBaseEnvironment) {


  "use strict";


  var
    Trait,


    UNDEFINED_VALUE,
    NULL_VALUE = null,


    object_keys = global.Object.keys,


    fct_return_false  = function () {return false;},
    fct_return_true   = function () {return true;},
  //fct_return_null   = function () {return null;},

    fct_empty         = internalBaseEnvironment.methods.noop,


    env_introspective = internalBaseEnvironment.introspective,

    isNeitherUndefinedNorNull = function (type) {
      return (type != NULL_VALUE);
    },
    isValidJSON = function (type) {
      var isvalid = false;
      if (isString(type)) {
        try {
          json_parse(type);
          isvalid = true;
        } catch (exc) {}
      }
      return isvalid;
    },
    isString    = env_introspective.isString,
    isFunction  = env_introspective.isFunction,


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

    recursivelyRearrangeKeyOrderOfDataEntries = function (dataObj) {
      return object_keys(

        dataObj

      ).sort(function (a, b) {

        return ((a < b) ? -1 : ((a > b) ? 1 : 0));

      }).reduce(function (collector, key) {

        var dataValue = dataObj[key];
        if (dataValue && (typeof dataValue == "object")) {

          collector[key] = recursivelyRearrangeKeyOrderOfDataEntries(dataValue);
        } else {
          collector[key] = dataValue;
        }
        return collector;

      }, {});
    },
    rearrangeKeyOrderOfDataValue = function (dataValue) {
      return json_stringify(recursivelyRearrangeKeyOrderOfDataEntries(json_parse(dataValue)));
    },

    isValidDataSetGetter = function (getStorableDataSetFromModel, modelComposite) {
      var data;
      return (
        isFunction(getStorableDataSetFromModel)
        && (data = getStorableDataSetFromModel(modelComposite, json_stringify))
        && isString(data.key)
        && isValidJSON(data.value)
      );
    },

    isLocalStorage = function (obj) {
      return (obj && isFunction(obj.setItem) && isFunction(obj.getItem) && isFunction(obj.removeItem) && isFunction(obj.clear) && isNeitherUndefinedNorNull(obj.key));
    },
    isLocallyStorable,

    storage = isLocalStorage(global.localStorage) ? global.localStorage : UNDEFINED_VALUE,

    getValue,
  //getData,
    putData,
    clearData,
    doesDataExist,
    doesDataHasChanged,
    doesDataHasNotChanged/*,
    computeDataDifference*/
  ;
  isLocalStorage = !!storage;

  isLocallyStorable = function () {
    return isLocalStorage;
  };


  if (storage) {

    getValue = function (data) {
      return storage.getItem(data.key);             // [localStorage.getItem] fails with the null value.
    };/*
    getData = function (data) {
      return json_parse(getValue(data));            // >>JSON.parse(null)<< returns the null value again.
    };*/

    putData = function (data) {
      return storage.setItem(data.key, data.value); // does always return the undefined value.
    };

    clearData = function (data) {
      return storage.removeItem(data.key);          // does always return the undefined value.
    };

    doesDataExist = function (data) {
      return isString(getValue(data));
    };

    doesDataHasChanged = function (data) {
      var storedValue = getValue(data) || "{}";
      return ((storedValue != data.value) && (rearrangeKeyOrderOfDataValue(storedValue) != rearrangeKeyOrderOfDataValue(data.value)));
    };

    doesDataHasNotChanged = function (data) {
      var storedValue = getValue(data) || "{}";
      return ((storedValue == data.value) || (rearrangeKeyOrderOfDataValue(storedValue) == rearrangeKeyOrderOfDataValue(data.value)));
    };/*

    computeDataDifference = function (data) {
    };*/

  } else {
  //getValue = fct_return_null;                     // failing default.
  //getData = fct_return_null;                      // failing default.
    putData = fct_empty;
    clearData = fct_empty;
    doesDataExist = fct_return_true;
    doesDataHasChanged = fct_return_true;
    doesDataHasNotChanged = fct_return_false;
  //computeDataDifference = fct_return_null;
  }


  Trait = function (getStorableDataSetFromModel) { // Privileged Trait.
    /**
     *
     *  - The getter for a models storable (sub)data structure needs
     *    to be injected at apply time.
     *
     *  - Instead of storing entirely all of a models data, this injected
     *    function enables the generation of tailored custom data (sub)sets
     *    of a model. Such a function needs to return an object that only
     *    features two keys, [key] that holds a models identifying string
     *    value and [value] that should be assigned with this models
     *    serialized dataset.
     *
     *    getStorableDataSetFromModel = function (model, stringify) {
     *      var
     *        userModel = model.getUserAsModel(),
     *        dateToday = (new Date)
     *      ;
     *      return {
     *        key   : ("birthday_congratulation" + "_" + userModel.get("id")),
     *        value : stringify({
     *          date_today      : [dateToday.getUTCFullYear(), (dateToday.getUTCMonth() + 1), dateToday.getUTCDate()].join("-")
     *        })
     *      };
     *    };
     *
     *
     *  implementing the privileged "LocallyStorable" Trait Module.
     *
     *  - actually it looks like a Trait.
     *    but since - with [getStorableDataSetFromModel] - it encloses *state*
     *    that does not get mutated by this implementation it should
     *    be referred to as privileged Trait.
     */
    var modelComposite = this;
    if (isValidDataSetGetter(getStorableDataSetFromModel, modelComposite)) {

    //modelComposite.getValueFromStorage    = function () {return getValue(getStorableDataSetFromModel(modelComposite, json_stringify));};  // - currently there is no use case for [getValueFromStorage] either.
    //modelComposite.getDataFromStorage     = function () {return getData(getStorableDataSetFromModel(modelComposite, json_stringify));};   // - currently there is no use case for [getDataFromStorage].
    //modelComposite.getStorableData        = function () {return getStorableDataSetFromModel(modelComposite, json_stringify)};             // - [getStorableData] is to be used for debugging only.

      modelComposite.putDataIntoStorage     = function () {return putData(getStorableDataSetFromModel(modelComposite, json_stringify));};
      modelComposite.removeDataFromStorage  = function () {return clearData(getStorableDataSetFromModel(modelComposite, json_stringify));};

      modelComposite.doesDataExistInStorage = function () {return doesDataExist(getStorableDataSetFromModel(modelComposite, json_stringify));};
      modelComposite.doesStoredDataDiffer   = function () {return doesDataHasChanged(getStorableDataSetFromModel(modelComposite, json_stringify));};
      modelComposite.doesStoredDataMatch    = function () {return doesDataHasNotChanged(getStorableDataSetFromModel(modelComposite, json_stringify));};

    //modelComposite.diffAgainstStoredData  = function () {return computeDataDifference(getStorableDataSetFromModel(modelComposite, json_stringify));};

      modelComposite.isStorable             = isLocallyStorable;

    //Trait.list.push(modelComposite);  // for debugging only.
    } else {
      throw (new global.TypeError("[LocallyStorable] has to be provided with a valid function that generates a stringified JSON (sub)data structure from the very model this trait was applied to."));
    }
    return modelComposite;
  };
//Trait.list = [];                      // to be used for debugging only.


  return Trait;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          - 1.726 byte
composable("components.LocallyStorable",function(v,e,g){var x=e.Object.keys;v=function(){return!1};var y=function(){return!0},z=g.methods.noop;g=g.introspective;var n=g.isString,c=g.isFunction,h=function(a){return c(a.stringify)&&c(a.parse)&&a.parse||c(a.parseJSON)&&a.parseJSON||function(){return{}}}(e.JSON||e.jQuery),f=function(a){return c(a.parse)&&c(a.stringify)&&a.stringify||function(){return""}}(e.JSON),k=function(a){return x(a).sort(function(a,d){return a<d?-1:a>d?1:0}).reduce(function(b,d){var c=a[d];b[d]=c&&"object"==typeof c?k(c):c;return b},{})},A=function(a,b){var d;if(d=c(a)){var e;if(e=d=a(b,f))if(e=n(d.key))if(d=d.value,e=!1,n(d))try{h(d),e=!0}catch(g){}d=e}return d},p=function(a){return a&&c(a.setItem)&&c(a.getItem)&&c(a.removeItem)&&c(a.clear)&&null!=a.key},w,l=p(e.localStorage)?e.localStorage:void 0,m,q,r,s,t,u,p=!!l;w=function(){return p};l?(m=function(a){return l.getItem(a.key)},q=function(a){return l.setItem(a.key,a.value)},r=function(a){return l.removeItem(a.key)},s=function(a){return n(m(a))},t=function(a){var b=m(a)||"{}";return b!=a.value&&f(k(h(b)))!=f(k(h(a.value)))},u=function(a){var b=m(a)||"{}";return b==a.value||f(k(h(b)))==f(k(h(a.value)))}):(r=q=z,t=s=y,u=v);return function(a){var b=this;if(A(a,b))b.putDataIntoStorage=function(){return q(a(b,f))},b.removeDataFromStorage=function(){return r(a(b,f))},b.doesDataExistInStorage=function(){return s(a(b,f))},b.doesStoredDataDiffer=function(){return t(a(b,f))},b.doesStoredDataMatch=function(){return u(a(b,f))},b.isStorable=w;else throw new e.TypeError("[LocallyStorable] has to be provided with a valid function that generates a stringified JSON (sub)data structure from the very model this trait was applied to.");return b}});


*/
