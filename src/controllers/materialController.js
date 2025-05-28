import Material from '../models/Material.js';
import axios from 'axios'
import multer from 'multer';
import cloudinary from '../config/cloudinary.js'; // Assuming cloudinary is configured here


const storage = multer.memoryStorage();
const upload = multer({ storage });

export const uploadMaterial = async (req, res) => {
  const { courseName, courseCode, semester, level } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    console.log("Received file metadata:", {
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      bufferLength: file.buffer.length
    });
  
    const streamUpload = () => {
      return new Promise((resolve, reject) => {
        const publicId = file.originalname.replace(/\.[^/.]+$/, '').replace(/\s+/g, '_'); // Remove extension, replace spaces
        const format = file.originalname.split('.').pop();
    
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'course-materials',
            resource_type: 'raw',
            public_id: publicId,
            format,
          },
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );
        stream.end(file.buffer);
      });
    };
    
  
    const cloudinaryUpload = await streamUpload();
    console.log("Cloudinary upload result:", cloudinaryUpload);
  
    const material = new Material({
      courseName,
      courseCode,
      fileName: file.originalname,
      level,
      semester,
      fileUrl: cloudinaryUpload.secure_url,
      cloudinaryPublicId: cloudinaryUpload.public_id,
      mimetype: file.mimetype,
    });
  
    const saved = await material.save();
    console.log("Saved to MongoDB:", saved);
  
    res.status(201).json({ message: 'File uploaded successfully', material: saved });
  
  } catch (err) {
    console.error("Upload failed:", err);
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
  
};



export const downloadMaterial = async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);
    if (!material) {
      return res.status(404).json({ message: 'File not found' });
    }

    const fileUrl = material.fileUrl;
    const fileName = material.fileName;
    const mimeType = material.mimetype;

    // Set headers to prompt file download
    res.setHeader('Content-Type', mimeType);
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);

    // Stream the file from Cloudinary to the client
    const response = await axios({
      method: 'GET',
      url: fileUrl,
      responseType: 'stream',
    });

    response.data.pipe(res);
  } catch (error) {
    console.error('Download failed:', error.message);
    res.status(500).json({ message: 'Download failed', error: error.message });
  }

};





  export const getMaterialsByCourse = async (req, res) => {
    const { courseCode } = req.params;
  
    try {
      const materials = await Material.find({ courseCode }).sort({ createdAt: -1 });
      res.status(200).json(materials);
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch materials for course', error: err.message });
    }
  };
  

export const getAllMaterials = async (req, res) => {
  try {
    const materials = await Material.find().sort({ createdAt: -1 });
    res.status(200).json(materials);
  } catch (err) {
    res.status(500).json({ message: 'Could not fetch materials', error: err.message });
  }
};
