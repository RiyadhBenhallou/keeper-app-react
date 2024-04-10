import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import "./App.css";

const apiUrl = "https://keeper-app-backend-98dn.onrender.com";


const App = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getNotes = async () => {
      const { data } = await axios.get(apiUrl + "/api/notes");
      setNotes(data);
      setLoading(false);
    };
    getNotes();
  }, []);

  const addNote = async (newNote) => {
    try {
      setNotes([...notes, newNote]);
      await axios.post(apiUrl + "/api/notes", newNote);
    } catch (error) {
      console.error("An error happened while creating a new note", error);
      setNotes(notes.filter((note) => note !== newNote));
    }
  };

  const deleteNote = async (id) => {
    try {
      setNotes(notes.filter((note) => note._id !== id));
      await axios.delete(apiUrl + "/api/delete/" + id);
    } catch (error) {
      console.error("An error happened while deleting a note", error);
      const data = await fetchNotes();
      setNotes(data);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, i) => (
        <Note
          key={noteItem._id || i}
          id={noteItem._id}
          title={noteItem.title}
          content={noteItem.content}
          onDelete={deleteNote}
        />
      ))}
      <Footer />
    </div>
  );
};

export default App;