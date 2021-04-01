require('dotenv').config();

// Superagent for HTTP requests
const superagent = require('superagent');

// WebSocket for websockets support
const WebSocket = require('websocket').client;

// Create a WebSocket client
const client = new WebSocket();

// Returns a WebSocket URL to connect to
async function appsConnectionOpen() {
  const httpHeaders = {
    'Content-type': 'application/json; charset=utf-8',
    Authorization: `Bearer ${process.env.SOCKETTOKEN}`,
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
  connection.on('error', function (error) {
    console.log('Connection Error: ' + error.toString());
  });
  connection.on('close', function () {
    console.log('echo-protocol Connection Closed');
  });
  connection.on('message', function (message) {
    let messageObject = JSON.parse(message.utf8Data);

    console.log(messageObject);

    if (messageObject.envelope_id) {
      console.log(messageObject.envelope_id);
      connection.sendUTF(
        JSON.stringify({
          envelope_id: messageObject.envelope_id,
        })
      );
    }
  });
});

(async () => {
  try {
    const webSocketURL = await appsConnectionOpen();
    client.connect(webSocketURL);
  } catch (err) {
    console.error(err);
  }
})();
