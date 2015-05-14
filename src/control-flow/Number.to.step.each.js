/**
 *  This new [Number] iteration with [Number.to( ... ).each] was as much inspired by
 *  Smalltalk as it had been before with the recently implemented [Number.times] iterator.
 *
 *  links:
 *
 *    EN: [http://en.wikipedia.org/wiki/Smalltalk]
 *    DE: [http://de.wikipedia.org/wiki/Smalltalk-80_(Programmiersprache)#Schleifen]
 */


composable("control_flow.Number_to_step_each", function (require, global) {


  "use strict";


  require("environment_extended_introspective_core");


  var
    environment               = require("environment"),
    environment_introspective = environment.introspective,


    Number  = global.Number,
    String  = global.String,

    Math    = global.Math,



    math_floor  = Math.floor,
    math_abs    = Math.abs,

    isFinite    = global.isFinite,
    isFunction  = environment_introspective.isFunction,

    baseValueOf = environment_introspective.baseValueOf,

  //getBaseValueOf = function () {
  //  return ((type == null) ? type : expose_internal_value.call(type).valueOf());
  //},
  //expose_internal_value = global.Object.prototype.valueOf,


    getSanitizedTarget = function (target) {
      return (target == null) ? null : target;
    //return ((target != null) && target) || null;
    },
    getSanitizedCount = function (num) {
      return (isFinite(num = Number(num)) ? math_floor(num) : -1);
    }
  ;


  var
    each = function (from, to, fct, target) {

      if (isFunction(fct)) {
        target = getSanitizedTarget(target);

        var
          count,
          len,
          idx = -1
        ;
        if (from <= to) {

          count = (from - 1);
          len = (to - count);

          while (++idx < len) {
          //arguments order of callback function sticks closely/strictly to that one of [Number.times] but appends the arguments array by "count", "from" and "to".
            fct.call(target, idx, len, fct, ++count, from, to);
          }
        } else {

          count = (from + 1);
          len = math_abs(to - count);

          while (++idx < len) {
          //arguments order of callback function sticks closely/strictly to that one of [Number.times] but appends the arguments array by "count", "from" and "to".
            fct.call(target, idx, len, fct, --count, from, to);
          }
        }
      }
    },
    eachStep = function (step, from, to, fct, target) {

      if (isFunction(fct)) {
        target = getSanitizedTarget(target);

        var
          count,
          len,
          idx = -1
        ;
        if (from <= to) {

          count = (from - step);
          len = math_floor((to - count) / step);

          while (++idx < len) {
          //arguments order of callback function sticks closely/strictly to that one of [Number.times] but appends the arguments array by "count", "from" and "to".
            fct.call(target, idx, len, fct, (count = count + step), from, to, step);
          }
        } else {

          count = (from + step);
          len = math_floor(math_abs(to - count) / step);

          while (++idx < len) {
          //arguments order of callback function sticks closely/strictly to that one of [Number.times] but appends the arguments array by "count", "from" and "to".
            fct.call(target, idx, len, fct, (count = count - step), from, to, step);
          }
        }
      }
    },


    NumberSequence = function NumberSequence (startValue, endValue) {
    //in almost every case the initial value was a primitive "number" or "string" value.
      var
        stepValue     = 1,
        initialValue  = baseValueOf(startValue)
      ;
      startValue = getSanitizedCount(startValue);
      endValue = getSanitizedCount(endValue);

      this.valueOf = function () {
        return initialValue;
      };
      this.toString = function () {
        return ("" + initialValue);
      };

      this.step = function (step) {
        stepValue = math_abs(getSanitizedCount(step));
        return this;
      };
      this.each = function (fct, target) {
        if (stepValue >= 2) {
          eachStep(stepValue, startValue, endValue, fct, target);
        } else {
          each(startValue, endValue, fct, target);
        }
        return initialValue;
      };
    }
  ;


  Number.prototype.to = String.prototype.to = function (num) {

    return (new NumberSequence(this, num));
  };


//return Number;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   887 byte
composable("control_flow.Number_to_step_each",function(t,k){t("environment_extended_introspective_core");var u=t("environment").introspective,v=k.Number,w=k.Math,n=w.floor,p=w.abs,y=k.isFinite,x=u.isFunction,z=u.baseValueOf,l=function(d){return y(d=v(d))?n(d):-1},A=function(d,k){var q=1,r=z(d);d=l(d);k=l(k);this.valueOf=function(){return r};this.toString=function(){return""+r};this.step=function(c){q=p(l(c));return this};this.each=function(c,l){if(2<=q){var a=q,e=d,f=k,g=l;if(x(c)){var g=null==g?null:g,b,h,m=-1;if(e<=f)for(b=e-a,h=n((f-b)/a);++m<h;)c.call(g,m,h,c,b+=a,e,f,a);else for(b=e+a,h=n(p(f-b)/a);++m<h;)c.call(g,m,h,c,b-=a,e,f,a)}}else if(a=d,e=k,f=l,x(c))if(f=null==f?null:f,h=-1,a<=e)for(g=a-1,b=e-g;++h<b;)c.call(f,h,b,c,++g,a,e);else for(g=a+1,b=p(e-g);++h<b;)c.call(f,h,b,c,--g,a,e);return r}};v.prototype.to=k.String.prototype.to=function(d){return new A(this,d)}});


*/





/*

var print = ((typeof print == "function") && print) || function () {
  console.log.call(console, arguments);
};


(4).to(11).step(3).each(function (idx, len, fct) { // callback exactly as in [Number.times]
  print("hallo - idx : " + idx + " - len : " + len + " - fct : " + fct + "\n");
});
print("\n"); // 3 times the function


var callback = (function (idx, len, fct, count, from, to, step) { // callback similar to [Number.times] - appended arguments array though.
//print("hallo - idx : " + idx + " - len : " + len/ * + " - fct : " + fct* / + " - count : " + count + " - from : " + from + " - to : " + to + " - step : " + step + "\n");
  print("hallo - idx : " + idx + " - len : " + len + " - count : " + count + " - from : " + from + " - to : " + to + " - step : " + step + "\n");
});


(1).to(2).each(callback); // 2 times the function
print("\n");

("19.5555").to("20").step(2).each(callback); // 1 times the function
print("\n");

("18").to("20.9999999999999999999").step(2).each(callback); // 2 times the function
print("\n");

(-1).to("1").step(3).each(callback); // 1 times the function
print("\n");

(2).to("-1").step(2).each(callback); // 2 times the function
print("\n");

(1).to("1").step(5).each(callback); // 1 times the function
print("\n");

("0").to(0).step(9).each(callback); // 1 times the function
print("\n");

("-1").to(-1).step(0).each(callback); // 1 times the function
print("\n");

("-3").to(12).step(3).each(callback); // 6 times the function
print("\n");

("-3").to(12).step(5).each(callback); // 4 times the function
print("\n");

(29).to(-3).step(11).each(callback); // 3 times the function
print("\n");

(29).to(-4).step(11).each(callback); // 4 times the function
print("\n");

*/
