'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { PORT, CLIENT_ORIGIN } = require('./config');
const { dbConnect } = require('./db-mongoose');
// const {dbConnect} = require('./db-knex');

let Queue = require('./queue.js');

let cats = new Queue();
let dogs = new Queue();

cats.enqueue({
  imageURL:'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg', 
  imageDescription: 'Orange bengal cat with black stripes lounging on concrete.',
  name: 'Fluffy',
  sex: 'Female',
  age: 2,
  breed: 'Bengal',
  story: 'Thrown on the street'
});

cats.enqueue({
  imageURL:'https://www.thehappycatsite.com/wp-content/uploads/2016/12/calico-cat-2.jpg', 
  imageDescription: 'Calico cat looking for her next owner',
  name: 'Mittens',
  sex: 'Female',
  age: 1,
  breed: 'Calico',
  story: 'Owner left her behind for a new apartment'
});

dogs.enqueue({
  imageURL: 'http://www.dogster.com/wp-content/uploads/2015/05/Cute%20dog%20listening%20to%20music%201_1.jpg',
  imageDescription: 'A smiling golden-brown golden retreiver listening to music.',
  name: 'Zeus',
  sex: 'Male',
  age: 3,
  breed: 'Golden Retriever',
  story: 'Owner Passed away'
});

dogs.enqueue({
  imageURL: 'https://canna-pet.com/wp-content/uploads/2017/10/german-shepherd-dog-1071592_1920-1024x683.jpg',
  imageDescription: 'A cute German Shepherd lounging in the grass',
  name: 'Maia',
  sex: 'Female',
  age: 1,
  breed: 'German Shepherd',
  story: 'Found wandering around with no owner'
});

const app = express();

app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

app.get('/api/cat', function(req, res, err) {
  res.json(cats.peek());
});

app.get('/api/dog', function(req, res, err) {
  res.json(dogs.peek());
});

app.delete('/api/cat/', function(req, res, err) {
  res.json(cats.dequeue());
});

app.delete('/api/dog/', function(req, res, err) {
  res.json(dogs.dequeue());
});

function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  dbConnect();
  runServer();
}

module.exports = { app };
