import express from "express";

import {
  addNote,
  getNotes,
  updateNote,
  deleteNote,
} from "../controllers/dailyNote.js";

const router = express.Router();

router.post("/add", addNote);
router.get("/getAll", getNotes);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);
export default router;
