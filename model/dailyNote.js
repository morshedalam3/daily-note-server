import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  creator: { type: String },
  selectedFile: { type: String },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model("dailyNotes", userSchema);
