import Course from '../models/Course.js';

export const addCourse = async (req, res) => {
    const { name, code, semester, level } = req.body;
  
    if (!name || !code || !semester || !level) {
      return res.status(400).json({ message: 'Name, code, semester, and level are required' });
    }
  
    try {
      const existing = await Course.findOne({ code });
      if (existing) {
        return res.status(409).json({ message: 'Course already exists' });
      }
  
      const course = new Course({ name, code, semester, level });
      await course.save();
  
      res.status(201).json({ message: 'Course added successfully', course });
    } catch (err) {
      res.status(500).json({ message: 'Failed to add course', error: err.message });
    }
  };
  
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch courses', error: err.message });
  }
};
