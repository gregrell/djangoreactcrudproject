import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import ListItem from "../components/ListItem";
import NotePage from "./NotePage";
import { TheContext } from "../context/MyContext";

//experimental custom hooks
import { useGetNotes } from "../utils/api";

const NotesListPage = () => {
  const navigate = useNavigate();

  const notes = useGetNotes();

  const handleNewNote = () => {
    navigate("note/new");
  };

  const somecontext = useContext(TheContext);
  return (
    <div>
      <h3>begin 'NotesListPage.jsx</h3>
      <button onClick={handleNewNote}>New</button>
      <div className="notes-list">
        {notes &&
          notes.map((note) => (
            <Link to={`note/${note.id}`} key={note.id}>
              <ListItem note={note} key={note.id} />
            </Link>
          ))}
      </div>
      <p>note list page context {somecontext}</p>
      <h3>End 'NotesListPage.jsx'</h3>
    </div>
  );
};

export default NotesListPage;
