//need to change this to a custom react hook in order to use authcontext
import { React, useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";

export function myTest(in1, in2, in3) {
  console.log(`this is ${in1}`);
}

export function myTest2(in4, in5) {
  console.log(`API call 2 ${in4}`);
}

export function useCreateNote(note) {
  const authcontext = useAuthContext();
  let mycreateNote = async (note) => {
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
}

export function usePrintFuck() {
  function printFuck(note) {
    if (note) {
      console.log(`fuck ${note.body}`);
    }
  }
  return printFuck;
}

export function useGetNotes() {
  const [notes, setNotes] = useState();
  let getNotes = async () => {
    let response = await fetch("/api/notes/");
    let data = await response.json();
    setNotes(data);
  };

  useEffect(() => {
    getNotes();
  }, []);

  return notes;
}
