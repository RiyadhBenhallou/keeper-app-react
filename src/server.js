import express from "express";
import cors from "cors";
import mongoose from "mongoose";
const { Schema } = mongoose;

const app = express();
const port = 3000;

app.use(cors())
app.use(express.json())

mongoose.connect(process.env['MONGODB_URI'])  
  .then(() => console.log('MongoDB Connected...'))
  .catch((error) => console.log('An error happened while connection to the database', error));

const noteSchema = new Schema({
  title: String,
  content: String,
  date: Date,
})



const Note = mongoose.model('Note', noteSchema)

app.get('/api/notes', async (req, res) => {
  try {
    const notes = await Note.find()
    res.json(notes)
  } catch (error) {
    console.error('An error happened while getting all the notes', error)
  }
})

app.post('/api/notes', async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content, date: new Date() })
    newNote.save();
    res.json({ message: 'Successfully created.' })
  } catch (error) {
    console.error('An error happened while creating a new note', error)
  }
})

app.delete('/api/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Note.findByIdAndDelete(id)
    res.json({ message: 'Successfully deleted.' })
  } catch (error) {
    console.error('A error happened while deleting a note', error)
  }
})






app.listen(port, () => {
  console.log(`API listening on port: ${port}`)
})