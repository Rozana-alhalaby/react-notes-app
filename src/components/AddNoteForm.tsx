import React, { useState, useEffect } from 'react';

interface AddNoteFormProps {
  onAddNote: (newNote: { content: string; priority: string }) => void;
  onEditNote: (editedNote: { id?: number; content: string; priority: string }) => void;
  editedNote?: { id?: number; content: string; priority: string };
}

const AddNoteForm: React.FC<AddNoteFormProps> = ({ onAddNote, onEditNote, editedNote }) => {
  const [content, setContent] = useState(editedNote?.content || '');
  const [priority, setPriority] = useState(editedNote?.priority || '');
  const [errorMessage, setErrorMessage] = useState('');

  const handleNoteAction = () => {
    if (content.trim() === '' && priority === '') {
      setErrorMessage('Both Content and Priority are required.');
    } else if (content.trim() === '') {
      setErrorMessage('Content is required.');
    } else if (priority === '') {
      setErrorMessage('Priority is required.');
    } else {
      const newNote = {
        content,
        priority,
      };

      if (editedNote && editedNote.id !== undefined) {
        onEditNote({ ...editedNote, ...newNote });
      } else {
        onAddNote(newNote);
      }

      setContent('');
      setPriority('');
      setErrorMessage('');
    }
  };


  return (
    <form className='bg-sky-100 p-20 rounded-xl overflow-auto'>
      
      <textarea
        name='content'
        id='note-content'
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>

      <div className='flex flex-col gap-4 mt-4'>
        <label htmlFor='note-priority' className='bg-emerald-300 text-black px-2 py-2 cursor-pointer'>
          Priority
        </label>
        <div className='flex flex-col items-center'>
          {[1, 2, 3, 4, 5].map((p) => (
            <div key={`priority-${p}`} className='flex items-center'>
              <input
                type='radio'
                name='priority'
                id={`priority-${p}`}
                value={p.toString()}
                checked={priority === p.toString()}
                onChange={() => setPriority(p.toString())}
              />
              <label htmlFor={`priority-${p}`}>Priority-{p}</label>
            </div>
          ))}
        </div>
      </div>
 <div className="text-red-500">{errorMessage}</div>
      <button
        type='button'
        onClick={handleNoteAction}
        className='bg-black text-white px-4 py-2 mt-4 cursor-pointer'
      >
        {editedNote && editedNote.id !== undefined ? 'SAVE CHANGES' : 'ADD NOTE'}
      </button>
    </form>
  );
};

export default AddNoteForm;
