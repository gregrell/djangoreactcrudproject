import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const NotePage = ({ params }) => {
  const [note, setNote] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id !== "new") {
      getNote();
    }
  }, [id]);

  let getNote = async () => {
    let response = await fetch(`/api/notes/${id}`);
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
    };

    const response = await fetch(`/api/notes/${id}/update`, requestOptions);
  };

  let createNote = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
    };

    const response = await fetch(`/api/notes/create/`, requestOptions);
  };

  const handleBackButtonClick = () => {
    if (id !== "new") {
      updateNote();
    }
    if (id === "new") {
      createNote();
    }
    navigate(-1);
  };

  return (
    <>
      <button onClick={handleBackButtonClick}> back </button>
      Body of {id}:
      <textarea defaultValue={note?.body} onChange={handleinputchange} />
    </>
  );
};

export default NotePage;
