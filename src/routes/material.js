import express from 'express';
import multer from 'multer';
import { uploadMaterial, getAllMaterials, getMaterialsByCourse, downloadMaterial } from '../controllers/materialController.js';
import { protect } from '../middleware/authMiddleware.js';
// import { upload } from '../config/storage.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });


router.post('/upload', protect, upload.single('file'), uploadMaterial);
router.get('/download/:id', downloadMaterial);
router.get('/', getAllMaterials);
router.get('/course/:courseCode', getMaterialsByCourse);

export default router;
