/* jshint node:true */
"use strict";

console.log("loading log");


var CURRENT_DATE = null;

module.exports = function(msg) {
	var now = new Date(),
		tz,
		date = ('0'+now.getDate()).slice(-2)+'.'+('0'+(now.getMonth()+1)).slice(-2)+'.'+now.getFullYear();
	if(date != CURRENT_DATE) {
		var stars = ' ***************** ';
		CURRENT_DATE = date;
		tz = -(now.getTimezoneOffset() / 60);
		tz = ' GMT'+(tz>=0?'+':'')+("0"+ Math.floor(tz)).slice(-2) + ("0"+(tz % 1 * 60)).slice(-2);

		console.log(" ");
		console.log(stars + stars + stars);
		console.log(stars + '' + date+tz+ '' + stars);
	}

	now = ('0'+now.getHours()).slice(-2) +':'+ ('0'+now.getMinutes()).slice(-2) +':'+ ('0'+now.getSeconds()).slice(-2) + "  ";
	console.log(now + msg);
};
