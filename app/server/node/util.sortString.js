/* jshint node:true */
"use strict";

console.log("loading sortString");



var sortString = function(a, b) {
	a = a.toLowerCase();
	b = b.toLowerCase();
	if(a > b) {
		return 1;
	}
	if(a < b) {
		return -1;
	}
	return 0;
};

module.exports = sortString;
// var sortSockets = function(a, b) {
// 	a = a.username.toLowerCase();
// 	b = b.username.toLowerCase();
// 	if (a > b) return 1;
// 	if (a < b) return -1;
// 	return 0;
// };
