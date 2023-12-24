import React from 'react';
import Note from './Note';

interface NotesListProps {
  notes: Array<{ id: number; content: string; priority: string }>;
  onEdit: (editedNote: { id: number; content: string; priority: string }) => void;
  onDelete: (deletedNote: { id: number; content: string; priority: string }) => void;
}

const NotesList: React.FC<NotesListProps> = ({ notes, onEdit, onDelete }) => {
  return (
    <div className='NotesList relative bg-red-200 p-20 rounded-xl overflow-auto' style={{ maxHeight: '400px' }}>
      <h2 className="text-2xl font-bold mb-4 ">Notes</h2>
      <div className="grid gap-4">
        {notes.map((note) => (
          <div key={note.id} className="border p-0 rounded cursor-pointer">
            <Note note={note} onEdit={onEdit} onDelete={onDelete} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesList;
