import axios from "axios";

const apiUrl = "https://keeper-app-backend-98dn.onrender.com";

const useAddNotes = (setInnerLoading, getNotes) => {
  const addNote = async (newNote) => {
    try {
      setInnerLoading(true)
      await axios.post(apiUrl + "/api/notes", newNote);
      await getNotes();
      setInnerLoading(false)
    } catch (error) {
      console.error("An error happened while creating a new note", error);
    }
  };
  return addNote;
}

export default useAddNotes;

