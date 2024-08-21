//need to change this to a custom react hook in order to use authcontext
import { React, useState, useEffect, useRef } from "react";
import { requestBuilder } from "./appUtils.js";

//Axios sandbox
import axios from "axios";

// **************** USER CRUD API *********************** //
export function useUserCRUD() {
  let ref = useRef(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (ref.current) {
      ref = false;
    } else {
      //not first call
    }
  });

  async function getUser(
    id = id,
    username = username,
    email = email,
    authcontext = authcontext
  ) {
    const requestOptions = requestBuilder("GET", authcontext, {
      id: id,
      username: username,
      email: email,
    });

    await axios
      .get(`users/`, requestOptions.body, {
        headers: requestOptions.headers,
      })
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function createUser(user) {
    let success = false;
    if (user) {
      const requestOptions = requestBuilder("POST", "", user);

      await axios
        .post(`users/`, requestOptions.body, {
          headers: requestOptions.headers,
        })
        .then((data) => {
          success = true;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally();
    } else {
      console.log("did not create user");
      //todo: error handling for user creation
    }
    return success;
  }
  return { user: user, getUser: getUser, createUser: createUser };
}

// **************** END USER CRUD *********************** //

// **************** NOTES API *************************** //

//* This custom hook is used to get all the notes in the database. It keeps notes as internal state *//
//* Custom hooks only share logic across components, the data will be different between each instance call.
//* context can share data across all components

//   Get all notes hook
export function useGetNotes() {
  const [notes, setNotes] = useState(null);

  useEffect(() => {
    //getNotes(); //This is refactored to use axios
    getAxiosNotes();
  }, []);

  //The getNotes() is not called because it is replaced by getAxiosNotes(). It is here as reference if you want to use async await
  let getNotes = async () => {
    let response = await fetch("/api/notes/");
    let data = await response.json();
    setNotes(data);
  };

  let getAxiosNotes = () => {
    axios
      .get("/api/notes/")
      .then((data) => {
        setNotes(data.data);
      })
      .catch((error) => console.log(error));
  };

  return notes;
}

// Individual CRUD operations on single note. Each of these functions require a note ID and authcontext
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
    //let response = await fetch(`/api/notes/${id}`, requestOptions); //turned off in favor of axios call below. Left here as example
    //let data = await response.json(); //turned off in favor of axios call below. Left here as example
    //setNote(data); this is turned off

    axios
      .get(`/api/notes/${id}`, { headers: requestOptions.headers })
      .then((data) => setNote(data.data))
      .catch((error) => console.log(error));
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

    //const response = await fetch(`/api/notes/create/`, requestOptions); // turned off in favor of axios below. Left here as example.

    axios
      .post(`/api/notes/create/`, requestOptions.body, {
        headers: requestOptions.headers,
      })
      .then()
      .catch((error) => console.log(error));
  };

  let deleteNote = async (id, authcontext) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${authcontext.authHeader()}`,
      },
      body: "",
    };

    //const response = await fetch(`/api/notes/${id}/delete`, requestOptions);// turned off in favor of axios below. Left here as example
    axios
      .post(`/api/notes/${id}/delete`, requestOptions.body, {
        headers: requestOptions.headers,
      })
      .then()
      .catch((error) => console.log(error));
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

    //const response = await fetch(`/api/notes/${id}/update`, requestOptions); // turned off in favor of axios below. Left here as example.
    axios
      .put(`/api/notes/${id}/update`, requestOptions.body, {
        headers: requestOptions.headers,
      })
      .then()
      .catch((error) => console.log(error));
  };

  return [note, setNote, getNote, createNote, deleteNote, updateNote];
}

// *************************** Extended USER Info API *************************** //

export function useExtendedUserInfoCrud(authcontext) {
  const [firstRun, setFirstRun] = useState(true);
  const [extendedUserInfo, setUserInfo] = useState(null);
  useEffect(() => {
    if (firstRun) {
      getUserInfo(authcontext);
      setFirstRun(false);
    }
  });
  let getUserInfo = async (authcontext) => {
    const requestOptions = requestBuilder("GET", authcontext);

    axios
      .get(`/api/userInfo/`, {
        headers: requestOptions.headers,
      })
      .then((data) => {
        setUserInfo(data.data);
      })
      .catch((error) => console.log(error));
  };
  return [extendedUserInfo];
}

// *************************** USER LOOKUP API *************************** //
export function useUserLookupAPI(form) {
  const [usernameExists, setusernameExists] = useState(false);
  const [useremailExists, setuseremailExists] = useState(false);

  useEffect(() => {
    if (form.username) {
      lookupUsername(form.username);
    }
    if (form.email) {
      lookupEmail(form.email);
    }
  }, [form]);

  let lookupUsername = async (username) => {
    axios
      .get(`api/user/lookupname/${username}`)
      .then((data) => {
        setusernameExists(data.data.found);
      })
      .catch((error) => {
        setusernameExists(false);
        console.log(error);
      });
  };

  let lookupEmail = async (useremail) => {
    axios
      .get(`api/user/lookupemail/${useremail}`)
      .then((data) => {
        setuseremailExists(data.data.found);
      })
      .catch((error) => {
        setuseremailExists(false);
        console.log(error);
      });
  };
  return [usernameExists, useremailExists];
}
