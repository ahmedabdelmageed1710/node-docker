const express = require('express');
// const mongoose = require('mongoose');
const {Pool , Client} = require('pg');
const redis = require('redis');


const app = express();
const port = process.env.PORT || 4000;

const REDIS_HOST = 'redis';
const REDIS_PORT = 6379;

// Create Redis client
const redisClient = redis.createClient({
  url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
});  

redisClient.on('error', (err) => console.error('Redis Client Error', err));
redisClient.on('connect', () => console.log('Redis client connected'));
redisClient.connect();


// Connect to MongoDB
// const DB_USER = 'root';
// const DB_PASSWORD = 'example';
// const DB_PORT = 27017;
// const DB_HOST = 'mongo';

// const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
// mongoose.connect(URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.error('MongoDB connection error:', err));


// Connect to PostgreSQL
const DB_USER = 'root';
const DB_PASSWORD = 'example';
const DB_PORT = 5432;
const DB_HOST = 'postgres';

const URI = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
const client = new Client({
  connectionString: URI,
});

client.connect()
.then(() => console.log('PostgreSQL connected'))
.catch(err => console.error('PostgreSQL connection error:', err));


// Sample route
app.get('/', (req, res) => {
  redisClient.set('products', 'products ....');
  res.send('<h1>Hello World! dev</h1>');
});

app.get('/data', async (req, res) => {
  const products = await redisClient.get('products');
  res.send(`<h1>Hello World! dev</h1> <h2>${products}</h2>`);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);  
});

module.exports = app;