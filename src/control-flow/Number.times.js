/**
 *  [Number.times] and its relatives got implemented close to mozilla.org's
 *  [Array.forEach] remaining [Number] specific and Smalltalk inspired though.
 *
 *  links:
 *
 *    EN: [https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Global_Objects/Array/forEach]
 *    EN: [http://en.wikipedia.org/wiki/Smalltalk]
 *
 *    DE: [http://de.wikipedia.org/wiki/Smalltalk-80_(Programmiersprache)#Schleifen]
 */


composable("control_flow.Number_times", function (require, global) {


  "use strict";


  require("environment_extended_introspective_core");


  var
    environment               = require("environment"),
    environment_introspective = environment.introspective,


    Number  = global.Number,
    String  = global.String,

    Math    = global.Math,


    number_prototype_times,


    math_floor  = Math.floor,
    math_max    = Math.max,

  //parseInt    = global.parseInt,

    isFinite    = global.isFinite,
    isFunction  = environment_introspective.isFunction,


    getSanitizedTarget = function (target) {
      return (target == null) ? null : target;
    //return ((target != null) && target) || null;
    }
  ;


  number_prototype_times = function (fct, target) { // prototypal implementation.
    var
    //count = parseInt(this, 10),
      count = Number(this),
      idx   = -1
    ;
    target  = getSanitizedTarget(target);

    count   = (isFinite(count) && isFunction(fct) && math_max(math_floor(count), 0)) || idx;

    while (++idx < count) {
      fct.call(target, idx, count, fct);
    }
  };
  Number.prototype.times = String.prototype.times = number_prototype_times;


  Number.times = function (num, fct, target) {      // static implementation
    number_prototype_times.call(num, fct, target);
  };


//return Number;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   400 byte
composable("control_flow.Number_times",function(g,a){g("environment_extended_introspective_core");var k=g("environment").introspective,d=a.Number,l=a.String,h=a.Math,e,m=h.floor,n=h.max,p=a.isFinite,q=k.isFunction;e=function(f,c){var b=d(this),a=-1;c=null==c?null:c;for(b=p(b)&&q(f)&&n(m(b),0)||a;++a<b;)f.call(c,a,b,f)};d.prototype.times=l.prototype.times=e;d.times=function(a,c,b){e.call(a,c,b)}});


*/





/*

var print = ((typeof print == "function") && print) || function () {
  console.log.call(console, arguments);
};


(5).times(function (idx, len, fct) {print("hallo - idx : " + idx + " - len : " + len + " - fct : " + fct + "\n");});              // 5 times the function
(3.999).times(function (idx, len, fct) {print("hallo - idx : " + idx + " - len : " + len + " - fct : " + fct + "\n");});          // 3 times the function

print("\n");


Number.times(2, (function (idx, len, fct) {print("hallo - idx : " + idx + " - len : " + len + " - fct : " + fct + "\n");}));      // 2 times the function
Number.times((1/0), (function (idx, len, fct) {print("hallo - idx : " + idx + " - len : " + len + " - fct : " + fct + "\n");}));  // 0 times the function
Number.times("1.9", (function (idx, len, fct) {print("hallo - idx : " + idx + " - len : " + len + " - fct : " + fct + "\n");}));  // 1 times the function

print("\n");


("3").times(function (idx, len, fct) {print("hallo - idx : " + idx + " - len : " + len + " - fct : " + fct + "\n");});            // 3 times the function
("2,00000001").times(function (idx, len, fct) {print("hallo - idx : " + idx + " - len : " + len + " - fct : " + fct + "\n");});   // 0 times the function
(0).times(function (idx, len, fct) {print("hallo - idx : " + idx + " - len : " + len + " - fct : " + fct + "\n");});              // 0 times the function
("5.99999999").times(function (idx, len, fct) {print("hallo - idx : " + idx + " - len : " + len + " - fct : " + fct + "\n");});   // 5 times the function

print("\n");


var arr = [1, 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37];

arr.length.times(function (idx, len, fct) {

  print("arr[" + idx + "] : " + arr[idx]);
});

*/
