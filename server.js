const fs = require("fs");
const path = require("path");
const express = require("express");
const notes = require("./db/db.json");
const { response, json } = require("express");
const app = express();
const db = (file) =>
  fs.readFile(`${process.cwd()}/db/${file}`, { encoding: "utf-8" });
const PORT = process.env.PORT || 3001;
const util = require("util");
const { isUtf8 } = require("buffer");
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/api/notes", (req, res) => {
  return readFileAsync("./db/db.json", "utf8").then((notes) => {
    let notesArray;
  
    try {
     notesArray = [].concat(JSON.parse(notes));
     console.log(notesArray) 
    } catch (error) {
      notesArray = []
    }
    return res.json(notesArray)
  })
 
});
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/index.html"))
);


app.get("./db/utils.js", (req, res) =>
  res.sendFile(path.join(__dirname, "/db/utils.js"))
);

app.post("/api/notes", function (req, res) {
  const note = req.body;
  console.log(note);
  readFileAsync("./db/db.json")
    .then(function (data) {
      console.log("promise returned");
      const notes = [].concat(JSON.parse(data));
      note.id = notes.length + 1;
      notes.push(note);
      console.log(notes);
      return notes;
    })
    .then(function (notes) {
      writeFileAsync("./db/db.json", JSON.stringify(notes));
      res.json(notes);
    });
});

app.delete("/api/notes/:id", function (req, res) {
  const idToDelete = parseInt(req.params.id);
  console.log(idToDelete)
  readFileAsync("./db/db.json", "utf-8")
    .then(function (data) {
      const notes = [].concat(JSON.parse(data));
      const newNotesData = [];
      for (let i = 0; i < notes.length; i++) {
        if (idToDelete !== notes[i].id) {
          newNotesData.push(notes[i]);
        console.log(newNotesData)
        }
      }
      return newNotesData;
    })
    .then(function (notes) {
      writeFileAsync("./db/db.json", JSON.stringify(notes));
      res.send("saved success!");
    });
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});



app.listen(PORT, () => console.log("express app listening on port 3001"));
