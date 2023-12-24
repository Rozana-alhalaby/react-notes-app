import React from "react";

interface NoteProps {
  note: { id: number; content: string; priority: string };
  onEdit: (editedNote: { id: number; content: string; priority: string }) => void;
  onDelete: (deletedNote: { id: number; content: string; priority: string }) => void;
}

const Note: React.FC<NoteProps> = ({ note, onEdit, onDelete }) => {
  return (
    <div className='flex gap-5 bg-red-200 p-4 rounded-md'>
      <div className='overflow-hidden h-10 w-10 rounded-full'>
        <img src={process.env.PUBLIC_URL + '/' + 'download.png'} alt="profile" />
      </div>
      <div>
        {note.content}
      </div>
      <div className="flex flex-col ">
      <span onClick={() => onEdit(note)} className="cursor-pointer">
  <img
    src={process.env.PUBLIC_URL + '/' + 'penicon.png'}
    alt="pen icon"
    className="pen-icon" // Ensure this class is added
    style={{ width: '20px', height: '20px', }} // Add inline style to control size
  />
</span>
        <span onClick={() => onDelete(note)} className="cursor-pointer">delete</span>
      </div>
    </div>
  );
};

export default Note;
