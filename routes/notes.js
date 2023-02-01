const notes = require('express').Router();
const { readAndAppend, readFromFile, writeToFile} = require('../helpers/fsUtils');

const { v4: uuidv4 } = require('uuid');

//the get request for /api/notes route should get notes and return them as json
notes.get('/', (req,res) => {
    readFromFile('./db/db.json').then((data)=>
    res.json(JSON.parse(data)));
}
);

notes.post('/', (req, res) => {
    //we are destructuring the request body object so we can easily refer to the title and text of the note
    const {title, text} = req.body;

    if(title && text) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };
        readAndAppend(newNote, './db/db.json');

        const response = {
            status: 'success',
            body: newNote,
        };
        res.json(response);   
    } else {
         res.json('error in posting note');
    }
});

// DELETE Route for a specific note 
notes.delete('/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        // Make a new array of all tips except the one with the ID provided in the URL
        const result = json.filter((notes) => notes.id !== noteId);
  
        // Save that array to the filesystem
        writeToFile('./db/db.json', result);
  
        // Respond to the DELETE request
        res.json(`Item ${noteId} has been deleted 🗑️`);
      });
  });


module.exports = notes;