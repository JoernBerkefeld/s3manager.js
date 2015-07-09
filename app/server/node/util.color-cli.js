/* jshint node:true */
"use strict";



var col = {
	colors : {
		bold: '\u001b[1m',
		boldReset: '\u001b[21m',
		underline: '\u001b[4m',
		underlineReset: '\u001b[24m',
		invert: '\u001b[7m',
		invertReset: '\u001b[27m',

		red: '\u001b[31m',
		green: '\u001b[32m',
		yellow: '\u001b[33m',
		blue: '\u001b[34m',

		lightred: '\u001b[91m',
		lightgreen: '\u001b[92m',
		lightyellow: '\u001b[93m',
		ligthblue: '\u001b[94m',

		bgRed: '\u001b[41m',
		bgGreen: '\u001b[42m',
		bgYellow: '\u001b[43m',
		bgBlue: '\u001b[44m',

		bgLightred: '\u001b[101m',
		bgLightgreen: '\u001b[102m',
		bgLightyellow: '\u001b[103m',
		bgLightblue: '\u001b[104m',
		bgWhite: '\u001b[107m',

		reset: '\u001b[0m'
	},
	or : function(strColor,str) {
		var change ="";
		if("string" == typeof strColor) {
			strColor = [strColor];
		}
		for (var i = strColor.length - 1; i >= 0; i--) {
			change += this.colors[strColor[i]];
		}
		return change + str + this.colors.reset;
	},
	checkObject : function(name,value) {
		return !!value ? this.or(['green','bold'],name) : this.or(['lightred','bold','bgWhite'],name);
	},
	error : function(str) {
		log(col.or("lightred","ERROR: "+str));
	},
	warning : function(str) {
		log(col.or("lightyellow","WARNING: "+str));
	},
	success : function(str) {
		log(col.or("lightgreen",str));
	},
	info : function(str) {
		log(col.or(["ligthblue","bgWhite"],str));
	}
};

module.exports = col;


var log = require('./util.log.js');
