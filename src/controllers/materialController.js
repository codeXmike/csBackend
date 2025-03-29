import Material from '../models/Material.js';

export const uploadMaterial = async (req, res) => {
    const { courseName, courseCode, semester, level } = req.body;
    const file = req.file;
    const fileUrl = req.file.path;
  
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
  
    try {
      const material = new Material({
        courseName,
        courseCode,
        fileName: file.originalname,
        level,
        semester,
        fileUrl,
      });
  
      await material.save();
      res.status(201).json({ message: 'File uploaded successfully', material });
    } catch (err) {
      res.status(500).json({ message: 'Upload failed', error: err.message });
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
