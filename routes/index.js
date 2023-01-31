const express = require('express');
//importing from notes.js file
const notesRouter = require('./notes');

const app = express();

app.use('/notes', notesRouter);

module.exports = app;