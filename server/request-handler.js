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
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code


  // The outgoing status.
  var statusCode = 200;

  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;

  request.on('data', function(message) {
    var username = 'username=';
    var text = '&text=';
    var room = '&roomname=';

    var dataArray = message.toString().split(username).join('').split(text).join(' ').split(room).join().split(' ').join().split(',');

    console.log(dataArray);
    var obj = {
      username: dataArray[0],
      text: dataArray[1],
      roomname: dataArray[2]
    };
    data.results.push(obj);

     response.writeHead(statusCode, headers);
  // response.end();

  });

  // var clientURL = url.parse(request.url);
  // if (request.method = 'POST') {

  //   'POST HAPPENED';
  //   console.log(clientURL);
  // }

  

  

  // console.log('URL query', clientURL.query);
  // console.log('this is the url', clientURL.pathname); 
  // console.log('this is the method', request.method); 
  
  // console.log('Serving request type ' + request.method + ' for url ' + request.url);


  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  headers['Content-Type'] = 'application/json';

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.
  response.writeHead(statusCode, headers);
  response.write(JSON.stringify(data));
  // response.write(obj);
  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
  response.end();
  
};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.




exports.requestHandler = requestHandler;

