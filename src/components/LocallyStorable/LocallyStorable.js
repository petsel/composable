

composable("components.LocallyStorable", function (require, global, internalBaseEnvironment) {


  "use strict";


  var
    Trait,


    UNDEFINED_VALUE,
    NULL_VALUE = null,


    fct_empty         = internalBaseEnvironment.methods.noop,
  //fct_return_null   = function () {return null;},
    fct_return_true   = function () {return true;},
    fct_return_false  = function () {return false;},


    object_keys = global.Object.keys,


    isDefined   = function (obj) {
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

    isLocalStorage = function (obj) {
      return (obj && isFunction(obj.setItem) && isFunction(obj.getItem) && isFunction(obj.removeItem) && isFunction(obj.clear) && isDefined(obj.key));
    },
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
     *    getStorableDataSetFromModel = function (model) {
     *      var
     *        userModel = model.getUserAsModel(),
     *        dateToday = (new Date)
     *      ;
     *      return {
     *        key   : ("birthday_congratulation" + "_" + userModel.get("id")),
     *        value : json_stringify({
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

  //modelComposite.getValueFromStorage    = function () {return getValue(getStorableDataSetFromModel(modelComposite));};  // - currently there is no use case for [getValueFromStorage] either.
  //modelComposite.getDataFromStorage     = function () {return getData(getStorableDataSetFromModel(modelComposite));};   // - currently there is no use case for [getDataFromStorage].
  //modelComposite.getStorableData        = function () {return getStorableDataSetFromModel(modelComposite)};             // - [getStorableData] is to be used for debugging only.

    modelComposite.putDataIntoStorage     = function () {return putData(getStorableDataSetFromModel(modelComposite));};
    modelComposite.removeDataFromStorage  = function () {return clearData(getStorableDataSetFromModel(modelComposite));};

    modelComposite.doesDataExistInStorage = function () {return doesDataExist(getStorableDataSetFromModel(modelComposite));};
    modelComposite.doesStoredDataDiffer   = function () {return doesDataHasChanged(getStorableDataSetFromModel(modelComposite));};
    modelComposite.doesStoredDataMatch    = function () {return doesDataHasNotChanged(getStorableDataSetFromModel(modelComposite));};

  //modelComposite.diffAgainstStoredData  = function () {return computeDataDifference(getStorableDataSetFromModel(modelComposite));};

  //Trait.list.push(modelComposite);  // for debugging only.

    return modelComposite;
  };
//Trait.list = [];                    // to be used for debugging only.


  return Trait;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          - 1.387 byte
composable("components.LocallyStorable",function(s,d,l){s=l.methods.noop;var t=function(){return!0},u=function(){return!1},v=d.Object.keys,w=l.introspective.isString,c=l.introspective.isFunction,f=function(a){return c(a.stringify)&&c(a.parse)&&a.parse||c(a.parseJSON)&&a.parseJSON||function(){return{}}}(d.JSON||d.jQuery),g=function(a){return c(a.parse)&&c(a.stringify)&&a.stringify||function(){return""}}(d.JSON),e=function(a){return v(a).sort(function(a,c){return a<c?-1:a>c?1:0}).reduce(function(b,c){var d=a[c];b[c]=d&&"object"==typeof d?e(d):d;return b},{})},h=function(a){var b;if(b=a)if(b=c(a.setItem))if(b=c(a.getItem))if(b=c(a.removeItem))if(b=c(a.clear))a=a.key,b=null!==a&&void 0!==a;return b}(d.localStorage)?d.localStorage:void 0,k,m,n,p,q,r;h?(k=function(a){return h.getItem(a.key)},m=function(a){return h.setItem(a.key,a.value)},n=function(a){return h.removeItem(a.key)},p=function(a){return w(k(a))},q=function(a){var b=k(a)||"{}";return b!=a.value&&g(e(f(b)))!=g(e(f(a.value)))},r=function(a){var b=k(a)||"{}";return b==a.value||g(e(f(b)))==g(e(f(a.value)))}):(n=m=s,q=p=t,r=u);return function(a){var b=this;b.putDataIntoStorage=function(){return m(a(b))};b.removeDataFromStorage=function(){return n(a(b))};b.doesDataExistInStorage=function(){return p(a(b))};b.doesStoredDataDiffer=function(){return q(a(b))};b.doesStoredDataMatch=function(){return r(a(b))};return b}});


*/
