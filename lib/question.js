const http = require('sync-request');
const redis = require('redis');
const sendMessage = require('./sendMessage');

const redisClient = redis.createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

function question() {
  redisClient.lpop('trebek:answers');

  const request = http('GET', 'http://jservice.io/api/random?count=1');

  const response = JSON.parse(request.getBody())[0];
  const category = response.category.title;
  const prompt = response.question;
  const value = response.value || 200;

  const categoryMessage = (category) ? ` in the category: ${category}` : '';

  redisClient.lpush('trebek:answers', response.answer);

  sendMessage(`For $${value}${categoryMessage}\n${prompt}`);
}

module.exports = question;
