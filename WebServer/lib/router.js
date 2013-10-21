'use strict'

// --- Internal Variables 
var initModule,
	crud = require('./crud'),
	fsHandle = require('fs'),
	makeMongoId = crud.makeMongoID
;


// --- Public Methods
initModule = function(app, server, path) {

	app.get('/contact', function(req, res) {
		fsHandle.readFile(path + '/KOCart/cart.html', 'utf8', function(err,data){
			res.contentType('html');
			res.send(data);
		});

	});

	app.all('/api/:obj/*?', function(req, res, next){
		res.contentType('json');
		next();
	});

	app.get('/api/:obj/list', function(req, res){
		crud.read(req.params.obj,{}, {},function(map_list) {
			res.send(map_list);
		});
	});

	app.get('/api/:obj/read/:id([a-f0-9]+)', function(req, res){
		crud.read(req.params.obj,{_id: makeMongoId(req.params.id)}, {},function(map_list) {
			res.send(map_list);
		});
	});

	app.post('/api/:obj/create', function(req, res){
		crud.construct(req.params.obj, req.body, function(result_map){
			res.send(result_map);
		});
	});

	app.post('/api/:obj/bulkcreate', function(req, res){
		crud.bulkConstruct(req.params.obj, req.body.data, function(result_map){
			res.send(result_map);
		});
	});

	app.post('/api/:obj/bulkdelete', function(req, res){
		crud.bulkDestroy(req.params.obj, req.body, function(result_map){
			res.send(result_map);
		});
	});

	app.post('/api/:obj/update/:id([a-f0-9]+)', function(req, res){
		crud.update(req.params.obj, {_id: makeMongoId(req.params.id)}, req.body, function(result_map) {
			res.send(result_map);
		});
	});

	app.post('/api/:obj/delete/:id([a-f0-9]+)', function(req, res){
		crud.destroy(req.params.obj, {_id: makeMongoId(req.params.id)},function(result_map) {
			res.send(result_map);
		});
	});

	app.get('/api/:obj/:action', function(req, res){
		res.send({verb: 'GET', object: req.params.obj, action: req.params.action });
	});

	app.get('/api/:obj/:action/:id([a-zA-Z0-9]+)', function(req, res){
		res.send({verb: 'GET', object: req.params.obj, action: req.params.action, id: req.params.id});
	});

	app.post('/api/:obj/:action', function(req, res){
		res.send({verb: 'POST', object: req.params.obj, action: req.params.action});
	});

	app.post('/api/:obj/:action/:id([a-zA-Z0-9]+)', function(req, res){
		res.send({verb: 'POST', object: req.params.obj, action: req.params.action, id: req.params.id});
	});

};

// --- Apply Module Signature
module.exports = { initModule: initModule};

