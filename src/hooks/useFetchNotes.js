import axios from "axios";
import { useEffect } from "react"



const useFetchNotes = (setNotes, setLoading) => {
  const apiUrl = "https://keeper-app-backend-98dn.onrender.com";
  const getNotes = async () => {
    const { data } = await axios.get(apiUrl + "/api/notes");
    setNotes(data);
    setLoading(false);
  };
  useEffect(() => {
    getNotes();
  }, []);
  return getNotes;
}


export default useFetchNotes;