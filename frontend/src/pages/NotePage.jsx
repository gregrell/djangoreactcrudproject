import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const NotePage = ({ params }) => {
  const [note, setNote] = useState(null);
  const { id } = useParams();

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
      Body of {id}:{note && note.body}
    </>
  );
};

export default NotePage;
