const HTTPS = require('https');

const botID = process.env.BOT_ID;

function sendMessage(message) {
  const options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST',
  };

  const body = {
    bot_id: botID,
    text: message,
  };

  const botReq = HTTPS.request(options, (res) => {
    if (!res.statusCode === 202) {
      console.error('Unable to reach GroupMe API ', res.statusCode);
    }
  });

  botReq.on('error', (err) => {
    console.error('Error posting message to GroupMe API', JSON.stringify(err));
  });

  botReq.on('timeout', (err) => {
    console.error('Timeout posting message to GroupMe API', JSON.stringify(err));
  });

  botReq.end(JSON.stringify(body));
}

module.exports = sendMessage;
