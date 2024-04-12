import axios from "axios";

const apiUrl = "https://keeper-app-backend-98dn.onrender.com";

const useDeleteNotes = (setInnerLoading, getNotes) => {
  const deleteNote = async (id) => {
    try {
      setInnerLoading(true)
      await axios.delete(apiUrl + "/api/delete/" + id);
      await getNotes();
      console.log("deleted successfully")
      setInnerLoading(false)
    } catch (error) {
      console.error("An error happened while deleting a note", error);
    }

  };
  return deleteNote;
}

export default useDeleteNotes