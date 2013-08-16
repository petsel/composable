/**
 *  fix some browsers (e.g. webkit) "broken" prototypal [RegExp.compile] method.
 *
 *
 *  there is a newly implemented version too of the aged ...
 *
 *  ... [RegExp.toSearchPattern] - a way of building search strings at runtime.
 *
 *  [http://www.refactory.org/s/regexp_tosearchpattern_a_way_of_building_search_strings_at_runtime/view/latest]
 *
 *
 *  The tool named [toSearch] is a helper method nailed statically onto the [[RegExp]] constructor/namespace.
 *  It does support a way of building search terms/strings at runtime.
 *  In order to accomplish this task [RegExp.toSearch] makes use of [RegExp.escape] that's implementation takes
 *  into account that such strings might partly contain [RegExp] control characters that are not supposed to be
 *  read by the [RegExp] compiler as exactly this control characters but rather shall be an integral part of
 *  such above mentioned searches.
 *  [RegExp.toSearch] then additionally assures a "forgiving" or loose handling of whitespace sequences on both
 *  sides - the string that is source of the to be build search term as well as of all strings that are going
 *  to be searched.
 */
composable("", function (require, global, environment) {


  "use strict";


  var
    RegExp  = global.RegExp,
    regX = environment.objects.regX
  ;


  RegExp.escape = (function (regX, CLASS_PATTERN_REGEXP_CHARS, escape) {
    return function (str) {

      return ("" + str).replace(regX.compile(CLASS_PATTERN_REGEXP_CHARS, "g"), escape);
    };
  }(
    regX,
    "([$^*+?!:=.|(){}[\\]\\\\])",
    function () {return ("\\" + arguments[1]);}
  ));


//RegExp.toSearch = (function (regX, PATTERN_WS_CHARS, regexp_escape) {
//  return function (str) {
//
//    return regexp_escape("" + str).replace(regX.compile(PATTERN_WS_CHARS, "g"), PATTERN_WS_CHARS);
//  };
//}(
//  regX,
//  "\\s+",
//  RegExp.escape
//));


  RegExp.toSearch = (function (regX, CLASS_PATTERN_WS_SEQUENCE, regexp_escape) {
    return function (str) {

      return regexp_escape("" + str).replace(regX.compile(CLASS_PATTERN_WS_SEQUENCE, "g"), CLASS_PATTERN_WS_SEQUENCE);
    };
  }(
    regX, ["[",
  //  http://es5.github.com/#WhiteSpace
  //  http://www.sql-und-xml.de/unicode-database/ogham.html // \u1680 :: OGHAM SPACE MARK // " ".charCodeAt(0).toString(16)

      "\\x09\\x0A\\x0B\\x0C\\x0D\\x20\\xA0\\u1680\\u180E\\u2000",
      "\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008",
      "\\u2009\\u200A\\u202F\\u205F\\u3000\\u2028\\u2029\\uFEFF",

    "]+"].join(""),
    RegExp.escape
  ));


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   610 byte
composable("",function(a,c,d){a=c.RegExp;var b=d.objects.regX,e=function(a,b){return"\\"+b};a.escape=function(a){return(""+a).replace(b.compile("([$^*+?!:=.|(){}[\\]\\\\])","g"),e)};var f=a.escape;a.toSearch=function(a){return f(""+a).replace(b.compile("[\\x09\\x0A\\x0B\\x0C\\x0D\\x20\\xA0\\u1680\\u180E\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200A\\u202F\\u205F\\u3000\\u2028\\u2029\\uFEFF]+","g"),"[\\x09\\x0A\\x0B\\x0C\\x0D\\x20\\xA0\\u1680\\u180E\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200A\\u202F\\u205F\\u3000\\u2028\\u2029\\uFEFF]+")}});


*/
