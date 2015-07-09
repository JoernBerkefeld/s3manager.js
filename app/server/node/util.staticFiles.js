/* jshint node:true */
"use strict";

console.log("loading permStorage");



function serveFiles(root, APP_PATH, clientApp, app, express) {
	var sendFileOptions = {
		root: root, //__dirname + clientPath,
		dotfiles: 'deny'
	};
	function handleRequests(req, res){
		// console.log("handle");
		var filename = clientApp;
		res.sendFile(filename, sendFileOptions, function sendFileError(err) {
			if (err) {
				// res.status(404).send('Cannot GET '+filename);
			}
		});
	}
	function redirectRequest(req, response){
		// console.log("redirect");
		if(req.path == APP_PATH+'/') {
			// console.log("init-handle");
			handleRequests(req, response);
			return;
		}
		// make sure the html is called with a trailing slash or all our relative js and css links will not be working
		response.statusCode = 302;
		response.setHeader('Location', (APP_PATH.length>1 ? APP_PATH+'/' : APP_PATH) );
		response.end();
	}

	if(APP_PATH.substr(0,1) != '/') {
		APP_PATH = '/'+APP_PATH;
	}
	if(APP_PATH.length>1 && APP_PATH.substr(-1) != '/') {
		app.get(APP_PATH, redirectRequest);
	} else {
		app.get(APP_PATH, handleRequests); // get client-html
	}
	// app.use(APP_PATH, express.static(__dirname + clientPath));
	app.use(APP_PATH, express.static( root ));
}

module.exports = serveFiles;


