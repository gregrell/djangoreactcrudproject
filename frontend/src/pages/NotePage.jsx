import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const NotePage = ({ params }) => {
  const [note, setNote] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getNote();
  }, [id]);

  let getNote = async () => {
    let response = await fetch(`/api/notes/${id}`);
    let data = await response.json();
    setNote(data);
  };

  return (
    <>
      <button onClick={() => navigate(-1)}> back </button>
      Body of {id}:{note && note.body}
    </>
  );
};

export default NotePage;
