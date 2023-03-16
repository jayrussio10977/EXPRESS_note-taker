const fs = require("fs/promises");
const path = require('path')
const express = require("express");
const notes = require("./db/db.json");
const { response } = require("express");
const app = express();
const db = (file) =>
  fs.readFile(`${process.cwd()}/db/${file}`, { encoding: "utf-8" });
const PORT = process.env.PORT || 3001;
const util = require('utils.js');
const { isUtf8 } = require("buffer");
// const readFromFile = util.promisify(fs.readFile);

console.log(notes);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//   console.log(req, res);
app.use(express.static('public'));

app.get("/api/notes", (req, res) => {
  console.log("getting all notes");
  res.json(notes)
})
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/db/utils.js', (req, res) =>
  res.sendFile(path.join(__dirname, '/db/utils.js'))
);

app.post('/api/notes', function(req, res) {
  const note = req.body;
  readFileAsync("./db/db.json", "utf-8").then(function (data) {
   const notes = [].concat(JSON.parse(data));
   note.id =  notes.length + 1
   notes.push(note);
   return notes
  }).then(function(notes) {
    writeFileAsync('./db/db.json', JSON.stringify(notes))
    res.json(notes);
  })
})

app.delete('/pi/notes/ :id', function(req, res) {
  const idToDelete = parseInt(req.params.id);
  readFileAsync('./db/db.json', "utf-8").then(function(data) {
    const notes = [].concat(JSON.parse(data));
    const newNotesData = []
    for (let i = 0; i<notes.length; i++) {
      if(idToDelete !== notes[i].id) {
        newNotesData.push(notes[i])
      }
    }
    return newNotesData
  }).then(function(notes) {
    writeFileAsync('./db/db.json', JSON.stringify(notes))
  })
})









//   if (req) {
//   db("db.json")
//     .then((value) => {
//       // console.log(JSON.parse (value));
//       if (!value) res.status(400).send("no notes found");
//       res.status(200).json({ message: "this gets all the notes", value });
//     })
//     .catch((err) => res.status(500).send("internal server err"));
//   //   }
// });

app.listen(PORT, () => console.log("express app listening on port 3001"));
