//need to change this to a custom react hook in order to use authcontext
import { React, useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";

//* This custom hook is used to get all the notes in the database. It keeps notes as internal state *//
//* Custom hooks only share logic across components, the data will be different between each instance call.
//* context can share data across all components

export function useGetNotes() {
  const [notes, setNotes] = useState(null);

  useEffect(() => {
    getNotes();
  }, []);

  let getNotes = async () => {
    let response = await fetch("/api/notes/");
    let data = await response.json();
    setNotes(data);
  };

  return notes;
}

export function useNoteCrud() {
  const [note, setNote] = useState(null);

  let getNote = async (id, authcontext) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${authcontext.authHeader()}`,
      },
    };
    let response = await fetch(`/api/notes/${id}`, requestOptions);
    let data = await response.json();
    setNote(data);
  };

  let createNote = async (note, authcontext) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${authcontext.authHeader()}`,
      },
      body: JSON.stringify(note),
    };

    const response = await fetch(`/api/notes/create/`, requestOptions);
  };

  let deleteNote = async (id, authcontext) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${authcontext.authHeader()}`,
      },
    };

    const response = await fetch(`/api/notes/${id}/delete`, requestOptions);
  };

  let updateNote = async (id, authcontext) => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${authcontext.authHeader()}`,
      },
      body: JSON.stringify(note),
    };

    const response = await fetch(`/api/notes/${id}/update`, requestOptions);
  };

  return [note, setNote, getNote, createNote, deleteNote, updateNote];
}
