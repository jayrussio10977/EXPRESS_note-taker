const fs = require("fs");
const path = require("path");

class NoteObj {
  createNote(data) {
    const { id, title, text } = data;
    fs.writeToFile(path.join(__dirname, "/db/db.json"), JSON.stringify(data));
    return data
  }
  
}
// connect the functionaltiy to the front end
