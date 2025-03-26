import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {type:String, required:true, unique:true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {type:String, required:true}},
  { timestamps: true }
);



export default mongoose.model('Student', userSchema);
