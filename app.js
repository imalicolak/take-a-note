const btnElement = document.getElementById("btn");
const appElement = document.getElementById("app");

// populate notes from notes in local storage one by one
getNotes().forEach((note) => {
  const noteElement = createNoteElement(note.id, note.content);
  appElement.insertBefore(noteElement, btnElement);
});

btn.addEventListener("click", addNote);

function addNote() {
  // Notes
  const notes = getNotes();
  console.log(notes);

  // Creates a note object
  const noteObject = {
    id: Math.floor(Math.random() * 111000),
    content: "",
  };
  const noteElement = createNoteElement(noteObject.id, noteObject.content);
  console.log(`Note Object is: ` + noteObject);

  appElement.insertBefore(noteElement, btnElement);

  // Pushes note object to notes array
  notes.push(noteObject);

  saveNoteLS(notes);
}

//Saving to local storage
function saveNoteLS(notes) {
  localStorage.setItem("note-created", JSON.stringify(notes));
}

// Grab all the notes from inside local storage
function getNotes() {
  return JSON.parse(localStorage.getItem("note-created") || "[]");
}

function createNoteElement(id, content) {
  //   console.log(id, content);
  const element = document.createElement("textarea");

  //similar to class=note
  element.classList.add("note");
  element.placeholder = "Empty Note";
  element.value = content;

  element.addEventListener("dblclick", () => {
    const warning = confirm("Are you sure you want to delete this note?");
    if (warning) {
      deleteNote(id, element);
    }
  });

  element.addEventListener("input", () => {
    updateNote(id, element.value);
  });

  return element;
}

function deleteNote(id, element) {
  // keep all of the notes except the note with the id that is the same
  const notes = getNotes().filter((note) => note.id !== id);

  saveNoteLS(notes);
  appElement.removeChild(element);
}

function updateNote(id, content) {
  const notes = getNotes();
  const target = notes.filter((note) => note.id === id)[0];
  target.content = content;

  saveNoteLS(notes);
}
