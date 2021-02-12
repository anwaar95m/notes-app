/** @format */

const fs = require("fs");
const chalk = require("chalk");

const loadNotes = async () => {
  try {
    const bufferdData = fs.readFileSync("notes.json");
    const dataJSON = bufferdData.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const saveNotes = (notes) => {
  const stringData = JSON.stringify(notes);
  fs.writeFileSync("notes.json", stringData);
};

const addNote = async (title, description) => {
  try {
    const notes = await loadNotes();
    const found = notes.find((note) => note.title === title);

    if (!found) {
      if (!title || !description) {
        console.log(
          chalk.bgRed.black.bold("Please add proper title and description")
        );
      } else {
        notes.push({ title: title, description: description });
        saveNotes(notes);
        console.log(chalk.bgGreen.black.bold("Note added"));
      }
    } else {
      console.log(chalk.bgRed.black.bold("Note already taken"));
    }
  } catch (err) {
    console.log(chalk.bgRed.black.bold("Error in addNote", err));
  }
};

const removeNote = async (title) => {
  try {
    const notes = await loadNotes();
    const found = notes.find((note) => note.title === title);
    const index = notes.indexOf(found);
    if (found) {
      notes.splice(index, 1);
      saveNotes(notes);
      console.log(chalk.bgGreen.black.bold("Removed given node"));
    } else {
      console.log(chalk.bgRed.black.bold("Node not Found"));
    }
  } catch (err) {
    console.log(chalk.bgRed.black.bold("Error in removeNote", err));
  }
};

const readNote = async (title) => {
  try {
    const notes = await loadNotes();
    const found = notes.find((note) => note.title === title);
    if (found) {
      console.log(
        chalk.bgGreen.black.bold(
          `Title: ${found.title} , Description: ${found.description}`
        )
      );
    } else {
      console.log(chalk.bgRed.black.bold("Node not Found"));
    }
  } catch (err) {
    console.log(chalk.bgRed.black.bold("Error in readNote", err));
  }
};

const listNotes = async () => {
  try {
    const notes = await loadNotes();
    notes.map((note) =>
      console.log(
        chalk.bgGreen.black.bold(
          `Title: ${note.title} , Description: ${note.description}`
        )
      )
    );
  } catch (err) {
    console.log(chalk.bgRed.black.bold("Error in listNotes", err));
  }
};

module.exports = {
  addNote,
  removeNote,
  readNote,
  listNotes,
};
