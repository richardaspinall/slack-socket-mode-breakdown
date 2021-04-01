require('dotenv').config();

// Superagent package for HTTP requests
const superagent = require('superagent');

// WebSocket package for websockets support
const WebSocket = require('websocket').client;

// Create a WebSocket client
const client = new WebSocket();

// Gets a URL from Slack to create a websocket through
async function appsConnectionOpen() {
  const httpHeaders = {
    'Content-type': 'application/json; charset=utf-8',
    Authorization: `Bearer ${process.env.SOCKETMODE}`,
  };
  const methodUrl = 'https://slack.com/api/apps.connections.open';
  const res = await superagent.post(methodUrl).set(httpHeaders).send({});
  if (!res.body.url) {
    console.log('Error: sending request to Slack API failed:');
    console.log('=============================');
    throw res.body;
  }
  return res.body.url;
}

client.on('connectFailed', function (error) {
  console.log('Connect Error: ' + error.toString());
});

client.on('connect', function (connection) {
  console.log('WebSocket Client Connected');

  // Log connection closing or errors
  connection.on('error', function (error) {
    console.log('Connection Error: ' + error.toString());
  });
  connection.on('close', function () {
    console.log('echo-protocol Connection Closed');
  });

  // Handle incoming and outgoing messages on the socket
  connection.on('message', function (message) {
    const socketMessage = JSON.parse(message.utf8Data);

    // Send back envelope_id as acknowledgment
    if (socketMessage.envelope_id) {
      connection.sendUTF(
        JSON.stringify({
          envelope_id: socketMessage.envelope_id,
        })
      );
      // Log event
      console.log(socketMessage.payload.event);
    } else {
      // Log Hello message upon connection
      console.log(socketMessage);
    }
  });
});

// Connection to Slack
(async () => {
  try {
    const webSocketURL = await appsConnectionOpen();
    client.connect(webSocketURL);
  } catch (err) {
    console.error(err);
  }
})();
