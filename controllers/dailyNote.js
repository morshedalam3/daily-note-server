import express from "express";
import mongoose from "mongoose";
import Notes from "../model/dailyNote.js";

const router = express.Router();

// add single Note
export const addNote = async (req, res) => {
  const { title, description, selectedFile, creator } = req.body;
  if (!title || !description || !selectedFile || !creator) {
    return res.status(400).json({ message: "Please fill all the fields" });
  } else {
    const newNote = new Notes({
      title,
      description,
      selectedFile,
      creator,
    });

    try {
      await newNote.save();
      res.status(201).json({
        message: "New Note added successfully",
        status: "Success",
      });
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  }
};

//get all notes
export const getNotes = async (req, res) => {
  try {
    const allNotes = await Notes.find();

    res.status(200).json(allNotes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// update single note
export const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, description, selectedFile, creator } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No Note's data with id: ${id}`);

  const updatedNote = {
    title,
    description,
    selectedFile,
    creator,
    _id: id,
  };
  await Notes.findByIdAndUpdate(id, updatedNote, { new: true });

  res.json(updatedNote);
};

// delete student information
export const deleteNote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No Note's data with id: ${id}`);

  await Notes.findByIdAndRemove(id);

  res.json({ message: "selected note deleted successfully." });
};

export default router;
