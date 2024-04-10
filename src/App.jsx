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
  const [innerLoading, setInnerLoading] = useState(false);

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
      setInnerLoading(true)
      await axios.post(apiUrl + "/api/notes", newNote);
      try {
        const { data } = await axios.get(apiUrl + "/api/notes");
        setNotes(data);
      } catch(error) {
        console.error('an error happened while fetching data after deletion', error)
      }
      setInnerLoading(false)
    } catch (error) {
      console.error("An error happened while creating a new note", error);
    }
  };

  const deleteNote = async (id) => {
    try {
      setInnerLoading(true)
      await axios.delete(apiUrl + "/api/delete/" + id);
      try {
        const { data } = await axios.get(apiUrl + "/api/notes");
        setNotes(data);
      } catch(error) {
        console.error('an error happened while fetching data after deletion', error)
      }
      console.log("deleted successfully")
      setInnerLoading(false)
    } catch (error) {
      console.error("An error happened while deleting a note", error);
    }
    
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {innerLoading ? <div className="loading2">Loading...</div> : notes.map((noteItem, i) => (
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