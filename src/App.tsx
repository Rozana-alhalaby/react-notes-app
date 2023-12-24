import React, { useState ,useEffect} from 'react';
import './App.css';
import NotesList from './components/NotesList';
import AddNoteForm from './components/AddNoteForm';

interface Note {
  id: number;
  content: string;
  priority: string;
}

function App() {
  const [notes, setNotes] = useState<Note[]>(JSON.parse(localStorage.getItem('notes') || '[]'));
  const [editedNote, setEditedNote] = useState<Note | undefined>(undefined);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);


 

  const handleAddNote = (newNote: { content: string; priority: string }) => {
    setNotes([...notes, { id: notes.length + 1, ...newNote }]);
    setEditedNote(undefined); // Clear editedNote after adding a new note
  };

  const handleEditNote = (editedNote: { id?: number | undefined; content: string; priority: string }) => {
    if (editedNote.id !== undefined) {
      // Find the index of the edited note in the notes array
      const index = notes.findIndex((note) => note.id === editedNote.id);
  
      // Update the notes array with the edited note
      setNotes([...notes.slice(0, index), { id: editedNote.id, content: editedNote.content, priority: editedNote.priority }, ...notes.slice(index + 1)]);
      
      setEditedNote(undefined); // Clear editedNote after editing
    }
  };
  const handleDeleteNote = (deletedNote: Note) => {
    setNotes(notes.filter((note) => note !== deletedNote));
  };

  return (
    <div className="App flex justify-center items-center h-screen gap-[44px] bg-[var(--accent-light)]">
      <div className="NotesListContainer border p-4 rounded">
        <NotesList notes={notes} onEdit={setEditedNote} onDelete={handleDeleteNote} />
      </div>
      <div className="AddNoteContainer ">
        <AddNoteForm onAddNote={handleAddNote} onEditNote={handleEditNote} editedNote={editedNote} />
      </div>
    </div>
  );
}

export default App;
