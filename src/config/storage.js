import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.js'; // Import the Cloudinary config
import multer from 'multer';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => ({
    folder: 'course-materials',   // Cloudinary folder
    resource_type: 'raw',         // For raw files (non-image, non-video)
    format: file.originalname.split('.').pop(), // Keep the original file extension
    public_id: `${file.originalname.split('.')[0]}_${Date.now()}`, // Unique public ID
  }),
});

const upload = multer({ storage });

export { upload };
