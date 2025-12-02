const redis = require('redis');

const client = redis.createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
});

client.on('error', (err) => console.log('Redis Client Error', err));
client.on('connect', () => console.log('Conectado ao Redis!'));

// Conecta assim que o arquivo é carregado
client.connect();

module.exports = client;