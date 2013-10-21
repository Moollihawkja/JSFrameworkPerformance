'use strict';

// --- Internal Variables 
var 
	http = require('http'),
	express = require('express'),
	router = require('./lib/router'),
	app = express(),
	server = http.createServer(app),
	port = 3001,
	path = __dirname
;

// --- Server Configuration
app.configure( function() {
	app.use( express.logger());
	app.use( express.bodyParser());
	app.use( express.methodOverride());
	app.use( express.errorHandler({
		dumpExceptions: true,
		showStack: true
	}));
	app.use(express.static(__dirname));
	app.use(app.router);
});
router.initModule(app, server, path);

// --- Start Server
server.listen(port);
console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);

