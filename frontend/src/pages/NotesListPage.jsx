import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import ListItem from "../components/ListItem";
import NotePage from "./NotePage";

const NotesListPage = () => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getNotes();
  }, []);

  let getNotes = async () => {
    let response = await fetch("/api/notes/");
    let data = await response.json();
    setNotes(data);
  };

  const handleNewNote = () => {
    navigate("note/new");
  };

  return (
    <div>
      <button onClick={handleNewNote}>New</button>
      <div className="notes-list">
        {notes.map((note) => (
          <Link to={`note/${note.id}`} key={note.id}>
            <ListItem note={note} key={note.id} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NotesListPage;
