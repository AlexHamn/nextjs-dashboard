'use client';

import { useState, useEffect } from 'react';
import React from 'react';

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const res = await fetch('/api/notes');
    const data = await res.json();
    setNotes(data[0].result);
  };

const addNote = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
  e.preventDefault();
  await fetch('/api/notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: newNote }),
  });
  setNewNote('');
  fetchNotes();
};

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.content}</li>
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="New note"
        />
        <button type="submit">Add Note</button>
      </form>
    </div>
  );
}