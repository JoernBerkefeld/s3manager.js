/* jshint node:true */
"use strict";
var PORT = process.env.PORT || 80; 
var DEBUG = process.env.NODE_ENV=="debug";

var express = require('express');
var app = express();
var http = require('http').Server(app);
var col = require('./server/node/util.color-cli.js');
var log = require('./server/node/util.log');


console.log(col.checkObject("DEBUG "+(DEBUG?"true":"false"),!DEBUG));




// +++++++++++++++ CONFIG ++++++++++++++++++

var APP_PATH = '/';
var clientApp = '/client.min.html';

var clientPath = DEBUG?'/client':'/public';






// +++++++++++++++ EXPRESS ++++++++++++++++++



require('./server/node/util.staticFiles.js')(__dirname+clientPath, APP_PATH, clientApp, app, express);





// +++++++++++++++ AWS ++++++++++++++++++




var AWS = require('aws-sdk'); 
var s3 = new AWS.S3(); 


//////////// EXAMPLES: http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-examples.html

// List All of Your Buckets 
s3.listBuckets(function(err, data) {
  if (err) {
  	console.log("Error:", err);
  }
  else {
    for (var index in data.Buckets) {
      var bucket = data.Buckets[index];
      console.log("Bucket: ", bucket.Name, ' : ', bucket.CreationDate);
    }
  }
});


// Getting a pre-signed URL for a getObject operation (async)
var s3 = new AWS.S3();
var params = {
	Bucket: 'myBucket', 
	Key: 'myKey',
	Expires: 900
};
s3.getSignedUrl('getObject', params, function (err, url) {
  console.log("The URL is", url);
});


// Getting a pre-signed URL for a getObject operation (sync)
var s3 = new AWS.S3();
var params = {
	Bucket: 'myBucket', 
	Key: 'myKey',
	Expires: 900
};
var url = s3.getSignedUrl('getObject', params);
console.log("The URL is", url);




// Getting a pre-signed URL for a PUT operation with a specific payload
var s3 = new AWS.S3({computeChecksums: true}); // this is the default setting
var params = {
	Bucket: 'myBucket',
	Key: 'myKey',
	Body: 'EXPECTED CONTENTS',
	Expires: 900
};
var url = s3.getSignedUrl('putObject', params);
console.log("The URL is", url);


// Getting a pre-signed URL for a PUT operation with a ANY payload
var s3 = new AWS.S3({computeChecksums: true}); // this is the default setting
var params = {
	Bucket: 'myBucket', 
	Key: 'myKey', 
	Expires: 900
};
var url = s3.getSignedUrl('putObject', params);
console.log("The URL is", url);


// +++++++++++++++ INIT SERVER ++++++++++++++++++


http.listen(PORT, function(){
	log('listening on *:'+PORT);
});
