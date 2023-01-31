const express = require('express');
const PORT = process.env.PORT || 3001;
const notesJSON = require('./db/db.json');
// const notesHtml = require('./public/notes.html');
// const index = require('./public/index.html');
const fs = require('fs');
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
//const { v4: uuidv4 } = require('uuid');

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
    res.sendFile(path.join(__dirname, '/Users/avivarubenstein/Documents/classwork/note-taker/02-Challenge/public/notes.html'));
  });
  
// GET request
//TODO: should read the db.json file and return all saved notes as JSON
app.get('/api/notes', (req, res) => {
  // Log our request to the terminal
  console.info(`${req.method} request received to get notes and return them as JSON.`);

  //this will read from the JSON file with the notes, and return that data
  return readFromFile(notesJSON).then((data) => res.json(JSON.parse(data)));
});

// POST request 
//TODO: should receive a new note to save on the request body
//and add it to the db.json file, and then return the new note to the client
//TODO: figure out how to give it a unique id for when it's save (uuid?) ---use npm packages
app.post('/api/notes', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a review`);

  // Prepare a response object to send back to the client
  let newNote;

  // Check if there is anything in the response body, and if the full content is present
  if (req.body && req.body.title && req.body.text) {
    //creating a json object to send back to the user, with the request's entire body in it (under data key)
    newNote = {
        title,
        text,
        noteId: uuidv4(),
    };
  readAndAppend(newNote, notesJSON);

  // Log the response body to the console
  console.log(req.body);

} res.json(newNote);
});

// GET request 
//TODO: should return the index.html file
app.get('*', (req, res) => {
    // Log our request to the terminal
    console.info(`${req.method} request received to get reviews`);
  
    // Sending all reviews to the client
    res.sendFile(path.join(__dirname, 'note-taker/02-Challenge/public/index.html'));
  });

app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);
