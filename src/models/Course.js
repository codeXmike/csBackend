import mongoose from 'mongoose'

const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  level: { type: String, required: true },    // e.g., "100", "200"
  semester: { type: String, required: true }, // e.g., "First", "Second"
  
});

export default mongoose.model("Course", CourseSchema);
