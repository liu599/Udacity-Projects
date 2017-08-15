/**
* @description provide tools for this project

*/

(function(window){
/**
* @description n~m random integers
* @constructor
* @param {integer} n - start integer
* @param {integer} m - end integer
* @return {integer} random integer inside
*/
  var util = {
        // 产生n~m范围内的随机整数
    rnI: function(n,m){
      var c = m - n + 1;
      return Math.floor(Math.random()*c+n);
    }
  };

  window.Util = util;
}(window));
