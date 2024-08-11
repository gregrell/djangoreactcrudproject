//need to change this to a custom react hook in order to use authcontext
import { React, useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";

//* This custom hook is used to get all the notes in the database. It keeps notes as internal state *//
export function useGetNotes() {
  const [notes, setNotes] = useState();

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
