import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import ListItem from "../components/ListItem";
import NotePage from "./NotePage";

const NotesListPage = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes();
  }, []);

  let getNotes = async () => {
    let response = await fetch("/api/notes/");
    let data = await response.json();
    setNotes(data);
  };

  return (
    <div>
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
