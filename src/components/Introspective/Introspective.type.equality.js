

composable("components.Introspective_type_equality", function (require, global/*, internalBaseEnvironment*/) {


  "use strict";


  require("environment_extended_introspective_sameness");


  var
    environment = require("environment"),


    Trait,


    env_introspective = environment.introspective,

    isObject          = env_introspective.isObject,
    isSameValue       = env_introspective.isSameValue,

    object_keys       = global.Object.keys,


    stringify = function (type) {
      return ("" + type);
    },


    equals = function (typeA, typeB, typeListA, typeListB) {
      var isequal = isSameValue(typeA, typeB);  // (-0 vs 0):false // (Number.NaN vs Number.NaN):true
    //var isequal = (typeA === typeB);          // (-0 vs 0):true  // (Number.NaN vs Number.NaN):false
    //var isequal = ((typeA === typeB) || isSameValue(typeA, typeB)); // kind of LOW pass filter?

      if (!isequal && isObject(typeA) && isObject(typeB)) {
        var // start handling of possible cyclic references
          isstoredA = (typeListA.indexOf(typeA) >= 0),
          isstoredB = (typeListB.indexOf(typeB) >= 0)
        ;
      //!isstoredA && typeListA.push(typeA);
      //!isstoredB && typeListB.push(typeB);
        if (!isstoredA && !isstoredB) {
          typeListA.push(typeA);
          typeListB.push(typeB);

          isequal = (

            (stringify(typeA) == stringify(typeB))
            && (stringify(object_keys(typeA).sort()) == stringify(object_keys(typeB).sort()))

            && object_keys(typeA).every(function (key) {

              return equals(typeA[key], typeB[key], typeListA, typeListB);
            })
          );
          typeListA.pop();
          typeListB.pop();
        //!isstoredA && typeListA.pop();
        //!isstoredB && typeListB.pop();
        } else {
          isequal = true;
        }
      }
      return isequal;
    },
    isEqualType = function (typeA, typeB) {
      return equals(typeA, typeB, [], []);
    }
  ;


  Trait = function () {

    this.isEqualType = isEqualType;
  };


  return Trait;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   545 byte
composable("components.Introspective_type_equality",function(d,n){d("environment_extended_introspective_sameness");var h=d("environment").introspective,k=h.isObject,p=h.isSameValue,g=n.Object.keys,l=function(a){return""+a},m=function(a,b,e,f){var c=p(a,b);if(!c&&k(a)&&k(b)){var c=0<=e.indexOf(a),d=0<=f.indexOf(b);c||d?c=!0:(e.push(a),f.push(b),c=""+a==""+b&&l(g(a).sort())==l(g(b).sort())&&g(a).every(function(c){return m(a[c],b[c],e,f)}),e.pop(),f.pop())}return c},q=function(a,b){return m(a,b,[],[])};return function(){this.isEqualType=q}});


*/



//window.o1 = {x:{x:{x:"",y:[,[,,,],,[,{x:"",y:[,[,,,],,[,new RegExp,,new Function,"",,Number.NaN,"",window.o1,""]],z:{x:""}},,]],z:{x:window.o1,y:0}}}};
//window.o2 = {x:{x:{x:"",y:[,[,,,],,[,{x:"",y:[,[,,,],,[,new RegExp,,new Function,"",,Number.NaN,"",window.o2,""]],z:{x:""}},,]],z:{x:window.o2,y:0}}}};

