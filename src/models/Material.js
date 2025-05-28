import mongoose from 'mongoose';

const materialSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      required: true,
      trim: true,
    },
    courseCode: {
      type: String,
      required: true,
      trim: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    semester: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,  // URL from Cloudinary
    },
    cloudinaryPublicId: {
      type: String,
      required: true,  // Cloudinary public ID
    },
    mimetype: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Material = mongoose.model('Material', materialSchema);

export default Material;