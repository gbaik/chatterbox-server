/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

 // $.ajax({
 //      url: 'http://127.0.0.1:3000/chatterbox/classes/messages',
 //      type: 'GET',
 //      data: { order: '-createdAt' },
 //      contentType: 'application/json',
 //      success: function(data) {
 //          console.log(data);
 //        }
 //      },
 //      error: function(error) {
 //        console.error('chatterbox: Failed to fetch messages', error);
 //      }
 //    })

/*
server
    ✓ should respond to GET requests for /classes/messages with a 200 status code
    1) should send back parsable stringified JSON
    2) should send back an object
    3) should send an object containing a `results` array
    4) should accept POST requests to /classes/messages
    5) should respond with messages that were previously posted
    6) Should 404 when asked for a nonexistent endpoint

  Node Server Request Listener Function
Serving request type GET for url /classes/messages
    ✓ Should answer GET requests for /classes/messages with a 200 status code
Serving request type GET for url /classes/messages
    7) Should send back parsable stringified JSON
Serving request type GET for url /classes/messages
    8) Should send back an object
Serving request type GET for url /classes/messages
    9) Should send an object containing a `results` array
Serving request type POST for url /classes/messages
    10) Should accept posts to /classes/room
Serving request type POST for url /classes/messages
    11) Should respond with messages that were previously posted
Serving request type GET for url /arglebargle
    ✓ Should 404 when asked for a nonexistent file
*/

const url = require('url');

var data = {results: [
  {username: 'G', roomname: 'romm1', text: 'first message', objectId: 0},
  {username: 'J', roomname: 'room1', text: 'second message', objectId: 1},
  {username: 'K', roomname: 'room1', text: 'third message', objectId: 2},
]};

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

var requestHandler = function(request, response) {
  var statusCode = 201;

  var myURL = url.parse(request.url);
  console.log(myURL.pathname);
  if (myURL.pathname !== '/chatterbox/classes/messages') {
    statusCode = 404;
  }

  if (request.method === 'GET') {
    statusCode = 200;
  }

  var headers = defaultCorsHeaders;
  headers['Content-Type'] = 'application/json';


  request.on('data', function(message) {
    var username = 'username=';
    var text = '&text=';
    var room = '&roomname=';

    var dataArray = message.toString().split(username).join('').split(text).join(' ').split(room).join().split(' ').join().split(',');

    var obj = {
      username: dataArray[0],
      text: dataArray[1],
      roomname: dataArray[2],
      objectId: data.results.length - 1
    };

    data.results.push(obj);
  });

  response.writeHead(statusCode, headers);
  response.write(JSON.stringify(data));

  response.end();
};

exports.requestHandler = requestHandler;

