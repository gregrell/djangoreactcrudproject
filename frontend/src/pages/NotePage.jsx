import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useCreateNote, usePrintFuck } from "../utils/api";

//experimental custom hook:
import { useNoteCrud } from "../utils/api";

const NotePage = ({ params }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [IsNew, setIsNew] = useState(false);

  const authcontext = useAuthContext();

  const [note, setNote, getNote, createNote, deleteNote, updateNote] =
    useNoteCrud();

  useEffect(() => {
    if (id === "new") {
      setIsNew(true);
    }
    if (id !== "new") {
      getNote(id, authcontext);
    }
  }, [id]);

  const handleinputchange = (e) => {
    const textareavalue = e.target.value;
    setNote({ ...note, body: textareavalue });
  };

  const handleBackButtonClick = () => {
    if (!IsNew) {
      updateNote(id, authcontext);
    }
    if (IsNew && note?.body) {
      createNote(note, authcontext);
    }
    navigate(-1);
  };

  const handleDeleteButtonClick = () => {
    if (!IsNew) {
      deleteNote(id, authcontext);
    }
    navigate(-1);
  };

  return (
    <>
      <h3>Begin note page 'NotePage.jsx'</h3>
      <button onClick={handleBackButtonClick}> back </button>
      {!IsNew && <button onClick={handleDeleteButtonClick}> delete </button>}
      Body of {id}:
      <textarea defaultValue={note?.body} onChange={handleinputchange} />
      <h3>End note page 'NotePage.jsx'</h3>
    </>
  );
};

export default NotePage;
