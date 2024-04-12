import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
import CreateArea from "./components/CreateArea";
import useFetchNotes from "./hooks/useFetchNotes.js"
import useAddNotes from "./hooks/useAddNotes.js"
import useDeleteNotes from "./hooks/useDeleteNotes.js"
import "./App.css";




const App = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [innerLoading, setInnerLoading] = useState(false);

  const getNotes = useFetchNotes(setNotes, setLoading)

  const addNote = useAddNotes(setInnerLoading, getNotes)

  const deleteNote = useDeleteNotes(setInnerLoading, getNotes)





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