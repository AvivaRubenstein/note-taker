const express = require('express');
const path = require('path');
//importing our routes for our other endpoints from the index
const api = require('./routes/index');

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing application/json and urlencoded data
//will help us parse anything that's a json object in the request body, and will interpret special characters to be appropriate for url format
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// the '/api' is the path for which this middleware is invoked, and the api variable contains the modular routes from the index
app.use('/api', api);
//we are making 'public' into the site's root, so that all of the pages in this folder can be loaded
app.use(express.static('public'));

//path.join creates a path, adding in whatever is in the parentheses to the path
//__dirname returns the directory name of the current module/directory we are running, and then we are adding the path to the index to create the full path to the index page
app.get('/', (req, res) =>
  res.sendfile(path.join(__dirname, 'public/index.html'))
);

app.get('/notes',(req, res) => {
  res.sendfile(path.join(__dirname, 'public/notes.html'))
});

app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}, open at: http://localhost:${PORT} !`)
);
