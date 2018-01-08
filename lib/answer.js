const redis = require('redis');
const sendMessage = require('./sendMessage');

const redisClient = redis.createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

function answer() {
  redisClient.lpop('trebek:answers', (error, reply) => {
    sendMessage(`The answer was: ${reply}`);
  });
}

module.exports = answer;
