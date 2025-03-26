import express from 'express';
import { register, login } from '../controllers/authsController.js';
import { protect } from '../middleware/authMiddleware.js';


const router = express.Router();


router.post('/register', register);


router.post('/login', login);


router.get('/me', protect, async (req, res) => {
    res.json({
      id: req.user._id,
      email: req.user.email,
      role: req.user.role, // <-- needed
    });
  });
  

export default router;
