import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";

const NotePage = ({ params }) => {
  const [note, setNote] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [IsNew, setIsNew] = useState(false);

  const authcontext = useAuthContext();

  useEffect(() => {
    if (id === "new") {
      setIsNew(true);
    }
    if (id !== "new") {
      getNote();
    }
  }, [id]);

  let getNote = async () => {
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

  const handleinputchange = (e) => {
    const textareavalue = e.target.value;
    setNote({ body: textareavalue });
  };

  let updateNote = async () => {
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

  let createNote = async () => {
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

  let deleteNote = async () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${authcontext.authHeader()}`,
      },
      body: JSON.stringify(note),
    };

    const response = await fetch(`/api/notes/${id}/delete`, requestOptions);
  };
  const handleBackButtonClick = () => {
    if (!IsNew) {
      updateNote();
    }
    if (IsNew && note?.body) {
      createNote();
    }
    navigate(-1);
  };

  const handleDeleteButtonClick = () => {
    if (!IsNew) {
      deleteNote();
    }
    navigate(-1);
  };

  return (
    <>
      <button onClick={handleBackButtonClick}> back </button>
      {!IsNew && <button onClick={handleDeleteButtonClick}> delete </button>}
      Body of {id}:
      <textarea defaultValue={note?.body} onChange={handleinputchange} />
    </>
  );
};

export default NotePage;
