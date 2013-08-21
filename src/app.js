
/**
 * Module dependencies.
 */

var express = require('express'),
	nano = require('nano')("https://cyclopslabs.iriscouch.com:6984"),
	db_name = "my_couch",
	db = nano.use(db_name),
	routes = require('./routes'),
	user = require('./routes/user'),
	http = require('http'),
	path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
// app.get('/', function(request, response) {
// 	nano.db.create(db_name, function(error, body, headers) {
// 		if (error) { return response.send(error.message, error['status-code']); }
// 		db.insert({foo:true}, function(error2, body2, headers2) {
// 			if (error2) {return response.send(error2.message, error2['status-code']); }
// 			response.send("Insert ok!", 200);
// 		});
// 	});
// });
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
