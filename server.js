const fs = require("fs/promises");
const express = require("express");
const notes = require("./db/db.json");
const { response } = require("express");

const app = express();
const db = (file) => fs.readFile(`${process.cwd()}/db/${file}`, { encoding: "utf-8" })
  


console.log(notes);

app.get("/api/notes", (req, res) => {
  console.log("getting all notes");
//   console.log(req, res);

//   if (req) {
    db("db.json").then((value) => {
        // console.log(JSON.parse (value));
        if (!value) res.status(400).send("no notes found")
        res.status(200).json({ message: "this gets all the notes", value });
        
      })
      .catch((err) => res.status(500).send("internal server err"));
//   }
});

app.listen(3001, () => console.log("express app listening on port 3001"));
