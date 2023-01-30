const express = require('express');
const PORT = process.env.PORT || 3001;
const notesJSON = require('./db/db.json');
const notes = require('./public/')
const fs = require('fs');

const app = express();

// Middleware for parsing application/json and urlencoded data
//will help us parse anything that's a json object in the request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GET request 
//TODO: should return notes.html file
app.get('/notes', (req, res) => {
    // Log our request to the terminal
    console.info(`${req.method} request received to get saved notes`);
  
    // Sending all reviews to the client
    return res.json(noteshtml);
  });
  
// GET request
//TODO: should read the db.json file and return all saved notes as JSON
app.get('/api/notes', (req, res) => {
  // Log our request to the terminal
  console.info(`${req.method} request received to get notes.`);

  // Sending all reviews to the client
  return res.json(notes);
});

// POST request 
//TODO: should receive a new note to save on the request body
//and add it to the db.json file, and then return the new note to the client
//TODO: figure out how to give it a unique id for when it's save (uuid?) ---use npm packages
app.post('/api/notes', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a review`);

  // Prepare a response object to send back to the client
  let response;

  // Check if there is anything in the response body, and if there is a product name sent to it
  if (req.body && req.body.product) {
    //creating a json object to send back to the user, with the request's entire body in it (under data key)
    response = {
      status: 'success',
      data: req.body,
    };
    res.json(`Review for ${response.data.product} has been added!`);
  } else {
    res.json('Request body must at least contain a product name');
  }

  // Log the response body to the console
  console.log(req.body);
});

// GET request 
//TODO: should return the index.html file
app.get('*', (req, res) => {
    // Log our request to the terminal
    console.info(`${req.method} request received to get reviews`);
  
    // Sending all reviews to the client
    return res.json(reviews);
  });

app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);
