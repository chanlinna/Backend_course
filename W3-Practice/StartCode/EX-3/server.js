import express from 'express';
import courses from '../EX-2/course.js';
import { logger } from './logger.js';
import { validateQuery } from './validateQuery.js';
import { auth } from './auth.js';  

const app = express();
const PORT = 3000;

app.use(logger);

app.use(auth);

app.get('/departments/:dept/courses', validateQuery, (req, res) => {
  const { dept } = req.params;
  const { level, minCredits, maxCredits, semester, instructor } = req.query;

  let results = courses.filter(course => course.department.toLowerCase() === dept.toLowerCase());

  if (level) {
    results = results.filter(course => course.level.toLowerCase() === level.toLowerCase());
  }
  if (minCredits) {
    results = results.filter(course => course.credits >= Number(minCredits));
  }
  if (maxCredits) {
    results = results.filter(course => course.credits <= Number(maxCredits));
  }
  if (semester) {
    results = results.filter(course => course.semester.toLowerCase() === semester.toLowerCase());
  }
  if (instructor) {
    results = results.filter(course => course.instructor.toLowerCase().includes(instructor.toLowerCase()));
  }

  res.json({
    results,
    meta: { total: results.length }
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
