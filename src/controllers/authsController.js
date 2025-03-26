import Student from '../models/Student.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existing = await Student.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Student already exists' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const student = new Student({ name, email, password: hashed, role: "student" });
    await student.save();

    res.status(201).json({ message: 'Student registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await Student.findOne({email})
    if (!student) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ studentId: student._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    res.status(200).json({ 
      user: {
        id: student._id,
        name: student.name,
        email: student.email,
        role: student.role, 
    }, token });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};
