import express from 'express';
import { addCourse, getCourses } from '../controllers/courseController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, addCourse);
router.get('/', getCourses);

export default router;
