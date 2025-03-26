// routes/material.js
import express from 'express';
import multer from 'multer';
import { uploadMaterial, getAllMaterials, getMaterialsByCourse } from '../controllers/materialController.js';
import { protect } from '../middleware/authMiddleware.js';
import { storage } from '../config/cloudinary.js'; // ✅ Use cloudinary storage

const router = express.Router();
const upload = multer({ storage }); // ✅ now uses Cloudinary

// Upload material
router.post('/upload', protect, upload.single('file'), uploadMaterial);

// Fetch materials
router.get('/', getAllMaterials);
router.get('/course/:courseCode', getMaterialsByCourse);

export default router;
