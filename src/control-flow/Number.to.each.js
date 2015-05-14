/**
 *  This new [Number] iteration with [Number.to( ... ).each] was as much inspired by
 *  Smalltalk as it had been before with the recently implemented [Number.times] iterator.
 *
 *  links:
 *
 *    EN: [http://en.wikipedia.org/wiki/Smalltalk]
 *    DE: [http://de.wikipedia.org/wiki/Smalltalk-80_(Programmiersprache)#Schleifen]
 */


composable("control_flow.Number_to_each", function (require, global) {


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


    NumberSequence = function NumberSequence (startValue, endValue) {
    //in almost every case the initial value was a primitive "number" or "string" value.
      var
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

      this.each = function (fct, target) {

        each(startValue, endValue, fct, target);

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


- Simple          -   644 byte
composable("control_flow.Number_to_each",function(k,b){k("environment_extended_introspective_core");var n=k("environment").introspective,p=b.Number,q=b.Math,t=q.floor,u=q.abs,v=b.isFinite,w=n.isFunction,x=n.baseValueOf,r=function(a){return v(a=p(a))?t(a):-1},y=function(a,b){var m=x(a);a=r(a);b=r(b);this.valueOf=function(){return m};this.toString=function(){return""+m};this.each=function(e,k){var f=a,g=b,h=k;if(w(e)){var h=null==h?null:h,c,d,l=-1;if(f<=g)for(c=f-1,d=g-c;++l<d;)e.call(h,l,d,e,++c,f,g);else for(c=f+1,d=u(g-c);++l<d;)e.call(h,l,d,e,--c,f,g)}return m}};p.prototype.to=b.String.prototype.to=function(a){return new y(this,a)}});


*/





/*

var print = ((typeof print == "function") && print) || function () {
  console.log.call(console, arguments);
};


(4).to(11).each(function (idx, len, fct) { // callback exactly as in [Number.times]
  print("hallo - idx : " + idx + " - len : " + len + " - fct : " + fct + "\n");
});
print("\n"); // 8 times the function


var callback = (function (idx, len, fct, count, from, to) { // callback similar to [Number.times] - appended arguments array though.
//print("hallo - idx : " + idx + " - len : " + len/ * + " - fct : " + fct* / + " - count : " + count + " - from : " + from + " - to : " + to + "\n");
  print("hallo - idx : " + idx + " - len : " + len + " - count : " + count + " - from : " + from + " - to : " + to + "\n");
});


(17).to(21).each(callback); // 5 times the function
print("\n");

("19.5555").to("20").each(callback); // 2 times the function
print("\n");

("18").to("20.9999999999999999999").each(callback); // 4 times the function
print("\n");

(-1).to("1").each(callback); // 3 times the function
print("\n");

(2).to("-1").each(callback); // 4 times the function
print("\n");

(1).to("1").each(callback); // 1 times the function
print("\n");

("0").to(0).each(callback); // 1 times the function
print("\n");

("-1").to(-1).each(callback); // 1 times the function
print("\n");

print(("18").to("21") == 18);     // true
print(("18").to("21") === 18);    // false
print(("18").to("21") == "18");   // true
print(("18").to("21") === "18");  // false
print("\n");

print(("18").to("21") == 18);               // true
print(("18").to("21").valueOf() === 18);    // false
print(("18").to("21") == "18");             // true
print(("18").to("21").valueOf() === "18");  // true
print("\n");

print(("20").to("1000") / 5); // 4;
print(("20").to() * 4);       // 80;
print("\n");

*/
