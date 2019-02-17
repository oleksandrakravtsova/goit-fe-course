"use strict";

// Конструктор Notepad при инициализации принимает массив заметок

const Notepad = function Notepad(notes = []) {
  this.getNotes = function() {
    return notes;
  };

  this.findNoteById = function(id) {
    for (const note of notes) {
      if (id === note.id) {
        return note;
      }
    }
  };

  this.saveNote = function(note) {
    return notes.push(note);
  };

  this.deleteNote = function(id) {
    for (let i = 0; i < notes.length; i += 1) {
      if (id === notes[i].id) {
        notes.splice(i, 1);
      }
    }
    return;
  };

  this.updateNoteContent = function(id, updatedContent) {
    const note = this.findNoteById(id);
    const keys = Object.keys(updatedContent);

    for (let key of keys) {
      note[key] = updatedContent[key];
    }

    return note;
  };

  this.updateNotePriority = function(id, priority) {
    const note = this.findNoteById(id);
    if (note) {
      note.priority = priority;
      return note;
    }
  };

  this.filterNotesByQuery = function(query) {
    const queryNotes = [];
    for (const note of notes) {
      const title = note.title.toLowerCase();
      const body = note.body.toLowerCase();
      if (
        title.includes(query.toLowerCase()) ||
        body.includes(query.toLowerCase())
      ) {
        queryNotes.push(note);
      }
    }
    return queryNotes;
  };

  this.filterNotesByPriority = function(priority) {
    const priorityNotes = [];
    for (const note of notes) {
      if (priority === note.priority) {
        priorityNotes.push(note);
      }
    }
    return priorityNotes;
  };
};

const PRIORITY_TYPES = {
  LOW: 0,
  NORMAL: 1,
  HIGH: 2
};

Notepad.PRIORITIES = {
  0: { id: 0, value: 0, name: "Low" },
  1: { id: 1, value: 1, name: "Normal" },
  2: { id: 2, value: 2, name: "High" }
};

Notepad.getPriorityName = function getPriorityName(priorityId) {
  if (Notepad.PRIORITIES[priorityId].id === priorityId) {
    return Notepad.PRIORITIES[priorityId].name;
  }
};

const initialNotes = [
  {
    id: "id-1",
    title: "JavaScript essentials",
    body:
      "Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc",
    priority: PRIORITY_TYPES.HIGH
  },
  {
    id: "id-2",
    title: "Refresh HTML and CSS",
    body:
      "Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.",
    priority: PRIORITY_TYPES.NORMAL
  }
];

/*
 * Посмотрим имя приоритета по id
 */
console.log(Notepad.getPriorityName(PRIORITY_TYPES.LOW)); // "Low"
console.log(Notepad.getPriorityName(PRIORITY_TYPES.NORMAL)); // "Normal"
console.log(Notepad.getPriorityName(PRIORITY_TYPES.HIGH)); // "High"

const notepad = new Notepad(initialNotes);

/*
  Смотрю что у меня в заметках после инициализации
*/
console.log("Все текущие заметки: ", notepad.getNotes());

/*
 * Добавляю еще 2 заметки и смотрю что получилось
 */
notepad.saveNote({
  id: "id-3",
  title: "Get comfy with Frontend frameworks",
  body:
    "First must get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.",
  priority: PRIORITY_TYPES.NORMAL
});

notepad.saveNote({
  id: "id-4",
  title: "Winter clothes",
  body:
    "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",
  priority: PRIORITY_TYPES.LOW
});

console.log("Все текущие заметки: ", notepad.getNotes());

/*
 * Зима уже близко, пора поднять приоритет на покупку одежды
 */
notepad.updateNotePriority("id-4", PRIORITY_TYPES.NORMAL);

console.log(
  "Заметки после обновления приоритета для id-4: ",
  notepad.getNotes()
);

/*
 * Решил что фреймворки отложу немного, понижаю приоритет
 */
notepad.updateNotePriority("id-3", PRIORITY_TYPES.LOW);

console.log(
  "Заметки после обновления приоритета для id-3: ",
  notepad.getNotes()
);

/*
 * Решил отфильтровать заметки по слову html
 */
console.log(
  'Отфильтровали заметки по ключевому слову "html": ',
  notepad.filterNotesByQuery("html")
);

/*
 * Решил отфильтровать заметки по слову javascript
 */
console.log(
  'Отфильтровали заметки по ключевому слову "javascript": ',
  notepad.filterNotesByQuery("javascript")
);

/*
 * Хочу посмотреть только заметки с нормальным приоритетом
 */
console.log(
  "Отфильтровали заметки по нормальному приоритету: ",
  notepad.filterNotesByPriority(PRIORITY_TYPES.NORMAL)
);

/*
 * Обновим контент заметки с id-3
 */
notepad.updateNoteContent("id-3", {
  title: "Get comfy with React.js or Vue.js"
});

console.log(
  "Заметки после обновления контента заметки с id-3: ",
  notepad.getNotes()
);

/*
 * Повторил HTML и CSS, удаляю запись c id-2
 */
notepad.deleteNote("id-2");
console.log("Заметки после удаления с id -2: ", notepad.getNotes());
